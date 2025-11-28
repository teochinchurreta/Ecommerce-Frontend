import React, { useState, useEffect } from 'react';
import { productService, purchaseService } from '../services/apiService';
import useNotification from '../hooks/useNotification';
import { useNavigate, useParams } from 'react-router-dom';

export default function PurchaseEditPage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = useNotification();

  const [available, setAvailable] = useState([]);
  const [form, setForm] = useState({ items: [], address: '' });
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    productService.list(1, 1000).then(r => setAvailable(r.items || [])).catch(err => notify.show('error', err.message));
    if(id){
      setLoading(true);
      purchaseService.get(id).then(r => {
        setForm({ items: r.items.map(it => ({ product: it.product._id, quantity: it.quantity })), address: r.address });
      }).catch(err => notify.show('error', err.message)).finally(()=>setLoading(false));
    }
  }, [id]);

  function addItem(){ setForm(prev => ({ ...prev, items: [...prev.items, { product: available[0]?._id || '', quantity:1 }] })); }
  function removeItem(i){ setForm(prev => ({ ...prev, items: prev.items.filter((_,idx)=>idx!==i) })); }
  function updateItem(i, key, value){ setForm(prev => ({ ...prev, items: prev.items.map((it,idx)=> idx===i ? { ...it, [key]: value } : it) })); }

  function totalEstimated(){
    return form.items.reduce((sum, it) => {
      const p = available.find(x => x._id === it.product);
      return sum + (p ? p.price * Number(it.quantity || 0) : 0);
    }, 0).toFixed(2);
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      if(id) {
        await purchaseService.update(id, { address: form.address });
      } else {
        await purchaseService.create({ items: form.items, address: form.address });
      }
      notify.show('success', 'Compra guardada');
      navigate('/purchases');
    } catch (err) {
      notify.show('error', err.message);
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:900, margin:'0 auto'}}>
        <h2>{id ? 'Ver / Editar' : 'Nueva'} Compra</h2>
        {loading ? <div>Cargando...</div> :
        <form onSubmit={handleSubmit}>
          <div className="form-row"><label>Dirección</label><input value={form.address} onChange={e=>setForm({...form, address:e.target.value})} required /></div>

          <div>
            <h4>Items</h4>
            {form.items.map((it, idx) => (
              <div key={idx} style={{display:'grid', gridTemplateColumns:'2fr 1fr auto', gap:8, marginBottom:8}}>
                <select value={it.product} onChange={e=>updateItem(idx,'product', e.target.value)}>
                  {available.map(p => <option key={p._id} value={p._id}>{p.name} — ${p.price} (stock:{p.stock})</option>)}
                </select>
                <input type="number" min="1" value={it.quantity} onChange={e=>updateItem(idx,'quantity', Number(e.target.value))} />
                <button type="button" className="btn-danger" onClick={()=>removeItem(idx)}>Quitar</button>
              </div>
            ))}
            <button type="button" onClick={addItem}>Agregar item</button>
            <div className="footer-note">Total estimado: ${totalEstimated()}</div>
          </div>

          <div style={{marginTop:12}}>
            <button className="btn-primary" type="submit">Guardar</button>
            <button type="button" onClick={()=>navigate('/purchases')} style={{marginLeft:8}}>Cancelar</button>
          </div>
        </form>}
      </div>
    </div>
  );
}
