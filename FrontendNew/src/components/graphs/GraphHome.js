import React from 'react'; 
import { NavLink } from 'react-router-dom';
 
const GraphHome = () => {

    return (
       <div align="center">
          <NavLink to="/memgraph">Common Seating</NavLink> &emsp;&emsp;&emsp;
          <NavLink to="/ordergraph">Popular Dishes</NavLink>&emsp;&emsp;&emsp;
          <NavLink to="/Revenuegraph">Per Day Revenue</NavLink>&emsp;&emsp;&emsp;
          <br/> <br/>
                 
       </div>

       
    );
}
 
export default GraphHome;
