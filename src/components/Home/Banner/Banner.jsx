import React from 'react';
import img from '../../../image/banner-img/singlebanner.jpg';



const Banner = () => {
    return (
        <>
        <div className="container">
        <img src={img} className=" mt-4 img-fluid" />
        </div>
        </>
    )
}

export default Banner
