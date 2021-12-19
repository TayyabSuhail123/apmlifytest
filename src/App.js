import './App.css';
import React from 'react';
import axios from 'axios';
import { Table, Tag, Space } from 'antd';


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Manufacturer',
    dataIndex: 'manufacturer',
    key: 'manufacturer',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },

 
];




class App extends React.Component {

  


   componentDidMount()
   {
    
    this.getAllCars();
   }


  constructor(props) {
    super(props);
    this.state = {name: '',desc:'',type:'',fuelType:'',manu:'',data:[]};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getAllCars()
  {
    
    // axios.get(`http://localhost:3000/cars`)
    // .then(res => {
    //   debugger;
    //   const cardata = res.data.Items;
    //   this.setState({data:[]});
    //   this.setState({data:cardata});

    // })

    axios.get(`https://2bugjiyrt9.execute-api.us-east-2.amazonaws.com/prod/cars`)
    .then(res => {
      debugger;
      console.log("getting all cars");
      const cardata = res.data.Items;
      console.log(cardata);
      this.setState({data:[]});
      this.setState({data:cardata});

    })
  }

  handleSubmit(event) {
    debugger;
    event.preventDefault();
   
    const cardata = { 
      name:this.state.name,
      desc:this.state.desc,
      typefuel:this.state.fuelType,
      type:this.state.type,
      manu:this.state.manu,
     };

     debugger;


    // axios.put('http://localhost:3000/cars', cardata)
    // .then(res => {
    //   debugger;
    //   if(res.status===202)
    //   {
    //     this.getAllCars();
    //    alert("Car added to db");
    //    this.setState({
    //     name: '',desc:'',type:'',fuelType:'',manu:''
    //   });
    //   }
      
    // })

    axios.put('https://2bugjiyrt9.execute-api.us-east-2.amazonaws.com/prod/cars', cardata)
    .then(res => {
      debugger;
      if(res.status===202)
      {
        this.getAllCars();
       alert("Car added to db");
       this.setState({
        name: '',desc:'',type:'',fuelType:'',manu:''
      });
      }
      
    })

  

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Add New Car</h1>
        <form onSubmit={this.handleSubmit}>
    <label>
      Name:
      <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
    </label>
    <br></br>
    <label>
      Desc:
      <input type="text" name="desc" value={this.state.desc} onChange={this.handleInputChange}  />
    </label>
    <br></br>
    <label>
      Type:
      <input type="text" name="type" value={this.state.type} onChange={this.handleInputChange} />
    </label>
    <br></br>
    <label>
      fuelType:
      <input type="text" name="fuelType" value={this.state.fuelType} onChange={this.handleInputChange} />
    </label>
    <br></br>
    <label>
    manufacturer:
      <input type="text" name="manu"  value={this.state.manu} onChange={this.handleInputChange}/>
    </label>
    <input type="submit" value="Submit" />
  </form>
<br></br>
<br></br>
  <Table columns={columns} dataSource={this.state.data}></Table>
        </header>
      </div>
    );

    
  }
  
}

export default App;
