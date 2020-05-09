import React, { Component } from 'react';
import axios from 'axios';



export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RName:'',
      CName:'',
      CNum:''

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
    const {  RName, CNum, CName} = this.state;
    
    /* after the seating api is done
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const options = {
      url: proxyurl+'https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/alloctable',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{ 'Resid': `${RUname}`,'Password':`${RPwd}`,'Resid':`${RId}`}
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

      */
     console.log('Called the alloc api');
     sessionStorage.setItem('cname',CName);
     this.props.history.push(`/custhome`);

  }
  
///////////////////////////////
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Hi! </h1>

              <div className="form-group">
                <label htmlFor="cname">Name</label>
                <input
                    type="text"
                    name="CName"
                    className="form-control"
                    placeholder="Enter your full name"
                    onChange={this.handleChange}
                    value={this.state.CName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="num">Members</label>
                <input

                    type="text"
                    name="CNum"
                    className="form-control"
                    placeholder="How many of you?"
                    onChange={this.handleChange}
                    value={this.state.CNum}               
                 />
              </div>

              <div className="form-group">
                <label htmlFor="id">Restaurant</label>
                <input

                    type="text"
                    name="RName"
                    className="form-control"
                    placeholder="Enter Restaurant Name"
                    onChange={this.handleChange}
                    value={this.state.RName}               
                 />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Let's find you a table! 
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }


}
