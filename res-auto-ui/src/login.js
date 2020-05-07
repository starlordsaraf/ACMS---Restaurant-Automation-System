import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RUname:'',
      RPwd:'',
      RId:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.handleAlternate = this.handleAlternate.bind(this);
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
    const {  RUname, RPwd, RId} = this.state;
    await axios.post(
      ' https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/login',
      { 'Username': `${RUname}`,'Password':`${RPwd}`,'Resid':`${RId}`}
    );
  }
  /*
  async handleAlternate(event) {
    event.preventDefault();
    const { Dname, Dcategory, Dingredients, Dquant, Reg_v,Reg_nv, Med_v, Med_nv, Lar_v, Lar_nv } = this.state;
    await axios.post(
      ' https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/R1',
      { 'did':'DISH_DETAIL#D3','dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':{'regular':`${Reg_v}`,'regular_nonveg':`${Reg_nv}`,'medium':`${Med_v}`,'medium_nonveg':`${Med_nv}`,'large':`${Lar_v}`,'large_nonveg':`${Lar_nv}`}}
    );
  }
*/
  
  render() {
    return (
      <div className="App">
       <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          
          <label>Username:
          </label>
          <input style={{ width: "300px" }}
            type="text"
            name="RUname"
            onChange={this.handleChange}
            value={this.state.RUname}
          /><p></p>

          <label>Password: </label>
          <input style={{ width: "300px"}}
            type="password"
            name="RPwd"
            onChange={this.handleChange}
            value={this.state.RPwd}
          /><p></p>
            
          
          <label>Restaurant ID:</label>
          <input style={{ width: "300px" }}
            type="text"
            name="RId"
            onChange={this.handleChange}
            value={this.state.RId}
          /><p></p>

          <button name='submit' type ='submit' onClick={this.handleSubmit} style = {{width: "250px"}}> SIGN IN </button> 
          
      </form>
      </div>
    );
  }
}
