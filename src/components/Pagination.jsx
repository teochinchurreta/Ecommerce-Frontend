import React, { useMemo } from 'react';

export default function Pagination({ meta, onChangePage }){
  const { page = 1, limit = 10, total = 0 } = meta || {};
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const pages = useMemo(() => {
    const arr = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for(let i = start; i <= end; i++) arr.push(i);
    return arr;
  }, [page, totalPages]);

  return (
    <div className="pagination">
      <button className="page-btn" disabled={page<=1} onClick={()=>onChangePage(1)}>First</button>
      <button className="page-btn" disabled={page<=1} onClick={()=>onChangePage(page-1)}>Prev</button>

      {pages.map(p => (
        <button key={p} onClick={()=>onChangePage(p)} className={`page-btn ${p===page ? 'active' : ''}`}>{p}</button>
      ))}

      <button className="page-btn" disabled={page>=totalPages} onClick={()=>onChangePage(page+1)}>Next</button>
      <button className="page-btn" disabled={page>=totalPages} onClick={()=>onChangePage(totalPages)}>Last</button>

      <div className="small" style={{marginLeft:8}}>Página {page} de {totalPages} • {total} items</div>
    </div>
  );
}
