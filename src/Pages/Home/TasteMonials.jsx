import React, { useEffect, useState } from 'react';
import SectionsTitle from '../../Components/SectionsTitle';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import '@smastrom/react-rating/style.css'
import { Rating } from '@smastrom/react-rating';

const TasteMonials = () => {

    const [review, setReview] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => { setReview(data) })
    }, [])


    return (
        <section className='my-20'>
            <SectionsTitle
                subHeading={'What Our Client Say'}
                heading={'TESTIMONIALS'}
            ></SectionsTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    review.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className='items-center mx-24 my-16 flex flex-col  m-24'>
                            <Rating
                            style={{maxWidth:180}}
                            value={review.rating}
                            readOnly
                            />
                            <p className='py-8'>{review.details}</p>
                            <h3 className='text-2xl text-orange-400'>{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default TasteMonials;