import React from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class CustomersDaily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels:[], 
      datasets: []
    
    };
    this.renderGraph = this.renderGraph.bind(this);
}

 
  async renderGraph(){
    console.log("came here")
    var x,y;
    var resid=sessionStorage.getItem("resid");
    //var resid="1";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const options = {
      url: proxyurl+'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/gettodaysorders/'+resid,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    console.log('\ncalling API...')
    axios(options)
      .then(response => {
         
        if ('labels' in response.data){
          x=response.data['labels'];
          y=response.data['data'];
          console.log("\n x n y:",x,y);
          
          this.setState({
            labels:x,
            datasets: [{
              label: 'No.of Customers',
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data:y // [65, 59, 80, 81, 56]
            }]
          });
        
          }
          else{
            alert("No data for graphs yet!");
            this.props.history.push(`/home`);
          }

        console.log("\n NEW STATE: ",this.state);
        //alert(response.data['message']);
      });
  }

  componentDidMount() {
    this.renderGraph();
  }
  
  
  render() {
    
    return (
      <div >
        <div align="center">
          <NavLink to="/memgraph">Common Seating</NavLink> &emsp;&emsp;&emsp;
          <NavLink to="/ordergraph">Popular Dishes</NavLink>&emsp;&emsp;&emsp;
          <NavLink to="/Revenuegraph">Per Day Revenue</NavLink>&emsp;&emsp;&emsp;
          <NavLink to="/customersweekly">This Month's Customers</NavLink>&emsp;&emsp;&emsp;
          <br/> <br/>
                 
       </div>
        <Bar
          data={this.state}
          options={{
            scales: {yAxes:[{ticks: {beginAtZero:true} }]  },
              
            title:{
              display:true,
              text:'Today\'s Customer Count',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            
          }}
        />
      </div>
    );
  }
}
