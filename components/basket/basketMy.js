import styles from './basketMy.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'


export default function CustomizedBadges({propsBasket}) {
  let sumItems = 0
  if (propsBasket) {
    sumItems = propsBasket
  }
  else {
    let localStorJson
    useEffect(()=>{
      const localStor = localStorage.getItem('_basket')
      if (localStor) {
        localStorJson = JSON.parse(localStor)
        sumItems = localStorJson.length
      }
      else {
        sumItems = '0'
      }
    })
  }

  return (
    <Link href="/basket"><div className={styles.mainDiv}>
      <div className={styles.cardDiv}></div>
      <div className={styles.cloudDiv}>
        <span id='basketSpanSumItems'>{sumItems}</span>
      </div>
    </div></Link>
  );
}
