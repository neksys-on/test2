import Layout from '../../components/layout.js'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import styles from './[id].module.scss'
import prodPrev from '../../dataBase/products.json'


let dataPreLoad
export async function getServerSideProps(context) {

  const data_products = await prodPrev.products

  let preLoadProd
  data_products.map((item)=>{
    if (item.id ===context.query.id) {
      dataPreLoad=item
    }
  })

  return {
    props: {
      data_products: dataPreLoad,
    },
  }
}

export default function ProductIndex({data_products}) {
  const router = useRouter()

  let thisProductParamInitial = 0
  if (data_products.distinctiveParameters) {
    thisProductParamInitial = data_products.distinctiveParameters[0]
  }

  const [sumItem, setSumItem] = useState('0')
  const [sumThisProduct, setSumThisProduct] = useState('0')
  const [thisProductParam, setThisProductParam] = useState(thisProductParamInitial)
  const [stateWasLoad, setStateWasLoad] = useState(false)
  const [stateListOpening, setStateListOpening] = useState(false)
  const [stateProduct, setStateProduct] = useState(data_products)

  const [find, setFind] = useState(false)
  const [complite_find, setComplite_find] = useState(false)


  useEffect(()=>{
    const localStor = localStorage.getItem('_basket')
    if (localStor) {
      const  localStorJson = JSON.parse(localStor)
      setSumItem(localStorJson.length)
      let valueThisProduct = 0
      localStorJson.map((elem)=>{
        if (elem.id === router.query.id) valueThisProduct++
      })
      setSumThisProduct(valueThisProduct)
    }

    const fetchData = async () => {

      if (stateWasLoad === false) {
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
        if (jsonProd) {
          jsonProd.products.map((prod)=>{
            if (prod.id ===router.query.id) {
              setFind(true)
              setStateProduct(prod)
              if ((thisProductParam === 0)&(prod.distinctiveParameters!==undefined)&(prod.distinctiveParameters!==[]))  setThisProductParam(prod.distinctiveParameters[0])
              setStateWasLoad(true)
            }

          })
          setComplite_find(true)
        }

      }
    }
    fetchData()
    if (!find & complite_find) {
      setStateProduct('none')
    }


  })

  if ((stateProduct!=='none') & (stateProduct!=='0')) {

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

    let keywordsAdd = ' '
    let keywordsAdd2 = ' '
    let keyWord = ''
    let valueWord = 0
    for (let i = 0; i< stateProduct.description.length; i++) {
      if (stateProduct.description[i] !== ' ' & stateProduct.description[i] !== '/n' & stateProduct.description[i] !== '\n' & stateProduct.description[i] !== ',' & stateProduct.description[i] !== '.' & stateProduct.description[i] !== '-' & stateProduct.description[i] !== '1' & stateProduct.description[i] !== '0' & stateProduct.description[i] !== '2'  & stateProduct.description[i] !== '3' & stateProduct.description[i] !== '4' & stateProduct.description[i] !== '5' & stateProduct.description[i] !== '6' & stateProduct.description[i] !== '7' & stateProduct.description[i] !== '8' & stateProduct.description[i] !== '9') {
        keyWord+= stateProduct.description[i]
      } else {
        if (keyWord.length > 3 & valueWord < 30) {
          keywordsAdd+= keyWord+', '
          valueWord++
        }
        keyWord = ''
      }
    }
    if (keyWord.length > 3 & valueWord < 30) {
      keywordsAdd+= keyWord+', '
      valueWord++
    }

    keyWord = ''
    for (let i = 0; i< stateProduct.title.length; i++) {
      if (stateProduct.title[i] !== ' ' & stateProduct.title[i] !== '/n' & stateProduct.title[i] !== '\n' & stateProduct.title[i] !== ',' & stateProduct.title[i] !== '.' & stateProduct.title[i] !== '-' & stateProduct.title[i] !== '1' & stateProduct.title[i] !== '0' & stateProduct.title[i] !== '2'  & stateProduct.title[i] !== '3' & stateProduct.title[i] !== '4' & stateProduct.title[i] !== '5' & stateProduct.title[i] !== '6' & stateProduct.title[i] !== '7' & stateProduct.title[i] !== '8' & stateProduct.title[i] !== '9') {
        keyWord+= stateProduct.title[i]
      } else {
        if (keyWord.length > 3) {
          keywordsAdd2+= keyWord+', '
        }
        keyWord = ''
      }
    }
    if (keyWord.length > 3) {
      keywordsAdd2+= keyWord+', '
    }


    return (
      <Layout propsBasket={sumItem}>
      <Head>
        <title>{stateProduct.title} из Японии. Информация о товаре {stateProduct.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={stateProduct.title +" из Японии. Здесь вы можете купить "+ stateProduct.title + " и другую качественную Японскую продукцию. Интернет магазин BestJap - Лучшее из Японии. Так же Вы можете заказать интересующие Вас товары из Японии."} />
        <meta name="keywords" content={keywordsAdd2 + "товары, товары из японии, японские товары, производитель япония, красота, здоровье, доставка из японии, япония, продукция, японские витамины, уход, лучшее из японии, bestjap, из японии, купить, заказать, маленькая япония"+ keywordsAdd} />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="5iQH12a1WI8Qz_u6afuv6zVkLHmngjX2dzb_NLnfZBc" />
        <meta name="yandex-verification" content="a446fe2c0342224b" />
        <meta charSet="UTF-8"/>

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
        <meta property="og:title" content={stateProduct.title + 'из Японии. Информация о товаре' + stateProduct.title} />
        <meta property="og:description" content={stateProduct.title +" из Японии. Здесь вы можете купить "+ stateProduct.title + " и другую качественную Японскую продукцию. Интернет магазин BestJap - Лучшее из Японии. Так же Вы можете заказать интересующие Вас товары из Японии."} />
        <meta property="og:image" content="https://www.bestjap.ru/map_japan4.webp" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={stateProduct.title + 'из Японии. Информация о товаре' + stateProduct.title} />
        <meta name="twitter:description" content={stateProduct.title +" из Японии. Здесь вы можете купить "+ stateProduct.title + " и другую качественную Японскую продукцию. Интернет магазин BestJap - Лучшее из Японии. Так же Вы можете заказать интересующие Вас товары из Японии."} />
        <meta name="twitter:image" content="https://www.bestjap.ru/map_japan4.webp" />
        <meta name="twitter:image:alt" content="/map_japan4.webp" />
      </Head>
        <div style={{
          display: 'flex',
          width: '90%',
          margin: 'auto',
          padding: '51px 0px 30px 0px',
          justifyContent: 'center'
        }}>
          <div className={styles.wrapper}>
          <div id={'idLuppa_hair'} className={styles.div_luppa_hair}></div>
            <div className={styles.container} itemScope itemType={"https://schema.org/Product"}>
              <div className={styles.container_top}>
                <div className={styles.container_top_image}>
                  <div className={styles.image_circle}>
                  </div>
                  <div className={styles.image_image} style={{backgroundImage: `url(${stateProduct.url})`}}>
                  </div>
                </div>
                <div className={styles.container_top_info}>
                  <div className={styles.info_title} itemProp = "name">
                    {stateProduct.title}
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_volumeAndType}>
                      <h3 itemProp = "hasMeasurement">{stateProduct.volume} {stateProduct.typeVolume}</h3>
                    </div>
                    <div className={styles.info_value}>
                      <h3 itemProp = "availability">В наличии: {stateProduct.value} шт.</h3>
                    </div>
                  </div>
                  <div className={styles.info_price}>
                    {stateProduct.priceDiscount === '' && <>
                      <div className={styles.price} itemProp="price">{stateProduct.price} ₽</div>
                    </>}
                    {stateProduct.priceDiscount !== '' && <>
                      <div className={styles.priceFormer} itemProp="highPrice">{stateProduct.price} ₽</div>
                      <div className={styles.price} itemProp="lowPrice">{stateProduct.priceDiscount} ₽</div>
                    </>}
                  </div>
                  <div className={styles.changeValueinBasket}>

                    <div className={styles.inBasketValue}>
                      <h3>В корзине: {sumThisProduct} шт.</h3>
                    </div>
                    <div className={styles.butt}>
                        <a onClick={()=>{
                          let localStorStr
                          let localStorJson
                          let localStor = localStorage.getItem('_basket')
                          localStorJson = []
                          if (localStor) {
                            localStorJson = JSON.parse(localStor)
                          }
                          localStorJson.push({
                            id:`${stateProduct.id}`,
                            title:`${stateProduct.title}`,
                            description:`${stateProduct.description}`,
                            volume:`${stateProduct.volume}`,
                            typeVolume:`${stateProduct.typeVolume}`,
                            params: stateProduct.distinctiveParameters?  thisProductParam : undefined,
                            price:`${stateProduct.price}`,
                            priceDiscount: `${stateProduct.priceDiscount}`,
                            sale: `${stateProduct.sale}`,
                            typePrice:`${stateProduct.typePrice}`,
                            url:`${stateProduct.url}`,
                            value: `${stateProduct.value}`
                          })
                          localStorStr = JSON.stringify(localStorJson)
                          localStorage.setItem('_basket', `${localStorStr}`)
                          localStor = localStorage.getItem('_basket')
                          if (localStor) {
                            localStorJson = JSON.parse(localStor)
                            setSumItem(localStorJson.length)
                            let valueThisProduct = 0
                            localStorJson.map((elem)=>{
                              if (elem.id === router.query.id) valueThisProduct++
                            })
                            setSumThisProduct(valueThisProduct)
                          }
                        }}>
                            <p><span className={styles.bg}></span><span className={styles.base}></span><span className={styles.text}>Добавить</span></p>
                        </a>
                    </div>
                  </div>

                  {stateProduct.distinctiveParameters!==undefined && <>
                    {stateProduct.distinctiveParameters!==[] && <>
                      <div id={'idparamWrapper'} className={styles.paramWrapper}>
                        <div className={styles.paramHeader} onClick={(e)=>{
                          const paramWrapper = document.querySelector(`#idparamWrapper`)
                          const strelochka = document.querySelector(`#idstrelochka`)

                          if (!stateListOpening) {
                            const maxW = paramWrapper.offsetWidth
                            const param_in_strok = Math.floor(maxW/150)
                            const value_strok = Math.ceil(stateProduct.distinctiveParameters.length/param_in_strok)+1
                            const needH = 58+15+(60*value_strok)
                            paramWrapper.style.height = `${needH}px`
                            strelochka.style.transform = 'rotateZ(+180deg)'
                          }
                          if (stateListOpening) {
                            paramWrapper.style.height = '58px'
                            strelochka.style.transform = 'rotateZ(0deg)'
                          }
                          setStateListOpening(!stateListOpening)
                        }}>
                          <div className={styles.HeaderImageAndParam}>
                            {thisProductParam.ulr_hair.length === 7 && <>
                              {thisProductParam.ulr_hair[0] === '#' && <>
                                <div style={{width:'25px', height:'25px', backgroundColor:`${thisProductParam.ulr_hair}`, margin:'0 20px 0 0'}}></div>
                              </>}
                            </>}
                            {thisProductParam.ulr_hair[0] !== '#' && <>
                              <div title={`${thisProductParam.ulr_hair}`} className={styles.image_hair} style={{width:'45px', height:'45px', backgroundImage:`url("${thisProductParam.ulr_hair}")`, margin:'0 20px 0 0'}} onMouseEnter={lupa_show} onMouseLeave={lupa_hide}></div>
                            </>}
                            {thisProductParam.param}
                          </div>
                          <div id={'idstrelochka'} className={styles.strelochka}>▼</div>
                        </div>

                        <div className={styles.paramHr}>
                        </div>

                        <div className={styles.paramList}>
                          {stateProduct.distinctiveParameters.map((prod)=>{

                            return (
                              <div className={styles.List_prod} onClick={(e)=>{
                                setThisProductParam(prod)
                                const paramWrapper = document.querySelector(`#idparamWrapper`)
                                const strelochka = document.querySelector(`#idstrelochka`)
                                if (stateListOpening) {
                                  paramWrapper.style.height = '58px'
                                  strelochka.style.transform = 'rotateZ(0deg)'
                                }
                                setStateListOpening(!stateListOpening)
                              }}>
                                <div className={styles.ListImageAndParam}>
                                  {prod.ulr_hair.length === 7 && <>
                                    {prod.ulr_hair[0] === '#' && <>
                                      <div style={{width:'25px', height:'25px', backgroundColor:`${prod.ulr_hair}`, margin:'0 20px 0 0'}}></div>
                                    </>}
                                  </>}
                                  {prod.ulr_hair[0] !== '#' && <>
                                    <div title={`${prod.ulr_hair}`} className={styles.image_hair} style={{width:'45px', height:'45px', backgroundImage:`url("${prod.ulr_hair}")`, margin:'0 20px 0 0'}} onMouseEnter={lupa_show} onMouseLeave={lupa_hide}></div>
                                  </>}
                                  {prod.param}
                                </div>
                              </div>
                            )
                          })}
                        </div>

                      </div>
                    </>}
                  </>}

                </div>
              </div>
              <div className={styles.container_bottom}>
                <div className={styles.description}>
                  <pre><h3 itemProp="description">{stateProduct.description}</h3></pre>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Layout>
    )
  }


  if (stateProduct==='none') {
    const linkTitle = ' >>> Контакты <<< '
    return (
      <Layout propsBasket={sumItem}>
      <Head>
        <title>Товар не найден</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content = {"Поиск товара № "+ router.query.id +". Здесь вы можете купить качественную Японскую продукцию. Интернет магазин besjap - Лучшее из Японии. Даже если товар не найден, Вы можете, связавшись с нами, заказать интересующие Вас товары из Японии."} />
        <meta name="keywords" content = {"товары, товары из японии, японские товары, производитель япония, красота, здоровье, доставка из японии, япония, японская продукция, лучшее из японии, bestjap, из японии, купить, заказать, маленькая япония"} />
        <meta name = "robots" content = "index, follow" />
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
        <meta property="og:title" content='Товар не найден' />
        <meta property="og:description" content={"Поиск товара № "+ router.query.id +". Здесь вы можете купить качественную Японскую продукцию. Интернет магазин besjap - Лучшее из Японии. Даже если товар не найден, Вы можете, связавшись с нами, заказать интересующие Вас товары из Японии."} />
        <meta property="og:image" content="https://www.bestjap.ru/map_japan4.webp" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content='Товар не найден' />
        <meta name="twitter:description" content={"Поиск товара № "+ router.query.id +". Здесь вы можете купить качественную Японскую продукцию. Интернет магазин besjap - Лучшее из Японии. Даже если товар не найден, Вы можете, связавшись с нами, заказать интересующие Вас товары из Японии."} />
        <meta name="twitter:image" content="https://www.bestjap.ru/map_japan4.webp" />
        <meta name="twitter:image:alt" content="/map_japan4.webp" />
      </Head>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px 0px 30px 0px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div className={styles.wrapperNotFoundInfo}>
            <div className={styles.containerNotFoundInfo}>
              <div>Товара с таким ID нет в базе данных.</div>
              <div>Даже если товара нет в базе, вы можете связаться с нами и заказать, интересующие Вас, товары из Японии. Мы с радостью поможем найти то, что Вам нужно.</div>
              <ul className={styles.navItems}>
                <li className={styles.navItem}><Link href="/contacts"><a>{linkTitle}</a></Link></li>
              </ul>
            </div>
          </div>

        </div>
      </Layout>
    )
  }

  return (
    <Layout propsBasket={sumItem}>
    <Head>
      <title>Поиск информации по товару из Японии</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={"Поиск товара № "+ router.query.id +". Здесь вы можете купить качественную Японскую продукцию. Интернет магазин besjap - Лучшее из Японии. Если товар не будет найден, Вы можете, связавшись с нами, заказать интересующие Вас товары из Японии."} />
      <meta name="keywords" content={"товары, товары из японии, японские товары, производитель япония, низкие цены, красота, здоровье, для красоты, для здоровья, доставка из японии, япония, японская продукция, продукция, японские витамины, для детей, косметика, бады, краска для волос, уход за волосами, для волос, для лица, уход за лицом, уход за кожей, уход, витамины, добавки, чай, японский чай, напитки, японские напитки, капли для глаз, глазные капли, Lebel, ламинария, краситель, materia, краситель materia, lebel уход, лучшее из японии, bestjap, из японии, купить, заказать, заказать из японии, купить из японии, маленькая япония"}/>
      <meta name="robots" content="index, follow" />
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
      <meta property="og:title" content='Поиск информации по товару из Японии' />
      <meta property="og:description" content={"Поиск товара № "+ router.query.id +". Здесь вы можете купить качественную Японскую продукцию. Интернет магазин besjap - Лучшее из Японии. Если товар не будет найден, Вы можете, связавшись с нами, заказать интересующие Вас товары из Японии."} />
      <meta property="og:image" content="https://www.bestjap.ru/map_japan4.webp" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content='Поиск информации по товару из Японии' />
      <meta name="twitter:description" content={"Поиск товара № "+ router.query.id +". Здесь вы можете купить качественную Японскую продукцию. Интернет магазин besjap - Лучшее из Японии. Если товар не будет найден, Вы можете, связавшись с нами, заказать интересующие Вас товары из Японии."} />
      <meta name="twitter:image" content="https://www.bestjap.ru/map_japan4.webp" />
      <meta name="twitter:image:alt" content="/map_japan4.webp" />
    </Head>
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px 0px 30px 0px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div className={styles.wrapperNotFoundInfo}>
          <div className={styles.containerNotFoundInfo}>
            Поиск информации по товару...
          </div>
        </div>
      </div>
    </Layout>
  )
}
