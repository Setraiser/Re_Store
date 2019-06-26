import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from '../../utils';
import './shop-header.css';
import {Link} from 'react-router-dom';

const ShopHeader = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
	    <Link to="/">
	    	<div className="logo text-dark" href="#">ReStore</div>
	    </Link>
	    
	    <div className="shopping-cart">
	      <i className="cart-icon fa fa-shopping-cart" />
	       	{numItems} items (${total})
	    </div>
    	
    </header>
  );
};

const updateOrderCount = (cartItems) => {
	let newValue = 0;
	for (let key in cartItems) {
		newValue += cartItems[key]['count'];
	}
	return newValue;
};

const mapStateToProps = ({shopingCart: {cartItems, orderTotal}}) => {
	return {cartItems, orderTotal};
};

class ShopHeaderContainer extends Component {
	render() {
		const {cartItems, orderTotal} = this.props;
		let orderCount = updateOrderCount(cartItems);
		return <ShopHeader numItems={orderCount} total={orderTotal} />
	}
}



export default compose(connect(mapStateToProps))(ShopHeaderContainer);

