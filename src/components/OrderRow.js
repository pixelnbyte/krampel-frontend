import React, { useState } from 'react';
import OrderItem from './OrderItem';

const OrderRow = (props) => {
  const [open, setOpen] = useState(false);
  var url = "https://cdn11.bigcommerce.com/s-5kcaxd50lw/images/stencil/500x659/products/104525/6739578/e13cf4c445bbafa9e9b34d265f4835de7a2b316b187e68e86634a9b291db2570__75843.1599079672.jpg?c=2";
  var img = {
    backgroundImage: 'url(' + url + ')'
  }

  const [windowBottom, setWindowBottom] = useState(window.outerHeight + document.body.offsetHeight);
  const [bottom, setBottom] = useState("");
  window.onscroll = function(ev) {
    setWindowBottom(window.outerHeight + document.body.offsetHeight); 
  };

  function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  function openPopup(el) {
    setOpen(true);
  }

  var status = '';
  switch(props.order.status) {
    case 'awaiting':
      status = 'Awaiting Shipment';
      break;

    case 'pending':
      status = 'Peding Delivery';
      break;

    default:
      break;
  }

  return (
    <tr key={props.order.id}>
      <td><input type="checkbox" onChange={() => props.checkboxHandler(props.order)} checked={props.order.selected} /></td>
      <td>{props.order.id}</td>
      <td><span className={`status ${props.order.status}`}>{status}</span></td>
      <td>{props.order.shipDate}</td>
      <td>
        {props.order.items.map(item => (
          <OrderItem key={item.id} item={item} />
        ))}
      </td>
    </tr>
  );
}

export default OrderRow;
