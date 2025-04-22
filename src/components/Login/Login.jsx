import React, { useContext, useState } from 'react'
import { useFormik, useFormikContext } from 'formik'
import * as yup from 'yup'
import values from './../../../node_modules/lodash-es/values';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../Context/AuthContext';

export default function Login() {
  let [msg, setMsg] = useState(null)
  let [successMsg, setSuccessMsg] = useState(null)
  let [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setToken} = useContext(AuthContext)

  const validationSchema = yup.object().shape({
    email: yup.string().required('email is rquired').email('please enter vaild email'),
    password: yup.string().required('password is required').matches(/^.{8,}$/, 'password should at least 8 chars'),
  })

  async function login(values) {
    setMsg(null)
    setSuccessMsg(null)
    setLoading(true)
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      setSuccessMsg(res.data.message)
      setToken(res.data.token)
      localStorage.setItem('token', res.data.token) 
      setTimeout(() => {
        navigate('/')
      }, 1000)

    } catch (err) {
      setMsg(err.response.data.message)


    } finally {
      setLoading(false)
    }

  }



  // using formik to handle my form 
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: login,
    validationSchema

  });

  return <>

    <form onSubmit={formik.handleSubmit} className="w-[70%] mx-auto py-6">
      <h1 className='text-3xl'>Sign in to FreshCart</h1>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@example.com" />
        {formik.errors.email && formik.touched.email ? <span className='text-red-600'> {formik.errors.email} </span> : null}
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
        {formik.errors.password && formik.touched.password ? <span className='text-red-600'> {formik.errors.password} </span> : null}
      </div>

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
        </div>
        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">Remember me</label>
      </div>
      <div className='flex items-center gap-2'>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {loading ? 'Loading...' : 'Submit'}
        </button>
        {msg ? <p className='text-red-800'>{msg}</p> : null}
        {successMsg ? <p className='text-green-700'>{successMsg}</p> : null}
      </div>

    </form>

  </>
}
