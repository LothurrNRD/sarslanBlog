import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Paper, Divider, Chip, CircularProgress, Button, Container } from '@mui/material';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://sarslanblog.onrender.com/api/blogs/${id}`).then(res => {
      setBlog(res.data);
      setLoading(false);
    });
  }, [id]);

  // --- SİLME FONKSİYONU ---
  const handleDelete = async () => {
    if (window.confirm("Bu yazıyı silmek istediğine emin misin reisim?")) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`https://sarslanblog.onrender.com/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Yazı başarıyla silindi!");
        navigate('/'); // Silindikten sonra ana sayfaya yönlendir
      } catch (error) {
        console.error("Silme hatası:", error);
        alert(error.response?.data?.message || "Silme işlemi sırasında bir hata oluştu.");
      }
    }
  };

  if (loading) return <Box sx={{ textAlign: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md" sx={{ py: 5, mb: 10 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 4, color: '#000', fontWeight: 'bold' }}>GERİ DÖN</Button>
      <Paper sx={{ p: { xs: 3, md: 6 }, borderRadius: 6, border: '1px solid #eef2f6' }} elevation={0}>
        <Chip label={blog.category?.toUpperCase()} sx={{ mb: 2, bgcolor: '#ffd600', color: '#000', fontWeight: 900 }} />
        <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, wordBreak: 'break-word' }}>{blog.title}</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>Yazar: {blog.author?.username} | {new Date(blog.createdAt).toLocaleDateString('tr-TR')}</Typography>
        {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', borderRadius: '16px', maxHeight: '500px', objectFit: 'contain', marginBottom: '30px' }} />}
        <Divider sx={{ mb: 4 }} />
        
        {/* İÇERİK KISMI */}
        <Box 
          sx={{ 
            lineHeight: 1.8, 
            fontSize: '1.2rem', 
            wordBreak: 'break-word',
            '& img': { 
              maxWidth: '100%', 
              height: 'auto', 
              borderRadius: '8px', 
              display: 'block', 
              margin: '20px 0' 
            },
            '& p': { mb: 2 } 
          }} 
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />

        {/* --- SİLME BUTONU --- */}
        <Divider sx={{ my: 4 }} />
        <Box sx={{ textAlign: 'right' }}>
          <Button 
            onClick={handleDelete} 
            variant="outlined" 
            color="error" 
            size="small"
            sx={{ fontWeight: 'bold', borderRadius: '8px' }}
          >
            YAZIYI SİL
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetail;