import React from 'react';
//import Table from './menu.js';
import axios from 'axios';

const JsonTable = require('ts-react-json-table');
export default class menu extends React.Component {
    constructor(props){
      super(props);
      this.state={
        tableData:[''],
        columns: [
    {key: 'RecordId', label: '---------DishId---------'},
    {key: 'Dishname', label:'------Dishname------'},
    {key: 'category', label:'------category------'},
    {key: 'ingredients', label:'-------------------ingredients--------------------------'},
    {key: 'quant' ,label:'--quantity--'},
    {key: 'price.large', label: '--Prize_L--'},
    {key: 'price.medium', label: '--Prize_M--'},
    {key: 'price.regular', label: '--Prize_S'},

],
        del:''
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleAlternate = this.handleAlternate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
    event.preventDefault();
    axios.get(
      ' https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/R1'
    )
         .then(response => {
        this.setState({
          tableData: response.data
        });
      });
  }
  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
  }
  async handleAlternate(event) {
    event.preventDefault();
    const {del} = this.state;
    console.log(`${del}`);
    axios.delete(
      'https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/R1',
      { "did": `${del}`}
    );
  }
    
    render() {        
        
        return (
          <div className="menu">   
          <form onSubmit={this.handleSubmit}>       
            <br/> <h4>MENU</h4>
            <div id="table"><JsonTable rows = {this.state.tableData} columns= {this.state.columns}/></div>
            <h4>Enter the Dish name to be deleted:</h4>
            <input style={{ width: "300px" }}
            type="text"
            name="del"
            onChange={this.handleChange}
            value={this.state.del}/><p></p>
            <button name='submit' type ='submit' style = {{width: "200px"},{padding: "10px 30px"}}> MENU </button>
            <button name='Delete' style = {{width: "200px"},{padding: "10px 30px"}} onClick={this.handleAlternate}> DELETE DISH </button> 
            </form>
          </div>
          
        );
    }   
   
}

