import React from 'react'; 
import { NavLink } from 'react-router-dom';
 
const Home = () => {

    var resId = "R1"
    var seating_url = "/seatingchart/"+resId
    return (
       <div align="center">
          <NavLink to="/menuDisplay">Menu</NavLink> &emsp;&emsp;&emsp;
          <NavLink to="/Dish">Add/Update Dishes</NavLink>&emsp;&emsp;&emsp;
          <NavLink to = {seating_url}>Seating Chart</NavLink>&emsp;&emsp;&emsp;
          <br/> <br/>
          <h1> -----------Your Offfers-----------</h1>           
       </div>

       
    );
}
 
export default Home;