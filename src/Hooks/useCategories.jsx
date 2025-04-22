import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function useCategories() {
      // get all Categories from api 
    async function getAllCategories() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }
    
      const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
        queryKey: 'allCategories',
        queryFn: getAllCategories,
      })
  return {categoriesData , categoriesLoading}
}
