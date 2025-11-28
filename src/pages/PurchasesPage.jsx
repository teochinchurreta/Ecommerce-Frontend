import React, { useState, useEffect, useCallback } from 'react';
import { purchaseService } from '../services/apiService';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

export default function PurchasesPage(){
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page:1, limit:10, total:0 });
  const [loading, setLoading] = useState(false);
  const notify = useNotification();
  const navigate = useNavigate();

  const fetchPage = useCallback(async (page=1) => {
    setLoading(true);
    try {
      const data = await purchaseService.list(page, meta.limit);
      setItems(data.items || []);
      setMeta(data.meta || { page, limit: meta.limit, total: data.meta?.total || 0 });
    } catch (err) {
      notify.show('error', err.message);
    } finally { setLoading(false); }
  }, [meta.limit, notify]);

  useEffect(()=> fetchPage(1), [fetchPage]);

  const handleDelete = async (id) => {
    if(!confirm('Eliminar compra?')) return;
    try {
      await purchaseService.remove(id);
      notify.show('success','Compra eliminada');
      fetchPage(meta.page);
    } catch (err) {
      notify.show('error', err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>Compras</h2>
          <div><button className="btn-primary" onClick={()=>navigate('/purchases/new')}>Nueva Compra</button></div>
        </div>

        {loading ? <div>Loading...</div> : (
          <>
            <div style={{marginTop:12}}>
              {items.map(c => (
                <div key={c._id} className="card" style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
                  <div>
                    <div className="small">{new Date(c.purchaseDate).toLocaleString()}</div>
                    <div style={{fontWeight:600}}>Total: ${c.total.toFixed(2)}</div>
                    <div className="small">Dirección: {c.address}</div>
                    <ul className="small">
                      {c.items.map(it => <li key={it.product._id}>{it.product.name} x {it.quantity}</li>)}
                    </ul>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', gap:6}}>
                    <button onClick={()=>navigate(`/purchases/${c._id}`)}>Ver / Editar</button>
                    <button className="btn-danger" onClick={()=>handleDelete(c._id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>

            <Pagination meta={meta} onChangePage={(p)=>fetchPage(p)} />
          </>
        )}
      </div>
    </div>
  );
}
