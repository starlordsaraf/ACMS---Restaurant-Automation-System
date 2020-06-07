import React, { Component } from 'react';
import axios from 'axios';
import './menu.css'
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Dname: '',
      Dcategory: '',
      Dingredients:'',
      Dquant:'',
      Price:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAlternate = this.handleAlternate.bind(this);
  }
  
  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    var resid1 = sessionStorage.getItem("resid");
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    const { Dname, Dcategory, Dingredients, Dquant,Price} = this.state;
    await axios.put(proxyurl+
      'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/'+resid1,
      { 'did':'DISH_DETAIL#D3','dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':`${Price}`}
    ).then(response => {
        alert("Item Added Successfully");
        window.location.reload(false);
      });
    console.log(resid1);
  }

  async handleAlternate(event) {
    event.preventDefault();
    var resid1 = sessionStorage.getItem("resid");
    const { Dname, Dcategory, Dingredients, Dquant,Price} = this.state;
    var proxyurl = "https://cors-anywhere.herokuapp.com/"
    await axios.post(proxyurl+
      'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/'+resid1,
      {'dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':`${Price}`}
    ).then(response => {
        alert("Item Updated Successfully");
        window.location.reload(false);
      });
  }

  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">

       <h2> Enter the Dish details</h2>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Name
          </label>
          <input style={{ width: "500px" }}
            type="text"
            name="Dname"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.Dname}
          /><p></p>
          </div>

          <div className="form-group">
          <label>Category
          </label>
          <input style={{ width: "500px" }}
            type="text"
            name="Dcategory"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.Dcategory}
          /><p></p>
          </div>
          <div className="form-group">
          <label>Ingredients</label>
          <input style={{ width: "500px", height: "50px"}}
            type="text"
            name="Dingredients"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.Dingredients}
          /><p></p>
          </div>
          <div className="form-group">  
          <label>Quantity</label>
          <input style={{ width: "500px" }}
            type="number"
            name="Dquant"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.Dquant}
          /><p></p>
          </div>
          <div className="form-group">
          <label>Price</label>
          <input style={{ width: "500px" }}
            type="number"
            name="Price"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.Price}
          /><p></p>
          </div>

          <button name='submit' type ='submit' style = {{width: "350px"},{marginRight:"10%"}} className="btn btn-lg btn-primary btn-block"> ADD DISH </button> 
          <button name = 'update' onClick={this.handleAlternate} style = {{width: "350px"},{marginRight:"10%"}} className="btn btn-lg btn-primary btn-block"> UPDATE DISH </button>

      </form>
      </div>
      </div>
      </div>
    );
  }
}
