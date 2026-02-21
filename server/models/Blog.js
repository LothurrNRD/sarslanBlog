const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: { type: [String], default: [] },
  image: { type: String, default: "" },
  
  // YENİ: Kategori Alanı (Zorunlu ve sadece bu 4 değerden biri olabilir)
  category: { 
    type: String, 
    required: true, 
    enum: ['elektrik', 'elektronik', 'tarih', 'proje'] 
  },

  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number, min: 1, max: 5 }
    }
  ],
  averageRating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);