import React, { Component } from 'react';
import axios from 'axios';
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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var resid1 = "R"+sessionStorage.getItem("resid") 
    const { Dname, Dcategory, Dingredients, Dquant,Price} = this.state;
    await axios.put(proxyurl+
      ' https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/resid1',
      { 'did':'DISH_DETAIL#D3','dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':`${Price}`}
    );
  }

  async handleAlternate(event) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var resid1 = "R"+sessionStorage.getItem("resid") 
    const { Dname, Dcategory, Dingredients, Dquant,Price} = this.state;
    await axios.post(proxyurl+
      ' https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/resid1',
      {'dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':`${Price}`}
    );
  }

  
  render() {
    return (
      <div className="App">
       <h1> Enter the Dish details</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name:
          </label>
          <input style={{ width: "500px" }}
            type="text"
            name="Dname"
            onChange={this.handleChange}
            value={this.state.Dname}
          /><p></p>
          
          <label>Category:
          </label>
          <input style={{ width: "500px" }}
            type="text"
            name="Dcategory"
            onChange={this.handleChange}
            value={this.state.Dcategory}
          /><p></p>

          <label>Ingredients:</label>
          <input style={{ width: "500px", height: "50px"}}
            type="text"
            name="Dingredients"
            onChange={this.handleChange}
            value={this.state.Dingredients}
          /><p></p>
            
          <label>Quantity:</label>
          <input style={{ width: "500px" }}
            type="number"
            name="Dquant"
            onChange={this.handleChange}
            value={this.state.Dquant}
          /><p></p>

          <label>Price:</label>
          <input style={{ width: "500px" }}
            type="number"
            name="Price"
            onChange={this.handleChange}
            value={this.state.Price}
          /><p></p>


          <button name='submit' type ='submit' style = {{width: "250px"}}> ADD DISH </button> 
          <button name = 'update' onClick={this.handleAlternate} style = {{width: "250px"}}> UPDATE DISH </button>

      </form>
      </div>
    );
  }
}
