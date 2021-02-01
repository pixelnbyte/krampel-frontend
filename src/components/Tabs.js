import React from 'react';
import '../assets/css/tabs.css';
import { Link } from 'react-router-dom';

import Header from './Header';
import Orders from './Orders.js';
import PickLists from './PickLists.js';
import Picking from './Picking.js';

export default class Tabs extends React.Component {

  constructor(props) {
    super();
    console.log(props);
  }

  render(){
    var tab = <Orders />;
    switch(this.props.status) {
      case 'picklist':
        tab = <PickLists />;
        break;
      case 'picking':
        tab = <Picking listId={this.props.match.params.id} />;
        break;
      default:
        tab = <Orders />;
        break;
    }

    return (
      <div className="App">
        <Header page="picker" />
        <div className="App-body wrapper">
          <div className="tabs">
            <div className="tab-header">
              <Link to="/Orders" className={this.props.status === 'orders' ? "active" : "" }>Orders</Link>
              <Link to="/Picking" className={this.props.status === 'picklist' || this.props.status === 'picking' ? "active" : "" }>Picking</Link>
            </div>
            <div className="tab-body">
              {tab}
            </div>
          </div>
        </div>
      </div>
    );
  }
}