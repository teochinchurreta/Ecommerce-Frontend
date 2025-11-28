import React, { useState, useCallback } from 'react';
import { authService } from '../services/apiService';
import useAuth from '../hooks/useAuth';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(){
  const [form, setForm] = useState({ email:'', password:'' });
  const { login } = useAuth();
  const notify = useNotification();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(form);
      
      login({ ...res.user, token: res.token });
      notify.show('success','Bienvenido');
      navigate('/');
    } catch (err) {
      notify.show('error', err.message);
    }
  }, [form, login, navigate, notify]);

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'24px auto'}}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          </div>
          <div className="form-row">
            <label>Contraseña</label>
            <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn-primary" type="submit">Entrar</button>
            <a href="/register" style={{alignSelf:'center'}}>Crear cuenta</a>
          </div>
        </form>
      </div>
    </div>
  );
}
