import React, { Component } from 'react';
import './button.css'

class seatingChart extends Component {
	   constructor(props) {
      super(props);
      this.state = {
         header: "Header from props...",
         content: "Content from props...",
		 
      }
   }

  //fruits = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
 
  //removeFruit(fruits) {
  //  alert(fruits)
  //}
   createTable = () => {
    let table = []

    // Outer loop to create parent
    for (let i = 0; i < 4; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td><Button buttonprops={i*5+j} onClick={() => this.removeFruit(i*5 +j)}>
				{i*5 + j+1}
            </Button></td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }



 render() {
    return(
      <table>
        {this.createTable()}
      </table>
    )
  }}
  
class Button extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      button: true
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({
      button:!this.state.button
    })
  }
  render(){
    return (
    <div className="container">
      <button className={this.state.button ? "buttonTrue": "buttonFalse"} onClick={this.handleClick}> <i className="far fa-smile"></i> {this.props.buttonprops}</button>  
    </div>
    )
  }
  
}
export default seatingChart;