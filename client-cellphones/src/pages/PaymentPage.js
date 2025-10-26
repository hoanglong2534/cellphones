import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Payment from '../components/order/Payment';

export default function PaymentPage() {
    return (
        <div>
            <Header></Header>
            <Payment></Payment>
            <Footer></Footer>
        </div>
    );
}
