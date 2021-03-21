import styles from './officeContent.module.scss'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'
import Popup from '../popup/popup.js'

export default function PrivateOfficeContent({selected_tab, users_email}) {
  const [ ordersData , setOrdersData ] = useState([{
    name:'',
    state: {
      payment: '',
      shipment: '',
      track_number:'',
    }
  }])
  const [ userData , setUserData ] = useState({
    id:'0',
    email:'',
    surname:'',
    name:'',
    patronymic:'',
    telephone:'',
    city:'',
    address:'',
    index:''
})

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


          const res_usersData = await fetch('/api/data/getData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: 'usersData'
             }),
          })

          try {
            const json_usersData = await res_usersData.json()
            if (json_usersData.usersData) {
              let persondata = undefined
              json_usersData.usersData.map((user)=>{
                if (user.email) {
                  if (user.email === users_email) {
                      persondata = user
                  }
                }
              })
              if (persondata !== undefined) { setUserData(persondata) }
            }
          }
          catch {
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

    <div className={styles.div_main}>
      <div className={styles.div_name_content}>Личные данные</div>
      <div className={styles.div_content2}>
        <div className={styles.container}>
          <div className={styles.div_userData}>Фамилия: {userData.surname}</div>
          <div className={styles.div_userData}>Имя: {userData.name}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.div_userData}>Отчество: {userData.patronymic}</div>
          <div className={styles.div_userData}>Email: {userData.email}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.div_userData}>Номер телефона: {userData.telephone}</div>
          <div className={styles.div_userData}>Населенный пункт: {userData.city}</div>
        </div>
        <div className={styles.container}>
          <div className={styles.div_userData}>Адрес доставки: {userData.address}</div>
          <div className={styles.div_userData}>Индекс: {userData.index}</div>
        </div>

      </div>
      <div className={styles.butt} id={'offer'} >
          <a onClick={()=>{
            const popup = document.querySelector('#id_popup_fon')
            const container = document.querySelector('#id_popup_container')
            popup.style.opacity = '1'
            popup.style.visibility = 'visible'
            container.style.opacity = '1'
            container.style.transform = 'perspective(600px) translate(0px, 0%) rotateX(0deg)'
          }}>
            <p><span className={styles.bg}></span><span className={styles.base}></span><span className={styles.text}>Редактировать</span></p>
          </a>
      </div>
      <Popup title={'Измените и подтвердите ваши данные'} content={userData} typePopup={'userData'}/>
    </div>

  )
}
