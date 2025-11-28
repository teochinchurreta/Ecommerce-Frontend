import React, { useState, useEffect } from 'react';
import { productService } from '../services/apiService';
import useNotification from '../hooks/useNotification';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductEditPage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = useNotification();

  const [form, setForm] = useState({ name:'', description:'', price:0, stock:0 });
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    if(!id) return;
    setLoading(true);
    productService.get(id).then(res => setForm(res)).catch(err => notify.show('error', err.message)).finally(()=>setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(id) await productService.update(id, form);
      else await productService.create(form);
      notify.show('success','Guardado');
      navigate('/products');
    } catch (err) {
      notify.show('error', err.message);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:720, margin:'0 auto'}}>
        <h2>{id ? 'Editar' : 'Nuevo'} Producto</h2>
        {loading ? <div>Cargando...</div> :
        <form onSubmit={handleSubmit}>
          <div className="form-row"><label>Nombre</label><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required /></div>
          <div className="form-row"><label>Descripción</label><textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} /></div>
          <div className="grid grid-2">
            <div className="form-row"><label>Precio</label><input type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value)})} required /></div>
            <div className="form-row"><label>Stock</label><input type="number" value={form.stock} onChange={e=>setForm({...form, stock: Number(e.target.value)})} required /></div>
          </div>
          <div style={{marginTop:12}}>
            <button className="btn-primary" type="submit">Guardar</button>
            <button type="button" onClick={()=>navigate('/products')} style={{marginLeft:8}}>Cancelar</button>
          </div>
        </form>}
      </div>
    </div>
  );
}
