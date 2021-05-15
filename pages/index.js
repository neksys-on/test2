import Layout from '../components/layout'
import { useState, useEffect, useCallback } from 'react'
import path from 'path'
import styles from './index.module.scss'
import Head from 'next/head'



export default function Page () {
  const titleMeta = 'Товары из Японии по низким ценам. Лучшее качество.'
  const descriptionMeta = 'Лучшие товары из Японии по низким ценам для красоты и здоровья. Прямые поставки из Японии, кратчайшие сроки. Только лучшая Японская продукция. Интернет магазин BestJap - Лучшее из Японии.'
  const [wid, setWid] = useState(0)
  const [coordinats, setCoordinats] = useState({
    content0: {
      x: '',
      y: ''
    },
    content1: {
      x: '',
      y: ''
    },
    content2: {
      x: '',
      y: ''
    },
    content3: {
      x: '',
      y: ''
    }

  })


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


return (
  <Layout propsBasket={sumItem}>
  <Head>
    <title>{titleMeta}</title>
    <meta name="mailru-domain" content="l58zwtBEk8TZcyqH" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content ={descriptionMeta} />
    <meta name="keywords" content = "товары, товары из японии, японские товары, производитель япония, низкие цены, красота, здоровье, для красоты, для здоровья, доставка из японии, япония, японская продукция, продукция, лучшее из японии, bestjap, из японии, купить, заказать, заказать из японии, купить из японии, маленькая япония"/>
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
  {wid>768 && <>
    <div style={{
      width: '90%',
      margin: 'auto',
      marginTop: '51px'
    }}>

      <div className={styles.div_presentations}>
        <div className={styles.div_main_text}>
          <div className={styles.div_zagolovok}>Маленькая япония</div>
          <div className={styles.div_text}>Все лучшее из Японии для красоты и здоровья.</div>
        </div>
        <div className={styles.div_card_image} >
          <div className={styles.div_image}>
            <div className={styles.div_dot_1}></div>
            <div className={styles.div_dot_2}></div>
            <div className={styles.div_dot_3}></div>
          </div>
          <div className={styles.div_image_content1}></div>
          <div className={styles.div_line_1_1}></div>
          <div className={styles.div_line_1_2}></div>
          <div className={styles.div_line_2_1}></div>
          <div className={styles.div_line_2_2}></div>
          <div className={styles.div_line_3_1}></div>
          <div className={styles.div_line_3_2}></div>
          <div className={styles.div_image_content2}>
            <div className={styles.div_image_content2_hair}></div>
          </div>
          <video id={'idVideoFon'} autoPlay src={'/miracle_fon2.webm'} loop muted className={styles.content2_video}></video>
          <div className={styles.div_image_content3}></div>
        </div>
      </div>
    </div>
  </>}
  {(wid<=768) && <>
    {(wid>0) && <>
      <div style={{
        margin: 'auto',
        marginTop: '51px'
      }}>
        <div className={styles.div_presentations}>
          <div className={styles.div_main_text} style={{minHeight: `${wid/1.35}px`}} >
            <div className={styles.div_zagolovok} style={{fontSize: `${wid/14}px`, top: `${wid/5.5}px`, left: `${wid/4.5}px`}}>Маленькая япония</div>
            <div className={styles.div_text} style={{fontSize: `${wid/21}px`, top: `${wid/3.3}px`, left: `${wid/4.5}px`, lineHeight: `${wid/18}px`}}>Все лучшее из Японии для красоты и здоровья.</div>
          </div>
          <div className={styles.div_conteiner1} style={{minHeight: `${wid/1.08}px`}}>
            <div className={styles.div_image_content1} style={{height: `${wid/3.3}px`, width: `${wid/3.3}px`, top: `${wid/1.7}px`, left: `${wid/40}px`}}></div>
            <div className={styles.div_image_content2} style={{height: `${wid/3.3}px`, width: `${wid/3.3}px`, top: `${wid/-4.7}px`, left: `${wid/1.8}px`}}>
              <div className={styles.div_image_content2_hair}></div>
            </div>
            <div className={styles.div_image_content3} style={{height: `${wid/3.3}px`, width: `${wid/3.3}px`, top: `${wid/31.7}px`, left: `${wid/1.65}px`}}></div>
          </div>
        </div>
      </div>
    </>}
  </>}
</Layout>)

}
