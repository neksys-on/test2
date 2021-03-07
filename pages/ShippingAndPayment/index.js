import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'


export default function Page () {

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

  return(
    <Layout propsBasket={sumItem}>
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px'
      }}>
        <h1>Доставка и оплата</h1>
        <div className={styles.div_main}>
          <div className={styles.div_text}><h4>Отправка товаров осуществляется только после полной оплаты стоимости товаров и доставки.</h4>
          </div>
          <div className={styles.div_text}><h2>Способы доставки</h2></div>

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
          <div className={styles.div_text}>
          <h2>Способы Оплаты</h2>
          <h4>Оплата на карту.</h4>
          </div>

        </div>

      </div>
    </Layout>
  )
}
