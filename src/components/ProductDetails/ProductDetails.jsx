import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CartContext } from '../Context/CartContext'

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext)
  let [details, setDetails] = useState()
  const { id } = useParams()



  // getting details product from Api 
  async function getProductDetails() {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setDetails(res.data.data)
    // save the data in localstorage 
    localStorage.setItem(`product-${id}`, JSON.stringify(res.data.data));

  }

  useEffect(() => {
    const cachedProduct = localStorage.getItem(`product-${id}`);

    if (cachedProduct) {
      // if product in local storage 
      setDetails(JSON.parse(cachedProduct));
    } else {
      // if product not in local storage , call this func
      getProductDetails();
    }
  }, [id]);

  return <>
    {details ? <div className=" pt-20 flex gap-30 items-center justify-center container mx-auto">
      <div className="w-[400px]">
        {/* details images swiper  */}
        {details?.images && (
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
          >
            {details.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} className='w-full h-100 object-cover' alt={`slide-${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {/* details text  */}
      <div className="w-[80%] flex-col">
        <h2 className='font-semibold text-2xl pb-5'>{details?.title}</h2>
        <span className='font-medium'>{details?.description}</span>
        <p className='text-amber-600 font-bold py-3'>{details?.category.name}</p>

        <div className="flex justify-between pb-5" >
          <div>
            <span>{details?.price} EGP</span>
          </div>

          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span>{details?.ratingsAverage}</span>
          </div>

          <a href="">
            <svg className="w-[34px] h-[34px] text-red-500 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
          </a>




        </div>
        <button type="button" onClick={()=>{addToCart(id)}} className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add to Cart</button>

      </div>


    </div> : <Loading />}


  </>
}
