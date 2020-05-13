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
          //go to another page
          this.props.history.push(`/home`)
        }
        console.log(response.data['message']);
        alert(response.data['message']);
      });

  }
  
///////////////////////////////
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

              <div className="form-group">
                <label htmlFor="uname">Username</label>
                <input
                    type="text"
                    name="RUname"
                    className="form-control"
                    placeholder="Enter username"
                    onChange={this.handleChange}
                    value={this.state.RUname}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input

                    type="password"
                    name="RPwd"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={this.handleChange}
                    value={this.state.RPwd}               
                 />
              </div>

              <div className="form-group">
                <label htmlFor="id">Restaurant ID</label>
                <input

                    type="text"
                    name="RId"
                    className="form-control"
                    placeholder="Enter Res ID"
                    onChange={this.handleChange}
                    value={this.state.RId}               
                 />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }


}
