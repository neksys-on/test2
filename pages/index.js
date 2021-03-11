import Layout from '../components/layout'
import { useState, useEffect, useCallback } from 'react'
import path from 'path'
import styles from './index.module.scss'
import Head from 'next/head'



export default function Page () {
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

  })


return (
  <Layout propsBasket={sumItem}>
  <Head>
    <title>Товары из Японии по низким ценам</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content = "Лучшие товары из Японии по низким ценам для красоты и здоровья. Прямые поставки из Японии, кратчайшие сроки. Только лучшая Японская продукция."/>
    <meta charset = "UTF-8"/>
  </Head>
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
        <div className={styles.div_image_content3}></div>

      </div>
    </div>


  </div>
</Layout>)

}
