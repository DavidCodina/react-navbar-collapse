import React, { useState } from 'react';


export const Navicon1 = ({ toggleCollapse }) => { 
  const [active, setActive ] = useState(false);

  const handleClick = (e) => {
    toggleCollapse(e);
    setActive(currentValue => !currentValue);
  }
  return (
    <button
      onClick={handleClick} 
      className={`btn hamburger-container hamburger-squeeze align-self-center user-select-none${active ? ' active' : ''}`}
    >
      <div className="hamburger-inner"></div>
    </button>
  );
};
