import React from 'react';
import Products from '../Products/Products';
import Banner from './Banner/Banner'

const Home = (props) => {
    const {handleClick} = props;
    return (
        <div>
            <Banner />
            <Products handleClick={handleClick}
            >
            </Products>
        </div>
    )
}

export default Home
