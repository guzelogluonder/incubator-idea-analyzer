# Proje Tamamlama Planı (Pazar Sabahına Kadar)

Aşağıdaki plan, incubator-idea-analyzer projesini **Pazar sabahına
kadar** tamamlaman için optimize edilmiştir. Her gün yapılacak işler
net, ölçülebilir ve teslim odaklıdır.

------------------------------------------------------------------------

## 🎯 GENEL HEDEF -- Pazar Sabahına Kadar Tamamlanacak Modüller

1.  **Idea Form (frontend)**
2.  **POST → Backend → Mongo kayıt akışı**
3.  **Sonuç Sayfası (Radar Chart + Lean Canvas)**
4.  **Mentor Dashboard (fark analizi + kör noktalar + özet)**
5.  **UI temizlik, README, demo akışı**

------------------------------------------------------------------------

# 🗓️ Günlük Plan

## ✅ Perşembe -- Frontend Setup + Routing + API Client

### Hedef:

-   React & Vite kurulumu
-   Sayfa yapısının oluşturulması
-   Backend'e bağlanan axios client

### Yapılacaklar:

-   `frontend` klasörü oluştur ve Vite ile setup
-   React Router kur → `/`, `/result/:id`, `/mentor`
-   axios instance → `api/client.js`
-   `GET /ideas` ile bağlantı testi

### Çıktı:

Frontend iskeleti + backend bağlantısı.

------------------------------------------------------------------------

## ✅ Cuma -- Idea Form (POST /ideas)

### Hedef:

Kullanıcının tüm cevapları girebildiği form.

### Yapılacaklar:

-   7 soruluk form (problem, customer, alternatives, solution vs.)
-   Submit → `POST /ideas`
-   `navigate("/result/" + id)` akışı
-   Form UI düzeni

### Çıktı:

Ana analiz akışının %50'si hazır.

------------------------------------------------------------------------

## ✅ Cumartesi Sabah -- Result Page (Radar Chart + Lean Canvas)

### Hedef:

Backend'in döndürdüğü skorları görselleştirmek.

### Yapılacaklar:

-   `GET /ideas/:id`
-   Radar chart component
-   Lean Canvas grid
-   Ek olarak insight kartları

### Çıktı:

Sonuç ekranı tamamen hazır.

------------------------------------------------------------------------

## ✅ Cumartesi Akşam -- Mentor Dashboard

### Hedef:

Girişimcinin fikir gelişimini göstermek.

### Yapılacaklar:

-   `GET /ideas` → tüm kayıtları çek
-   İlk ve son skor farkını hesapla
-   Kör noktalar listesi (\<40 alanlar)
-   Otomatik farkındalık özeti
-   Basit grafik/kart UI

### Çıktı:

Mentor dashboard tamamlanır.

------------------------------------------------------------------------

## ✅ Pazar Sabahı -- Final Cleanup + README + Demo

### Hedef:

Projenin teslim edilebilir, sunulabilir hale gelmesi.

### Yapılacaklar:

-   UI temizlik (spacing, typography)
-   Loading -- empty-state kontrolü
-   README yaz:
    -   Kurulum adımları
    -   Proje yapısı (backend + frontend)
    -   Ekran görüntüleri (opsiyonel)
-   Baştan sona test:
    -   Form → Result → Mentor Dashboard

### Çıktı:

Tamamlanmış, profesyonel bir demo ve temiz GitHub reposu.

------------------------------------------------------------------------

# 🎯 Sonuç

Bu planı izlediğinde: - Backend %100 aktif - Frontend eksiksiz - Radar
chart + Lean Canvas çalışır - Mentor dashboard analitik sunar - Repo
temiz, README profesyonel olur

Pazartesi mülakatı için tamamen hazır olursun 🚀
