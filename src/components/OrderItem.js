import React, { useState } from 'react';

const OrderRow = (props) => {
  var item = props.item;

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

  const [open, setOpen] = useState(false);
  function openPopup(el) {
    setOpen(true);
  }

  var img = { backgroundImage: 'url(' + item.img + ')' };

  return (
      <div key={item.id} className="item-wrapper">
        <a href="#" className="item-icon" style={img} onMouseEnter={() => openPopup()} onMouseLeave={() => setOpen(false)} ></a>
        <div className={"popup " + (open ? 'open' : '') + bottom}
              ref={el => {
                if (!el) return;
                var top = getOffset(el).top;
                if(top > (windowBottom - 240)){
                  setBottom(" bottom");
                } 
              }}
          >
          <a href="#" className="close">x</a>
          <div className="image-wrapper">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="item-details">
            <h3>{item.name}</h3>
            <p className="sku">SKU: {item.sku}</p>
            <p className="info">Quantity: {item.qty}<br />Location: {item.location}</p>
            <p className="status">Status <span className={item.status}>{item.status}</span></p>
          </div>
        </div>
      </div>
  );
}

export default OrderRow;
