import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'


export default function Page () {
  const titleMeta = 'Услови и сроки доставки товаров из Японии'
  const descriptionMeta = 'Условия и сроки доставки качественной Японской продукции. Интернет магазин BestJap - Лучшее из Японии.'

  const [wid, setWid] = useState(0)
  const [open1, setOpen1] = useState('▼')
  const [open2, setOpen2] = useState('▼')
  const [open3, setOpen3] = useState('▼')
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
    if ((typeof window !== 'undefined')&(wid === 0)) {
      setWid(document.documentElement.clientWidth)
    }

  })

  return(
    <Layout propsBasket={sumItem}>
      <Head>
        <title>{titleMeta}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content = {descriptionMeta}/>
        <meta name="keywords" content = "доставка из японии, япония, японская продукция, продукция, сроки, доставка, условия доставки, bestjap, лучшее из японии, заказать из японии, заказать, купить, купить японскую, как купить, как заказать, из японии"/>
        <meta name = "robots" content = "index, follow" />
        <meta name="google-site-verification" content="5iQH12a1WI8Qz_u6afuv6zVkLHmngjX2dzb_NLnfZBc" />
        <meta name="yandex-verification" content="a446fe2c0342224b" />
        <meta charSet = "UTF-8"/>

        <link type="image/png" sizes="96x96" rel="icon" href="/favicons/favicon-96x96.png"/>
        <link type="image/png" sizes="120x120" rel="icon" href="/favicons/favicon-120x120.png"/>
        <link type="image/x-icon" sizes="120x120" rel="icon" href="/favicons/favicon-120x120.ico"/>
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
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px 0px 30px 0px'
      }}>

        <h1>Доставка и оплата</h1>
        <div className={styles.div_main}>
          <div className={styles.div_text}><h4>Отправка товаров осуществляется только после полной оплаты стоимости товаров и доставки.</h4>
          </div>
          <div className={styles.div_text}><h2>Способы доставки</h2></div>
          {wid>768 && <>
            <div className={styles.div_table}>
              <div className={styles.div_way}>
                <div className={styles.div_company}>
                  <div className={styles.div_item}>Компания</div>
                  <div className={styles.div_item}>Энергия</div>
                  <div className={styles.div_item}>Энергия</div>
                  <div className={styles.div_item}>Почта России</div>
                  <div className={styles.div_item}>СДЭК без курьера</div>
                  <div className={styles.div_item}>СДЭК с курьером до адреса</div>
                </div>
                <div className={styles.div_region}>
                  <div className={styles.div_item}>Регион</div>
                  <div className={styles.div_item}>ДВ регион</div>
                  <div className={styles.div_item}>Все регионы России</div>
                  <div className={styles.div_item}>Все регионы России</div>
                  <div className={styles.div_item}>Все регионы России</div>
                  <div className={styles.div_item}>Все регионы России</div>
                </div>
                <div className={styles.div_timing}>
                  <div className={styles.div_item_timing}>Срок доставки (дни)</div>
                  <div className={styles.div_item_timing}>3-5</div>
                  <div className={styles.div_item_timing}>8-21</div>
                  <div className={styles.div_item_timing}>8-21</div>
                  <div className={styles.div_item_timing}>8-21</div>
                  <div className={styles.div_item_timing}>8-21</div>
                </div>
                <div className={styles.div_price}>
                  <div className={styles.div_item_price}>Стоимость</div>
                  <div className={styles.div_item_price}>350 ₽</div>
                  <div className={styles.div_item_price}>800 ₽</div>
                  <div className={styles.div_item_price}>550 ₽</div>
                  <div className={styles.div_item_price}>500 ₽</div>
                  <div className={styles.div_item_price}>1200 ₽</div>
                </div>
              </div>
            </div>
          </>}
          {wid<=768 && <>
            <div className={styles.div_text}><h4>Компании:</h4></div>
            <div className={styles.div_companys} onClick={(e)=>{
              const comp = document.querySelector(`#company1`)
              if (open1 === '▼') {
                setOpen1('▲')
                comp.style.visibility = 'visible'
                comp.style.opacity = '1'
                comp.style.height = '178px'
                comp.style.marginTop = '10px'
                comp.style.marginBottom = '10px'
              } else {
                setOpen1('▼')
                comp.style.visibility = 'hidden'
                comp.style.opacity = '0'
                comp.style.height = '40px'
                comp.style.marginTop = '-20px'
                comp.style.marginBottom = '-20px'
              }
            }}><div>Энергия</div><div>{open1}</div></div>

              <div id={`company1`} className={styles.div_companys_info}>
                <div>ДВ регион</div>
                <div>Доставка 3-5 (дни)</div>
                <div>Стоимость 350 ₽</div>
              <div className={styles.div_pusto}></div>
                <div>Все регионы России</div>
                <div>Доставка 8-21 (дни)</div>
                <div>Стоимость 800 ₽</div>
              </div>

            <div className={styles.div_companys} onClick={(e)=>{
              const comp = document.querySelector(`#company2`)
              if (open2 === '▼') {
                setOpen2('▲')
                comp.style.visibility = 'visible'
                comp.style.opacity = '1'
                comp.style.height = '78px'
                comp.style.marginTop = '10px'
                comp.style.marginBottom = '10px'
              } else {
                setOpen2('▼')
                comp.style.visibility = 'hidden'
                comp.style.opacity = '0'
                comp.style.height = '40px'
                comp.style.marginTop = '-20px'
                comp.style.marginBottom = '-20px'
              }
            }}><div>Почта России</div><div>{open2}</div></div>

              <div id={`company2`} className={styles.div_companys_info}>
                <div>Все регионы России</div>
                <div>Доставка 8-21 (дни)</div>
                <div>Стоимость 550 ₽</div>
              </div>

            <div className={styles.div_companys} onClick={(e)=>{
              const comp = document.querySelector(`#company3`)
              if (open3 === '▼') {
                setOpen3('▲')
                comp.style.visibility = 'visible'
                comp.style.opacity = '1'
                comp.style.height = '78px'
                comp.style.marginTop = '10px'
                comp.style.marginBottom = '10px'
              } else {
                setOpen3('▼')
                comp.style.visibility = 'hidden'
                comp.style.opacity = '0'
                comp.style.height = '40px'
                comp.style.marginTop = '-20px'
                comp.style.marginBottom = '-20px'
              }
            }}><div>СДЭК с курьером до адреса</div><div>{open3}</div></div>

              <div id={`company3`} className={styles.div_companys_info}>
                <div>Все регионы России</div>
                <div>Доставка 8-21 (дни)</div>
                <div>Стоимость 1200 ₽</div>
              </div>

          </>}
          <div className={styles.div_text}>
            <h2>Способы Оплаты:</h2>
            <h4>1. Оплата на карту Сбербанка по номеру телефона <a href="tel:+79147730000">+79147730000</a>, получатель Ольга Дмитриевна К.</h4>
            <h4>2. Оплата на QIWI <a href="tel:+79147730000">+79147730000</a></h4>
          </div>
        </div>
      </div>
    </Layout>
  )
}
