import React from 'react';
import Contact from '../Contact/Contact';
import Footer from '../Footer.jsx/Footer';
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
            <Contact />
            <Footer />
            
        </div>
    )
}

export default Home
