import React, { Component } from 'react';
import axios from 'axios';


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RName:'',
      RNum:'',
      RAddr:'',
      RUname:'',
      RPwd:'',
      RId:'',
      RBranch:''
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
    const { RName, RUname, RPwd, RAddr, RNum,RId,RBranch} = this.state;
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";  
    const options = {
      url: proxyurl+'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/signup',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{ 'Resname': `${RName}`,'Username': `${RUname}`,'Password':`${RPwd}`,'Resaddr':`${RAddr}`,'Resbranch':`${RBranch}`,'Resnum':`${RNum}`,'Resid':`${RId}`}
    };
    
    axios(options)
      .then(response => {
        console.log(response.data['message']);
        alert(response.data['message']);
        
        this.props.history.push(`/`);
      });
  }
  
 render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              
              <div className="form-group">
                <label htmlFor="name">Restaurant Name</label>
                <input
                  type="text"
                  name="RName"
                  className="form-control"
                  placeholder="Enter Restaurant Name"
                  onChange={this.handleChange}
                  value={this.state.RName}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="rbranch">Restaurant Branch</label>
                <input
                  type="text"
                  name="RBranch"
                  className="form-control"
                  placeholder="Which Branch?"
                  onChange={this.handleChange}
                  value={this.state.RBranch}
               />
              </div>
              
              <div className="form-group">
                <label htmlFor="resid">Restaurant ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Resid"
                  name="RId"
                  onChange={this.handleChange}
                  value={this.state.RId}
                
                />
              </div>

              
              <div className="form-group">
                <label htmlFor="uname">Restaurant Username</label>
                <input
                  type="text"
                  name="RUname"
                  className="form-control"
                  placeholder="Enter Username"
                  onChange={this.handleChange}
                  value={this.state.RUname}
               />
              </div>
              
              <div className="form-group">
                <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  name="RPwd"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={this.handleChange}
                  value={this.state.RPwd}
                />
              </div>

            

              <div className="form-group">
                <label htmlFor="addr">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  name="RAddr"
                  onChange={this.handleChange}
                  value={this.state.RAddr}
                />
              </div>

              

              <div className="form-group">
                <label htmlFor="addr">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  name="RNum"
                  onChange={this.handleChange}
                  value={this.state.RNum}
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}




