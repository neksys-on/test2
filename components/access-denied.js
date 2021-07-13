import { signIn } from 'next-auth/client'
import Layout from '../components/layout'
import styles from './access-denied.module.scss'
import { useState, useEffect, useCallback } from 'react'

export default function AccessDenied () {
  const [ordersId, setOrdersId] = useState(null)

  useEffect(()=>{
    if (ordersId === null) {
      const lSOrders = localStorage.getItem('_orders')
      if (lSOrders) {
        const lSOrdersJson = JSON.parse(lSOrders)
        setOrdersId(lSOrdersJson)
      } else {
        setOrdersId(undefined)
      }
    }

  }, [])


  return (
    <>
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px'
      }}>
        <div className={styles.div_fon}>
          <h2>Что бы получить доступ к личному кабинету, необходимо пройти <p>
            <a href="/api/auth/signin"
               onClick={(e) => {
               e.preventDefault()
               signIn()
            }}>Авторизацию</a>
          </p></h2>
          <div>Последние заказы с этого устройства:</div>
          {ordersId && <>
            {ordersId.map(item => (
              <div><a href={`${'http://localhost:3000/'}privateOffice/offer/${item}`} >Заказа №{item}</a></div>
            ))}
          </>}
        </div>
      </div>
    </>
  )
}
