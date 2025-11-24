# 🚀 Incubator Idea Analyzer

Modern girişimcilik ekosistemi için **AI destekli fikir analiz platformu**. Girişimcilerin fikirlerini objektif kriterlerle değerlendiren, Lean Canvas oluşturan ve mentor perspektifinden gelişim önerileri sunan kapsamlı bir analiz aracı.

---

## ✨ Öne Çıkan Özellikler

### 🤖 **AI-Powered Analysis**
- **LLM Tabanlı Skorlama**: Groq API (Llama 3) ile 6 kategoride detaylı analiz
- **Otomatik Lean Canvas**: AI tarafından üretilen profesyonel Lean Canvas taslağı
- **Akıllı Fallback**: AI kullanılamazsa heuristic yöntemlere otomatik geçiş
- **Analiz Kaynağı Takibi**: Her analizde AI veya heuristic kullanımı işaretlenir

### 📊 **Kapsamlı Görselleştirme**
- **Radar Chart**: 6 boyutlu interaktif skor analizi
- **Bar Chart**: İlk ve son analiz karşılaştırması
- **Lean Canvas Grid**: 9 kutulu profesyonel canvas yapısı
- **Insight Kartları**: Otomatik öneri ve uyarı sistemi

### 👥 **Role-Based Experience**
- **Founder View**: Girişimci perspektifinden analiz ve sonuçlar
- **Mentor Dashboard**: Gelişim takibi, kör nokta tespiti, karşılaştırmalı analiz
- **Fake Session Management**: LocalStorage tabanlı basit rol yönetimi (login karmaşıklığı olmadan)

### 🎯 **Analiz Kategorileri**
1. **Problem Doğrulama**: Problem tanımının netliği ve gerçekçiliği
2. **Pazar Olgunluğu**: Hedef müşteri segmentinin netliği
3. **Rekabet**: Alternatiflerin farkındalığı ve rekabet analizi
4. **Farklılaşma**: Çözümün benzersiz değer önerisi
5. **Teknik Fizibilite**: Teknoloji yığını uygunluğu
6. **Risk Belirsizliği**: Risk farkındalığı ve yönetimi

---

## 🏗️ Teknoloji Stack

### Backend
- **Node.js** + **Express.js** - RESTful API
- **MongoDB** + **Mongoose** - NoSQL veritabanı
- **Groq API** (Llama 3) - AI analiz motoru
- **Axios** - HTTP client (AI API çağrıları için)
- **dotenv** - Ortam değişkenleri yönetimi

### Frontend
- **React 19** - Modern UI framework
- **React Router v7** - Client-side routing
- **Vite** - Hızlı build tool ve dev server
- **Chart.js** + **react-chartjs-2** - Veri görselleştirme
- **Axios** - API iletişimi
- **Context API** - Role-based state management

### AI & Analytics
- **Groq API** - Yüksek performanslı LLM servisi
- **Llama 3 70B** - Büyük dil modeli
- **Heuristic Fallback** - AI yedekleme sistemi

---

## 📁 Proje Yapısı

```
incubator-idea-analyzer/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB bağlantı yapılandırması
│   ├── models/
│   │   └── Idea.js                  # MongoDB şema (scores, leanCanvas, aiMentorInsights)
│   ├── routes/
│   │   └── ideas.js                 # REST API endpoints
│   ├── services/
│   │   ├── aiIdeaAnalysisService.js # AI analiz servisi (Groq API)
│   │   ├── insightService.js        # Heuristic skor hesaplama (fallback)
│   │   └── leanCanvasService.js     # Heuristic Lean Canvas (fallback)
│   ├── server.js                    # Express server + dotenv
│   ├── .env                         # Ortam değişkenleri (AI config)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── client.js            # Axios API client
    │   ├── context/
    │   │   └── RoleContext.jsx      # Role-based session management
    │   ├── layouts/
    │   │   └── DashboardLayout.jsx # Ana layout + header
    │   ├── pages/
    │   │   ├── LandingPage.jsx     # Ana sayfa (rol seçimi)
    │   │   ├── IdeaFormPage.jsx    # 7 soruluk analiz formu
    │   │   ├── ResultPage.jsx      # Sonuç sayfası (Radar + Lean Canvas)
    │   │   └── MentorDashboardPage.jsx # Mentor dashboard
    │   ├── router.jsx               # React Router yapılandırması
    │   ├── App.jsx                  # Ana uygulama
    │   └── main.jsx                  # React entry point
    └── package.json
```

---

## 🚀 Hızlı Başlangıç

### Ön Gereksinimler

- **Node.js** v18+ 
- **npm** veya **yarn**
- **MongoDB** (yerel veya cloud)
- **Groq API Key** (opsiyonel - AI için)

### 1️⃣ MongoDB Kurulumu

```bash
# Yerel MongoDB
# Windows: MongoDB servisini başlatın
# macOS/Linux: brew install mongodb-community veya apt-get install mongodb

# Veya Docker ile:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 2️⃣ Backend Kurulumu

```bash
cd backend
npm install

# .env dosyası oluşturun
cat > .env << EOF
AI_ENABLED=true
AI_API_URL=https://api.groq.com/openai/v1/chat/completions
AI_API_KEY=gsk-your-groq-api-key-here
AI_MODEL=llama3-70b-8192
EOF

# Server'ı başlatın
npm start
```

**Başarılı başlatma:**
```
Server is running on port 4000
✅ AI Analysis is ENABLED
   Model: llama3-70b-8192
```

### 3️⃣ Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:5173` üzerinde çalışacaktır.

### 4️⃣ Tarayıcıda Açın

`http://localhost:5173` adresine gidin ve uygulamayı kullanmaya başlayın!

---

## 🎮 Kullanım Senaryoları

### Senaryo 1: Girişimci - Fikir Analizi

1. **Ana Sayfa** (`/`): "Fikrimi analiz etmek istiyorum" kartına tıklayın
2. **Form Sayfası** (`/founder/idea`): 7 soruyu detaylı şekilde doldurun
3. **Sonuç Sayfası** (`/result/:id`): 
   - Genel skorunuzu görün
   - Radar chart ile detaylı analiz
   - AI tarafından oluşturulan Lean Canvas
   - Güçlü/zayıf yönler için otomatik öneriler

### Senaryo 2: Mentor - Gelişim Takibi

1. **Ana Sayfa** (`/`): "Mentor dashboard'u görmek istiyorum" kartına tıklayın
2. **Mentor Dashboard** (`/mentor`):
   - Tüm fikirlerin genel özeti
   - İlk vs son analiz karşılaştırması (bar chart)
   - Kategori bazında detaylı skor farkları
   - Kör nokta tespiti (skor <40 alanlar)
   - Tüm fikirlerin listesi (tıklanabilir)

### Senaryo 3: AI Analiz Testi

```bash
# Test endpoint'i ile AI'yı test edin
curl -X POST http://localhost:4000/api/ideas/test-ai

# Veya AI config kontrolü
cd backend
node check-ai-config.js
```

---

## 🔌 API Endpoints

### `POST /api/ideas`
Yeni bir fikir analizi oluşturur. AI veya heuristic yöntemle skorlar ve Lean Canvas üretir.

**Request:**
```json
{
  "founderName": "Ahmet Yılmaz",
  "ideaTitle": "AI Destekli Muhasebe Platformu",
  "answers": {
    "problem": "Küçük işletmeler için muhasebe süreçleri karmaşık...",
    "targetCustomer": "KOBİ'ler, 5-50 çalışanlı şirketler...",
    "existingAlternatives": "QuickBooks, Xero, Logo...",
    "solution": "AI destekli bulut tabanlı platform...",
    "revenueModel": "Aylık abonelik (SaaS)...",
    "techStackThoughts": "Node.js, React, MongoDB...",
    "biggestRisks": "Rekabet, müşteri edinme maliyetleri..."
  }
}
```

**Response:**
```json
{
  "_id": "...",
  "founderName": "Ahmet Yılmaz",
  "ideaTitle": "AI Destekli Muhasebe Platformu",
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
  "analysisSource": "ai"  // veya "heuristic"
}
```

### `GET /api/ideas`
Tüm fikirleri oluşturulma tarihine göre listeler (mentor dashboard için).

### `GET /api/ideas/:id`
Belirli bir fikrin detaylarını getirir (result page için).

### `POST /api/ideas/test-ai`
AI yapılandırmasını test eder (test verileri ile).

### `GET /health`
Backend sağlık kontrolü ve AI durumu.

---

## 🤖 AI Konfigürasyonu

### Groq API Kurulumu

1. **Groq API Key Alın**: https://console.groq.com/keys
2. **`.env` Dosyasını Düzenleyin**:
   ```env
   AI_ENABLED=true
   AI_API_URL=https://api.groq.com/openai/v1/chat/completions
   AI_API_KEY=gsk-your-actual-groq-api-key
   AI_MODEL=llama3-70b-8192
   ```
3. **Server'ı Yeniden Başlatın**

### AI vs Heuristic

- **AI Aktifse**: Groq API ile skorlar ve Lean Canvas üretilir → `analysisSource: "ai"`
- **AI Yoksa/Devre Dışıysa**: Heuristic fonksiyonlar kullanılır → `analysisSource: "heuristic"`
- **Frontend'de**: Her analizde kaynak badge'i gösterilir (🤖 AI Analizi / 📊 Heuristik Analiz)

### Desteklenen Modeller

- `llama3-70b-8192` (varsayılan - Groq)
- `llama3-8b-8192` (Groq)
- `gpt-4o-mini` (OpenAI - uyumlu)
- `gpt-4o` (OpenAI - uyumlu)

---

## 🎨 Özellik Detayları

### Role-Based Session Management

- **LocalStorage Tabanlı**: Login karmaşıklığı olmadan basit rol yönetimi
- **RoleContext**: React Context API ile global state
- **Otomatik Persistence**: Sayfa yenilense bile rol korunur
- **Rol Seçimi**: Landing page'de founder/mentor seçimi

### AI Analysis Pipeline

```
User Input (Answers)
    ↓
AI Service (Groq API)
    ↓
[Success] → AI Scores + AI Lean Canvas
    ↓
[Failure] → Fallback to Heuristic
    ↓
MongoDB Save (with analysisSource flag)
    ↓
Frontend Display (with source badge)
```

### Mentor Dashboard Analytics

- **Gelişim Metrikleri**: İlk vs son analiz karşılaştırması
- **Kör Nokta Tespiti**: Skor <40 olan kategoriler
- **Trend Analizi**: Bar chart ile görsel karşılaştırma
- **Fikir Listesi**: Tüm analizlerin özet görünümü

---

## 🧪 Test Senaryoları

### End-to-End Test

1. **Form → Result → Dashboard Akışı**
   ```bash
   # 1. Ana sayfada "Fikrimi analiz etmek istiyorum" tıkla
   # 2. Formu doldur ve gönder
   # 3. Result page'de AI badge'ini kontrol et
   # 4. Mentor dashboard'a git ve gelişimi gör
   ```

2. **AI Test**
   ```bash
   curl -X POST http://localhost:4000/api/ideas/test-ai
   ```

3. **Role Switching Test**
   - Landing page'de founder seç → form görün
   - Ana sayfaya dön → mentor seç → dashboard görün
   - Sayfayı yenile → rol korunmalı

---

## 🐛 Sorun Giderme

### AI Çalışmıyor

1. **`.env` dosyasını kontrol edin**:
   ```bash
   cd backend
   node check-ai-config.js
   ```

2. **Backend console loglarını inceleyin**:
   - `AI Availability Check:` loglarına bakın
   - Hata mesajlarını kontrol edin

3. **API Key'i doğrulayın**:
   - Groq console'dan key'inizin aktif olduğundan emin olun
   - Key'in `gsk-` ile başladığından emin olun

### MongoDB Bağlantı Hatası

```bash
# MongoDB'nin çalıştığını kontrol edin
# Windows: Services → MongoDB
# Linux/Mac: sudo systemctl status mongod

# Veya Docker:
docker ps | grep mongo
```

### Port Çakışması

- **Backend**: Port 4000 (`.env` ile değiştirilebilir)
- **Frontend**: Port 5173 (Vite varsayılan)

---

## 📊 Teknik Kararlar ve Mimari

### Neden Groq API?

- **Yüksek Performans**: Düşük latency, hızlı yanıt süreleri
- **Maliyet Etkin**: OpenAI'ye göre daha uygun fiyatlandırma
- **OpenAI Uyumlu**: Aynı API formatı, kolay geçiş imkanı
- **Llama 3**: Açık kaynak, güçlü model

### Fallback Mekanizması

- **Güvenilirlik**: AI başarısız olsa bile sistem çalışmaya devam eder
- **Şeffaflık**: Her analizde kullanılan yöntem işaretlenir
- **Esneklik**: Ortam değişkenleri ile kolay kontrol

### Role Management Yaklaşımı

- **Basitlik**: Login sistemi karmaşıklığı olmadan UX gösterimi
- **LocalStorage**: Sayfa yenilemelerinde rol korunur
- **Context API**: React best practices ile state management

---

## 🎯 Mülakat İçin Öne Çıkanlar

### Teknik Yetenekler

✅ **Full-Stack Development**: Node.js + React  
✅ **AI Integration**: LLM API entegrasyonu ve prompt engineering  
✅ **Database Design**: MongoDB schema tasarımı  
✅ **State Management**: Context API ile global state  
✅ **Data Visualization**: Chart.js ile interaktif grafikler  
✅ **Error Handling**: Fallback mekanizmaları ve hata yönetimi  
✅ **API Design**: RESTful endpoint tasarımı  

### Problem Çözme

✅ **AI Fallback**: Sistemin sürekli çalışması için yedekleme  
✅ **User Experience**: Role-based navigation ve session management  
✅ **Performance**: Async/await, Promise.all ile optimize edilmiş API çağrıları  
✅ **Code Quality**: Modüler servis yapısı, temiz kod prensipleri  

---

## 📝 Lisans

Bu proje eğitim ve portföy amaçlı geliştirilmiştir.

---

## 👨‍💻 Geliştirici Notları

Bu proje, modern web teknolojileri ve AI entegrasyonu ile girişimcilik ekosistemine değer katmayı hedeflemektedir. Kod yapısı modüler, bakımı kolay ve genişletilebilir şekilde tasarlanmıştır.

**Özellikle Vurgulanan:**
- AI-first yaklaşım (fallback ile güvenilirlik)
- Role-based UX (login karmaşıklığı olmadan)
- Görselleştirme odaklı veri sunumu
- Mentor perspektifinden analitik yaklaşım

---

**🚀 Demo için**: Backend ve frontend'i başlatın, formu doldurun ve AI analizini deneyin!
