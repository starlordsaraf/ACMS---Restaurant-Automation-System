import React from 'react';
import axios from 'axios';
import { JsonToTable } from "react-json-to-table";

export default class menu extends React.Component {
    constructor(props){
      super(props);
      this.state={
        tableData:[''],
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
    }

    async componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var resid1 = "R"+sessionStorage.getItem("resid")   //use after login is done
    console.log(resid1);
    fetch(proxyurl+"https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/resid1",{    //change to resid
        method: 'get'
    }).then((Response)=>Response.json()).
    then((findresponse)=>{
        this.setState({tableData: findresponse})
        console.log(this.state.tableData);

    })
  }
  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
  }

  async handleAlternate(event) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var resid1 = "R"+sessionStorage.getItem("resid") 
    const {del} = this.state;
    console.log(`${del}`);
    axios.delete(proxyurl+
      'https://utf02dq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/resid1',
      {data: {'did': `${del}`}
    });
  }
    
    render() {        
        
        return (
          <div className="menu">       
            <br/> <h4>MENU</h4>
            <JsonToTable json={this.state.tableData}/>
            <h4>Enter the DishID to be deleted:</h4>
            <input style={{ width: "300px" }}
            type="text"
            name="del"
            onChange={this.handleChange}
            value={this.state.del}/><p></p>
            <button name='Delete' style = {{width: '200px',padding: '10px 30px'}} onClick={this.handleAlternate}> DELETE DISH </button> 
          </div>
          
        );
    }   
   
}

