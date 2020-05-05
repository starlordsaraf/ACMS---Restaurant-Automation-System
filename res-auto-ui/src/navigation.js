import React from 'react'; 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
          <NavLink to="/menuDisplay">Menu</NavLink> &emsp;&emsp;&emsp;
          <NavLink to="/Dish">Add/Update</NavLink>
       </div>
    );
}
 
export default Navigation;