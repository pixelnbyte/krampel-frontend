import React from 'react';
import '../assets/css/orders.css';
import { withRouter } from "react-router-dom";

import Search from './Search';
import OrderTable from './OrderTable';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Orders extends React.Component {

  constructor() {
    super();

    this.state = {
      orders: this.getData(),
      selected: false,
      createList: false,
      createType: 'selected',
      startDate: new Date(),
      shipBy: 'on'
    }
    console.log(this.state.startDate);
  }

  getData = () => {
    var ordersData = [
      {
        id: 1112,
        status: 'awaiting',
        shipDate: '12/01/2021',
        items: this.getItems(1112),
        selected: false
      },
      {
        id: 1113,
        status: 'pending',
        shipDate: '11/01/2021',
        items: this.getItems(1112),
        selected: false
      },
      {
        id: 1114,
        status: 'awaiting',
        shipDate: '12/01/2021',
        items: this.getItems(1112),
        selected: false
      },
      {
        id: 1115,
        status: 'awaiting',
        shipDate: '12/01/2021',
        items: this.getItems(1112),
        selected: false
      },
      {
        id: 1116,
        status: 'awaiting',
        shipDate: '12/01/2021',
        items: this.getItems(1112),
        selected: false
      },
      {
        id: 1117,
        status: 'awaiting',
        shipDate: '12/01/2021',
        items: this.getItems(1112),
        selected: false
      },
      {
        id: 1118,
        status: 'awaiting',
        shipDate: '12/01/2021',
        items: this.getItems(1112),
        selected: false
      }
    ];

    return ordersData;
  }

  getItems = (id) => {
    var url = "https://cdn11.bigcommerce.com/s-5kcaxd50lw/images/stencil/500x659/products/104525/6739578/e13cf4c445bbafa9e9b34d265f4835de7a2b316b187e68e86634a9b291db2570__75843.1599079672.jpg?c=2";
    var items = [
      {
        id: 123,
        img: url,
        name: "Crayola Glow Lamp",
        sku: "CRAYOLA-GLOWLAMP",
        qty: 5,
        location: "11A/32",
        status: "picking"
      }
    ];

    return items;
  }

  handleCheckbox = (order) => {
    var ordersArr = this.state.orders;
    Object.keys(ordersArr).forEach(item => {
      if(ordersArr[item] == order) {
        ordersArr[item].selected = !this.state.orders[item].selected; 
      }
      return item;
    });

    this.setState({orders: ordersArr});
  }

  handleSelectAll = () => {
    var ordersArr = this.state.orders;
    Object.keys(ordersArr).forEach(item => {
      ordersArr[item].selected = !this.state.selected;
      return item;
    });

    this.setState({selected: !this.state.selected});
    this.setState({orders: ordersArr});
  }

  handleSearch = (event) => {
    var term = event.target.value;
    this.setState({orders: this.getData().filter(function(order) {
      var match = false;
      for (const [key, value] of Object.entries(order)) {
        if(value.toString().includes(term.toLowerCase())){
          match = true;
        }
      }   
      return match;
    })});
  }

  createList = () => {
    this.props.history.push("Picking/12");
  }

  openCreate = () => {
    this.setState({createList: !this.state.createList});
  }

  handleChange = (value) => {
    this.setState({createType: value});
  }

  shipToggle = (val) => {
    this.setState({shipBy: val});
  }

  render(){
    var temp = (<div className="dropdown">
                <a href="#">Selected Orders</a>
                <a href="#">Ship Date</a>
              </div>);

    const options = [
      { value: 'selected', label: 'Selected Orders' },
      { value: 'shipby', label: 'Ship by Date' }
    ];

    var createList = '';
    var createForm = '';
    if(this.state.createType == 'shipby') {
      createForm = (<React.Fragment>
              <label>Date <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} /></label>
              <div className="switch">
                <a href="#" className={this.state.shipBy == 'on' ? 'active' : ''} onClick={() => this.shipToggle('on')}>Ship On</a>
                <a href="#" className={this.state.shipBy == 'before' ? 'active' : ''} onClick={() => this.shipToggle('before')}>Ship Before</a>
              </div>
              </React.Fragment>);
    }
    if(this.state.createList) {
      createList = (
        <div className="new-user action-dropdown">
          <form>
            <Select options={options} className="select" placeholder="Create by" onChange={(e) => this.handleChange(e.value)} />
            {createForm}
            <a href="#" className="button filled" onClick={this.createList}>Create</a>
          </form>
        </div>);
    }
    
    return (
      <div> 
        <div className="table-header">
          <Search handleSearch={this.handleSearch} />
          <div className="actions">
            <div className="create-wrapper">
              <a href="#" className="button filled" onClick={this.openCreate}>Create Picklist</a>
            </div>
            <a href="#" className="button icon"><i className="refresh"></i></a>
          </div>
        </div>
        {createList}
        <OrderTable orders={this.state.orders} handleCheckbox={this.handleCheckbox} selectAll={this.handleSelectAll} />
      </div>
    );
  }
}

export default withRouter(Orders);