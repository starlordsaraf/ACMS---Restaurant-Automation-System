import React from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

export default class OrderGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels:[], //['January', 'February', 'March', 'April', 'May'],
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
      url: proxyurl+'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/restaurants/getorders',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{ 'Resid': resid}
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
              label: 'No.of Orders',
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
        alert(response.data['message']);
      });
  }

  componentDidMount() {
    this.renderGraph();
  }
  
  
  render() {
    
    return (
      <div >
        <Bar
          data={this.state}
          options={{
            scales: {yAxes:[{ticks: {beginAtZero:true} }]  },
              
            title:{
              display:true,
              text:'Popular Dishes',
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
