import React, { Component } from 'react';
import axios from 'axios';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RName:'',
      RNum:'',
      RAddr:'',
      RUname:'',
      RPwd:'',
      RId:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const { RName, RUname, RPwd, RAddr, RNum,RId} = this.state;
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";  
    const options = {
      url: proxyurl+'https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/signup',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{ 'Resname': `${RName}`,'Username': `${RUname}`,'Password':`${RPwd}`,'Resaddr':`${RAddr}`,'Resnum':`${RNum}`,'Resid':`${RId}`}
    };
    
    axios(options)
      .then(response => {
        console.log(response.data['message']);
        alert(response.data['message']);

      });
  }
  
  render() {
    return (
      <div className="App">
       <h1> Restaurant Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name:
          </label>
          <input style={{ width: "300px" }}
            type="text"
            name="RName"
            onChange={this.handleChange}
            value={this.state.RName}
          /><p></p>
          
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
            type="text"
            name="RPwd"
            onChange={this.handleChange}
            value={this.state.RPwd}
          /><p></p>
            
          <label>Address</label>
          <input style={{ width: "300px", height: "50px" }}
            type="text"
            name="RAddr"
            onChange={this.handleChange}
            value={this.state.RAddr}
          /><p></p>

          <label>Phone Number:</label>
          <input style={{ width: "300px" }}
            type="text"
            name="RNum"
            onChange={this.handleChange}
            value={this.state.RNum}
          /><p></p>

        <label>Restaurant ID:</label>
          <input style={{ width: "100px" }}
            type="text"
            name="RId"
            onChange={this.handleChange}
            value={this.state.RId}
          /><p></p>

          <button name='submit' type ='submit' onClick={this.handleSubmit} style = {{width: "250px"}}> REGISTER </button> 
          
      </form>
      </div>
    );
  }
}
