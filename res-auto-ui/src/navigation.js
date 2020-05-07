import React from 'react'; 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {

    var resId = "R1"
    var seating_url = "/seatingchart/"+resId
    return (
       <div>
          <NavLink to="/menuDisplay">Menu</NavLink> &emsp;&emsp;&emsp;
          <NavLink to="/Dish">Add/Update Dishes</NavLink>&emsp;&emsp;&emsp;
          <NavLink to = {seating_url}>Seating Chart</NavLink>&emsp;&emsp;&emsp;
          <NavLink to ="/login">Login</NavLink>&emsp;&emsp;&emsp;
          <NavLink to ="/signup">Signup</NavLink>&emsp;&emsp;&emsp;
          
       </div>
    );
}
 
export default Navigation;