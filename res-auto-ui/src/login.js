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
    console.log('here')
    const {  RUname, RPwd, RId} = this.state;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const options = {
      url: proxyurl+'https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/login',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{ 'Username': `${RUname}`,'Password':`${RPwd}`,'Resid':`${RId}`}
    };
    console.log('here again')
    axios(options)
      .then(response => {
        if ('resid' in response.data){
          var rid=response.data['resid'];
          sessionStorage.setItem("resid",rid );
        }
        console.log(response.data['message']);
        alert(response.data['message']);
      });

  }
  
  
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
