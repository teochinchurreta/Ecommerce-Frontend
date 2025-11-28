import React, { useState } from 'react';
import { authService } from '../services/apiService';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const notify = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      notify.show('success','Cuenta creada, inicia sesión');
      navigate('/login');
    } catch (err) {
      notify.show('error', err.message);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:480, margin:'24px auto'}}>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row"><label>Nombre</label><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required /></div>
          <div className="form-row"><label>Email</label><input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required /></div>
          <div className="form-row"><label>Contraseña</label><input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required /></div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn-primary" type="submit">Crear cuenta</button>
            <a href="/login" style={{alignSelf:'center'}}>Ir a login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
