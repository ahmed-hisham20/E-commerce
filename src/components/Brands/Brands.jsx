import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'


export default function Brands() {

  async function getAllBrands() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  const { data: allBrandsData, isLoading } = useQuery({
    queryKey: 'allBrand',
    queryFn: getAllBrands,
    cacheTime: (30 * 1000)
  })

  const brandsData = allBrandsData?.data.data

  return <>
    {isLoading ? <Loading /> : <div className="container mx-auto mt-8">
      <h2 className='headers-title'>All Brands</h2>
      <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' >
        {brandsData?.map((brand) => <React.Fragment key={brand._id}>
          <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

            <img
              className="rounded-t-lg w-full"
              src={brand.image}
              alt={brand.name}
            />

            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {brand.name}
              </h5>
            </div>
          </div>

        </React.Fragment>)}
      </div>
    </div>}


  </>
}
