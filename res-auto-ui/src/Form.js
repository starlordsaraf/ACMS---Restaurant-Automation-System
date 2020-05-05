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
      Reg_v:'',
      Reg_nv:'',
      Med_v:'',
      Med_nv:'',
      Lar_v:'',
      Lar_nv:''
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
    const { Dname, Dcategory, Dingredients, Dquant, Reg_v,Reg_nv, Med_v, Med_nv, Lar_v, Lar_nv } = this.state;
    await axios.put(
      ' https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/R1',
      { 'did':'DISH_DETAIL#D3','dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':{'regular':`${Reg_v}`,'regular_nonveg':`${Reg_nv}`,'medium':`${Med_v}`,'medium_nonveg':`${Med_nv}`,'large':`${Lar_v}`,'large_nonveg':`${Lar_nv}`}}
    );
  }

  async handleAlternate(event) {
    event.preventDefault();
    const { Dname, Dcategory, Dingredients, Dquant, Reg_v,Reg_nv, Med_v, Med_nv, Lar_v, Lar_nv } = this.state;
    await axios.post(
      ' https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/R1',
      { 'did':'DISH_DETAIL#D3','dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':{'regular':`${Reg_v}`,'regular_nonveg':`${Reg_nv}`,'medium':`${Med_v}`,'medium_nonveg':`${Med_nv}`,'large':`${Lar_v}`,'large_nonveg':`${Lar_nv}`}}
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

          <label style = {{width: "295px"}}> Price:</label ><label  style= {{width: "170px"}}>Veg</label><label>Non-Veg</label><p></p>
          <label> Regular</label>
          <input
            type="number"
            name="Reg_v"
            onChange={this.handleChange}
            value={this.state.Reg_v}
          /> &emsp; &emsp;
          <input
            type="number"
            name="Reg_nv"
            onChange={this.handleChange}
            value={this.state.Reg_nv}
          /><p></p>
          <label> Medium</label>
          <input 
            type="number"
            name="Med_v"
            onChange={this.handleChange}
            value={this.state.Med_v}
          /> &emsp; &emsp;
          <input
            type="number"
            name="Med_nv"
            onChange={this.handleChange}
            value={this.state.Med_nv}
          /><p></p>
          <label> Large</label>
          <input
            type="number"
            name="Lar_v"
            onChange={this.handleChange}
            value={this.state.Lar_v}
          /> &emsp; &emsp;
          <input
            type="number"
            name="Lar_nv"
            onChange={this.handleChange}
            value={this.state.Lar_nv}
          /><p><br></br></p>


          <button name='submit' type ='submit' style = {{width: "250px"}}> ADD DISH </button> 
          <button name = 'update' onClick={this.handleAlternate} style = {{width: "250px"}}> UPDATE DISH </button>

      </form>
      </div>
    );
  }
}
