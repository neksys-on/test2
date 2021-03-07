import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import styles from './change_offers.module.scss'
import Link from 'next/link'
import Router from "next/router"


async function changeInData(id, whatChange, newInfo) {
  const response = await fetch('/api/data/changeData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      whatChange: whatChange,
      newInfo: newInfo,
      type: 'orders'
     }),
  })
  const data = await response.json()
  return data.id
}


export default function Page () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [sumItem, setSumItem] = useState('0')
  const [filter_orders, setFilter_orders] = useState('1')
  const [recoveryItem, setRecoveryItem] = useState('')
  const [recoveryColor, setRecoveryColor] = useState('')

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
      const resPr = await fetch('/api/examples/protected')
      const jsonPr = await resPr.json()
      if (jsonPr.content) { setContent(jsonPr.content) }

      if (ordersData[0].name === '') {
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
            if (personOrders === undefined) {
              personOrders = [order]
            }
            else {
              personOrders.unshift(order)
            }
          })
          if (personOrders !== undefined) { setOrdersData(personOrders) }
        }
      }
    }
    fetchData()

    const localStor = localStorage.getItem('_basket')
    if (localStor) {
    const  localStorJson = JSON.parse(localStor)
      setSumItem(localStorJson.length)
    }
    else {
      setSumItem('0')
    }



  },[session])

  useEffect(()=>{
    const localStorFilterOrders = localStorage.getItem('_filter_orders')
    if (localStorFilterOrders) {
      setFilter_orders(localStorFilterOrders)

    }
    else (
      localStorage.setItem('_filter_orders', '1')
    )

    try {
      recoveryItem.style.borderColor = recoveryColor
    }
    catch {}
    const filter_point = document.querySelector(`#id_filter${filter_orders}`)
    try {
      setRecoveryItem(filter_point)
      setRecoveryColor(filter_point.style.borderColor)
      filter_point.style.borderColor = '#FF1493'
    }
    catch {}
  })


  const onClickChangeData = React.useCallback((e) => {
    if ( e.target.title === 'track_number')
    changeInData(e.target.id, e.target.title, document.querySelector(`#idInput${e.target.id}`).value).then(setTimeout(Router.reload, 700))
    if (( e.target.title === 'payment' )||( e.target.title === 'shipment' ))
    changeInData(e.target.id, e.target.title, '').then(setTimeout(Router.reload, 700))
  }, []);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  if ((session.user.email === 'neksyz@gmail.com')||(session.user.email === 'neksyz@gmail.com')) {
    return (
      <Layout propsBasket={sumItem}>
        <div style={{
          width: '90%',
          margin: 'auto',
          paddingLeft: '30px',
          paddingRight: '30px',
          paddingTop: '30px'
        }}>
            <div className={styles.div_main}>
              <div className={styles.div_content_menu}>
                <div id={'id_filter1'} onClick={(e)=>{
                  localStorage.setItem('_filter_orders', '1')
                  setFilter_orders('1')
                }} className={styles.div_name_content}>Все заказы</div>
                <div id={'id_filter2'} onClick={(e)=>{
                  localStorage.setItem('_filter_orders', '2')
                  setFilter_orders('2')
                }} className={styles.div_name_content}>Неоплаченные</div>
                <div id={'id_filter3'} onClick={(e)=>{
                  localStorage.setItem('_filter_orders', '3')
                  setFilter_orders('3')
                }} className={styles.div_name_content}>Неотправленные</div>
                <div id={'id_filter4'} onClick={(e)=>{
                  localStorage.setItem('_filter_orders', '4')
                  setFilter_orders('4')
                }} className={styles.div_name_content}>Отправленные</div>
              </div>
              <div className={styles.div_content}>
              {ordersData.map((order)=>{
                if (filter_orders === '1') {
                  return (
                    <div className={styles.div_block_order} key={`key`+order.id}>
                      <div className={styles.div_block}>
                        <div className={styles.div_id}>№ заказа: {order.id}</div>
                        <div className={styles.div_id}>Общая стоимость: {order.totalPrice}</div>
                      </div>
                      <div className={styles.div_block}>
                        <div className={styles.div_id}>Оплата: {order.state.payment}
                          <button id={order.id} title={'payment'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                        </div>
                        <div className={styles.div_id}>Состояние заказа: {order.state.shipment}
                          <button id={order.id} title={'shipment'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                        </div>
                      </div>
                      <div className={styles.div_block}>
                        {order.time !== undefined && <>
                          <div className={styles.div_id}>Дата и время: {order.time.date}.{order.time.mounth<10 && <>0</>}{order.time.mounth}.{order.time.year}  {order.time.hours}:{order.time.minutes<10 && <>0</>}{order.time.minutes}</div>
                        </>}
                        <div className={styles.div_id}>Трек-код:
                          <input id={'idInput'+order.id} placeholder={order.state.track_number}></input>
                          <button id={order.id} title={'track_number'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                        </div>
                      </div>

                    </div>
                  )
                }
                if (filter_orders === '2') {
                  if (order.state.payment === 'Не оплачено') {
                    return (
                      <div className={styles.div_block_order} key={`key`+order.id}>
                        <div className={styles.div_block}>
                          <div className={styles.div_id}>№ заказа: {order.id}</div>
                          <div className={styles.div_id}>Общая стоимость: {order.totalPrice}</div>
                        </div>
                        <div className={styles.div_block}>
                          <div className={styles.div_id}>Оплата: {order.state.payment}
                            <button id={order.id} title={'payment'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                          <div className={styles.div_id}>Состояние заказа: {order.state.shipment}
                            <button id={order.id} title={'shipment'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                        </div>
                        <div className={styles.div_block}>
                          {order.time !== undefined && <>
                            <div className={styles.div_id}>Дата и время: {order.time.date}.{order.time.mounth<10 && <>0</>}{order.time.mounth}.{order.time.year}  {order.time.hours}:{order.time.minutes<10 && <>0</>}{order.time.minutes}</div>
                          </>}
                          <div className={styles.div_id}>Трек-код:
                            <input id={'idInput'+order.id} placeholder={order.state.track_number}></input>
                            <button id={order.id} title={'track_number'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                        </div>

                      </div>
                    )
                  }
                }
                if (filter_orders === '3') {
                  if ((order.state.shipment === 'Не отправлен')&(order.state.payment === 'Оплачено')) {
                    return (
                      <div className={styles.div_block_order} key={`key`+order.id}>
                        <div className={styles.div_block}>
                          <div className={styles.div_id}>№ заказа: {order.id}</div>
                          <div className={styles.div_id}>Общая стоимость: {order.totalPrice}</div>
                        </div>
                        <div className={styles.div_block}>
                          <div className={styles.div_id}>Оплата: {order.state.payment}
                            <button id={order.id} title={'payment'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                          <div className={styles.div_id}>Состояние заказа: {order.state.shipment}
                            <button id={order.id} title={'shipment'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                        </div>
                        <div className={styles.div_block}>
                          {order.time !== undefined && <>
                            <div className={styles.div_id}>Дата и время: {order.time.date}.{order.time.mounth<10 && <>0</>}{order.time.mounth}.{order.time.year}  {order.time.hours}:{order.time.minutes<10 && <>0</>}{order.time.minutes}</div>
                          </>}
                          <div className={styles.div_id}>Трек-код:
                            <input id={'idInput'+order.id} placeholder={order.state.track_number}></input>
                            <button id={order.id} title={'track_number'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                        </div>

                      </div>
                    )
                  }
                }
                if (filter_orders === '4') {
                  if (order.state.shipment === 'Отправлен') {
                    return (
                      <div className={styles.div_block_order} key={`key`+order.id}>
                        <div className={styles.div_block}>
                          <div className={styles.div_id}>№ заказа: {order.id}</div>
                          <div className={styles.div_id}>Общая стоимость: {order.totalPrice}</div>
                        </div>
                        <div className={styles.div_block}>
                          <div className={styles.div_id}>Оплата: {order.state.payment}
                            <button id={order.id} title={'payment'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                          <div className={styles.div_id}>Состояние заказа: {order.state.shipment}
                            <button id={order.id} title={'shipment'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                        </div>
                        <div className={styles.div_block}>
                          {order.time !== undefined && <>
                            <div className={styles.div_id}>Дата и время: {order.time.date}.{order.time.mounth<10 && <>0</>}{order.time.mounth}.{order.time.year}  {order.time.hours}:{order.time.minutes<10 && <>0</>}{order.time.minutes}</div>
                          </>}
                          <div className={styles.div_id}>Трек-код:
                            <input id={'idInput'+order.id} placeholder={order.state.track_number}></input>
                            <button id={order.id} title={'track_number'} value={order.id} onClick={onClickChangeData}>Изменить</button>
                          </div>
                        </div>

                      </div>
                    )
                  }
                }

              })}
              </div>

            </div>
        </div>
      </Layout>
    )
  }
    return (
      <Layout propsBasket={sumItem}>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px'
        }}>
          <h1>Личный кабинет</h1>
          <p>
            У вас нет права на внесение изменений.
          </p>

        </div>
      </Layout>
    )
}
