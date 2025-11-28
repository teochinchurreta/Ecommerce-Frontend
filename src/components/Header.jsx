import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Header(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="inner">
        <div className="logo">
          <img src="/src/assets/logo.png" alt="logo" />
          <div>
            <div style={{fontWeight:600}}>E-Commerce</div>
            <div className="small">Universidad - Trabajo</div>
          </div>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/products">Productos</Link>
          <Link to="/purchases">Compras</Link>
          {user ? (
            <>
              <span className="small" style={{marginLeft:12}}>{user.name}</span>
              <button onClick={handleLogout} style={{marginLeft:8}} className="btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
