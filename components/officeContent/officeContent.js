import styles from './officeContent.module.scss'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'

export default function PrivateOfficeContent({selected_tab, users_email}) {
  const [ ordersData , setOrdersData ] = useState([{
    name:'',
    state: {
      payment: '',
      shipment: '',
      track_number:'',
    }
  }])

  useEffect(()=>{

    const fetchData = async () => {
      if ((ordersData[0].state.payment === '')||(ordersData[0].state.shipment === '')) {
          const res = await fetch('/api/data/getData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: 'orders'
             }),
          })
          const json = await res.json()
          if (json.orders) {
            let personOrders = undefined
            json.orders.map((order)=>{
              if (order.email === users_email) {
                if (personOrders === undefined) {
                  personOrders = [order]
                }
                else {
                  personOrders.unshift(order)
                }
              }
            })
            if (personOrders !== undefined) { setOrdersData(personOrders) }
          }
      }

    }

    fetchData()


  })



  if (selected_tab === 'Order history') return (

    <div className={styles.div_main}>
      <div className={styles.div_name_content}>История Заказов</div>
      <div className={styles.div_content}>
      {ordersData.map((order)=>(
        <div className={styles.div_block_order} key={`key`+order.id}>
          <div className={styles.div_block}>
            <div className={styles.div_id}>№ заказа: {order.id}</div>
            <div className={styles.div_id}>Общая стоимость: {order.totalPrice}</div>
          </div>
          <div className={styles.div_block}>
            <div className={styles.div_id}>Оплата: {order.state.payment}</div>
            <div className={styles.div_id}>Состояние заказа: {order.state.shipment}</div>
          </div>
          <div className={styles.div_block}>
            <div className={styles.div_id}>Трек-код: {order.state.track_number}</div>
          </div>

        </div>
      ))}
      </div>


    </div>

  )

  if (selected_tab !== 'Order history') return (

    <div>
      Личные данные
    </div>

  )
}
