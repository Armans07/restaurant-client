import React from 'react';
import SectionsTitle from '../../../Components/SectionsTitle';
import featureImg from "../../../assets/home/featured.jpg"
import './Feature.css'
const Feature = () => {
    return (
        <div className='feature-item bg-fixed text-white pt-8 my-16 rounded'>
            <SectionsTitle
                subHeading={"Check It Out"}
                heading={'Feature Item'}
            > </SectionsTitle>
            <div className='md:flex justify-center bg-slate-500 bg-opacity-60 items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={featureImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2023</p>
                    <p className='uppercase'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, necessitatibus culpa itaque ut illo iure aliquam quam similique explicabo libero, voluptas laborum, deserunt adipisci quisquam eligendi reiciendis quia repellendus voluptatibus. Where can i get more?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illum officiis asperiores cupiditate aliquam illo voluptatem ipsam repellat et odio?</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-5">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Feature;