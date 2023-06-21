import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Feature from '../Feature/Feature';
import TasteMonials from '../TasteMonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Feature></Feature>
            <TasteMonials></TasteMonials>
        </div>
    );
};

export default Home;