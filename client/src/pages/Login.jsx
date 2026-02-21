import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sarslanblog.onrender.com/api/auth/login', {
        email, password
      });
      // Token'ı kaydedip ana sayfaya geçiyoruz
      localStorage.setItem('token', response.data.token);
      navigate('/');
      // Sayfayı yeniliyoruz ki Navbar'daki butonlar güncellensin
      window.location.reload(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Giriş yapılamadı, bilgilerini kontrol et.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Sisteme Giriş ⚡
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="E-posta" type="email" variant="outlined" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Şifre" type="password" variant="outlined" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="success" size="large" sx={{ mt: 2 }}>Giriş Yap</Button>
      </Box>
    </Paper>
  );
};

export default Login;