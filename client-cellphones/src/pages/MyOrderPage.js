import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MyOrder from '../components/MyOrder/MyOrder';

function MyOrderPage(props) {
    return (
        <div>
           <Header></Header> 
           <MyOrder></MyOrder>
           <Footer></Footer>
        </div>
    );
}

export default MyOrderPage;