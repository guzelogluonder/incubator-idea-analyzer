# Incubator Idea Analyzer

Modern girişimcilik platformu için fikir analizi modülü, Lean Canvas builder ve mentor dashboard içeren mini uygulama.

## 🎯 Özellikler

- **Fikir Analizi Formu**: 7 soruluk detaylı form ile girişim fikirlerini analiz etme
- **Otomatik Skorlama**: 6 farklı kategoride (Problem Doğrulama, Pazar Olgunluğu, Rekabet, Farklılaşma, Teknik Fizibilite, Risk Belirsizliği) otomatik skor hesaplama
- **Radar Chart Görselleştirme**: Skorların interaktif radar chart ile görselleştirilmesi
- **Lean Canvas**: Otomatik oluşturulan 9 kutulu Lean Canvas yapısı
- **Mentor Dashboard**: Fikir gelişimini takip etme, kör nokta tespiti ve karşılaştırmalı analiz
- **Insight Kartları**: Düşük ve yüksek skorlar için otomatik öneriler

## 🏗️ Proje Yapısı

```
incubator-idea-analyzer/
├── backend/                 # Node.js + Express backend
│   ├── config/
│   │   └── db.js           # MongoDB bağlantı yapılandırması
│   ├── models/
│   │   └── Idea.js         # Idea model şeması
│   ├── routes/
│   │   └── ideas.js        # API route'ları
│   ├── services/
│   │   ├── insightService.js      # Skor hesaplama servisi
│   │   └── leanCanvasService.js   # Lean Canvas oluşturma servisi
│   ├── server.js           # Express server
│   └── package.json
│
└── frontend/               # React + Vite frontend
    ├── src/
    │   ├── api/
    │   │   └── client.js   # Axios API client
    │   ├── pages/
    │   │   ├── IdeaFormPage.jsx        # Ana form sayfası
    │   │   ├── ResultPage.jsx          # Sonuç sayfası (Radar Chart + Lean Canvas)
    │   │   └── MentorDashboardPage.jsx # Mentor dashboard
    │   ├── App.jsx         # Ana uygulama + routing
    │   ├── main.jsx        # React entry point
    │   └── index.css       # Global stiller
    └── package.json
```

## 🚀 Kurulum

### Ön Gereksinimler

- **Node.js** (v14 veya üzeri)
- **npm** veya **yarn**
- **MongoDB** (v4 veya üzeri) - Veritabanı sunucusu

### Adım 1: MongoDB'yi Başlatın

MongoDB'nin çalıştığından emin olun:

```bash
# Windows'ta MongoDB servisini başlatın
# veya Docker kullanarak:
docker run -d -p 27017:27017 --name mongodb mongo
```

### Adım 2: Backend Kurulumu

```bash
cd backend
npm install
npm start
```

Backend `http://localhost:4000` üzerinde çalışacaktır.

**Başarılı başlatma çıktısı:**
```
Server is running on port 4000
MongoDB Connected: localhost
```

### Adım 3: Frontend Kurulumu

Yeni bir terminal penceresi açın:

```bash
cd frontend
npm install
npm run dev
```

Frontend genellikle `http://localhost:5173` üzerinde çalışacaktır.

**Başarılı başlatma çıktısı:**
```
  VITE vX.X.X  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### Adım 4: Tarayıcıda Açın

Tarayıcınızda `http://localhost:5173` adresine gidin.

## 📖 Kullanım

### 1. Fikir Analizi Oluşturma

1. Ana sayfada (`/`) formu doldurun:
   - Kurucu Adı
   - Fikir Başlığı
   - 7 soru (Problem, Hedef Müşteri, Mevcut Alternatifler, Çözüm, Gelir Modeli, Teknoloji Yığını, En Büyük Riskler)
2. "Fikri Analiz Et" butonuna tıklayın
3. Otomatik olarak sonuç sayfasına yönlendirilirsiniz

### 2. Sonuç Sayfası (`/result/:id`)

Sonuç sayfasında görebilecekleriniz:
- **Genel Skor**: 0-100 arası ortalama skor
- **Radar Chart**: 6 kategoride detaylı skor görselleştirmesi
- **Insight Kartları**: Düşük/yüksek skorlar için otomatik öneriler
- **Lean Canvas**: 9 kutulu otomatik oluşturulan Lean Canvas grid'i

### 3. Mentor Dashboard (`/mentor`)

Mentor dashboard'da:
- **Genel Özet**: Toplam analiz sayısı, ilk/son skorlar, gelişim puanı
- **Skor Karşılaştırması**: İlk ve son analiz arasındaki farkları gösteren bar chart
- **Detaylı Skor Farkları**: Kategori bazında fark tablosu
- **Kör Noktalar**: Skor <40 olan alanların listesi
- **Tüm Fikirler**: Tüm analiz edilmiş fikirlerin listesi (tıklanabilir)

## 🔧 Teknolojiler

### Backend
- **Node.js** + **Express.js**: RESTful API
- **MongoDB** + **Mongoose**: Veritabanı ve ODM
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 19**: UI framework
- **React Router**: Sayfa yönlendirme
- **Vite**: Build tool ve dev server
- **Chart.js** + **react-chartjs-2**: Grafik görselleştirme
- **Axios**: HTTP client

## 📡 API Endpoints

### `GET /api/ideas`
Tüm fikirleri listeler (oluşturulma tarihine göre sıralı).

**Yanıt:**
```json
[
  {
    "_id": "...",
    "founderName": "...",
    "ideaTitle": "...",
    "scores": { ... },
    "leanCanvas": { ... },
    "createdAt": "..."
  }
]
```

### `POST /api/ideas`
Yeni bir fikir analizi oluşturur.

**İstek:**
```json
{
  "founderName": "John Doe",
  "ideaTitle": "My Startup Idea",
  "answers": {
    "problem": "...",
    "targetCustomer": "...",
    "existingAlternatives": "...",
    "solution": "...",
    "revenueModel": "...",
    "techStackThoughts": "...",
    "biggestRisks": "..."
  }
}
```

**Yanıt:**
```json
{
  "_id": "...",
  "founderName": "John Doe",
  "ideaTitle": "My Startup Idea",
  "scores": {
    "problemValidation": 75.5,
    "marketMaturity": 60.0,
    ...
  },
  "leanCanvas": { ... }
}
```

### `GET /api/ideas/:id`
Belirli bir fikri ID ile getirir.

### `GET /health`
Backend sağlık kontrolü.

## 🧪 Test Senaryoları

### End-to-End Test Akışı

1. **Form → Result → Mentor Dashboard**
   - Ana sayfada formu doldurun
   - Sonuç sayfasında radar chart ve Lean Canvas'ı kontrol edin
   - Mentor dashboard'da gelişimi görüntüleyin

2. **Çoklu Fikir Analizi**
   - Birden fazla fikir oluşturun
   - Mentor dashboard'da ilk ve son analiz karşılaştırmasını kontrol edin
   - Kör noktaların doğru tespit edildiğini doğrulayın

3. **API Testleri**
   ```bash
   # Health check
   curl http://localhost:4000/health
   
   # Tüm fikirleri listele
   curl http://localhost:4000/api/ideas
   
   # Yeni fikir oluştur
   curl -X POST http://localhost:4000/api/ideas \
     -H "Content-Type: application/json" \
     -d '{"founderName":"Test","ideaTitle":"Test","answers":{...}}'
   ```

## 🐛 Sorun Giderme

### Backend bağlantı hatası
- MongoDB'nin çalıştığından emin olun (`localhost:27017`)
- Backend loglarını kontrol edin

### Frontend'den backend'e bağlanamıyor
- Backend'in `http://localhost:4000` üzerinde çalıştığını doğrulayın
- CORS ayarlarını kontrol edin (`backend/server.js`)

### Port çakışması
- Backend: Port 4000
- Frontend: Port 5173 (Vite varsayılan)
- Portlar meşgulse, `.env` dosyası ile değiştirebilirsiniz

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 👨‍💻 Geliştirici

Incubator Idea Analyzer - Girişimcilik Platformu

---

**Not**: Bu proje, girişimcilerin fikirlerini analiz etmek ve gelişimlerini takip etmek için tasarlanmıştır. Skorlar otomatik hesaplanır ve yalnızca rehberlik amaçlıdır.
