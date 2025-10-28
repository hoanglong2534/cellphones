import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
// Removed: store chat upload page

function ChatPage(props) {
    return (
        <div>
            <Header></Header>
            <div style={{padding: '2rem', minHeight: '80vh'}}>
                <h2>Trang không tồn tại</h2>
                <p>Chức năng chat với cửa hàng đã được gỡ bỏ.</p>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ChatPage;