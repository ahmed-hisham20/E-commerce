import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function useProducts() {
    async function getAllProducts() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      }
    
      // using react query 
      const { data, isLoading } = useQuery({
        queryKey: 'allProducts',
        queryFn: getAllProducts,
        cacheTime: (30 * 1000)
      })
      const allProductsData = data?.data.data


  return {allProductsData , isLoading}
}
