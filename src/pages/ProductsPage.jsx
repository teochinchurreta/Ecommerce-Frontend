import React, { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/apiService';
import useNotification from '../hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

export default function ProductsPage(){
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page:1, limit:10, total:0 });
  const [loading, setLoading] = useState(false);
  const notify = useNotification();
  const navigate = useNavigate();

  const fetchPage = useCallback(async (page=1) => {
    setLoading(true);
    try {
      const data = await productService.list(page, meta.limit);
      setItems(data.items || []);
      setMeta(data.meta || { page, limit: meta.limit, total: data.meta?.total || 0 });
    } catch (err) {
      notify.show('error', err.message);
    } finally { setLoading(false); }
  }, [meta.limit, notify]);

  useEffect(()=> { fetchPage(1); }, [fetchPage]);

  const handleDelete = async (id) => {
    if(!confirm('Eliminar producto?')) return;
    try {
      await productService.remove(id);
      notify.show('success','Producto eliminado');
      fetchPage(meta.page);
    } catch (err) {
      notify.show('error', err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2>Productos</h2>
          <div>
            <button onClick={()=>navigate('/products/new')} className="btn-primary">Nuevo</button>
          </div>
        </div>

        {loading ? <div>Loading...</div> : (
          <>
            <div style={{marginTop:12}}>
              {items.map(p => (
                <div key={p._id} className="card" style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
                  <div>
                    <div style={{fontWeight:600}}>{p.name}</div>
                    <div className="small">{p.description}</div>
                    <div className="small">Precio: ${p.price} — Stock: {p.stock}</div>
                  </div>
                  <div style={{display:'flex', gap:8}}>
                    <button onClick={()=>navigate(`/products/${p._id}`)}>Editar</button>
                    <button className="btn-danger" onClick={()=>handleDelete(p._1d || p._id)}>Eliminar</button>
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
