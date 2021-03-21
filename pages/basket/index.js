import Layout from '../../components/layout'
import ProductInBasket from '../../components/product/productInBasket.js'
import { useState, useEffect } from 'react'
import Head from 'next/head'


export default function Page () {


  let [sumItem, setSumItem] = useState('0')
  useEffect(()=>{
    const localStor = localStorage.getItem('_basket')
    if (localStor) {
    const  localStorJson = JSON.parse(localStor)
      setSumItem(localStorJson.length)
    }
    else {
      setSumItem('0')
    }
  })




  return (
    <Layout propsBasket={sumItem}>
    <Head>
      <meta name = "robots" content = "noindex, nofollow" />
    </Head>
      <h1 style={{
        width: '90%',
        margin: 'auto',
        padding: '51px 0px 30px 0px'
      }}>Товары в корзине</h1>
        <ProductInBasket/>
    </Layout>
  )
}
