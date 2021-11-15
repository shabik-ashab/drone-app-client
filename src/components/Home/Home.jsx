import React from 'react';
import Navbar from '../Navbar/Navbar';
import Products from '../Products/Products';
import Banner from './Banner/Banner'
import Review from './Review/Review';

const Home = () => {
    return (
        <div>
            <Navbar 
        >
        </Navbar>
            <Banner />
            <Products 
            >
            </Products>
            <Review />
        </div>
    )
}

export default Home
