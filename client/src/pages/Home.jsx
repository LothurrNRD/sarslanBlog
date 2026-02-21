import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Typography, Card, CardContent, CardMedia, Chip, 
  Box, CircularProgress, Container, CardActionArea, Divider 
} from '@mui/material';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  // HTML etiketlerini temizleyen ve görselleri yakalayan fonksiyon
  const renderPreview = (content) => {
    if (!content) return "";
    // 1. <img> etiketlerini bul ve istediğin yazıya çevir
    let processed = content.replace(/<img[^>]*>/gi, "[BURADA GÖRSEL MEVCUT] ");
    // 2. Geri kalan tüm HTML etiketlerini (<p>, <b> vs.) sil
    processed = processed.replace(/<[^>]*>?/gm, '');
    // 3. HTML boşluk karakterlerini (&nbsp;) gerçek boşluğa çevir
    processed = processed.replace(/&nbsp;/g, ' ');
    return processed;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const url = categoryFilter 
          ? `https://sarslanblog-1.onrender.com/api/blogs?category=${categoryFilter}` 
          : 'https://sarslanblog-1.onrender.com/api/blogs';
        const response = await axios.get(url);
        setBlogs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [categoryFilter]);

  if (loading) return <Box sx={{ textAlign: 'center', py: 20 }}><CircularProgress color="inherit" /></Box>;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#fdfdfd' }}>
      
      {/* --- BANNER ALANI --- */}
      <Box 
        sx={{ 
          bgcolor: '#000', 
          color: '#fff', 
          py: 10,
          textAlign: 'center', 
          backgroundImage: `url('/background_header.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 900, textShadow: '4px 4px 20px rgba(0,0,0,1)' }}>
            {categoryFilter ? categoryFilter.toLocaleUpperCase('tr-TR') : 'ŞEMSETTİN ARSLAN'}
          </Typography>
          <Typography sx={{ opacity: 1, letterSpacing: 3, mt: 1, fontWeight: 700, textShadow: '2px 2px 10px rgba(0,0,0,1)' }}>
            {categoryFilter ? `KATEGORİSİNDEKİ BLOG YAZILARI` : 'ELEKTRİK • ELEKTRONİK • PROJE • TARİH'}
          </Typography>
        </Container>
      </Box>

      {/* --- ANA GÖVDE --- */}
      <Container maxWidth="xl" sx={{ mt: 6, mb: 10 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 4,
          alignItems: 'flex-start'
        }}>
          
          {/* SOL TARAF: ANA BLOGLAR (%75) */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 75%' }, width: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'flex-start' }}>
              {blogs.map((blog) => (
                <Card key={blog._id} sx={{ 
                  width: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' }, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  borderRadius: 3, 
                  border: '1px solid #eee', 
                  boxShadow: 'none',
                  transition: '0.3s', 
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)' } 
                }}>
                  <CardActionArea component={Link} to={`/blog/${blog._id}`} sx={{ flexGrow: 1 }}>
                    {blog.image && <CardMedia component="img" height="200" image={blog.image} sx={{ objectFit: 'cover' }} />}
                    <CardContent sx={{ p: 2.5 }}>
                      <Chip label={blog.category?.toLocaleUpperCase('tr-TR')} size="small" sx={{ mb: 1.5, bgcolor: '#000', color: '#fff', fontWeight: 800, fontSize: '0.65rem' }} />
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, height: '50px', overflow: 'hidden', lineHeight: 1.2 }}>
                        {blog.title}
                      </Typography>
                      {/* BURADA DÜZENLEME YAPILDI: renderPreview fonksiyonu kullanıldı */}
                      <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '60px' }}>
                        {renderPreview(blog.content)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>

          {/* SAĞ TARAF: SIDEBAR (%25) */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 25%' }, width: '100%', position: 'sticky', top: '100px' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3, borderLeft: '5px solid #409fbc', pl: 2 }}>
              SON BLOG YAZILARI
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {blogs.slice(0, 3).map((lastBlog) => (
                <Box key={lastBlog._id}>
                  <Box 
                    component={Link} 
                    to={`/blog/${lastBlog._id}`} 
                    sx={{ display: 'flex', gap: 2, textDecoration: 'none', color: 'inherit', '&:hover': { '& .st': { color: '#409fbc' } } }}
                  >
                    {lastBlog.image && (
                      <CardMedia 
                        component="img" 
                        sx={{ width: 65, height: 65, borderRadius: 2, objectFit: 'cover' }} 
                        image={lastBlog.image} 
                      />
                    )}
                    <Box>
                      <Typography className="st" variant="body2" sx={{ fontWeight: 800, lineHeight: 1.3, transition: '0.3s' }}>
                        {lastBlog.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(lastBlog.createdAt).toLocaleDateString('tr-TR')}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default Home;