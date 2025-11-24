/**
 * Patent Check Service
 * Checks for similar patents using PatentsView API
 */

const axios = require('axios');

// Base configuration
const PATENT_BASE_URL = process.env.PATENTSVIEW_BASE_URL || "https://search.patentsview.org/api/v1/patent/";
const PATENT_API_KEY = process.env.PATENTSVIEW_API_KEY;

/**
 * Search for similar patents based on idea title and solution
 * @param {string} ideaTitle - The title of the idea
 * @param {string} solution - The solution description
 * @returns {Promise<Object>} Search results with similar patents
 */
const searchSimilarPatents = async (ideaTitle, solution) => {
  if (!PATENT_API_KEY) {
    throw new Error('PATENTSVIEW_API_KEY is not configured in environment variables');
  }

  // Combine title and solution for search
  const searchText = `${ideaTitle} ${solution || ''}`.trim();
  
  if (!searchText) {
    return {
      found: false,
      count: 0,
      patents: [],
      message: 'No search text provided'
    };
  }

  try {
    // Build query - search in patent title and abstract
    const query = {
      "_text_any": {
        "patent_title": searchText,
        "patent_abstract": searchText
      }
    };

    // Make API request
    const response = await axios.get(PATENT_BASE_URL, {
      params: {
        q: JSON.stringify(query),
        f: JSON.stringify(["patent_number", "patent_title", "patent_abstract", "patent_date"]),
        o: JSON.stringify({ per_page: 10 })
      },
      headers: {
        'X-Api-Key': PATENT_API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    const data = response.data;
    const patents = data.patents || [];
    const count = data.count || 0;

    return {
      found: count > 0,
      count: count,
      patents: patents.map(patent => ({
        number: patent.patent_number,
        title: patent.patent_title,
        abstract: patent.patent_abstract,
        date: patent.patent_date
      })),
      message: count > 0 
        ? `Found ${count} similar patent(s)` 
        : 'No similar patents found'
    };

  } catch (error) {
    // Handle API errors gracefully
    if (error.response) {
      // API returned an error response
      throw new Error(`PatentsView API error: ${error.response.status} - ${error.response.data?.message || error.message}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('PatentsView API request failed: No response received');
    } else {
      // Error in request setup
      throw new Error(`PatentsView API error: ${error.message}`);
    }
  }
};

/**
 * Check if idea has similar patents (simplified boolean check)
 * @param {string} ideaTitle - The title of the idea
 * @param {string} solution - The solution description
 * @returns {Promise<boolean>} True if similar patents found, false otherwise
 */
const hasSimilarPatents = async (ideaTitle, solution) => {
  try {
    const result = await searchSimilarPatents(ideaTitle, solution);
    return result.found;
  } catch (error) {
    // Log error but don't throw - return false as safe default
    console.error('Patent check error:', error.message);
    return false;
  }
};

module.exports = {
  searchSimilarPatents,
  hasSimilarPatents
};

