import React from 'react';
import '../App.css';

const Typography = () => {
  return (
    <div>
      <p className="text-sm m-1">This is small text</p>
      <p className="text-base m-2">This is base text</p>
      <p className="text-lg m-3">This is large text</p>
      <p className="text-xl m-4 font-bold">This is extra large & bold text</p>
    </div>
  );
};

export default Typography;
