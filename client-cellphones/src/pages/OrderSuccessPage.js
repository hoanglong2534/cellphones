import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import VnPaySuccess from '../components/order/VnPaySuccess';

export default function OrderSuccessPage() {
    return (
        <div>
            <Header></Header>
            <VnPaySuccess></VnPaySuccess>
            <Footer></Footer>
        </div>
    );
}
