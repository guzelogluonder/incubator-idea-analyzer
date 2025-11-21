/**
 * Lean Canvas Generation Service
 * Generates a lean canvas structure from an idea
 */

const generateLeanCanvas = (idea) => {
  return {
    problem: idea.problem || '',
    solution: idea.solution || '',
    keyMetrics: idea.keyMetrics || '',
    uniqueValueProposition: idea.competitiveAdvantage || '',
    unfairAdvantage: idea.competitiveAdvantage || '',
    channels: idea.channels || '',
    customerSegments: idea.targetMarket || '',
    costStructure: idea.costStructure || '',
    revenueStreams: idea.revenueModel || '',
    createdAt: new Date(),
    ideaId: idea._id || idea.id
  };
};

const buildLeanCanvas = (answers) => {
  // Generate uniqueValueProp from targetCustomer and problem
  const generateUniqueValueProp = () => {
    const targetCustomer = answers.targetCustomer || '';
    const problem = answers.problem || '';
    
    if (targetCustomer && problem) {
      // Create a value proposition sentence using targetCustomer and problem
      const problemShort = problem.length > 100 ? problem.substring(0, 100) + '...' : problem;
      return `${targetCustomer} için ${problemShort} sorununu çözen, benzersiz bir çözüm sunuyoruz.`;
    } else if (targetCustomer) {
      return `${targetCustomer} için özelleştirilmiş, değer odaklı bir çözüm.`;
    } else if (problem) {
      const problemShort = problem.length > 100 ? problem.substring(0, 100) + '...' : problem;
      return `${problemShort} sorununa yönelik yenilikçi ve etkili bir yaklaşım.`;
    } else {
      return 'Müşterilerimize benzersiz değer sunan, yenilikçi bir çözüm.';
    }
  };

  return {
    problem: answers.problem || '',
    solution: answers.solution || '',
    uniqueValueProp: generateUniqueValueProp(),
    customerSegments: answers.targetCustomer || '',
    channels: 'Dijital kanallar, partner kuluçka merkezleri, mentor ağı',
    revenueStreams: answers.revenueModel || 'Ürün/hizmet satışı, abonelik modeli ve potansiyel yatırım gelirleri',
    costStructure: 'Geliştirme maliyetleri, operasyonel giderler, pazarlama ve dağıtım maliyetleri',
    keyMetrics: 'Kullanıcı edinimi, aktif kullanıcı sayısı, gelir büyümesi, müşteri memnuniyeti ve pazar penetrasyonu',
    unfairAdvantage: 'Teknoloji altyapısı, domain bilgisi, stratejik ortaklıklar ve erken pazar girişi avantajı'
  };
};

module.exports = {
  generateLeanCanvas,
  buildLeanCanvas
};

