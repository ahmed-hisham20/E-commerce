import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'


export default function Cart() {
  // destructing from cart context 
  const { getCartItems, allCartItems, updateItemCount, totalPrice, removeItem, numOfCartItems, clearAllItems } = useContext(CartContext)
  useEffect(() => {
    getCartItems()
  }, [])
  return <>
    <div className='container m-auto'>
      {numOfCartItems == 0 ? <>
        <div className='my-32'>
          <h1 className='text-center text-5xl mb-8 font-semibold'>Your Cart Is Empty</h1>
          <Link to='/products'>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
              Go To Shopping</button>
          </Link>

        </div>
      </> : <>
        <div className=' mt-8 mb-5 m-auto'>
          <div className=' flex justify-between items-center'>
            <h2 className='text-gray-600 text-3xl font-semibold'>Shopping Cart</h2>
            <button type="button" onClick={() => clearAllItems()} className="focus:outline-none   text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Clear All</button>
          </div>
          <div className='flex justify-between items-center pt-4'>
            <h3 className='text-2xl text-gray-600 font-medium'>Total Price : <span className='text-blue-700' >{totalPrice}</span> </h3>
            <h3 className='text-2xl text-gray-600 font-medium'>Number of Items : <span className='text-blue-700' >{numOfCartItems}</span> </h3>

          </div>

        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {allCartItems.map((item) => (
                <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={item.product.imageCover} alt={item.product.title} className="w-16 md:w-32 max-w-full max-h-full" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button disabled={item.count == 1} onClick={() => { updateItemCount(item.product.id, item.count - 1) }} type="button" className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600">
                        <span className="sr-only">Decrease quantity</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <span>{item.count}</span>
                      <button onClick={() => { updateItemCount(item.product.id, item.count + 1) }} type="button" className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600">
                        <span className="sr-only">Increase quantity</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4">
                    <a href='#' onClick={() => { removeItem(item.product.id) }} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>}

    </div>




  </>
}
