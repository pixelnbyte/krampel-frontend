import React from 'react';
import '../assets/css/picklist.css';
import { withRouter } from "react-router-dom";

import Search from './Search';
import ListCard from './ListCard';
import Select from 'react-select';

class PickList extends React.Component {

  constructor() {
    super();

    this.state = {
    	lists: this.getPicklists()
    }

  }

  getPicklists = () => {
  	var lists = [
			{
				id: 12,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'completed'
			},
			{
				id: 13,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'in-progress'
			},
			{
				id: 14,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'completed'
			},
			{
				id: 15,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'completed'
			},
			{
				id: 16,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'pending'
			},
			{
				id: 17,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'completed'
			},
			{
				id: 18,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'completed'
			},
			{
				id: 19,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'pending'
			},
			{
				id: 20,
				user: 'Duddy',
				dateCreated: '12/01/2021',
				items: 15,
				itemsPicked: 12,
				status: 'completed'
			}
		];

  	return lists;
  }

  handleSearch = (event) => {
    var term = event.target.value;
    this.setState({lists: this.getPicklists().filter(function(list) {
      var match = false;
      for (const [key, value] of Object.entries(list)) {
        if(value.toString().toLowerCase().includes(term.toLowerCase())){
          match = true;
        }
      }   
      return match;
    })});
  }

  handleSort = (e) => {
  	console.log(e.value);
  	var lists = this.state.lists;
  	this.setState({lists: lists.sort((a, b) => (a[e.value] > b[e.value]) ? 1 : -1)});
  }

  handleClick = (id) => {
  	// console.log('here');
  	this.props.history.push("Picking/" + id);
  }

  render(){
		const options = [
		  { value: 'dateCreated', label: 'Date' },
		  { value: 'id', label: 'ID' }
		]

    return (
    	<div>
        <div className="table-header">
	    		<Search handleSearch={this.handleSearch} />
	    		<Select options={options} className="select" placeholder="Sort by" onChange={this.handleSort} />
        </div>
		    <div className="table-body">
		    	<div className="grid">
			    	{this.state.lists.map(list => (
	            <ListCard key={list.id} list={list} handleClick={this.handleClick} />
	          ))}
          </div>
		    </div>
    	</div>
    );
  }
}
export default withRouter(PickList);