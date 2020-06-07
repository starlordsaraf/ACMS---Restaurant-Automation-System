import React, { Component } from 'react';
import axios from 'axios';
//import './menu.css'


export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Dname: '',
      Dcategory: '',
      Dingredients:'',
      Dquant:'',
      Price:''
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
    var resid1 = sessionStorage.getItem("resid");
    var proxyurl = "https://cors-anywhere.herokuapp.com/";
    const { Dname, Dcategory, Dingredients, Dquant,Price} = this.state;
    await axios.put(proxyurl+
      'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/'+resid1,
      { 'did':'DISH_DETAIL#D3','dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':`${Price}`}
    );
    console.log(resid1);
  }

  async handleAlternate(event) {
    event.preventDefault();
    var resid1 = sessionStorage.getItem("resid");
    const { Dname, Dcategory, Dingredients, Dquant,Price} = this.state;
    var proxyurl = "https://cors-anywhere.herokuapp.com/"
    await axios.post(proxyurl+
      'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/menu/dish/'+resid1,
      {'dishname': `${Dname}`,'category': `${Dcategory}`,'ingredients':`${Dingredients}`,'quantity':`${Dquant}`,'price':`${Price}`}
    );
  }

  
  render() {
    
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Enter the Dish details</h1>

              <div className="form-group">
                <label htmlFor="name">Dish Name</label>
                <input
                  type="text"
                  name="Dname"
                  className="form-control"
                  placeholder="Eg. Alfredo Pasta"
                  onChange={this.handleChange}
                  value={this.state.Dname}
                />
              </div>

              
              <div className="form-group">
                <label htmlFor="cate">Category</label>
                <input
                  type="text"
                  name="Dcategory"
                  className="form-control"
                  placeholder="Eg. Starter, Dessert etc."
                  onChange={this.handleChange}
                  value={this.state.Dcategory}
                />
              </div>

              
              <div className="form-group">
                <label htmlFor="ing">Ingredients</label>
                <input
                  type="text"
                  name="Dingredients"
                  className="form-control"
                  placeholder="Eg. Sugar, Milk, etc."
                  onChange={this.handleChange}
                  value={this.state.Dingredients}
                />
              </div>

              
              <div className="form-group">
                <label htmlFor="qty">Quantity</label>
                <input
                  type="number"
                  name="Dquant"
                  className="form-control"
                  placeholder="Eg. 150"
                  onChange={this.handleChange}
                  value={this.state.Dquant}
                />
              </div>

              
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="Price"
                  className="form-control"
                  placeholder="How much would this dish cost?"
                  onChange={this.handleChange}
                  value={this.state.Price}
                />
              </div>

              <button
                type="submit"
                name="submit"                
                display="inline-block"
                className="btn btn-lg btn-primary btn-block"
              >
                ADD DISH
              </button> 

              
              <button
                type="submit"
                name="update"
                display="inline"
                onClick={this.handleAlternate}
                className="btn btn-lg btn-primary btn-block"
              >
                UPDATE DISH
              </button>
 

            </form>
          </div>
        </div>
      </div>

    );
  }
}
