import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'


export default function Page () {
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
      <title>Контакты интернет магазина besjap</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content = "Контакты интернет магазина bestjap. Самые качественные товары из Японии по низким ценам для красоты и здоровья. Интернет магазин besjap - Лучшее из Японии. Что бы заказать, интересующие вас, товары из Японии свяжитесь с нами."/>
      <meta name="keywords" content = "из японии, японские товары, производитель япония, контакты, контактные данные, интернет магазин, bestjap, лучшее из японии, заказать из японии, купить, заказать"/>
      <meta name = "robots" content = "index, follow" />
      <meta name="google-site-verification" content="5iQH12a1WI8Qz_u6afuv6zVkLHmngjX2dzb_NLnfZBc" />
      <meta name="yandex-verification" content="a446fe2c0342224b" />
      <meta charSet = "UTF-8"/>
    </Head>
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px 0px 30px 0px',
        overflow: 'hidden'
      }}>
        <h1>Контакты</h1>
        <div className={styles.wrapper}>
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
                <div className={styles.heading}>
                  ИП Корнева Ольга Дмитриевна
                </div>
                <div className={styles.heading}>
                  Телефон:
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  <a href="tel:+79147730000">+7 (914) 773-00-00</a>
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  <a href="tel:+79144061391">+7 (914) 406-13-91</a>
                </div>
                <div className={styles.heading}>
                  EMAIL:
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
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
                  Пн-Пт с 17 до 03 ч.
                </div>
                <div className={styles.text} style={{textAlign: 'center'}}>
                  Сб-Вс с 18 до 02 ч.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
