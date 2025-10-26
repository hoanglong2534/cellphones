import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Order from '../components/order/Order';
import { useSelector } from 'react-redux';
import Alert from '../components/Alert/Alert';

OrderPage.propTypes = {
    
};

function OrderPage(props) {
    return (
        <div>
            <Header></Header>
            <Order></Order>
            <Footer></Footer>
        </div>
    );
}

export default OrderPage;