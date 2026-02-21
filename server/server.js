const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Rotaları içe aktarıyoruz
const authRoutes = require('./routes/authRoutes'); 
const blogRoutes = require('./routes/blogRoutes'); // Blog rotalarını ekledik

// .env dosyasını okuması için
dotenv.config();

const app = express();

// Middleware'ler
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
  origin: 'https://sarslanblog-1.onrender.com/' 
}));

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı reisim!'))
  .catch((err) => console.log('Veritabanı bağlantı hatası:', err));

// Rotaları API adresleriyle kullanıma açıyoruz
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes); // Blog API uçlarını dışarı açtık

// Ana sayfa test rotası
app.get('/', (req, res) => {
  res.send('sarslanBlog API sorunsuz çalışıyor!');
});

// Sunucuyu Dinleme
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda ayaklandı.`);
});