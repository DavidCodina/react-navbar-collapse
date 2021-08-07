import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navicon1 }      from './Navicon1'; // eslint-disable-line
import { Navicon2 }      from './Navicon2'; // eslint-disable-line
import './Navbar.scss';


// Since this component is generally only used once in the app, I got
// lazy and decided not to create props for textColor bgColor, etc.
// Instead I just set it all with the stylesheet.
export function Navbar({ brand = "DavTek Industries" }){
  const collapseRef = useRef();

  
  const toggleCollapse = (e) => {
    const animationTime = 350; // 0.35s
    const isShown       = collapseRef.current.classList.contains('show') || collapseRef.current.classList.contains('collapsing');

    // Opening...
    if (!isShown){
      collapseRef.current.classList.add('show');
      collapseRef.current.classList.add('collapsing');                            // Make height: 0px
      collapseRef.current.style.height = `${collapseRef.current.scrollHeight}px`; // Then expand to scrollHeight.
      
      
      setTimeout(() => { 
        collapseRef.current.classList.remove('collapsing'); 
        // Remove the height set programmatically. Why? so that the size of the .navbar-collapse
        // can be controlled by the CSS, so it will be open or closed depending on breakpoint.
        collapseRef.current.style.height = '';
      }, animationTime);
    } 
    
    // Closing...
    else {
      const height = collapseRef.current.getBoundingClientRect().height; // e.g 160
      collapseRef.current.style.height = `${height}px`;
      
      // Force reflow...
      //const obligatoryAssignment = collapseRef.current.offsetHeight; // eslint-disable-line
      void collapseRef.current.offsetHeight; // https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/

      collapseRef.current.classList.add('collapsing');
      // Remove the height set programmatically 3 lines ago.
      // This allows collapsing to transition from that height down to 0.
      collapseRef.current.style.height = ''; 

      setTimeout(() => {
        collapseRef.current.classList.remove('collapsing');
        collapseRef.current.classList.remove('show');
      }, animationTime);
    }
  }; // End of toggleCollapse()


  return (
    <nav id="primary-navigation" className="navbar navbar-expand-md navbar-dark bg-blue">
      <div className="container-fluid">
        <Link id="brand" className="navbar-brand font-montserrat" to="/">{brand}</Link>
        <Navicon1 toggleCollapse={toggleCollapse} />
        
        <div ref={collapseRef} className="collapse navbar-collapse">
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" activeClassName="active-link" exact to="/">Home</NavLink>
            <NavLink className="nav-link" activeClassName="active-link" to="/about">About</NavLink>
            <NavLink className="nav-link" activeClassName="active-link" to="/services">Services</NavLink>
            <NavLink className="nav-link" activeClassName="active-link" to="/contact">Contact</NavLink>
          </div>
        </div>{/* End of <div className collapse navbar-collapse"> */}
      </div>{/* End of <div className="container-fluid"> */}
    </nav>
  );
}