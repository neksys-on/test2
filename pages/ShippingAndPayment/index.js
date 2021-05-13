import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'


export default function Page () {
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
        <title>Услови и сроки доставки товаров из Японии</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content = "Условия и сроки доставки качественной Японской продукции. Интернет магазин bestjap - Лучшее из Японии."/>
        <meta name="keywords" content = "доставка из японии, япония, японская продукция, продукция, сроки, доставка, условия доставки, bestjap, лучшее из японии, заказать из японии, заказать, купить, купить японскую, как купить, как заказать, из японии"/>
        <meta name = "robots" content = "index, follow" />
        <meta name="google-site-verification" content="5iQH12a1WI8Qz_u6afuv6zVkLHmngjX2dzb_NLnfZBc" />
        <meta name="yandex-verification" content="a446fe2c0342224b" />
        <meta charSet = "UTF-8"/>
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
                  <div className={styles.div_item}>СДЭК с курьером до адреса</div>
                </div>
                <div className={styles.div_region}>
                  <div className={styles.div_item}>Регион</div>
                  <div className={styles.div_item}>ДВ регион</div>
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
                </div>
                <div className={styles.div_price}>
                  <div className={styles.div_item_price}>Стоимость</div>
                  <div className={styles.div_item_price}>350 ₽</div>
                  <div className={styles.div_item_price}>800 ₽</div>
                  <div className={styles.div_item_price}>550 ₽</div>
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
