import axios from 'axios'
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom';


export const CartContext = createContext()

export default function CartContextProvider({ children }) {
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [allCartItems, setAllCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();

    // add to cart button 
    async function addToCart(productId) {
        try {
            const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            if (res.data.status == 'success') {
                toast.success(`${res.data.message}`)
                setNumOfCartItems(res.data.numOfCartItems)
            }
            // console.log(res.data.numOfCartItems);


        } catch (err) {
            toast.error("Try Again")
            console.log(err, 'eorororororrr');

        }

    }
    // calling all items added in the card 
    async function getCartItems() {
        try {
            const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            // console.log(res);
            if (res.data.status == 'success') {
                setAllCartItems(res.data.data.products)
                setTotalPrice(res.data.data.totalCartPrice)
                setNumOfCartItems(res.data.numOfCartItems)

            }
        } catch (err) {
            console.log(err, 'errrrrorrrr');

        }

    }
    // updating the count of the product in cart 
    async function updateItemCount(id, count) {
        try {
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            if (res.data.status == 'success') {
                setAllCartItems(res.data.data.products)
                setTotalPrice(res.data.data.totalCartPrice)
            }
        } catch (err) {
            console.log(err, 'errrorrrr');

        }
    }
    //  remove one product from cart 
    async function removeItem(id) {
        try {
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
                
            })
            setAllCartItems(res.data.data.products)
            setTotalPrice(res.data.data.totalCartPrice)
            setNumOfCartItems(res.data.numOfCartItems)

        } catch (err) {
            console.log(err, 'erorrrrrf');

        }
    }
    // remove all items on the cart
    async function clearAllItems() {
        try {
            const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            getCartItems();
            

        }catch(err){
            console.log(err , 'eroorrr');
            
        }
    }

    return <>
        <CartContext.Provider value={{ addToCart, numOfCartItems, getCartItems, allCartItems, updateItemCount, totalPrice, removeItem , clearAllItems}}>
            {children}
        </CartContext.Provider>


    </>
}
