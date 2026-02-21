const Blog = require('../models/Blog');

// 1. TÜM BLOGLARI GETİR (Filtreleme Destekli)
const getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }

    const blogs = await Blog.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 });
      
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Veriler çekilemedi.", error: error.message });
  }
};

// 2. YENİ BLOG OLUŞTUR
const createBlog = async (req, res) => {
  try {
    const { title, content, tags, image, category } = req.body;

    if (!category) {
      return res.status(400).json({ message: "Kategori seçmek zorunludur reisim!" });
    }

    const newBlog = new Blog({
      title,
      content,
      author: req.user.id,
      tags: tags || [],
      image,
      category
    });

    const savedBlog = await newBlog.save();
    res.status(201).json({ message: "Başarıyla yayınlandı!", blog: savedBlog });
    
  } catch (error) {
    res.status(500).json({ message: "Hata oluştu.", error: error.message });
  }
};

// 3. TEK BİR BLOG GETİR
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
    if (!blog) return res.status(404).json({ message: "Bulunamadı." });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Hata.", error: error.message });
  }
};

// 4. BLOG SİL (YENİ EKLENDİ)
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    
    // Önce bloğu bulalım
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Silinecek yazı bulunamadı usta!" });
    }

    // GÜVENLİK KONTROLÜ: Sadece yazıyı yazan kişi silebilir
    // Eğer admin yetkin varsa bu kısmı genişletebilirsin
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bu yazıyı silmeye yetkin yok reisim, başkasının malına dokunma!" });
    }

    await Blog.findByIdAndDelete(blogId);
    console.log(`BAŞARILI: ${blogId} ID'li blog silindi.`);
    res.status(200).json({ message: "Yazı başarıyla tarihin tozlu raflarına kaldırıldı." });

  } catch (error) {
    console.error("SİLME HATASI:", error);
    res.status(500).json({ message: "Silme işlemi başarısız.", error: error.message });
  }
};

module.exports = { getAllBlogs, createBlog, getSingleBlog, deleteBlog };