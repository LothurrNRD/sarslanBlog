const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Login için lazım olacak

// --- KULLANICI KAYIT İŞLEMİ (REGISTER) ---
const register = async (req, res) => {
  // 1. İstek geldiğinde terminale yazdıralım ki bilelim ulaştığını
  console.log("--- YENİ KAYIT İSTEĞİ GELDİ ---");
  console.log("Gelen Veriler:", req.body);

  try {
    const { username, email, password } = req.body;

    // 2. Boş alan kontrolü
    if (!username || !email || !password) {
      console.log("HATA: Eksik bilgi gönderildi.");
      return res.status(400).json({ message: "Tüm alanları doldurmak zorunludur reisim." });
    }

    // 3. Email veya Kullanıcı adı kullanımda mı kontrolü
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log("HATA: Bu email zaten veritabanında var.");
      return res.status(400).json({ message: "Bu e-posta adresi zaten kullanımda." });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.log("HATA: Bu kullanıcı adı zaten alınmış.");
      return res.status(400).json({ message: "Bu kullanıcı adı alınmış usta, başkasını dene." });
    }

    // 4. Şifreyi Hash'leme (Kriptolama)
    console.log("Şifre hashleniyor...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Yeni kullanıcı objesini oluşturma
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // 6. Veritabanına kaydetme işlemi
    console.log("MongoDB'ye kaydediliyor...");
    const savedUser = await newUser.save();
    
    console.log("BAŞARILI: Kullanıcı kaydedildi! ID:", savedUser._id);

    // 7. Başarılı cevabı frontend'e dönme
    res.status(201).json({ 
      message: "Kayıt işlemi başarıyla tamamlandı!", 
      user: { 
        id: savedUser._id, 
        username: savedUser.username, 
        email: savedUser.email 
      } 
    });

  } catch (error) {
    console.error("SUNUCU HATASI YAKALANDI:", error);
    res.status(500).json({ message: "Kayıt olurken sunucuda bir hata oluştu.", error: error.message });
  }
};


// --- KULLANICI GİRİŞ İŞLEMİ (LOGIN) --- 
// (Bunu da ekliyorum ki eski kodun bozulmasın, login de tıkır tıkır çalışsın)
const login = async (req, res) => {
  console.log("--- GİRİŞ İSTEĞİ GELDİ ---", req.body.email);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Bu maile kayıtlı bir kullanıcı bulunamadı reisim." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Şifre hatalı, tekrar dene usta." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } 
    );

    console.log("Giriş başarılı, token gönderiliyor...");
    res.status(200).json({ 
      message: "Giriş başarılı!", 
      token, 
      user: { id: user._id, username: user.username, email: user.email } 
    });

  } catch (error) {
    console.error("Login Hatası:", error);
    res.status(500).json({ message: "Giriş yaparken sunucu hatası oluştu", error: error.message });
  }
};

module.exports = { register, login };