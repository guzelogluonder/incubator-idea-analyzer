# AI Analiz Test Case

## Sorunlar ve Düzeltmeler

### Tespit Edilen Sorunlar:
1. ✅ **Response Format**: `response_format: { type: 'json_object' }` bazı modellerde desteklenmiyor
2. ✅ **Hata Yönetimi**: API hataları detaylı loglanmıyordu
3. ✅ **Response Validation**: API response yapısı kontrol edilmiyordu
4. ✅ **JSON Parse**: AI'dan gelen response JSON formatında olmayabilir

### Yapılan Düzeltmeler:
- `response_format` sadece destekleyen modeller için eklendi
- Detaylı hata loglama eklendi
- Response yapısı validasyonu eklendi
- JSON parse için fallback mekanizması eklendi
- Test endpoint'i eklendi (`POST /api/ideas/test-ai`)

## Test Senaryosu

### 1. Ortam Değişkenlerini Ayarlayın

Backend dizininde `.env` dosyası oluşturun veya mevcut dosyaya ekleyin:

```env
AI_API_URL=https://api.groq.com/openai/v1/chat/completions
AI_API_KEY=gsk-your-groq-api-key-here
AI_MODEL=llama3-70b-8192
AI_ENABLED=true
```

### 2. Backend'i Başlatın

```bash
cd backend
npm start
# veya
node server.js
```

### 3. Test Endpoint'ini Kullanın

#### Yöntem 1: cURL ile Test

```bash
curl -X POST http://localhost:5000/api/ideas/test-ai \
  -H "Content-Type: application/json"
```

#### Yöntem 2: Postman/Insomnia ile Test

- **Method**: POST
- **URL**: `http://localhost:5000/api/ideas/test-ai`
- **Headers**: `Content-Type: application/json`
- **Body**: Boş (test data otomatik kullanılır)

#### Yöntem 3: Frontend'den Test

Frontend'de IdeaFormPage'de aşağıdaki test verilerini kullanın:

```javascript
{
  founderName: "Test Girişimci",
  ideaTitle: "AI Destekli Muhasebe Platformu",
  answers: {
    problem: "Küçük işletmeler için muhasebe ve finansal yönetim süreçleri çok karmaşık ve zaman alıcı. Manuel işlemler hata riski taşıyor ve maliyetli yazılımlar küçük işletmeler için uygun değil.",
    targetCustomer: "Küçük ve orta ölçekli işletmeler (KOBİ), özellikle 5-50 çalışanı olan şirketler, serbest çalışanlar ve danışmanlar.",
    existingAlternatives: "Mevcut çözümler arasında QuickBooks, Xero, Sage gibi uluslararası platformlar var. Türkiye'de Logo, Nebim gibi yerel çözümler mevcut ancak bunlar genellikle pahalı ve karmaşık.",
    solution: "AI destekli, bulut tabanlı bir muhasebe ve finansal yönetim platformu. Otomatik fatura işleme, akıllı kategorizasyon, gerçek zamanlı raporlama ve Türk muhasebe standartlarına uyumlu bir sistem.",
    revenueModel: "Aylık abonelik modeli (SaaS). Temel plan 99 TL/ay, Pro plan 199 TL/ay, Enterprise plan özel fiyatlandırma. Ayrıca entegrasyon ve danışmanlık hizmetleri için ek gelir.",
    techStackThoughts: "Backend: Node.js + Express + MongoDB. Frontend: React. AI: OpenAI API veya benzeri LLM servisleri. Bulut: AWS veya Azure. Ölçeklenebilir mikroservis mimarisi.",
    biggestRisks: "Rekabet yoğunluğu, müşteri edinme maliyetleri, veri güvenliği ve uyumluluk gereksinimleri. Ayrıca Türk muhasebe mevzuatındaki değişikliklere hızlı adapte olma ihtiyacı."
  }
}
```

### 4. Beklenen Sonuç

Başarılı bir AI analizi için response:

```json
{
  "success": true,
  "aiAvailable": true,
  "analysisSource": "ai",
  "scores": {
    "problemValidation": 75,
    "marketMaturity": 70,
    "competition": 65,
    "differentiation": 80,
    "techFeasibility": 75,
    "riskUncertainty": 70
  },
  "leanCanvas": {
    "problem": "...",
    "solution": "...",
    "uniqueValueProp": "...",
    ...
  },
  "message": "AI analysis completed successfully!"
}
```

### 5. Hata Durumları

#### AI API Key Yoksa:
```json
{
  "error": "AI is not available",
  "message": "Please set AI_API_URL and AI_API_KEY environment variables"
}
```

#### AI Başarısız Olursa (Fallback):
```json
{
  "success": true,
  "aiAvailable": true,
  "analysisSource": "heuristic",
  "message": "AI analysis failed, used heuristic fallback"
}
```

## Debug İpuçları

1. **Backend console loglarını kontrol edin**: AI hataları detaylı loglanıyor
2. **API Key'i kontrol edin**: `AI_API_KEY` doğru mu?
3. **API URL'i kontrol edin**: `AI_API_URL` doğru endpoint mi?
4. **Model adını kontrol edin**: `AI_MODEL` desteklenen bir model mi?
5. **Network bağlantısını kontrol edin**: API'ye erişim var mı?

## Frontend'de Test

1. Ana sayfaya gidin
2. "Fikrimi analiz etmek istiyorum" kartına tıklayın
3. Formu yukarıdaki test verileri ile doldurun
4. Gönder butonuna tıklayın
5. ResultPage'de "🤖 AI Analizi" badge'ini kontrol edin

## Sorun Giderme

Eğer AI çalışmıyorsa:
- Backend console'da hata mesajlarını kontrol edin
- `AI_ENABLED=false` yaparak heuristic moduna geçin
- API key'inizin geçerli olduğundan emin olun
- Rate limit kontrolü yapın (OpenAI API limitleri)

