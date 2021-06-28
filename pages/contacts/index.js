import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'


export default function Page () {
  const titleMeta = 'Контакты интернет магазина BestJap'
  const descriptionMeta = 'Контакты интернет магазина BestJap. Самые качественные товары из Японии по низким ценам для красоты и здоровья. Интернет магазин BestJap - Лучшее из Японии. Что бы заказать, интересующие вас, товары из Японии свяжитесь с нами.'

  const [wid, setWid] = useState(0)
  let cardTransitionTime = 6

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
      <meta name="description" content ={descriptionMeta} />
      <meta name="keywords" content = "из японии, японские товары, производитель япония, контакты, контактные данные, интернет магазин, bestjap, лучшее из японии, заказать из японии, купить, заказать"/>
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
        padding: '30px 0px 30px 0px',
        overflow: 'hidden'
      }}>
        <h1>Контакты</h1>
        <div className={styles.wrapper} itemScope itemType="http://schema.org/Organization">
          <div className={styles.container}
            onMouseMove={(e) => {
              const card = document.querySelector(`#idCard1`)
              const coord = card.getBoundingClientRect()
              let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 15 *(650/card.clientHeight);
              let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 28 *(650/card.clientHeight)*0.5;
              card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
              cardTransitionTime -= 1
              if (cardTransitionTime>0) {
                card.style.transition = `all 0.${cardTransitionTime*10}s ease`
              }
            }}
            onMouseEnter={(e) =>{
              const card = document.querySelector(`#idCard1`)
              // const element = document.querySelector(`#idElement1`)
              card.style.transition = 'none'
              // element.style.transition = 'all 0.8s ease'
              // element.style.transform = 'translateZ(10deg)'
            }}
            onMouseLeave={(e) =>{
              cardTransitionTime = 6
              const card = document.querySelector(`#idCard1`)
              // const element = document.querySelector(`#idElement1`)
              card.style.transform = `rotateY(0deg) rotateX(0deg)`
              card.style.transition = 'all 0.5s ease'
            }}
          >
            <div className={styles.card} id={'idCard1'}>
              <div className={styles.element} id={'idElement1'}>
                <div className={styles.heading} itemProp="director" itemScope itemType="https://schema.org/Person">
                  ИП Корнева Ольга Дмитриевна
                </div>
                <div className={styles.heading}>
                  Телефон:
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  <a href="tel:+79147730000" itemProp="telephone">+7 (914) 773-00-00</a>
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  <a href="tel:+79144061391" itemProp="telephone">+7 (914) 406-13-91</a>
                </div>
                <div className={styles.heading}>
                  EMAIL:
                </div>
                <div className={styles.text} style={{textAlign: 'center'}} itemProp="email">
                 support@bestjap.ru
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container}
            onMouseMove={(e) => {
              const card = document.querySelector(`#idCard2`)
              const coord = card.getBoundingClientRect()
              let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 15 *(650/card.clientHeight);
              let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 28 *(650/card.clientHeight)*0.5;
              card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
              cardTransitionTime -= 1
              if (cardTransitionTime>0) {
                card.style.transition = `all 0.${cardTransitionTime*10}s ease`
              }
            }}
            onMouseEnter={(e) =>{
              const card = document.querySelector(`#idCard2`)
              // const element = document.querySelector(`#idElement1`)
              card.style.transition = 'none'
              // element.style.transition = 'all 0.8s ease'
              // element.style.transform = 'translateZ(10deg)'
            }}
            onMouseLeave={(e) =>{
              cardTransitionTime = 6
              const card = document.querySelector(`#idCard2`)
              // const element = document.querySelector(`#idElement1`)
              card.style.transform = `rotateY(0deg) rotateX(0deg)`
              card.style.transition = 'all 0.5s ease'
            }}
          >
            <div className={styles.card} id={'idCard2'}>
              <div className={styles.element} id={'idElement2'}>
                <div className={styles.heading}>
                  Реквизиты:
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  Наименование банка: ФИЛИАЛ "ХАБАРОВСКИЙ" АО "АЛЬФА-БАНК"
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  БИК: 040813770
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  К/с: 30101810800000000770
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  Номер счета: 40802810420000004164
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  ИНН: 280115312806
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  ОГРН: 321272400011910
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container}
            onMouseMove={(e) => {
              const card = document.querySelector(`#idCard3`)
              const coord = card.getBoundingClientRect()
              let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 15 *(650/card.clientHeight);
              let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 28 *(650/card.clientHeight)*0.5;
              card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
              cardTransitionTime -= 1
              if (cardTransitionTime>0) {
                card.style.transition = `all 0.${cardTransitionTime*10}s ease`
              }
            }}
            onMouseEnter={(e) =>{
              const card = document.querySelector(`#idCard3`)
              // const element = document.querySelector(`#idElement1`)
              card.style.transition = 'none'
              // element.style.transition = 'all 0.8s ease'
              // element.style.transform = 'translateZ(10deg)'
            }}
            onMouseLeave={(e) =>{
              cardTransitionTime = 6
              const card = document.querySelector(`#idCard3`)
              // const element = document.querySelector(`#idElement1`)
              card.style.transform = `rotateY(0deg) rotateX(0deg)`
              card.style.transition = 'all 0.5s ease'
            }}
          >
            <div className={styles.card} id={'idCard3'}>
              <div className={styles.element} id={'idElement3'}>
                <div className={styles.heading}>
                  Заказы через сайт принимаются круглосуточно.
                </div>

                <div className={styles.heading}>
                  Обработка заказов осуществляется по МСК:
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  Пн-Пт с 03 до 13 ч.
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  Сб-Вс с 04 до 12 ч.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
