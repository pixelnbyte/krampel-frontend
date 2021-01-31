import React from 'react';
import '../assets/css/picking.css';

import Search from './Search';
import ItemTable from './ItemTable';

export default class Picking extends React.Component {

  constructor(props) {
    super();

    this.state = {
    	items: this.getItems(props.listId),
    	isActive: (this.getStatus(props.listId) === 'in-progress' && this.getUser(props.listId) === 12)
    }
  }

  getStatus = (id) => {
  	var status = '';
  	switch(id){
  		case '12':
  			status = 'in-progress';
  			break;
  		default:
  			status = 'completed';
  			break;
  	}
  	return status;
  }

  getUser = (id) => {
  	var user = '';
  	switch(id){
  		case '12':
  			user = 12;
  			break;
  		default:
  			user = 13;
  			break;
  	}
  	return user;
  }

  getDateCompleted = (id) => {
  	var date = '12/01/2021';
  	return date;
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
      },
      {
        id: 124,
        img: url,
        name: "Crayola Glow Lamp",
        sku: "CRAYOLA-GLOWLAMP",
        qty: 5,
        location: "11A/32",
        status: "found"
      },
      {
        id: 125,
        img: url,
        name: "Crayola Glow Lamp",
        sku: "CRAYOLA-GLOWLAMP",
        qty: 5,
        location: "11A/32",
        status: "picking"
      },
      {
        id: 126,
        img: url,
        name: "Crayola Glow Lamp",
        sku: "CRAYOLA-GLOWLAMP",
        qty: 5,
        location: "11A/32",
        status: "not-found"
      },
      {
        id: 127,
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

  handleSearch = (event) => {
    var term = event.target.value;
    this.setState({items: this.getItems().filter(function(item) {
      var match = false;
      for (const [key, value] of Object.entries(item)) {
        if(value.toString().toLowerCase().includes(term.toLowerCase())){
          match = true;
        }
      }   
      return match;
    })});
  }

  handleAction = (action, id) => {
		var index = this.state.items.findIndex(x => x.id === id);
		var items = this.state.items;
		items[index].status = action;
		this.setState({items: items});
  }

  render(){
  	var dateCompleted = '';
  	if(this.getStatus() == 'completed') {
  		dateCompleted = <p><strong>Completed on:</strong> {this.getDateCompleted(this.props.listId)}</p>
  	}

    return (
    	<div>
        <div className="table-header">
	    		<Search handleSearch={this.handleSearch} />
	    		{dateCompleted}
	    	</div>
		    <div className="table-body">
		    	<ItemTable items={this.state.items} status={this.state.isActive} handleAction={this.handleAction} />
		    </div>
    	</div>
    );
  }
}