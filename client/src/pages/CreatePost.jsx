import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// SADECE BUNLAR EKLENDİ
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(''); 
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  // Editör Araç Çubuğu Ayarları
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'], 
      ['clean']
    ],
  };

  const handlePost = async (e) => {
    e.preventDefault();
    
    if(!category) {
      return alert("Kategori seçmeden olmaz usta!");
    }

    const token = localStorage.getItem('token');
    
    try {
      const payload = { title, content, category, image, tags: [] };
      console.log("FRONTEND: Backend'e bu paket gidiyor:", payload);

      const response = await axios.post('http://localhost:5000/api/blogs', 
        payload, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log("FRONTEND: Cevap geldi:", response.data);
      alert('Yayınlandı reisim! ⚡');
      navigate('/');
    } catch (error) {
      console.error("GÖNDERİM HATASI:", error.response?.data || error.message);
      alert(error.response?.data?.message || 'Bir hata oluştu.');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
  };

  return (
    <Paper sx={{ p: 5, borderRadius: 5, border: '1px solid #e0e0e0', mt: 4 }} elevation={0}>
      <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>YENİ İÇERİK EKLE 🛠️</Typography>
      
      <Box component="form" onSubmit={handlePost} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <FormControl fullWidth required>
          <InputLabel>Kategori Seç</InputLabel>
          <Select 
            value={category} 
            label="Kategori Seç" 
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="elektrik">ELEKTRİK</MenuItem>
            <MenuItem value="elektronik">ELEKTRONİK</MenuItem>
            <MenuItem value="tarih">TARİH</MenuItem>
            <MenuItem value="proje">PROJE</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Başlık" required fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ py: 1.5, bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}>
          FOTOĞRAF YÜKLE 
          <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
        </Button>
        {image && <img src={image} alt="Önizleme" style={{ height: '150px', width: 'fit-content', borderRadius: '10px' }} />}
        
        {/* ESKİ TEXTFIELD GİTTİ, YERİNE QUILL GELDİ */}
        <Typography sx={{ fontWeight: 700, mb: -2 }}>İçerik</Typography>
        <Box sx={{ mb: 8, height: '400px' }}>
            <ReactQuill 
              theme="snow" 
              value={content} 
              onChange={setContent} 
              modules={modules}
              style={{ height: '350px' }}
            />
        </Box>
        
        <Button type="submit" variant="contained" size="large" sx={{ py: 2, bgcolor: '#ffd600', color: '#000', fontWeight: 900 }}>
          YAYINLA 🚀
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePost;