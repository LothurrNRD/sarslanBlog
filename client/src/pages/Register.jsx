import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleRegister = async (e) => {
    e.preventDefault();
    console.log("1. Butona basıldı, form çalıştı!"); // Eğer bu yazmıyorsa butona basılamıyordur
    console.log("2. Gönderilecek veriler:", { username, email, password });

    try {
      console.log("3. Backend'e istek atılıyor (Port 5000)...");
      const response = await axios.post('https://sarslanblog.onrender.com/api/auth/register', {
        username, email, password
      });
      
      console.log("4. Backend'den cevap geldi usta:", response.data);
      alert('Kayıt başarılı usta! Şimdi giriş yapabilirsin.');
      navigate('/login');
      
    } catch (error) {
      console.error("5. HATA YAKALANDI:", error);
      alert(error.response?.data?.message || 'Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Aramıza Katıl 🔌
      </Typography>
      <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Kullanıcı Adı" variant="outlined" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="E-posta" type="email" variant="outlined" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Şifre" type="password" variant="outlined" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>Kayıt Ol</Button>
      </Box>
    </Paper>
  );
};

export default Register;