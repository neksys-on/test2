import styles from './popup.module.css'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import Router from "next/router"
import { useSession } from 'next-auth/client'
import AccessDenied from '../access-denied'



function hidden(event) {
  const popup = document.querySelector('#id_popup_fon')
  const container = document.querySelector('#id_popup_container')
  popup.style.opacity = '0'
  popup.style.visibility = 'hidden'
  container.style.opacity = '0'
  container.style.transform = 'perspective(600px) translate(0px, -100%) rotateX(45deg)'
  event.preventDefault() // не дает перезагрузить страницу нажимая на ссылку ' a href='' '
}

function highlighting(type) {
  const h2 = document.querySelector(`#h2_${type}`)
  const input = document.querySelector(`#input_${type}`)
  h2.style.color = '#d15698'
  input.style.border = '1px solid #d15698'
}

function stop_highlighting(type) {
  const h2 = document.querySelector(`#h2_${type}`)
  const input = document.querySelector(`#input_${type}`)
  h2.style.color = '#aaa'
  input.style.border = '1px solid #cccccc'
}


async function pushInData(infoPush) {
  const response = await fetch('/api/data/setData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      doPush: infoPush,
      type: 'orders'
     }),
  })
  const id_of = await response.json()
  const id_off = id_of.id_offer
  return id_off
}

async function changeInDataUsersData (id,  newInfo) {
  const response = await fetch('/api/data/changeData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      whatChange: 'all',
      newInfo: newInfo,
      type: 'usersData'
     }),
  })
  const data = await response.json()
  return data
}


async function msgsend(doing, text) {
  const response = await fetch('/api/sendWhatsapp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      do: doing,
      text: text,
     }),
  })
  const data = await response.json()
  return data.doPush
}



export default function Popup({title, content, typePopup}) {
  const [ session, loading ] = useSession()
  const [index_value, setIndex_value] = useState('')
  const [phone_value, setPhone_value] = useState('+7')
  const [phone_value_length, setPhone_value_length] = useState(3)



  useEffect(()=>{
    if ((index_value === '')&(content.index !== '')) {
      setIndex_value(content.index)
    }

    if ((phone_value === '+7')&(content.telephone !== '')) {
      setPhone_value(content.telephone)
    }

  })

  const onClickButtonAddData = React.useCallback((e) => {
    if (document.querySelector(`#input_surname`).value === '') {
      console.log('Нет фамилии')
    }
    if (document.querySelector(`#input_name`).value === '') {
      console.log('Нет имени')
    }
    if (document.querySelector(`#input_patronymic`).value === '') {
      console.log('Нет отчества')
    }
    if (document.querySelector(`#input_email`).value === '') {
      console.log('Нет почты')
    }
    if (document.querySelector(`#input_telephone`).value === '') {
      console.log('Нет телефона')
    }
    if (document.querySelector(`#input_city`).value === '') {
      console.log('Нет города')
    }
    if (document.querySelector(`#input_address`).value === '') {
      console.log('Нет адреса')
    }
    if (document.querySelector(`#input_index`).value.length !== 6) {
      console.log('Индекс неправильный')
    }

    const localStor = localStorage.getItem('_basket')
    const localStorJson = JSON.parse(localStor)

    let productsWeHave = undefined
    localStorJson.map((product) => {
      let notFound = true
      if (productsWeHave) {
        productsWeHave.map((prod) => {
          if (prod.id === product.id) {
            prod.value = prod.value + 1
            notFound = false
          }
        })
      }
      else {
        notFound = false
        productsWeHave = [product]
        productsWeHave[0].value = 1
      }
      if (notFound) {
        productsWeHave.push(product)
        productsWeHave[productsWeHave.length-1].value = 1
      }

    })

    let totalPrice = 0
    if (productsWeHave) {
      productsWeHave.map((prod) => {
        totalPrice += prod.price*prod.value
      })
    }
    const addData = {
      surname: document.querySelector(`#input_surname`).value,
      name: document.querySelector(`#input_name`).value,
      patronymic: document.querySelector(`#input_patronymic`).value,
      email: document.querySelector(`#input_email`).value,
      telephone: document.querySelector(`#input_telephone`).value,
      city: document.querySelector(`#input_city`).value,
      address: document.querySelector(`#input_address`).value,
      index: document.querySelector(`#input_index`).value,
      comments: document.querySelector(`#input_comments`).value,
      products: productsWeHave,
      totalPrice: totalPrice,
    }

    localStorage.setItem('_basket', [])
    //   pushInData(addData).then(Router.reload()
    // msgsend('connect', 'msg')
    // let list_products = ''
    // productsWeHave.map((prod)=>{
    //   list_products = list_products+' \n '+'№'+ prod.id +', '+ prod.title +', Цена: '+ prod.price +', количество: '+ prod.value
    // })
    //
    // let id_pure
    // const text_offer = ' ФИО: '+addData.surname+' '+addData.name+' '+addData.patronymic+', тел.: '+addData.telephone+', Населенный пункт: '+addData.city+', адрес: '+addData.address+', индекс: '+addData.index+', Содержание: '+list_products
    pushInData(addData).then(setTimeout(Router.push, 700, "/privateOffice"))


  }, []);

  const onClickButtonAddDataUserData = React.useCallback((e) => {
    let change = false
    if (document.querySelector(`#input_surname`).value !== content.surname) {
      change = true
    }
    if (document.querySelector(`#input_name`).value !== content.name) {
      change = true
    }
    if (document.querySelector(`#input_patronymic`).value !== content.patronymic) {
      change = true
    }
    if (document.querySelector(`#input_email`).value !== content.email) {
      change = true
    }
    if (document.querySelector(`#input_telephone`).value !== content.telephone) {
      change = true
    }
    if (document.querySelector(`#input_city`).value !== content.city) {
      change = true
    }
    if (document.querySelector(`#input_address`).value !== content.address) {
      change = true
    }
    if (document.querySelector(`#input_index`).value !== content.index) {
      change = true
    }

    if (change === true) {
      const addData = {
        id: content.id || 0,
        surname: document.querySelector(`#input_surname`).value,
        name: document.querySelector(`#input_name`).value,
        patronymic: document.querySelector(`#input_patronymic`).value,
        email: document.querySelector(`#input_email`).value,
        telephone: document.querySelector(`#input_telephone`).value,
        city: document.querySelector(`#input_city`).value,
        address: document.querySelector(`#input_address`).value,
        index: document.querySelector(`#input_index`).value
      }
      changeInDataUsersData(content.id, addData).then(setTimeout(Router.reload, 700))
    }


  }, []);

if (typeof window !== 'undefined' && loading) return null

if (typePopup === 'order') {
    return (
      <div id={'id_popup_fon'} className={styles.popup_fon} onClick={(e)=>{
        if (!e.target.closest('#id_popup_container')) {
          // hidden(e)
        }
      }}>
        <div id={'id_popup_container'} className={styles.popup_container}>
          <a href='' className={styles.popup_close} onClick={hidden}>×</a>
          <div className={styles.popup_header}>
            {title}
          </div>
          <div className={styles.popup_body}>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_surname'}>Фамилия</h2>
                <input id={'input_surname'} className={styles.popup_input} type='text' defaultValue={content.surname}
                onFocus={()=>{
                  highlighting('surname')
                }}
                onBlur={()=>{
                  stop_highlighting('surname')
                }}
                ></input>
              </div>
              <div className={styles.div_input}>
                <h2 id={'h2_name'}>Имя</h2>
                <input id={'input_name'} className={styles.popup_input} type='text' defaultValue={content.name}
                onFocus={()=>{
                  highlighting('name')
                }}
                onBlur={()=>{
                  stop_highlighting('name')
                }}
                ></input>
              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_patronymic'}>Отчество</h2>
                <input id={'input_patronymic'} className={styles.popup_input} type='text' defaultValue={content.patronymic}
                onFocus={()=>{
                  highlighting('patronymic')
                }}
                onBlur={()=>{
                  stop_highlighting('patronymic')
                }}
                ></input>
              </div>
              <div className={styles.div_input}>
                <h2 id={'h2_email'}>Email</h2>
                {session && <>
                  <input id={'input_email'} className={styles.popup_input} type='email' defaultValue={session.user.email}
                  onFocus={()=>{
                    highlighting('email')
                  }}
                  onBlur={()=>{
                    stop_highlighting('email')
                  }}
                  ></input>
                </>}
                {!session && <>
                  <input id={'input_email'} className={styles.popup_input} type='email'
                  onFocus={()=>{
                    highlighting('email')
                  }}
                  onBlur={()=>{
                    stop_highlighting('email')
                  }}
                  ></input>
                </>}

              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_telephone'}>Номер телефона</h2>
                <input id={'input_telephone'} className={styles.popup_input} type='tel' value={phone_value} maxLength='16'
                onChange = {(e)=>{
                  const val = e.target.value
                  let newVal = val
                  let n = 0
                  if ((e.target.value[0] !== '8')&(e.target.value[0] !== '7')&(e.target.value[0] !== '+')) {
                    n = 3
                  }
                  else {
                    if (e.target.value[0] !== '+') {
                      n = 1
                    }
                    if ((e.target.value.length > 2-n)&(e.target.value[2-n] !== ' ')&(e.target.value.length > phone_value_length)) {
                      newVal = ''
                      for (let i = 0; i < e.target.value.length; i++) {
                        if (i === 2-n) {
                          newVal = newVal+' '
                        }
                        newVal = newVal+e.target.value[i]
                      }
                    }
                  }
                  if (((e.target.value.length === 6-n)||(e.target.value.length === 10-n)||(e.target.value.length === 13-n))&(e.target.value.length > phone_value_length)) {
                    newVal = val+' '
                  }

                  if ((e.target.value.length > 6-n)&(e.target.value[6-n] !== ' ')&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 6-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }

                  if ((e.target.value.length > 10-n)&(e.target.value[10-n] !== ' ')&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 10-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }
                  if ((e.target.value.length > 13-n)&(e.target.value[13-n] !== ' ')&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 13-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }

                  setPhone_value(newVal)
                  setPhone_value_length(e.target.value.length)
                }}
                onFocus={()=>{
                  highlighting('telephone')
                }}
                onBlur={()=>{
                  stop_highlighting('telephone')
                }}
                ></input>
              </div>
              <div className={styles.div_input}>
                <h2 id={'h2_city'}>Населенный пункт</h2>
                <input id={'input_city'} className={styles.popup_input} type='text' defaultValue={content.city}
                onFocus={()=>{
                  highlighting('city')
                }}
                onBlur={()=>{
                  stop_highlighting('city')
                }}
                ></input>
              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_address'}>Адрес доставки</h2>
                <input id={'input_address'} className={styles.popup_input} type='text' defaultValue={content.address}
                onFocus={()=>{
                  highlighting('address')
                }}
                onBlur={()=>{
                  stop_highlighting('address')
                }}
                ></input>
              </div>
              <div className={styles.div_input}>
                <h2 id={'h2_index'}>Индекс</h2>
                <input id={'input_index'} className={styles.popup_input_index} type='number' value={index_value}
                onChange = {(e)=>{
                  const val = e.target.value
                  const max = 1000000
                  const maxLength = max.toString().length-1
                  const newVal = val < max ? val : parseInt(val.toString().substring(0, maxLength))
                  setIndex_value(newVal)
                }}
                onFocus={()=>{
                  highlighting('index')
                }}
                onBlur={()=>{
                  stop_highlighting('index')
                }}
                ></input>
              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_comments'}>Комментарии к заказу</h2>
                <textarea id={'input_comments'} className={styles.popup_input_comments} type='text'
                onFocus={()=>{
                  highlighting('comments')
                }}
                onBlur={()=>{
                  stop_highlighting('comments')
                }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className={styles.popup_footer}>


            <div className={styles.btn} onClick={onClickButtonAddData}><span className={styles.noselect}>Подтвердить</span><div className={styles.circle}></div></div>
          </div>
        </div>
      </div>
    )
  }


if (typePopup === 'userData') {


    return (
      <div id={'id_popup_fon'} className={styles.popup_fon} onClick={(e)=>{
        if (!e.target.closest('#id_popup_container')) {
          // hidden(e)
        }
      }}>
        <div id={'id_popup_container'} className={styles.popup_container2}>
          <a href='' className={styles.popup_close} onClick={hidden}>×</a>
          <div className={styles.popup_header}>
            {title}
          </div>
          <div className={styles.popup_body}>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_surname'}>Фамилия</h2>
                <input id={'input_surname'} className={styles.popup_input} type='text' defaultValue={content.surname}
                onFocus={()=>{
                  highlighting('surname')
                }}
                onBlur={()=>{
                  stop_highlighting('surname')
                }}
                ></input>
              </div>
              <div className={styles.div_input}>
                <h2 id={'h2_name'}>Имя</h2>
                <input id={'input_name'} className={styles.popup_input} type='text' defaultValue={content.name}
                onFocus={()=>{
                  highlighting('name')
                }}
                onBlur={()=>{
                  stop_highlighting('name')
                }}
                ></input>
              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_patronymic'}>Отчество</h2>
                <input id={'input_patronymic'} className={styles.popup_input} type='text' defaultValue={content.patronymic}
                onFocus={()=>{
                  highlighting('patronymic')
                }}
                onBlur={()=>{
                  stop_highlighting('patronymic')
                }}
                ></input>
              </div>
              <div className={styles.div_input}>
                <h2 id={'h2_email'}>Email</h2>
                {session && <>
                  <input id={'input_email'} className={styles.popup_input} type='email' defaultValue={session.user.email}
                  onFocus={()=>{
                    highlighting('email')
                  }}
                  onBlur={()=>{
                    stop_highlighting('email')
                  }}
                  ></input>
                </>}
                {!session && <>
                  <input id={'input_email'} className={styles.popup_input} type='email'
                  onFocus={()=>{
                    highlighting('email')
                  }}
                  onBlur={()=>{
                    stop_highlighting('email')
                  }}
                  ></input>
                </>}

              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_telephone'}>Номер телефона</h2>
                <input id={'input_telephone'} className={styles.popup_input} type='tel' value={phone_value} maxLength='16'
                onChange = {(e)=>{
                  const val = e.target.value
                  let newVal = val
                  let n = 0
                  if ((e.target.value[0] !== '8')&(e.target.value[0] !== '7')&(e.target.value[0] !== '+')) {
                    n = 3
                  }
                  else {
                    if (e.target.value[0] !== '+') {
                      n = 1
                    }
                    if ((e.target.value.length > 2-n)&(e.target.value[2-n] !== ' ')&(e.target.value.length > phone_value_length)) {
                      newVal = ''
                      for (let i = 0; i < e.target.value.length; i++) {
                        if (i === 2-n) {
                          newVal = newVal+' '
                        }
                        newVal = newVal+e.target.value[i]
                      }
                    }
                  }
                  if (((e.target.value.length === 6-n)||(e.target.value.length === 10-n)||(e.target.value.length === 13-n))&(e.target.value.length > phone_value_length)) {
                    newVal = val+' '
                  }

                  if ((e.target.value.length > 6-n)&(e.target.value[6-n] !== ' ')&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 6-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }

                  if ((e.target.value.length > 10-n)&(e.target.value[10-n] !== ' ')&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 10-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }
                  if ((e.target.value.length > 13-n)&(e.target.value[13-n] !== ' ')&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 13-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }

                  setPhone_value(newVal)
                  setPhone_value_length(e.target.value.length)
                }}
                onFocus={()=>{
                  highlighting('telephone')
                }}
                onBlur={()=>{
                  stop_highlighting('telephone')
                }}
                ></input>
              </div>
              <div className={styles.div_input}>
                <h2 id={'h2_city'}>Населенный пункт</h2>
                <input id={'input_city'} className={styles.popup_input} type='text' defaultValue={content.city}
                onFocus={()=>{
                  highlighting('city')
                }}
                onBlur={()=>{
                  stop_highlighting('city')
                }}
                ></input>
              </div>
            </div>
            <div className={styles.div_block}>
              <div className={styles.div_input}>
                <h2 id={'h2_address'}>Адрес доставки</h2>
                <input id={'input_address'} className={styles.popup_input} type='text' defaultValue={content.address}
                onFocus={()=>{
                  highlighting('address')
                }}
                onBlur={()=>{
                  stop_highlighting('address')
                }}
                ></input>
              </div>
              <div className={styles.div_input}>
                <h2 id={'h2_index'}>Индекс</h2>
                <input id={'input_index'} className={styles.popup_input_index} type='number' value={index_value}
                onChange = {(e)=>{
                  const val = e.target.value
                  const max = 1000000
                  const maxLength = max.toString().length-1
                  const newVal = val < max ? val : parseInt(val.toString().substring(0, maxLength))
                  setIndex_value(newVal)
                }}
                onFocus={()=>{
                  highlighting('index')
                }}
                onBlur={()=>{
                  stop_highlighting('index')
                }}
                ></input>
              </div>
            </div>

          </div>
          <div className={styles.popup_footer}>


            <div className={styles.btn} onClick={onClickButtonAddDataUserData}><span className={styles.noselect}>Подтвердить</span><div className={styles.circle}></div></div>
          </div>
        </div>
      </div>
    )
  }
}
