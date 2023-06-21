import React from 'react';
import SectionsTitle from '../../../Components/SectionsTitle';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit , reset } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])
        
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })

            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url
                    const { name, price, recipe, category } = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgUrl }
                    console.log(newItem);
                    
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            console.log('after posting new menu item', data.data)
                            if(data.data.insertedId){
                                reset();
                                Swal.fire({
                                    position: 'top',
                                    icon: 'success',
                                    title: 'Item Added Successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                            }
                        })
                }
            })
    };



    return (
        <div className='w-full px-10'>
            <Helmet>
                Bistro Boss || Add an items
            </Helmet>

            <SectionsTitle subHeading="What is new" heading='Add an item'></SectionsTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-control w-full  ">
                    <label class="label">
                        <span class="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe name" class="input input-bordered w-full  "
                        {...register("name", { required: true, maxLength: 120 })}
                    />
                </div>
                <div className='flex gap-2'>
                    <div class="form-control w-full  ">
                        <label class="label">
                            <span class="label-text font-semibold">Categories*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} class="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>Pizza</option>
                            <option>Salad</option>
                            <option>Drink</option>
                            <option>Dessert</option>
                            <option>Soup</option>
                        </select>
                    </div>
                    <div class="form-control w-full  ">
                        <label class="label">
                            <span class="label-text font-semibold">Price*</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" placeholder="Type here" class="input input-bordered w-full  " />
                    </div>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Recipe Details*</span>
                    </label>
                    <textarea {...register("recipe", { required: true })} class="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>
                <div class="form-control w-full  ">
                    <label class="label">
                        <span class="label-text font-semibold">Item Image*</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} class="file-input file-input-bordered w-full  " />
                </div>
                <input className='btn btn-sm my-4' type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;