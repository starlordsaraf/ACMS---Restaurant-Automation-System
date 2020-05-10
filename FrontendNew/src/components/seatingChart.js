import React, { Component } from 'react';
import axios from 'axios';
import './button.css'

class seatingChart extends Component {
	   constructor(props) {
      super(props);
      this.state = {
         header: "Header from props...",
         content: "Content from props...",
         data: [],
         last_table: 0,
         time: Date.now()
      }
      this.addtable = this.addtable.bind(this);
   }


   componentDidMount(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var username = sessionStorage.getItem("resid")   //use after login is done
    console.log(username);
    fetch(proxyurl+"https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/seating/R1",{    //change to resid
        method: 'get'
    }).then((Response)=>Response.json()).
    then((findresponse)=>{
        this.setState({data: findresponse})
        this.setState({last_table: findresponse[findresponse.length-1]["RecordId"].split('#')[1].substring(1,)})
        console.log(this.state.last_table);

    })

    setTimeout(function(){
      window.location.reload();
    },3600000)   //change to 20000 secs during finalization

  }

  
  
   createTable = () => {
    let table = []
    //var test = [{"RecordId":"TABLE_DETAIL#T1","seats":"4"},{"RecordId":"TABLE_DETAIL#T2","seats":"4"}]
    let tables = this.state.data
    // Outer loop to create parent
      let children = []
      //Inner loop to create children
      for (let j = 0; j < tables.length; j++) {
        children.push(<td><Button buttonprops={tables[j]["RecordId"].split("#")[1]+"\n"+tables[j]["seats"]} buttonstatusprops={tables[j]["table_status"]=='V'?true:false}onClick={() => this.removeFruit(tables[j]["RecordId"].split("#")[1]+"\n"+tables[j]["seats"])}>
				{tables[j]["RecordId"].split("#")[1]+"\n"+tables[j]["seats"]}
            </Button></td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    return table
  }


  addtable(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    console.log(document.getElementById("seats").value.toString())
    //var username = sessionStorage.getItem("resId")   --use after login is done
    axios.put(proxyurl+"https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/seating/R1",{
      "tid": (parseInt(this.state.last_table)+1).toString(),
      "seats": document.getElementById("seats").value.toString()
    });
  }

  deletetable(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //var username = sessionStorage.getItem("resId")   --use after login is done
    axios.delete(proxyurl+"https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/seating/R1",{data: {
      "tid": document.getElementById("tid").value
    }});
  }


 render() {
    return(
	<div>
	 <h1>MANAGE TABLES</h1>
	  
    <table align="centre">
      {this.createTable()}
    </table><br/>

	<div>
       
		<br/>
		<h3> SELECT THE NUMBER OF SEATS TO ADD A TABLE</h3>
    <form>NUMBER OF SEATS&nbsp;
      <input type = "number" id="seats"></input>&nbsp;&nbsp;
      <button onClick={this.addtable} type="reset">ADD TABLE </button>       
    </form><br/>
  	<h3>ENTER TABLE NUMBER TO DELETE TABLE</h3>
    <form>TABLE NUMBER&nbsp;
      <input type = "number" id="tid" placeholder="Eg: 1"></input>&nbsp;&nbsp;
      <button onClick={this.deletetable} type="reset">DELETE TABLE</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </form>
	</div>
	</div>
	 
	)
  }}



  
class Button extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      button: this.props.buttonstatusprops
    }
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //var username = sessionStorage.getItem("resId")   --use after login is done
    this.setState({
      button:!this.state.button
    })
    if(this.state.button==true){
      axios.post(proxyurl+"https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/seating/block/R1",{
        "tid":this.props.buttonprops.split("\n")[0].substring(1,)
      })
    }
    if(this.state.button==false){
      axios.post(proxyurl+"https://utf021hdq9.execute-api.us-east-2.amazonaws.com/Prod/restaurants/seating/unblock/R1",{
        "tid":this.props.buttonprops.split("\n")[0].substring(1,)
      })
    }
  }

  render(){
    return (
    <div className="containernew">
      <button className={this.state.button ? "buttonTrue": "buttonFalse"} onClick={this.handleClick}> <i className="far fa-smile"></i> {this.props.buttonprops}</button>  
    </div>
    )
  }
  
}
export default seatingChart;