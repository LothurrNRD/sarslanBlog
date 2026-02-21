const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Frontend token'ı genelde "Bearer <token>" formatında gönderir
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Erişim reddedildi. Geçerli bir token bulunamadı reisim." });
  }

  const token = authHeader.split(' ')[1]; // "Bearer" kelimesini atıp sadece token'ı alıyoruz

  try {
    // Token'ı gizli anahtarımızla çözüyoruz
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Çözülen token içindeki kullanıcı bilgilerini (id ve role) request içine ekliyoruz
    req.user = decoded; 
    
    // Her şey yolundaysa bir sonraki işleme (controller'a) geçiş izni veriyoruz
    next(); 
  } catch (error) {
    res.status(403).json({ message: "Geçersiz veya süresi dolmuş token usta." });
  }
};

module.exports = verifyToken;