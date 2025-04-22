
import ProductCard from '../ProductCard/ProductCard'
import Loading from '../Loading/Loading'
import { Swiper, SwiperSlide } from 'swiper/react'
import slider1 from '../../assets/images/slider-image-1.jpeg'
import slider2 from '../../assets/images/slider-image-2.jpeg'
import slider3 from '../../assets/images/slider-image-3.jpeg'
import banner1 from '../../assets/images/grocery-banner.png'
import banner2 from '../../assets/images/grocery-banner-2.jpeg'
import { Autoplay, Pagination } from "swiper/modules";
import useCategories from '../../Hooks/useCategories'
import useProducts from '../../Hooks/useProducts'
import { useEffect } from 'react'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'



export default function Home() {

  const { getCartItems } = useContext(CartContext)

  // get all products form 'useProducts'
  const { allProductsData, isLoading } = useProducts()

  // call data from "useCategories"
  const { categoriesData } = useCategories()
  useEffect(() => {
    getCartItems()
  }, [])

  return <>
    {isLoading ? <Loading /> : <>
      {/* slider  */}

      <div className="container mx-auto overflow-hidden">
        <div className="grid grid-cols-12 pb-20 pt-20  ">
          <div className='lg:col-span-8 md:col-end-7 col-span-6 ' >
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
              }}
            >
              <SwiperSlide><img src={slider1} className='w-full h-100' alt="" /></SwiperSlide>
              <SwiperSlide><img src={slider2} className='w-full h-100' alt="" /></SwiperSlide>
              <SwiperSlide><img src={slider3} className='w-full h-100' alt="" /></SwiperSlide>
            </Swiper>
          </div>
          <div className='lg:col-span-4 md:col-span-5 col-span-6 '>
            <img src={banner1} className='h-1/2' alt="" />
            <img src={banner2} className='h-1/2' alt="" />
          </div>
        </div>
      </div>

      {/* slider  */}

      {/* Categories slider  */}
      <div className="container mx-auto overflow-hidden pb-20">
        <h2 className='headers-title'>Featured Categories</h2>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={6}
          loop={true}
          autoplay={{
            delay: 5000
          }}
        >
          {categoriesData?.data.data.map((cat) => <SwiperSlide key={cat._id}>
            <img src={cat.image} className='h-[250px] w-full' alt={cat.name} />
            <div className='text-center pt-8'>{cat.name}</div>
          </SwiperSlide>
          )}
        </Swiper>
      </div>
      {/* Categories slider  */}

      {/* product section */}
      <div className="container mx-auto">
        <h2 className='headers-title'>popular Products</h2>
        <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' >
          {allProductsData?.slice(0, 20).map((product) => <ProductCard product={product} key={product._id} />)}
        </div>
      </div>

    </>}

  </>
}
