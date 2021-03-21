import Layout from '../components/layout'
import { useState, useEffect, useCallback } from 'react'
import path from 'path'
import styles from './index.module.scss'
import Head from 'next/head'



export default function Page () {
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
    <title>Товары из Японии по низким ценам</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content = "Лучшие товары из Японии по низким ценам для красоты и здоровья. Прямые поставки из Японии, кратчайшие сроки. Только лучшая Японская продукция."/>
    <meta charSet = "UTF-8"/>
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
          <div className={styles.div_image_content3}></div>

        </div>
      </div>


    </div>
  </>}
  {((wid<=768)&(wid>0)) && <>
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
</Layout>)

}
