
import React from 'react'
import CategoriesCard from '../CategoriesCard/CategoriesCard'
import Loading from '../Loading/Loading'
import useCategories from './../../Hooks/useCategories';


export default function Categories() {
  // call data from "useCategories"
const {categoriesData , categoriesLoading} = useCategories()

  return <>
  
  {categoriesLoading ? <Loading/> :  <div className="container mx-auto mt-8">
        <h2 className='headers-title'>Featured Categories</h2>
        <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' >
          {categoriesData.data.data.map((Categories) => <CategoriesCard  Categories={Categories} key = {Categories._id}  />)}
        </div>
      </div> }

  </>
}
