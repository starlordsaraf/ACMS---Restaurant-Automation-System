import React from 'react';
import axios from 'axios';
import { JsonToTable } from "react-json-to-table";

export default class menu extends React.Component {
    constructor(props){
      super(props);
      this.state={
        tableData:[],
        columns: [
    {key: 'RecordId', label: 'DishId'},
    {key: 'Dishname', label:'Dishname'},
    {key: 'category', label:'Category'},
    {key: 'ingredients', label:'Ingredients'},
    {key: 'quant' ,label:'Quantity'},
    {key: 'price', label: 'Price'}],
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
      {data: {'did': `${del}`}
    });
  }
    
    render() {        
        
        return (
          <div className="menu">   
          <form onSubmit={this.handleSubmit}>       
            <br/> <h4>MENU</h4>
            <JsonToTable json={this.state.tableData} />
            <h4>Enter the DishID to be deleted:</h4>
            <input style={{ width: "300px" }}
            type="text"
            name="del"
            onChange={this.handleChange}
            value={this.state.del}/><p></p>
            <button name='submit' type ='submit' style = {{width: '200px' , padding: '10px 30px'}}> MENU </button>
            <button name='Delete' style = {{width: '200px',padding: '10px 30px'}} onClick={this.handleAlternate}> DELETE DISH </button> 
            </form>
          </div>
          
        );
    }   
   
}

