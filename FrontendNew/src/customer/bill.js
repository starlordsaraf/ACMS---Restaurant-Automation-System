import React from 'react';
import { JsonToTable } from "react-json-to-table";
import axios from 'axios';


var customerid = sessionStorage.getItem("custid")   //use after login is done
var resid1 = sessionStorage.getItem("rid")

export default class bill extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      final: [''],
      totalPrice: " "
    }
   }
	async componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
		await axios.post(proxyurl+'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/customer/getorder/'+resid1,{'custid': customerid}).then((findresponse)=>{
        this.setState({final: findresponse.data});
        console.log(this.state.final);
    });
        const array = this.state.final;
        var total = this.state.final[this.state.final.length-1].price;
        array.splice([array.length-1], 1);
        this.setState({final:array ,totalPrice : total});

    }
 render() {               
        return (
          <div className="menu">
          <br></br> 
 		     <h2> Billing Amount </h2><br></br> 
          <div id="customer"><JsonToTable json={this.state.final}/></div>   
          <div className="row form-group" id="order">
          <div className="col-sm=8">
            <h4>TOTAL PRICE: ${this.state.totalPrice}</h4>
        	</div>
        </div>
        </div>
        );
    }
}

