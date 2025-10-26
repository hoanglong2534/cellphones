import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Cart from '../components/ShoppingCart/Cart';

function CartPage(props) {
    return (
        <div>
            <Header></Header>
            <Cart></Cart>
            <Footer></Footer>
        </div>
    );
}

export default CartPage;