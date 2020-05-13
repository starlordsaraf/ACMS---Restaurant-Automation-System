import React,{ Component } from 'react'; 
import { NavLink } from 'react-router-dom';
import { render } from '@testing-library/react';

export default class CustHome extends Component { 
    constructor(props) {
        super(props);
        this.state = {
          CName:sessionStorage.getItem('cname')
          //,RId:''
        };
    }

    render(){
        return (
            <div align="center" >
                <h1 id= "hello" className="h3 mb-3 font-weight-normal" >Welcome {this.CName} </h1>
                <NavLink to="/order">Place Order</NavLink> &emsp;&emsp;&emsp;
                <NavLink to="/orderStatus">Check Order Status</NavLink>&emsp;&emsp;&emsp;
                <NavLink to = "/payment">Payment</NavLink>&emsp;&emsp;&emsp;
                <br/> <br/>
            </div>
       
        );
    }
    
}
 