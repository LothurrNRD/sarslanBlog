import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Container, 
  Box, 
  CssBaseline, 
  GlobalStyles,
  Typography 
} from '@mui/material';

// İkonlar
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X'; // Twitter/X İkonu

// Sayfalar
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreatePost from './pages/CreatePost.jsx';
import BlogDetail from './pages/BlogDetail.jsx';

// Renk Tanımı (Antrasit Füme)
const ANTRASIT = '#37474F';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/login";
  };

  const categories = [
    { name: 'ELEKTRİK', slug: 'elektrik' },
    { name: 'ELEKTRONİK', slug: 'elektronik' },
    { name: 'TARİH', slug: 'tarih' },
    { name: 'PROJE', slug: 'proje' }
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: '#FFFFFF', 
        boxShadow: '0 5px 20px rgba(0,0,0,0.05)', 
        borderBottom: '0px solid #EDEDED' 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '80px !important' }}>
          
          {/* 1. LOGO */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/logo.png" 
              alt="SarslanBlog Logo" 
              style={{ height: '75px', objectFit: 'contain' }} 
            />
          </Box>

          {/* 2. KATEGORİLER */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {categories.map((cat) => (
              <Button 
                key={cat.slug} 
                component={Link} 
                to={`/?category=${cat.slug}`}
                sx={{ 
                  color: ANTRASIT, 
                  fontWeight: 800, 
                  fontSize: '0.9rem',
                  '&:hover': { color: '#000', bgcolor: 'transparent', transform: 'translateY(-2px)' } 
                }}
              >
                {cat.name}
              </Button>
            ))}
          </Box>

          {/* 3. KULLANICI İŞLEMLERİ */}
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            {token ? (
              <>
                <Button 
                  component={Link} 
                  to="/create-post" 
                  sx={{ 
                    color: ANTRASIT, 
                    fontWeight: 900, 
                    border: `2px solid ${ANTRASIT}`, 
                    borderRadius: '8px', 
                    px: 2,
                    '&:hover': { bgcolor: ANTRASIT, color: '#fff' }
                  }}
                >
                  YAZI YAZ ⚡
                </Button>
                <Button onClick={handleLogout} sx={{ color: '#d32f2f', fontWeight: 900 }}>ÇIKIŞ</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" sx={{ color: ANTRASIT, fontWeight: 800 }}>GİRİŞ</Button>
                <Button 
                  component={Link} 
                  to="/register" 
                  variant="contained"
                  sx={{ bgcolor: ANTRASIT, color: '#fff', fontWeight: 900, borderRadius: '8px', '&:hover': { bgcolor: '#000' } }}
                >
                  KAYIT OL
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const Footer = () => (
  <Box sx={{ py: 4, bgcolor: '#ffffff', borderTop: '1px solid #EDEDED', mt: 'auto' }}>
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        {/* SOL TARAF */}
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="body1" sx={{ color: "#000000", fontWeight: 900, letterSpacing: 2 }}>
            Şemsettin Arslan
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgb(0, 0, 0)', fontWeight: 600 }}>
            © 2026 | Elektrik, Elektronik ve Tarih Portalı
          </Typography>
        </Box>

        {/* SAĞ TARAF */}
        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Typography variant="body1" sx={{ color: "#000000", fontWeight: 900, mb: 1 }}>İLETİŞİM</Typography>
          <Typography variant="caption" component="div" sx={{ color: 'rgba(0,0,0,0.7)', fontWeight: 700, mb: 1 }}>sarslan25@gmail.com</Typography>
          
          {/* Instagram Linki */}
          <Box 
            component="a" 
            href="https://www.instagram.com/sarslan50" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-end' }, textDecoration: 'none', gap: 1, color: '#000', mb: 1, '&:hover': { opacity: 0.7 } }}
          >
            <InstagramIcon sx={{ fontSize: 20 }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>INSTAGRAM</Typography>
          </Box>

          {/* Twitter (X) Linki */}
          <Box 
            component="a" 
            href="https://x.com/sarslan50" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-end' }, textDecoration: 'none', gap: 1, color: '#000', '&:hover': { opacity: 0.7 } }}
          >
            <XIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>TWITTER / X</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#fdfdfd', margin: 0, padding: 0 }, a: { textDecoration: 'none' } }} />
      <Navbar />
      <Box component="main" sx={{ minHeight: '100vh', pt: '100px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Container maxWidth="sm" sx={{ py: 10 }}><Login /></Container>} />
          <Route path="/register" element={<Container maxWidth="sm" sx={{ py: 10 }}><Register /></Container>} />
          <Route path="/create-post" element={<Container maxWidth="md" sx={{ py: 5 }}><CreatePost /></Container>} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}

export default App;