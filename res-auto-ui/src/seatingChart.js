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
	<div>
	 <h1>MANAGE TABLES</h1>
	  
      <table align="centre">
        {this.createTable()
		}
      </table><br/>
	  <div>
       
		<br/>
		<h3> SELECT THE NUMBER OF SEATS TO ADD A TABLE</h3>
        <form>
		     NUMBER OF SEATS&nbsp;
             <select id = "myList">
               <option value = "1">one</option>
               <option value = "2">two</option>
               <option value = "3">three</option>
               <option value = "4">four</option>
			   <option value = "5">four</option>
			   <option value = "6">four</option>
             </select>&nbsp;&nbsp;
 <button >ADD TABLE </button>       
          
   
        
        
    </form><br/>
	<h3>SELECT A TABLE TO PERFORM THE BELOW OPERATIONS</h3>
        <button >DELETE TABLE</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		 <button >BLOCK  TABLE</button> &nbsp;&nbsp;&nbsp;
		  <button >UNBLOCK TABLE</button> 
		
	</div>
	  </div>
	 
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