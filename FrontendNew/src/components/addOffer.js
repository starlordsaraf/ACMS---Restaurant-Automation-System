import React, { Component } from 'react';
import axios from 'axios';



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OName:'',
      ODesc:'',
      ODate:'',
      RId:sessionStorage.getItem('resid')
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
    const {  OName, ODesc, RId,ODate} = this.state;
       
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const options = {
      url: proxyurl+'https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/offer',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{ 'Resid': `${RId}`,'OfferName':`${OName}`,'OfferDes':`${ODesc}`,'OfferExp':`${ODate}`}
    };
    console.log('here again')
    axios(options)
      .then(response => {
        console.log(response.data['message']);
        alert(response.data['message']);
      });
      
    var frm=document.getElementById("myform")
    frm.reset()
  }
  
///////////////////////////////
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.handleSubmit} id="myform">
              <h1 className="h3 mb-3 font-weight-normal" align="center">Offer Details</h1>

              <div className="form-group">
                <label htmlFor="oname">Offer Title</label>
                <input
                    type="text"
                    name="OName"
                    className="form-control"
                    placeholder="Enter offer title"
                    onChange={this.handleChange}
                    value={this.state.OName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="ODesc"> Description</label>
                <input

                    type="text"
                    name="ODesc"
                    className="form-control"
                    placeholder="Describe the offer"
                    onChange={this.handleChange}
                    value={this.state.ODesc}               
                 />
              </div>

              <div className="form-group">
                <label htmlFor="date">Validity</label>
                <input

                    type="date"
                    name="ODate"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.ODate}               
                 />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                
              >
                Add Offer
              </button>          
                       
            </form>
          </div>
        </div>
      </div>
    )
  }


}
