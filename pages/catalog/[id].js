import Layout from '../../components/layout.js'
import Head from 'next/head'
import {useRouter} from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import styles from './[id].module.scss'



export default function ProductIndex() {

  const router = useRouter()
  const [sumItem, setSumItem] = useState('0')
  const [sumThisProduct, setSumThisProduct] = useState('0')
  const [thisProductParam, setThisProductParam] = useState(0)
  const [stateWasLoad, setStateWasLoad] = useState(false)
  const [stateListOpening, setStateListOpening] = useState(false)
  const [stateProduct, setStateProduct] = useState('0')


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

      if (stateProduct === '0') {
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
              find = true
              setStateProduct(prod)
              if ((thisProductParam === 0)&(prod.distinctiveParameters!==undefined)&(prod.distinctiveParameters!==[]))  setThisProductParam(prod.distinctiveParameters[0])
              setStateWasLoad(true)
            }

          })
          complite_find = true
        }

      }
    }
    let find = false
    let complite_find = false
    fetchData()
    if (!find & complite_find) {
      setStateProduct('none')
    }


  })

  if ((stateProduct!=='none') & (stateProduct!=='0') & (stateWasLoad === true)) {

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
    let keyWord = ''
    for (let i = 0; i< stateProduct.description.length; i++) {
      if (stateProduct.description[i] !== ' ' & stateProduct.description[i] !== ',' & stateProduct.description[i] !== '1' & stateProduct.description[i] !== '0' & stateProduct.description[i] !== '2'  & stateProduct.description[i] !== '3' & stateProduct.description[i] !== '4' & stateProduct.description[i] !== '5' & stateProduct.description[i] !== '6' & stateProduct.description[i] !== '7' & stateProduct.description[i] !== '8' & stateProduct.description[i] !== '9') {
        keyWord+= stateProduct.description[i]
      } else {
        if (keyWord.length > 3) {
          keywordsAdd+= keyWord+', '
        }
        keyWord = ''
      }
    }

    return (
      <Layout propsBasket={sumItem}>
      <Head>
        <title>{stateProduct.title} из Японии. Информация о товаре {stateProduct.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content = {stateProduct.title +" из Японии. Здесь вы можете купить "+ stateProduct.title + " и другую качественную Японскую продукцию. Интернет магазин besjap - Лучшее из Японии. Так же Вы можете заказать интересующие Вас товары из Японии."}/>
        <meta name="keywords" content = {"товары, товары из японии, японские товары, производитель япония, низкие цены, красота, здоровье, для красоты, для здоровья, доставка из японии, япония, японская продукция, продукция, японские витамины, для детей, косметика, бады, краска для волос, уход за волосами, для волос, для лица, уход за лицом, уход за кожей, уход, витамины, добавки, чай, японский чай, напитки, японские напитки, капли для глаз, глазные капли, Lebel, ламинария, краситель, materia, краситель materia, lebel уход, лучшее из японии, bestjap, из японии, купить, заказать, заказать из японии, купить из японии, маленькая япония"+ keywordsAdd}/>
        <meta name = "robots" content = "index, follow" />
        <meta name="google-site-verification" content="5iQH12a1WI8Qz_u6afuv6zVkLHmngjX2dzb_NLnfZBc" />
        <meta name="yandex-verification" content="a446fe2c0342224b" />
        <meta charSet = "UTF-8"/>
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
            <div className={styles.container}>
              <div className={styles.container_top}>
                <div className={styles.container_top_image}>
                  <div className={styles.image_circle}>
                  </div>
                  <div className={styles.image_image} style={{backgroundImage: `url(${stateProduct.url})`}}>
                  </div>
                </div>
                <div className={styles.container_top_info}>
                  <div className={styles.info_title}>
                    {stateProduct.title}
                  </div>
                  <div className={styles.info_block}>
                    <div className={styles.info_volumeAndType}>
                      <h3>{stateProduct.volume} {stateProduct.typeVolume}</h3>
                    </div>
                    <div className={styles.info_value}>
                      <h3>В наличии: {stateProduct.value} шт.</h3>
                    </div>
                  </div>
                  <div className={styles.info_price}>
                    {stateProduct.priceDiscount === '' && <>
                      <div className={styles.price}>{stateProduct.price} ₽</div>
                    </>}
                    {stateProduct.priceDiscount !== '' && <>
                      <div className={styles.priceFormer}>{stateProduct.price} ₽</div>
                      <div className={styles.price}>{stateProduct.priceDiscount} ₽</div>
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
                          localStorJson = JSON.parse(localStor)
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
                  <pre><h3>{stateProduct.description}</h3></pre>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Layout>
    )
  }


  if (stateProduct==='none') {
    return (
      <Layout propsBasket={sumItem}>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px 0px 30px 0px',
          overflow: 'hidden'
        }}>
          Товара с таким ID нет в базе данных.

        </div>
      </Layout>
    )
  }

  return (
    <Layout propsBasket={sumItem}>
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px 0px 30px 0px',
        overflow: 'hidden'
      }}>
        Loading...

      </div>
    </Layout>
  )
}