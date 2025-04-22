import React, { useState } from 'react'
import useProducts from '../../Hooks/useProducts'
import Loading from '../Loading/Loading'
import ProductCard from '../ProductCard/ProductCard'

export default function Products() {
  // call data from 'useProducts'
  const { allProductsData, isLoading } = useProducts()

  return <>
    {isLoading ? <Loading /> : <div className="container mx-auto mt-8">
      <h2 className='headers-title'>All Products</h2>
      <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' >
        {allProductsData?.map((product) => <ProductCard product={product} key={product._id} />)}
      </div>
    </div>}



  </>
}
