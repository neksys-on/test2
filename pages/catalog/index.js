import Layout from '../../components/layout.js'
// const fs = require('fs');
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'
import category from '../../dataBase/category.json'
import products from '../../dataBase/products.json'
import Link from 'next/link'


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

  const titleMeta = 'Каталог товаров из Японии, доступных для покупки.'
  const descriptionMeta = 'Каталог товаров из Японии для красоты и здоровья. Здесь, среди лучшей Японской продукции, вы можете купить то, что вам необходимо. Интернет магазин BestJap - Лучшее из Японии.'

  let cardTransitionTime = 6
  let localStorStr
  let localStorJson
  const [dataProducts, setDataProducts] = useState(data_products)
  const [dataProductsControl, setDataProductsControl] = useState(data_products)
  const [dataProductsDB, setDataProductsDB] = useState('1')
  const [dataCategory, setDataCategory] = useState(data_category)
  const [dataCategoryDB, setDataCategoryDB] = useState('1')

  const [show, setShow] = useState('Каталог')
  const [showId, setShowId] = useState('Каталог')
  const [sumItem, setSumItem] = useState('0')
  const [recoveryItem, setRecoveryItem] = useState('')
  const [recoveryColor, setRecoveryColor] = useState('')

  const [open1, setOpen1] = useState('▲')
  const [wid, setWid] = useState(0)
  const [widDisp, setWidDisp] = useState(0)

  const [openDescription, setOpenDescription] = useState([])
  const [loadCustom, setLoadCustom] = useState(false)
  const [descriptionContent, setDescriptionContent] = useState([])
  const [descriptionContentBack, setDescriptionContentBack] = useState([])

  const [inputFound, setInputFound] = useState('')
  const [inputControl, setInputControl] = useState('')
  const [dataFinal, setDataFinal] = useState([{id: 's'}])

  const [titleParams, setTitleParams] = useState({
    version: '1',
    params: [],
  })
  const [titleParamsControl, setTitleParamsControl] = useState([])
  const [showParamsSpisok, setShowParamsSpisok] = useState([])

  const [loadImages, setLoadImages] = useState(0)
  const [activationScroll, setActivationScroll] = useState(false)
  const [simpleImage, setSimpleImage] = useState(false)


  if ((data_category !== undefined)&(dataCategory !== data_category)&(dataCategoryDB === '1')) {
    setDataCategory(data_category)
  }
  if ((data_products !== undefined)&(dataProducts !== data_products)&(dataProductsDB === '1')) {
    setDataProducts(data_products)
  }

// const handleScroll = () => {
//     const position = window.pageYOffset;
//
//     if ((position > 300) & (!activationScroll)) {
//       setActivationScroll(true)
//       setSimpleImage(false)
//     }
// };


  useEffect(()=>{
    const localStor = localStorage.getItem('_basket')
    if (localStor) {
    const  localStorJson = JSON.parse(localStor)
      setSumItem(localStorJson.length)
    }

    if ((typeof window !== 'undefined')&(wid === 0)) {
      document.documentElement.clientWidth>=650 ? setWid(`${document.documentElement.clientWidth - 233}px`) : setWid(`100%`)
      setWidDisp(document.documentElement.clientWidth)
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
      setSimpleImage(false)
    }
    else {
      localStorage.setItem('_filter', 'Каталог')
    }


    const localStorFilterId = localStorage.getItem('_filterId')
    if (localStorFilterId) {
      setShowId(localStorFilterId)
    }
    else {
      localStorage.setItem('_filterId', 'Каталог')
    }


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

    // window.addEventListener('scroll', handleScroll, { passive: true });
    // return () => {
    //     window.removeEventListener('scroll', handleScroll);
    // };

  })

if ( show === 'Каталог' ) {
  return (
    <Layout propsBasket={sumItem}>
    <Head>
      <title>{titleMeta}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={descriptionMeta} />
      <meta name="keywords" content="товары, товары из японии, японские товары, производитель япония, низкие цены, красота, здоровье, доставка из японии, япония, японская продукция, продукция, японские витамины, косметика, бады, краска для волос, уход, для волос, для лица, для кожи, витамины, добавки, чай, напитки, для глаз, глазные капли, Lebel, ламинария, краситель, materia, лучшее из японии, bestjap, купить, заказать, маленькая япония" />
      <meta name = "robots" content="index, follow" />
      <meta name="google-site-verification" content="5iQH12a1WI8Qz_u6afuv6zVkLHmngjX2dzb_NLnfZBc" />
      <meta name="yandex-verification" content="a446fe2c0342224b" />
      <meta charSet = "UTF-8"/>

      <link type="image/png" sizes="96x96" rel="icon" href="/favicons/favicon-96x96.png"/>
      <link type="image/png" sizes="120x120" rel="icon" href="/favicons/favicon-120x120.png"/>
      <link type="image/png" sizes="192x192" rel="icon" href="/favicons/android-icon-192x192.png"/>
      <link sizes="57x57" rel="apple-touch-icon" href="/favicons/apple-touch-icon-57x57.png"/>
      <link sizes="60x60" rel="apple-touch-icon" href="/favicons/apple-touch-icon-60x60.png"/>
      <link sizes="72x72" rel="apple-touch-icon" href="/favicons/apple-touch-icon-72x72.png"/>
      <link sizes="76x76" rel="apple-touch-icon" href="/favicons/apple-touch-icon-76x76.png"/>
      <link sizes="114x114" rel="apple-touch-icon" href="/favicons/apple-touch-icon-114x114.png"/>
      <link sizes="120x120" rel="apple-touch-icon" href="/favicons/apple-touch-icon-120x120.png"/>
      <link sizes="144x144" rel="apple-touch-icon" href="/favicons/apple-touch-icon-144x144.png"/>
      <link sizes="152x152" rel="apple-touch-icon" href="/favicons/apple-touch-icon-152x152.png"/>
      <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png"/>
      <meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png"/>
      <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png"/>
      <meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png"/>
      <meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png"/>
      <meta name="application-name" content="Интернет магазин bestjap - Лучшее из Японии"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
      <link rel="manifest" href="/favicons/site.webmanifest"/>
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#d80000"/>
      <link rel="shortcut icon" href="/favicons/favicon.ico"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="msapplication-config" content="/favicons/browserconfig.xml"/>
      <meta name="theme-color" content="#ffffff"/>

      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={titleMeta} />
      <meta property="og:description" content={descriptionMeta} />
      <meta property="og:image" content="https://www.bestjap.ru/map_japan4.webp" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={titleMeta} />
      <meta name="twitter:description" content={descriptionMeta} />
      <meta name="twitter:image" content="https://www.bestjap.ru/map_japan4.webp" />
      <meta name="twitter:image:alt" content="/map_japan4.webp" />
    </Head>
      <h1 style={{

        margin: 'auto',
        padding: '51px 0px 30px 30px'
      }} >Каталог</h1>
      <div className={styles.div_main}>
        <div className={styles.div_show2}>
          {dataCategory.map((image) => (
            <div onClick={(e)=>{
              localStorage.setItem('_filter', image.title)
              localStorage.setItem('_filterId', image.id)
              setShow(image.title)
              setShowId(image.id)
            }} key={image.id} className={styles.imgDivCatalog} style={{backgroundImage: `url(${image.url})`}}>
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


  if ((!loadCustom)||(dataProductsControl !== dataProducts)) {
    setDataProductsControl(dataProducts)
    setLoadCustom(true)
    let description_state = []
    let description_content = []
    dataProducts.map((prod)=>{
      description_state[prod.id-1] = '▼'
      prod.abbreviatedDescription = ''
      let simbols = 60
      let maxI3
      prod.description.length > simbols-1 ? maxI3 = simbols : maxI3 = prod.description.length
      if (prod.description.length > 0 ) {
        for (let i3 = 0; i3 < maxI3; i3++) {
          prod.abbreviatedDescription+= prod.description[i3]
        }
        if ((maxI3 === simbols) & (prod.description[maxI3] !== ' ')) {
          for (let i4 = maxI3; i4 < maxI3+15; i4++) {
            if (prod.description[i4] !== ' ') {
              prod.abbreviatedDescription+= prod.description[i4]
            }
            else {
              break
            }
          }
        }
      }
      description_content[prod.id-1] =  <pre><h3 className={styles.descriptionItem} >{prod.abbreviatedDescription} ...▼</h3></pre>
    })
    setOpenDescription(description_state)
    setDescriptionContent(description_content)
    setDescriptionContentBack(description_content)
  }





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
    let koef = 1
    if (image.title.length>21) {
      koef = 2
    }
    if (image.title.length>42) {
      koef = 3
    }
    if (image.title.length>63) {
      koef = 4
    }
    height_for_div_menu+=21+(26*koef)
  })

  function lupa_show(e) {
    const lupa = document.querySelector(`#idLuppa_hair`)
    const x = e.pageX
    const y = e.pageY
    lupa.style.display = 'block'
    lupa.style.top = `${y+20}px`
    lupa.style.left = `${x+20}px`
    lupa.style.backgroundImage = `url("${e.target.title}")`
    lupa.style.visibility = 'visible'
    lupa.style.opacity = '1'
  }

  function lupa_hide(event) {
    const lupa = document.querySelector(`#idLuppa_hair`)
    lupa.style.visibility = 'hidden'
    lupa.style.opacity = '0'
  }


  // let itemschet = 0
  // let podgruzka_cartinki = []
  // if ((show ==='Все товары')&(dataProducts[0].id !== 's')&(loadImages === 0)) {
  //   dataProducts.map((item)=>{
  //     if (itemschet<8) {
  //       podgruzka_cartinki[item.id] = true
  //     } else {
  //       podgruzka_cartinki[item.id] = false
  //     }
  //     itemschet++
  //   })
  //   setLoadImages(podgruzka_cartinki)
  // }


  return (
    <Layout propsBasket={sumItem}>
    <Head>
      <title>{titleMeta}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={descriptionMeta} />
      <meta name="keywords" content="товары, товары из японии, японские товары, производитель япония, низкие цены, красота, здоровье, доставка из японии, япония, японская продукция, продукция, японские витамины, косметика, бады, краска для волос, уход, для волос, для лица, для кожи, витамины, добавки, чай, напитки, для глаз, глазные капли, Lebel, ламинария, краситель, materia, лучшее из японии, bestjap, купить, заказать, маленькая япония" />
      <meta name = "robots" content="index, follow" />
      <meta name="google-site-verification" content="5iQH12a1WI8Qz_u6afuv6zVkLHmngjX2dzb_NLnfZBc" />
      <meta name="yandex-verification" content="a446fe2c0342224b" />
      <meta charSet = "UTF-8"/>

      <link type="image/png" sizes="96x96" rel="icon" href="/favicons/favicon-96x96.png"/>
      <link type="image/png" sizes="120x120" rel="icon" href="/favicons/favicon-120x120.png"/>
      <link type="image/png" sizes="192x192" rel="icon" href="/favicons/android-icon-192x192.png"/>
      <link sizes="57x57" rel="apple-touch-icon" href="/favicons/apple-touch-icon-57x57.png"/>
      <link sizes="60x60" rel="apple-touch-icon" href="/favicons/apple-touch-icon-60x60.png"/>
      <link sizes="72x72" rel="apple-touch-icon" href="/favicons/apple-touch-icon-72x72.png"/>
      <link sizes="76x76" rel="apple-touch-icon" href="/favicons/apple-touch-icon-76x76.png"/>
      <link sizes="114x114" rel="apple-touch-icon" href="/favicons/apple-touch-icon-114x114.png"/>
      <link sizes="120x120" rel="apple-touch-icon" href="/favicons/apple-touch-icon-120x120.png"/>
      <link sizes="144x144" rel="apple-touch-icon" href="/favicons/apple-touch-icon-144x144.png"/>
      <link sizes="152x152" rel="apple-touch-icon" href="/favicons/apple-touch-icon-152x152.png"/>
      <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png"/>
      <meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png"/>
      <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png"/>
      <meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png"/>
      <meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png"/>
      <meta name="application-name" content="Интернет магазин bestjap - Лучшее из Японии"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
      <link rel="manifest" href="/favicons/site.webmanifest"/>
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#d80000"/>
      <link rel="shortcut icon" href="/favicons/favicon.ico"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="msapplication-config" content="/favicons/browserconfig.xml"/>
      <meta name="theme-color" content="#ffffff"/>

      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={titleMeta} />
      <meta property="og:description" content={descriptionMeta} />
      <meta property="og:image" content="https://www.bestjap.ru/map_japan4.webp" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={titleMeta} />
      <meta name="twitter:description" content={descriptionMeta} />
      <meta name="twitter:image" content="https://www.bestjap.ru/map_japan4.webp" />
      <meta name="twitter:image:alt" content="/map_japan4.webp" />
    </Head>
      <div className={styles.div_name_categAndFound}>
        <h1 style={{
          padding: '0px 10px 0px 0px',
        }}>{show}</h1>
        <div className={styles.div_found}>
          <div className={styles.div_lupa}></div>
          <input type='text' placeholder={'Поиск'} value={inputFound} onChange={(e) => {
            setInputFound(e.target.value)
          }}></input>
        </div>
      </div>
      <div id={'idLuppa_hair'} className={styles.div_luppa_hair}></div>
      <div className={styles.div_main}>
        <div className={styles.div_menu} id={'id_div_menu'} style={open1 === '▼' ? { height: `50px`} : { height: `${height_for_div_menu}px`}}>
          <div className={styles.div_heading_menu} onClick={(e)=>{
            const comp = document.querySelector(`#id_spisok_menu`)
            const div = document.querySelector(`#id_div_menu`)
            const strelka = document.querySelector(`#id_open_strelka`)
            if (open1 === '▼') {
              setOpen1('▲')
              comp.style.transition = `all 1.95s ease`
              comp.style.visibility = 'visible'
              comp.style.opacity = '1'
              div.style.transition = `all .65s ease`
              div.style.height = `${height_for_div_menu}px`
              strelka.style.transform = 'rotateZ(0deg)'
            } else {
              setOpen1('▼')
              comp.style.transition = `all .25s ease`
              comp.style.visibility = 'hidden'
              comp.style.opacity = '0'
              div.style.transition = `all 0.65s ease`
              div.style.height = `50px`
              strelka.style.transform = 'rotateZ(-180deg)'
            }
          }}><div>Фильтр</div>   <div id={`id_open_strelka`} style={{marginRight:'30px', transition:'all 0.5s ease' }}>▲</div></div>
          <div className={styles.div_spisok_menu} id={'id_spisok_menu'} style={open1 === '▼' ? { visibility: `hidden`, opacity: '0'} : { visibility: 'visible', opacity: '1'}}>
            <div className={styles.div_all} onClick={(e)=>{
              localStorage.setItem('_filter', 'Все товары')
              localStorage.setItem('_filterId', '0')
              setShow('Все товары')
              setShowId('0')
              setSimpleImage(false)
            }}><div id={`id_filter0`} className={styles.menu_list_item}>Все товары</div></div>
            {dataCategory.map((image) => (
              <div key={image.id} className={styles.div_punkt_menu} onClick={(e)=>{
                localStorage.setItem('_filter', image.title)
                localStorage.setItem('_filterId', image.id)
                setShow(image.title)
                setShowId(image.id)
                setSimpleImage(false)
              }}><div id={`id_filter`+image.id} className={styles.menu_list_item}>{image.title}</div></div>
            ))}
            <div className={styles.div_sale_filter} onClick={(e)=>{
              localStorage.setItem('_filter', 'Товары со скидкой')
              localStorage.setItem('_filterId', '_1')
              setShow('Товары со скидкой')
              setShowId('_1')
              setSimpleImage(false)
            }}><div id={`id_filter_1`} className={styles.menu_list_item}>Товары со скидкой</div></div>
            <div className={styles.div_sbros} onClick={(e)=>{
              localStorage.setItem('_filter', 'Каталог')
              localStorage.setItem('_filterId', 'Каталог')
              setShow('Каталог')
              setShowId('Каталог')
              setSimpleImage(false)
            }}><div className={styles.menu_list_item_sbros}>Сброс</div></div>
          </div>
        </div>
        <div className={styles.div_show} style={{width:`${wid}`}} itemProp="itemListElement" >
        {data_filtered.map((product) => {

          let successful_search = false
          if (inputFound !== '') {
            for (let i = 0; i < product.title.length; i++) {
              if (product.title[i].toLowerCase()===inputFound[0].toLowerCase()) {
                successful_search = true
                let title_prod = ''
                for (let i2 = 0; i2 < inputFound.length; i2++) {
                  if (product.title[i+i2]) {
                    title_prod+= product.title[i+i2]
                  }
                  else {title_prod+= ' '}
                }
                if (inputFound.toLowerCase() !== title_prod.toLowerCase()) {
                  successful_search = false
                }
                if (inputFound.toLowerCase() === title_prod.toLowerCase()) {
                  break
                }
              }
            }
          } else {
            successful_search = true
          }

          product.abbreviatedDescription = ''
          let simbols = 50
          let maxI3
          product.description.length >= simbols ? maxI3 = simbols : maxI3 = product.description.length
          if (product.description.length > 0 ) {
            for (let i3 = 0; i3 < maxI3; i3++) {
              product.abbreviatedDescription+= product.description[i3]
            }
            if ((maxI3 === simbols) & (product.description[maxI3] !== ' ')) {
              for (let i4 = maxI3; i4 < maxI3+15; i4++) {
                if (product.description[i4] !== ' ') {
                  product.abbreviatedDescription+= product.description[i4]
                }
                else {
                  break
                }
              }
            }
          }


          let stateOpenDescription = false
          if (openDescription[product.id-1] === '▼') {
            // product.stateDescription = <pre><h3 className={styles.descriptionItem} >{product.abbreviatedDescription} ...▼</h3></pre>
          }
          if (openDescription[product.id-1] === '▲') {
            stateOpenDescription = true
            // product.stateDescription = <pre><h3 className={styles.descriptionItem} >{product.description}</h3></pre>
          }
          if (product.description.length < simbols) {
            stateOpenDescription = false
          }

          if ((successful_search)) {
            return (
            <div id={'idContainer'+product.id} className={styles.container}
            onMouseMove={(e) => {
              if (widDisp>768) {
                const card = document.querySelector(`#idCard${product.id}`)
                const coord = card.getBoundingClientRect()
                let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 20 *(650/card.clientHeight);
                let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 35 *(650/(card.clientHeight*card.clientHeight/650))*0.65;
                card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
                cardTransitionTime -= 1
                if (cardTransitionTime>0) {
                  card.style.transition = `all 0.${cardTransitionTime*10}s ease`
                }
              }
            }}
            onMouseEnter={(e) =>{
              if (widDisp>768) {
                const card = document.querySelector(`#idCard${product.id}`)
                const сircle = document.querySelector(`#idCircle${product.id}`)
                const img = document.querySelector(`#idImg${product.id}`)
                const title = document.querySelector(`#idTitle${product.id}`)
                const description = document.querySelector(`#idDescription${product.id}`)
                const volume = document.querySelector(`#idVolume${product.id}`)
                const value = document.querySelector(`#idValue${product.id}`)
                const price = document.querySelector(`#idPrice${product.id}`)
                const button = document.querySelector(`#idButton${product.id}`)


                if (titleParams.params[product.id] !== undefined) {
                  const params = document.querySelector(`#idSpisok_distinctiveParameters${product.id}`)
                  params.style.transition = 'all 1.5s ease'
                  params.style.transform = 'translateZ(60px)'
                }


                // container.style.perspective = `${900*(650/card.clientHeight)}`

                // card.style.transition = 'none'

                сircle.style.transition = 'all 0.5s ease'
                img.style.transition = 'all 0.5s ease'
                title.style.transition = 'all 0.7s ease'
                description.style.transition = 'all 0.9s ease'
                volume.style.transition = 'all 1.1s ease'
                value.style.transition = 'all 1.3s ease'
                price.style.transition = 'all 1.7s ease'
                button.style.transition = 'all 1.9s ease'


                сircle.style.transform = 'translateZ(30px)'
                img.style.transform = 'translateZ(80px)'
                title.style.transform = 'translateZ(70px)'
                description.style.transform = 'translateZ(60px)'
                volume.style.transform = 'translateZ(60px)'
                value.style.transform = 'translateZ(60px)'
                price.style.transform = 'translateZ(70px)'
                button.style.transform = 'translateZ(70px)'
              }
            }}
            onMouseLeave={(e) =>{
              if (widDisp>768) {
                cardTransitionTime = 6
                const card = document.querySelector(`#idCard${product.id}`)
                const сircle = document.querySelector(`#idCircle${product.id}`)
                const img = document.querySelector(`#idImg${product.id}`)
                const title = document.querySelector(`#idTitle${product.id}`)
                const description = document.querySelector(`#idDescription${product.id}`)
                const volume = document.querySelector(`#idVolume${product.id}`)
                const value = document.querySelector(`#idValue${product.id}`)
                const price = document.querySelector(`#idPrice${product.id}`)
                const button = document.querySelector(`#idButton${product.id}`)

                if (titleParams.params[product.id] !== undefined) {
                  const params = document.querySelector(`#idSpisok_distinctiveParameters${product.id}`)
                  params.style.transition = 'all 1.0s ease'
                  params.style.transform = 'translateZ(0px)'
                }

                card.style.transform = `rotateY(0deg) rotateX(0deg)`
                card.style.transition = 'all 0.5s ease'

                сircle.style.transition = 'all 0.4s ease'
                img.style.transition = 'all 0.45s ease'
                title.style.transition = 'all 0.6s ease'
                description.style.transition = 'all 0.75s ease'
                volume.style.transition = 'all 0.9s ease'
                value.style.transition = 'all 1.05s ease'
                price.style.transition = 'all 1.2s ease'
                button.style.transition = 'all 1.3s ease'

                сircle.style.transform = 'translateZ(0px)'
                img.style.transform = 'translateZ(0px)'
                title.style.transform = 'translateZ(0px)'
                description.style.transform = 'translateZ(0px)'
                volume.style.transform = 'translateZ(0px)'
                value.style.transform = 'translateZ(0px)'
                price.style.transform = 'translateZ(0px)'
                button.style.transform = 'translateZ(0px)'
              }
            }}
            key={product.id}>
              <div className={styles.card} id={'idCard'+product.id} itemScope itemType="https://schema.org/Offer" >
                <div className={styles.element} id={'idElement'+product.id}>
                  <div className={styles.circle} id={'idCircle'+product.id}></div>
                  {simpleImage && <>
                    {loadImages[product.id] && <>
                      <div
                        className={styles.imageSrc} id={'idImg'+product.id}
                        style={{
                        backgroundImage: `url(${product.url})`,
                      }} itemProp = "image"></div>
                    </>}
                    {!loadImages[product.id] && <>
                      <div
                        className={styles.imageSrc} id={'idImg'+product.id}
                        style={{

                      }} itemProp = "image"></div>
                    </>}
                  </>}
                  {!simpleImage && <>
                    <div
                      className={styles.imageSrc} id={'idImg'+product.id}
                      style={{
                      backgroundImage: `url(${product.url})`,
                    }} itemProp = "image"></div>
                  </>}

                </div>
                <div className={styles.info}>
                  <div className={styles.infoIn}>
                  <Link href={`/catalog/${product.id}`}><a><h2 className={styles.title} id={'idTitle'+product.id} itemProp = "name" itemProp="url">{product.title}</h2></a></Link>
                  <div id={'idDescription'+product.id} itemProp="description" onClick={(e)=>{
                    const desctShort = document.querySelector(`#idDescrShort${product.id}`)
                    const desctFull = document.querySelector(`#idDescrFull${product.id}`)
                    let desctShortHeight = desctShort.clientHeight
                    let desctFullHeight = desctFull.clientHeight
                    if (openDescription[product.id-1] === '▼') {
                      let copyOpenDescr = openDescription
                      copyOpenDescr[product.id-1] = '▲'
                      setOpenDescription(copyOpenDescr)
                      desctShort.style.visibility = 'hidden'
                      desctShort.style.opacity = '0'
                      desctShort.style.marginBottom = `${-desctShortHeight}px`
                      desctShort.style.height = `auto`

                      desctFull.style.visibility = 'visible'
                      desctFull.style.opacity = '1'
                      desctFull.style.height = `auto`
                      desctFull.style.marginTop = `0px`
                      desctFull.style.marginBottom = `0px`
                    } else {
                      let copyOpenDescr = openDescription
                      copyOpenDescr[product.id-1] = '▼'
                      setOpenDescription(copyOpenDescr)
                      desctShort.style.visibility = 'visible'
                      desctShort.style.opacity = '1'
                      desctShort.style.marginTop = `0px`
                      desctShort.style.height = `auto`
                      desctShort.style.marginBottom = `0px`

                      desctFull.style.visibility = 'hidden'
                      desctFull.style.opacity = '0'
                      desctFull.style.height = `auto`
                      desctFull.style.marginTop = `${-desctFullHeight/2}px`
                      desctFull.style.marginBottom = `${-desctFullHeight/2}px`
                    }
                  }}>
                    {product.description.length >= simbols && <>
                      <div className={styles.descriptionContainer}>
                        <div id={'idDescrShort'+product.id} className={styles.descriptionShort}><pre id={'idPreShort'+product.id}><h3 className={styles.descriptionItem} >{product.abbreviatedDescription} ...▼</h3></pre></div>
                        <div id={'idDescrFull'+product.id} style={{visibility:'hidden', opacity: '0', height: '200px', marginTop:'-200px' }} className={styles.descriptionFull}><pre id={'idPreFull'+product.id}><h3 className={styles.descriptionItem} >{product.description}</h3></pre></div>
                      </div>
                    </>}
                    {product.description.length < simbols && <>
                      <pre><h3 className={styles.descriptionItem} >{product.description}</h3></pre>
                    </>}
                  </div>
                  <h3 className={styles.VolumeAndType} id={'idVolume'+product.id} itemProp = "hasMeasurement">{product.volume}    {product.typeVolume}</h3>                </div>
                  <h3 className={styles.ValueItem} id={'idValue'+product.id} itemProp = "availability" href = "https://schema.org/InStock">В наличии: {product.value} шт.</h3>
                  {product.distinctiveParameters !== undefined && <>
                    {product.distinctiveParameters !== [] && <>
                      <div>
                        {titleParams.params[product.id] !== undefined && <>
                          <div id={`idSpisok_distinctiveParameters${product.id}`} className={styles.spisok_distinctiveParameters}>
                            <div className={styles.spisok_Title} onClick={(e)=>{
                              const strelca = document.querySelector(`#idShowParamsSpisok${product.id}`)
                              const list = document.querySelector(`#idSpisol_List${product.id}`)
                              if (showParamsSpisok[product.id] === '▼') {
                                showParamsSpisok[product.id] = '▲'
                                setShowParamsSpisok(showParamsSpisok)
                                strelca.style.transform = 'rotateZ(+180deg)'
                                list.style.display = 'block'
                              } else {
                                showParamsSpisok[product.id] = '▼'
                                setShowParamsSpisok(showParamsSpisok)
                                strelca.style.transform = 'rotateZ(0deg)'
                                list.style.display = 'none'
                              }
                            }}>

                                <div className={styles.distinctiveParameters}>
                                  {titleParams.params[product.id].ulr_hair.length === 7 && <>
                                    {titleParams.params[product.id].ulr_hair[0] === '#' && <>
                                      <div style={{width:'25px', height:'25px', backgroundColor:`${titleParams.params[product.id].ulr_hair}`, margin:'0 20px 0 0'}}></div>
                                    </>}
                                  </>}
                                  {titleParams.params[product.id].ulr_hair[0] !== '#' && <>
                                    <div title={`${titleParams.params[product.id].ulr_hair}`} className={styles.image_hair} style={{width:'45px', height:'45px', backgroundImage:`url("${titleParams.params[product.id].ulr_hair}")`, margin:'0 20px 0 0'}} onMouseEnter={lupa_show} onMouseLeave={lupa_hide}></div>
                                  </>}

                                  <div>{titleParams.params[product.id].param}</div>
                                </div>

                              {showParamsSpisok[product.id] === undefined && <>
                                {product.distinctiveParameters.map((parameters)=>{
                                  if (showParamsSpisok[product.id] === undefined) {
                                    showParamsSpisok[product.id] = '▼'
                                    setShowParamsSpisok(showParamsSpisok)
                                  }
                                })}
                              </>}

                              <div id={`idShowParamsSpisok${product.id}`} className={styles.showParamsSpisok}>'▼'</div>

                            </div>


                              <div id={`idSpisol_List${product.id}`} className={styles.spisol_List}>
                                <div className={styles.cherta}/>
                                <div className={styles.spisok_flex}>
                                  {product.distinctiveParameters.map((parameters)=>{
                                    return (
                                      <div key={`distinctiveParameters${product.id}${parameters.color}${parameters.param}`} className={styles.distinctiveParameters2} onClick={(e)=>{
                                        const strelca = document.querySelector(`#idShowParamsSpisok${product.id}`)
                                        const list = document.querySelector(`#idSpisol_List${product.id}`)
                                        strelca.style.transform = 'rotateZ(0deg)'
                                        list.style.display = 'none'
                                        showParamsSpisok[product.id] = '▼'
                                        titleParams.params[product.id] = parameters
                                        titleParams.version++

                                        setTitleParams(titleParams)
                                        setShowParamsSpisok(showParamsSpisok)
                                        setTitleParamsControl(parameters)
                                      }}>
                                        {titleParams.params[product.id].ulr_hair.length === 7 && <>
                                          {titleParams.params[product.id].ulr_hair[0] === '#' && <>
                                            <div style={{width:'25px', height:'25px', backgroundColor:`${parameters.ulr_hair}`, margin:'0 20px 0 0'}}></div>
                                          </>}
                                        </>}
                                        {titleParams.params[product.id].ulr_hair[0] !== '#' && <>
                                          <div title={`${parameters.ulr_hair}`} className={styles.image_hair} style={{width:'45px', height:'45px', backgroundImage:`url("${parameters.ulr_hair}")`, margin:'0 20px 0 0'}} onMouseEnter={lupa_show} onMouseLeave={lupa_hide}></div>
                                        </>}
                                        <div>{parameters.param}</div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>

                          </div>
                        </>}
                        {titleParams.params[product.id] === undefined && <>
                          {product.distinctiveParameters[0]!==undefined && <>
                            <div className={styles.spisok_distinctiveParameters}>
                              <div className={styles.distinctiveParameters}>
                                {product.distinctiveParameters[0].color !== undefined && <>
                                  <div style={{width:'25px', height:'25px', backgroundColor:`${product.distinctiveParameters[0].color}`, margin:'0 20px 0 0'}}></div>
                                </>}
                                {product.distinctiveParameters[0].ulr_hair !== undefined && <>
                                  <div title={`${product.distinctiveParameters[0].ulr_hair}`} className={styles.image_hair} style={{width:'45px', height:'45px', backgroundImage:`url("${product.distinctiveParameters[0].ulr_hair}")`, margin:'0 20px 0 0'}} onMouseEnter={lupa_show} onMouseLeave={lupa_hide}></div>
                                </>}

                                <div>{product.distinctiveParameters[0].param}</div>
                              </div>
                            </div>
                            {product.distinctiveParameters.map((parameters)=>{

                              if (titleParams.params[product.id] === undefined) {
                                let copyParams = []

                                copyParams[product.id] = {ulr_hair: parameters.ulr_hair, param: parameters.param}
                                titleParams.params[product.id] = {ulr_hair: parameters.ulr_hair, param: parameters.param}

                                titleParams.version++
                                setTitleParams(titleParams)
                                setTitleParamsControl(copyParams[product.id])
                              }
                            })}
                          </>}
                        </>}
                      </div>
                    </>}
                  </>}
                  {product.priceDiscount === '' && <>
                    <div className={styles.price} id={'idPrice'+product.id} itemProp="price">{product.price} ₽</div>
                  </>}
                  {product.priceDiscount !== '' && <>
                    <div className={styles.priceFormer} id={'idPriceDiscount'+product.id} itemProp="highPrice">{product.price} ₽</div>
                    <div className={styles.price} id={'idPrice'+product.id} itemProp="lowPrice">{product.priceDiscount} ₽</div>
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
                            params: titleParams.params[product.id],
                            price:`${product.price}`,
                            priceDiscount: `${product.priceDiscount}`,
                            typePrice:`${product.typePrice}`,
                            url:`${product.url}`,
                            sale: `${product.sale}`,
                            value: `${product.value}`
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
                            params: titleParams.params[product.id],
                            price:`${product.price}`,
                            priceDiscount: `${product.priceDiscount}`,
                            typePrice:`${product.typePrice}`,
                            url:`${product.url}`,
                            sale: `${product.sale}`,
                            value: `${product.value}`
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
        )}})}
        </div>
      </div>

    </Layout>
  )
}



}
