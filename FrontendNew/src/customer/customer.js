import React, { Component } from 'react';
import axios from 'axios';



export default class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RName:'',
      RBranch:'',
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
    const {  RName, CNum, CName, RBranch} = this.state;
    
    var rid='';
    var rescount='';
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    
    
    // API call to fetch resid
    const options1 = {
      url: proxyurl+'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/customer/fetchid',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data:{ 'ResName': `${RName}`,'ResBranch':`${RBranch}`}
    };


    
    console.log('here again')
    axios(options1)
      .then(response1 => {
        if ('resid' in response1.data){
          rid=response1.data['resid'];
          rescount=response1.data['rescount'];

          sessionStorage.setItem("rid",rid );
        
          //console.log("RESID FETCHED : "+sessionStorage.getItem("rid"))
          //console.log("MEMBERS"+ typeof(CNum))
          //console.log("RES COUNT"+ rescount + typeof("rescount"))
          //console.log("Calling allocate...")
          //console.log(CNum, typeof(CNum));
          //console.log(sessionStorage.getItem("rid"), typeof(sessionStorage.getItem("rid")));
          //console.log(rescount, typeof(rescount));

          const options2 = {
            url: proxyurl+'https://u4gkjhxoe5.execute-api.us-east-2.amazonaws.com/Prod/customer/allocatetable',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data:{ 'members': CNum,'resid':sessionStorage.getItem("rid"),'rescount':rescount}
          };
      
          
          
          axios(options2)
            .then(response2 =>{
              if('table' in response2.data){

                var t= response2.data['table']
                sessionStorage.setItem('table',t)

                var cid=response2.data['rescount']
                sessionStorage.setItem('cid',"C"+cid);
                console.log("CID: "+sessionStorage.getItem('cid'))
                
                alert(response2.data['message']+"\nTable Number: "+sessionStorage.getItem("table"));
                this.props.history.push(`/custhome`)
                
              }              
              else{
                alert("SORRY!\n"+response2.data['message']);
              }
              
              console.log("Response 2: "+response2.data['message']);
            } );  
        }
        console.log(response1.data['message']);
        //alert(response1.data['message']);

      });

     console.log('Called the alloc api');
     sessionStorage.setItem('cname',CName);

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

                    type="number"
                    name="CNum"
                    className="form-control"
                    placeholder="How many of you? (Number)"
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

              <div className="form-group">
                <label htmlFor="id">Restaurant Branch</label>
                <input

                    type="text"
                    name="RBranch"
                    className="form-control"
                    placeholder="Which Branch?"
                    onChange={this.handleChange}
                    value={this.state.RBranch}               
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
