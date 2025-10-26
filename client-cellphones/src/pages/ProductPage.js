import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AllProduct from '../components/allProduct/AllProduct';

ProductPage.propTypes = {
    
};

function ProductPage(props) {
    return (
        <div>
            <Header></Header>
            <AllProduct></AllProduct>
            <Footer></Footer>
        </div>
    );
}

export default ProductPage;