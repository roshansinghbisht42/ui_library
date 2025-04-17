import React from 'react';
import '../App.css';

const Card = ({ title, children }) => {
  return (
    <div className="card">
      <h3 className="text-base font-bold">{title}</h3>
      <p className="text-sm">{children}</p>
    </div>
  );
};

export default Card;
