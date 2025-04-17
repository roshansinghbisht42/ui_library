import React from 'react';
import '../App.css';

const Grid = ({ children }) => {
  return <div className="grid">{children}</div>;
};

const GridColumn = ({ children }) => {
  return <div className="grid-col-4 bg-primary text-center p-2 text-sm">{children}</div>;
};

export { Grid, GridColumn };
