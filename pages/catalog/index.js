import Layout from '../../components/layout.js'
// const fs = require('fs');
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'
import category from '../api/dataBase/category.json'
import products from '../api/dataBase/products.json'


export async function getServerSideProps(context) {
  // const hostname = process.env.NEXTAUTH_URL || 'http://localhost:80'
  // const res_category = await JSON.parse(fs.readFileSync('./data/category.json'))
  const data_category = await category.category


  // const res_products = await JSON.parse(fs.readFileSync('./data/products.json'))
  const data_products = await products.products


  return {
    props: {
      data_category: data_category,
      data_products: data_products,
    }, // will be passed to the page component as props
  }
}


export default function Page ({data_category, data_products}) {

  let localStorStr
  let localStorJson
  const [dataProducts, setDataProducts] = useState([{id: 's'}])
  const [dataProductsDB, setDataProductsDB] = useState('1')
  const [dataCategory, setDataCategory] = useState([])
  const [dataCategoryDB, setDataCategoryDB] = useState('1')

  const [show, setShow] = useState('Каталог')
  const [showId, setShowId] = useState('Каталог')
  const [sumItem, setSumItem] = useState('0')
  const [recoveryItem, setRecoveryItem] = useState('')
  const [recoveryColor, setRecoveryColor] = useState('')

  if ((data_category !== undefined)&(dataCategory !== data_category)&(dataCategoryDB === '1')) {
    setDataCategory(data_category)
  }
  if ((data_products !== undefined)&(dataProducts !== data_products)&(dataProductsDB === '1')) {
    setDataProducts(data_products)
  }

  useEffect(()=>{
    const localStor = localStorage.getItem('_basket')
    if (localStor) {
    const  localStorJson = JSON.parse(localStor)
      setSumItem(localStorJson.length)
    }

    const fetchData = async () => {

      if (dataProductsDB === '1') {
        const responseProd = await fetch('/api/data/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'products'
           }),
        })
        const jsonProd = await responseProd.json();
        setDataProducts(jsonProd.products)
        setDataProductsDB(jsonProd.products)

        const responseCateg = await fetch('/api/data/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'category'
           }),
        })
        const jsonCateg = await responseCateg.json();
        setDataCategory(jsonCateg.category)
        setDataCategoryDB(jsonCateg.category)
      }
    }
    fetchData()

    const localStorFilter = localStorage.getItem('_filter')
    if (localStorFilter) {
      setShow(localStorFilter)
    }
    else (
      localStorage.setItem('_filter', 'Каталог')
    )

    const localStorFilterId = localStorage.getItem('_filterId')
    if (localStorFilterId) {
      setShowId(localStorFilterId)
    }
    else (
      localStorage.setItem('_filterId', 'Каталог')
    )

    if (show !== 'Каталог') {
      try {
        recoveryItem.style.color = recoveryColor
      }
      catch {}
      const filter_point = document.querySelector(`#id_filter${showId}`)
      try {
        setRecoveryItem(filter_point)
        setRecoveryColor(filter_point.style.color)
        filter_point.style.color = '#FF4252'
      }
      catch {}

    }
  })

if ( show === 'Каталог' ) {
  return (
    <Layout propsBasket={sumItem}>
    <Head>
      <title>Каталог товаров из Японии, доступных для покупки.</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content = "Каталог товаров из Японии для красоты и здоровья. Здесь, среди лучшей Японской продукции, вы можете выбрать то, что вам необходимо."/>
      <meta charSet = "UTF-8"/>
    </Head>
      <h1 style={{
        width: '90%',
        margin: 'auto',
        padding: '51px 30px 30px 30px'
      }}>Каталог</h1>
      <div className={styles.div_main}>
        <div className={styles.div_show}>
          {dataCategory.map((image) => (
            <div onClick={(e)=>{
              localStorage.setItem('_filter', image.title)
              localStorage.setItem('_filterId', image.id)
              setShow(image.title)
              setShowId(image.id)
            }} key={image.id} className={styles.imgDivCatalog} style={{backgroundImage: `url(${image.url})`, width: `${image.width}`}}>
              <div className={styles.blackoutDivCatalog}>
                <div className={styles.containerDivCatalog}>
                  <div className={styles.titleDivCatalog}>{image.title}</div>
                  <div className={styles.outlineDivCatalog}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  )
}

if ( show !== 'Каталог' ) {

  let data_filtered = []
  if ((show !=='Все товары')&(dataProducts[0].id !== 's')&(show !== 'Товары со скидкой')) {
    dataProducts.map((prod)=>{
      prod.category.map((category)=>{
        if (category === show) {
          data_filtered.push(prod)
        }
      })
    })
  }
  else {
    if ((show === 'Товары со скидкой')&(dataProducts[0].id !== 's')) {
      dataProducts.map((prod)=>{
        if (prod.priceDiscount !== '') {
          data_filtered.push(prod)
        }
      })

    } else {
      dataProducts.map((prod)=>{
        data_filtered.push(prod)
      })
    }
  }

  let height_for_div_menu = 210
  dataCategory.map((image)=>{
    height_for_div_menu+=47
  })

  return (
    <Layout propsBasket={sumItem}>
      <h1 style={{
        width: '90%',
        margin: 'auto',
        padding: '51px 30px 30px 30px'
      }}>{show}</h1>
      <div className={styles.div_main}>
        <div className={styles.div_menu} style={{ height: height_for_div_menu}}>
        <div className={styles.div_heading_menu}>Фильтр</div>
        <div id={`id_filter0`} className={styles.div_all} onClick={(e)=>{
          localStorage.setItem('_filter', 'Все товары')
          localStorage.setItem('_filterId', '0')
          setShow('Все товары')
          setShowId('0')
          }}>Все товары</div>
          {dataCategory.map((image) => (
            <div key={image.id} id={`id_filter`+image.id} className={styles.div_punkt_menu} onClick={(e)=>{
              localStorage.setItem('_filter', image.title)
              localStorage.setItem('_filterId', image.id)
              setShow(image.title)
              setShowId(image.id)
            }}>{image.title}</div>
          ))}
          <div id={`id_filter_1`} className={styles.div_sale_filter} onClick={(e)=>{
            localStorage.setItem('_filter', 'Товары со скидкой')
            localStorage.setItem('_filterId', '_1')
            setShow('Товары со скидкой')
            setShowId('_1')
          }}>Товары со скидкой</div>
          <div className={styles.div_sbros} onClick={(e)=>{
            localStorage.setItem('_filter', 'Каталог')
            localStorage.setItem('_filterId', 'Каталог')
            setShow('Каталог')
            setShowId('Каталог')
          }}>Сброс</div>
        </div>
        <div className={styles.div_show}>
        {data_filtered.map((product) => (
          <div className={styles.container}
          onMouseMove={(e) => {
            const card = document.querySelector(`#idCard${product.id}`)
            const coord = card.getBoundingClientRect()
            let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 20;
            let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 35;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
          }}
          onMouseEnter={(e) =>{
            const card = document.querySelector(`#idCard${product.id}`)
            const сircle = document.querySelector(`#idCircle${product.id}`)
            const img = document.querySelector(`#idImg${product.id}`)
            const title = document.querySelector(`#idTitle${product.id}`)
            const description = document.querySelector(`#idDescription${product.id}`)
            const volume = document.querySelector(`#idVolume${product.id}`)
            const price = document.querySelector(`#idPrice${product.id}`)
            const button = document.querySelector(`#idButton${product.id}`)
            card.style.transition = 'none'

            сircle.style.transition = 'all 0.5s ease'
            img.style.transition = 'all 0.5s ease'
            title.style.transition = 'all 0.7s ease'
            description.style.transition = 'all 0.9s ease'
            volume.style.transition = 'all 1.1s ease'
            price.style.transition = 'all 1.3s ease'
            button.style.transition = 'all 1.5s ease'

            сircle.style.transform = 'translateZ(30px)'
            img.style.transform = 'translateZ(80px)'
            title.style.transform = 'translateZ(70px)'
            description.style.transform = 'translateZ(60px)'
            volume.style.transform = 'translateZ(60px)'
            price.style.transform = 'translateZ(80px)'
            button.style.transform = 'translateZ(80px)'
          }}
          onMouseLeave={(e) =>{
            const card = document.querySelector(`#idCard${product.id}`)
            const сircle = document.querySelector(`#idCircle${product.id}`)
            const img = document.querySelector(`#idImg${product.id}`)
            const title = document.querySelector(`#idTitle${product.id}`)
            const description = document.querySelector(`#idDescription${product.id}`)
            const volume = document.querySelector(`#idVolume${product.id}`)
            const price = document.querySelector(`#idPrice${product.id}`)
            const button = document.querySelector(`#idButton${product.id}`)
            card.style.transform = `rotateY(0deg) rotateX(0deg)`
            card.style.transition = 'all 0.5s ease'

            сircle.style.transition = 'all 0.4s ease'
            img.style.transition = 'all 0.45s ease'
            title.style.transition = 'all 0.6s ease'
            description.style.transition = 'all 0.75s ease'
            volume.style.transition = 'all 0.9s ease'
            price.style.transition = 'all 1.05s ease'
            button.style.transition = 'all 1.2s ease'

            сircle.style.transform = 'translateZ(0px)'
            img.style.transform = 'translateZ(0px)'
            title.style.transform = 'translateZ(0px)'
            description.style.transform = 'translateZ(0px)'
            volume.style.transform = 'translateZ(0px)'
            price.style.transform = 'translateZ(0px)'
            button.style.transform = 'translateZ(0px)'
          }}
          key={product.id}>
            <div className={styles.card} id={'idCard'+product.id}>
              <div className={styles.element} id={'idElement'+product.id}>
                <div className={styles.circle} id={'idCircle'+product.id}></div>
                <div
                  className={styles.imageSrc} id={'idImg'+product.id}
                  style={{
                  backgroundImage: `url(${product.url})`,
                }}></div>
              </div>
              <div className={styles.info}>
                <div className={styles.infoIn}>
                <h1 className={styles.title} id={'idTitle'+product.id}>{product.title}</h1>
                <h3 className={styles.descriptionItem} id={'idDescription'+product.id}>{product.description}</h3>
                <h3 className={styles.VolumeAndType} id={'idVolume'+product.id}>{product.volume}    {product.typeVolume}</h3>                </div>
                <h3 className={styles.ValueItem} id={'idValue'+product.id}>В наличии: {product.value} шт.</h3>
                {product.priceDiscount === '' && <>
                  <div className={styles.price} id={'idPrice'+product.id}>{product.price} ₽</div>
                </>}
                {product.priceDiscount !== '' && <>
                  <div className={styles.priceFormer} id={'idPriceDiscount'+product.id}>{product.price} ₽</div>
                  <div className={styles.price} id={'idPrice'+product.id}>{product.priceDiscount} ₽</div>
                </>}
                <div className={styles.butt} id={'idButton'+product.id}>
                    <a onClick={()=>{
                      let localStorStr
                      let localStorJson
                      let localStor = localStorage.getItem('_basket')
                      if (localStor) {
                        localStorJson = JSON.parse(localStor)
                        localStorJson.push({
                          id:`${product.id}`,
                          title:`${product.title}`,
                          description:`${product.description}`,
                          volume:`${product.volume}`,
                          typeVolume:`${product.typeVolume}`,
                          price:`${product.price}`,
                          priceDiscount: `${product.priceDiscount}`,
                          typePrice:`${product.typePrice}`,
                          url:`${product.url}`,
                          sale: `${product.sale}`
                        })
                        localStorStr = JSON.stringify(localStorJson)
                      }
                      else {
                        localStorJson = []
                        localStorJson.push({
                          id:`${product.id}`,
                          title:`${product.title}`,
                          description:`${product.description}`,
                          volume:`${product.volume}`,
                          typeVolume:`${product.typeVolume}`,
                          price:`${product.price}`,
                          priceDiscount: `${product.priceDiscount}`,
                          typePrice:`${product.typePrice}`,
                          url:`${product.url}`,
                          sale: `${product.sale}`
                        })
                        localStorStr = JSON.stringify(localStorJson)
                      }

                      localStorage.setItem('_basket', `${localStorStr}`)
                      localStor = localStorage.getItem('_basket')
                      if (localStor) {
                        localStorJson = JSON.parse(localStor)
                        setSumItem(localStorJson.length)
                      }
                    }}>
                        <p><span className={styles.bg}></span><span className={styles.base}></span><span className={styles.text}>В     корзину</span></p>
                    </a>
                </div>
              </div>
            </div>

          </div>
        ))}
        </div>
      </div>

    </Layout>
  )
}



}
