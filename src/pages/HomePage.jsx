import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(){
  return (
    <div className="container">
      <div className="card">
        <h1>Bienvenido al shopping!</h1>
        <p className="small">Desde acá podés gestionar Productos (soporte) y Compras (principal).</p>
        <div style={{marginTop:12}}>
          <Link to="/products"><button className="btn-primary">Ver Productos</button></Link>
          <Link to="/purchases" style={{marginLeft:8}}><button>Ver Compras</button></Link>
        </div>
      </div>
    </div>
  );
}
