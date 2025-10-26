import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Search from '../components/Search/Search';

function SearchPage(props) {
    return (
        <div>
            <Header></Header>
            <Search></Search>
            <Footer></Footer>
        </div>
    );
}

export default SearchPage;