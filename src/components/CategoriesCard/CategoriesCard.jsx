import React, { useState } from 'react'

export default function CategoriesCard(props) {
 
    const { image, name } = props.Categories;

    return <>

        <div className=" bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href='#'>
                <img className="p-6 rounded-t-lg h-100 w-100" src={image} alt={name} />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl text-center font-semibold tracking-tight text-amber-600">{name}</h5>
                </a>

            </div>
        </div>

    </>
}
