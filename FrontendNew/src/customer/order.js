import React from 'react';
import { JsonToTable } from "react-json-to-table";
import axios from 'axios';
import './order.css'

console.clear();
var customerid = sessionStorage.getItem("cid")   //use after login is done
var tablename = sessionStorage.getItem("table")   //use after login is done
var resid1 = sessionStorage.getItem("rid")
/* Product */
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0
    };
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.showInfo = this.showInfo.bind(this);
  }

  add() {
    this.setState({
      qty: this.state.qty + 1
    });
    this.props.handleTotal(this.props.price,this.state.qty+1,this.props.name,this.props.quantity_available);
  }

  subtract() {
    this.setState({
      qty: this.state.qty - 1
    });
    this.props.handleTotal(this.props.price,this.state.qty-1,this.props.name,this.props.quantity_available);
  }

  showInfo() {
    this.props.handleShow(this.props.info);
  }

  render() {
    return (
      <div className="division">
        <div className="row form-group">
          <div className="col-2">
            <h5>{this.props.name}: ${this.props.price}</h5>
          </div>
          <div className="col-10">
            <h5> Available : {this.props.quantity_available}</h5>
          </div>
        </div>
        <div className="row btn-toolbar">
          <div className="col-2">
            <h6>Ingredients : {this.props.ingredients}</h6>
          </div>
          <div className="col-10">
            <button className="btn btn-outline-primary" onClick={this.add} disabled={this.state.qty >= this.props.quantity_available}>
              +1
            </button>
            <button className="btn btn-outline-primary" onClick={this.subtract} disabled={this.state.qty < 1}>
              -1
            </button>     
            <h6>Ordered : {this.state.qty}</h6>       
          </div>
        </div>
        <hr />
    </div>
    );
  }
}


/* ProductList */
export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: "",
      items:[],
      order:[],
      columns: [
    {key: 'Dishname', label:'Dishname'},
    {key: 'quantity' ,label:'Quantity'}],
    final:[''],
      totalPrice:""
    }
    this.handleAlternate = this.handleAlternate.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.showBill = this.showBill.bind(this);
  }
  async componentDidMount() {
    fetch("https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/1",{    //change to resid
        method: 'get'
    }).then((Response)=>Response.json()).then((findresponse)=>{
        this.setState({productList: findresponse})
        console.log(this.state.productList);

    });
  }

  async handleAlternate() {
    const {items} = this.state;
    axios.post("https://cors-anywhere.herokuapp.com/"+"https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/customer/order/1",items).then(response => {
          //go to another page
          window.location.reload(false);
        alert("Order Placed");
      });
  }

  calculateTotal(price,qty,name,quantity_available) {
    var j = -1
    const array = this.state.items;
    const disp_array = this.state.order;    
    const found = this.state.items.some(el => el.Dishname === name);
    const newval = { 'Dishname':`${name}`, 'price': `${price}`, 'quantity':`${qty}`,'available':`${quantity_available}`,'custid':customerid,'tableid':tablename}
    const displayval = { 'Dishname':`${name}`, 'quantity':`${qty}`}
    if(found) {j = array.findIndex(item => item.Dishname === name);
          array.splice([j], 1);
          disp_array.splice([j],1);
          this.setState({
            items: array,
            disp_array: array
            });}
    this.setState({
        items: [...this.state.items, newval],
        order: [...this.state.order, displayval]
    });

  }
  async showBill() {
      var custid=customerid;
      sessionStorage.setItem("custid",custid );
      var resid= resid1;
      sessionStorage.setItem("resid",resid);

      this.props.history.push(`/Bill`)
  }

  

  render() {
    if (!this.state.productList) return <p>loading...!!!!</p>;
    var component = this;
    var products = this.state.productList.map(function(product) {
      return (
        <Product
          name={product.Dishname}
          price={product.price}
          ingredients={product.ingredients}
          quantity_available={product.quant}
          handleTotal={component.calculateTotal}
        />
      );
    });
    return (
      <div>
        {products}
        <h5>VIEW UR ORDERS </h5>
        <div id="customer"><JsonToTable json={this.state.order} columns={this.state.columns}/> </div><br/>
        <button name='Submit' style = {{width: '200px',padding: '10px 30px'}} onClick={this.handleAlternate}> SUBMIT ORDER </button>
        <button name='Bill' style = {{width: '200px',padding: '10px 30px'}} onClick={this.showBill} > SHOW BILL </button> 
      </div>
    );
  }
}

