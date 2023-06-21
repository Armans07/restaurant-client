import React, { useEffect, useState } from 'react';
import SectionsTitle from '../../../Components/SectionsTitle';
import MenuItems from '../../Shared/MenuItems/MenuItems';
import UseMenu from '../../../hooks/UseMenu';

const PopularMenu = () => {
    const [menu]=UseMenu()
    const popular = menu.filter(item => item.category === 'popular')
   
    return (
        <section className='mb-12'>
            <SectionsTitle
                subHeading={'Click it Out'}
                heading={'FROM OUR MENU'}
            ></SectionsTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popular.map(item => <MenuItems
                        key={item._id}
                        item={item}>
                    </MenuItems>)
                }
            </div>
            <div className="flex justify-center">
                <button className="mx-auto btn btn-outline border-0 border-b-4 mt-5">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;