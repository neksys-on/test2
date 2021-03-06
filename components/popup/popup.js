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
  const jsonRes = await response.json()
  return jsonRes
}

async function sendEmail( send_to , send_title ,  data, id) {
  const response3 = await fetch('/api/sendEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: send_to,
      title: send_title,
      data: data,
      id: id
     }),
  })
  const resEmail = await response3.json()
  return resEmail
}

async function telegram_send(text) {
  const response2 = await fetch('/api/telegram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
     }),
  })
  const resTelegram = await response2.json()
  return resTelegram
}

async function changeInDataUsersData (id,  newInfo) {
  const response4 = await fetch('/api/data/changeData', {
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
  const data = await response4.json()
  return data
}



export default function Popup({title, content, typePopup}) {
  const [ session, loading ] = useSession()
  const [index_value, setIndex_value] = useState('')
  const [phone_value, setPhone_value] = useState('+7')
  const [phone_value_length, setPhone_value_length] = useState(3)
  const [phone_max_length, setPhone_max_length] = useState(16)
  let lSOrdersJson



  useEffect(()=>{
    if ((index_value === '')&&(content.index !== '')) {
      setIndex_value(content.index)
    }

    if ((phone_value === '+7')&&(content.telephone !== '')) {
      setPhone_value(content.telephone)
    }

  }, [session, content])

  const onClickButtonAddData = React.useCallback((e) => {

    const surname = document.querySelector(`#input_surname`).value
    const name = document.querySelector(`#input_name`).value
    const patronymic = document.querySelector(`#input_patronymic`).value
    const telephone = document.querySelector(`#input_telephone`).value
    const city = document.querySelector(`#input_city`).value
    const address = document.querySelector(`#input_address`).value
    const index = document.querySelector(`#input_index`).value

    const mark_surname = document.querySelector(`#mark_surname`)
    const mark_name = document.querySelector(`#mark_name`)
    const mark_patronymic = document.querySelector(`#mark_patronymic`)
    const mark_telephone = document.querySelector(`#mark_telephone`)
    const mark_city = document.querySelector(`#mark_city`)
    const mark_address = document.querySelector(`#mark_address`)
    const mark_index = document.querySelector(`#mark_index`)
    const marksText = document.querySelector(`#marksText`)

    if ( surname.length >= 2 && name.length >= 2 && patronymic.length >= 2 && telephone.length >= 11 && city.length >= 2 && address.length >= 3 && index.length === 6 ) {

      mark_surname.style.display = 'none'
      mark_name.style.display = 'none'
      mark_patronymic.style.display = 'none'
      mark_telephone.style.display = 'none'
      mark_city.style.display = 'none'
      mark_address.style.display = 'none'
      mark_index.style.display = 'none'
      marksText.style.display = 'none'

      const localStor = localStorage.getItem('_basket')
      const localStorJson = JSON.parse(localStor)

      let productsWeHave = undefined
      localStorJson.map((product) => {
        let notFound = true
        if (productsWeHave) {
          productsWeHave.map((prod) => {
            if ((product.params !== undefined)&&(prod.params !== undefined)) {
              if ((prod.id === product.id)&&(prod.params.param === product.params.param)) {
                prod.value += 1
                notFound = false
              }
            } else {
              if (prod.id === product.id) {
                prod.value += 1
                notFound = false
              }
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
        email: session!==null ? session.user.email : document.querySelector(`#input_email`).value,
        email2: document.querySelector(`#input_email`).value,
        telephone: document.querySelector(`#input_telephone`).value,
        city: document.querySelector(`#input_city`).value,
        address: document.querySelector(`#input_address`).value,
        index: document.querySelector(`#input_index`).value,
        comments: document.querySelector(`#input_comments`).value,
        products: productsWeHave,
        totalPrice: totalPrice,
      }

      const button_send = document.querySelector(`#button_send1`)
      button_send.style.display = 'none'
      const loading = document.querySelector(`#loading1`)
      loading.style.display = 'flex'

      const error = document.querySelector(`#error1`)
      error.style.display = 'none'

      localStorage.setItem('_basket', [])

      const pushDateAndGoToPay = async () => {
        const resPushData = await pushInData(addData)

        const lSOrders = await localStorage.getItem('_orders')
        if (lSOrders) {
          lSOrdersJson = JSON.parse(lSOrders)
          let pushArray = []
          if (typeof(lSOrdersJson) === 'number') {
            pushArray.push(lSOrdersJson)
          } else {
            pushArray = lSOrdersJson
          }
          pushArray.push(resPushData.id)
          let pushArrayStr = JSON.stringify(pushArray)

          await localStorage.setItem('_orders', pushArrayStr)
        }
        else {
          let pushArray = []
          pushArray.push(resPushData.id)
          let pushArrayStr = JSON.stringify(pushArray)
          await localStorage.setItem('_orders', pushArrayStr)
        }
        const res2 = await telegram_send(resPushData.text)
        const res3 = await sendEmail('nikxabarovsk0000@gmail.com' , `Новый заказ №${resPushData.id} на BestJap` , addData, resPushData.id)
        await Router.push(`/privateOffice/offer/${resPushData.id}`)
      }
      pushDateAndGoToPay()


    } else {
      marksText.style.display = 'block'
      if ( surname.length < 2 ) {mark_surname.style.display = 'block'} else {mark_surname.style.display = 'none'}
      if ( name.length < 2 ) {mark_name.style.display = 'block'} else {mark_name.style.display = 'none'}
      if ( patronymic.length < 2 ) {mark_patronymic.style.display = 'block'} else {mark_patronymic.style.display = 'none'}
      if ( telephone.length < 11 ) {mark_telephone.style.display = 'block'} else {mark_telephone.style.display = 'none'}
      if ( city.length < 2 ) {mark_city.style.display = 'block'} else {mark_city.style.display = 'none'}
      if ( address.length < 3 ) {mark_address.style.display = 'block'} else {mark_address.style.display = 'none'}
      if ( index.length !== 6 ) {mark_index.style.display = 'block'} else {mark_index.style.display = 'none'}
    }

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



  }, [session]);

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

      const button_send = document.querySelector(`#button_send2`)
      button_send.style.display = 'none'
      const loading = document.querySelector(`#loading2`)
      loading.style.display = 'flex'

      const error = document.querySelector(`#error2`)
      error.style.display = 'none'

      changeInDataUsersData(content.id, addData).then(setTimeout(Router.reload, 900))
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
                <div className={styles.input_title}><h2 id={'h2_surname'}>Фамилия</h2><h3 id={'mark_surname'}>*обязательное</h3></div>
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
                <div className={styles.input_title}><h2 id={'h2_name'}>Имя</h2><h3 id={'mark_name'}>*обязательное</h3></div>
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
                <div className={styles.input_title}><h2 id={'h2_patronymic'}>Отчество</h2><h3 id={'mark_patronymic'}>*обязательное</h3></div>
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
                <div className={styles.input_title}><h2 id={'h2_email'}>Email</h2><h3 id={'mark_email'}>*обязательное</h3></div>
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
                <div className={styles.input_title}><h2 id={'h2_telephone'}>Номер телефона</h2><h3 id={'mark_telephone'}>*обязательное</h3></div>
                <input id={'input_telephone'} className={styles.popup_input} type='tel' value={phone_value} maxLength='16'
                onChange = {(e)=>{
                  const val = e.target.value
                  let newVal = val
                  let n = 0
                  if ((e.target.value[0] !== '8')&&(e.target.value[0] !== '7')&&(e.target.value[0] !== '+')) {
                    n = 3
                  }
                  else {
                    if (e.target.value[0] !== '+') {
                      n = 1
                    }
                    if ((e.target.value.length > 2-n)&&(e.target.value[2-n] !== ' ')&&(e.target.value.length > phone_value_length)) {
                      newVal = ''
                      for (let i = 0; i < e.target.value.length; i++) {
                        if (i === 2-n) {
                          newVal = newVal+' '
                        }
                        newVal = newVal+e.target.value[i]
                      }
                    }
                  }
                  if (((e.target.value.length === 6-n)||(e.target.value.length === 10-n)||(e.target.value.length === 13-n))&&(e.target.value.length > phone_value_length)) {
                    newVal = val+' '
                  }

                  if ((e.target.value.length > 6-n)&&(e.target.value[6-n] !== ' ')&&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 6-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }

                  if ((e.target.value.length > 10-n)&&(e.target.value[10-n] !== ' ')&&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 10-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }
                  if ((e.target.value.length > 13-n)&&(e.target.value[13-n] !== ' ')&&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 13-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }

                  if (e.target.value[0] !== '+') {
                    setPhone_max_length(15)
                  } else {
                    setPhone_max_length(16)
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
                <div className={styles.input_title}><h2 id={'h2_city'}>Населенный пункт</h2><h3 id={'mark_city'}>*обязательное</h3></div>
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
                <div className={styles.input_title}><h2 id={'h2_address'}>Адрес доставки</h2><h3 id={'mark_address'}>*обязательное</h3></div>
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
                <div className={styles.input_title}><h2 id={'h2_index'}>Индекс</h2><h3 id={'mark_index'}>*обязательное</h3></div>
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
                <div className={styles.marksTextDiv}><h3 id={'marksText'}>*Пожалуйста, заполните все обязательные поля</h3></div>
              </div>
            </div>
          </div>
          <div className={styles.popup_footer}>


            <div id={'button_send1'} className={styles.btn} onClick={onClickButtonAddData}><span className={styles.noselect}>Подтвердить</span><div className={styles.circle}></div></div>

            <div id={'error1'} className={styles.error}>Отправка не удалась, попробуйте снова.</div>
            <div id={'loading1'} className={styles.loading}>
              <div style={{margin:'0 30px 0 0'}}>Отправка</div>
              <div className={styles.loading_blocks}>
                <Blocks i={1} />
                <Blocks i={2} />
                <Blocks i={3} />
                <Blocks i={4} />
                <Blocks i={5} />
                <Blocks i={6} />
                <Blocks i={7} />
                <Blocks i={8} />
                <Blocks i={9} />
                <Blocks i={10} />
                <Blocks i={11} />
                <Blocks i={12} />
                <Blocks i={13} />
                <Blocks i={14} />
                <Blocks i={15} />
                <Blocks i={16} />
                <Blocks i={17} />
                <Blocks i={18} />
                <Blocks i={19} />
                <Blocks i={20} />
              </div>
            </div>

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
                <input id={'input_telephone'} className={styles.popup_input} type='tel' value={phone_value} maxLength={phone_max_length}
                onChange = {(e)=>{
                  const val = e.target.value
                  let newVal = val
                  let n = 0
                  if ((e.target.value[0] !== '8')&&(e.target.value[0] !== '7')&&(e.target.value[0] !== '+')) {
                    n = 3
                  }
                  else {
                    if (e.target.value[0] !== '+') {
                      n = 1
                    }
                    if ((e.target.value.length > 2-n)&&(e.target.value[2-n] !== ' ')&&(e.target.value.length > phone_value_length)) {
                      newVal = ''
                      for (let i = 0; i < e.target.value.length; i++) {
                        if (i === 2-n) {
                          newVal = newVal+' '
                        }
                        newVal = newVal+e.target.value[i]
                      }
                    }
                  }
                  if (((e.target.value.length === 6-n)||(e.target.value.length === 10-n)||(e.target.value.length === 13-n))&&(e.target.value.length > phone_value_length)) {
                    newVal = val+' '
                  }

                  if ((e.target.value.length > 6-n)&&(e.target.value[6-n] !== ' ')&&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 6-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }

                  if ((e.target.value.length > 10-n)&&(e.target.value[10-n] !== ' ')&&(e.target.value.length > phone_value_length)) {
                    newVal = ''
                    for (let i = 0; i < e.target.value.length; i++) {
                      if (i === 10-n) {
                        newVal = newVal+' '
                      }
                      newVal = newVal+e.target.value[i]
                    }
                  }
                  if ((e.target.value.length > 13-n)&&(e.target.value[13-n] !== ' ')&&(e.target.value.length > phone_value_length)) {
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


            <div id={'button_send2'} className={styles.btn} onClick={onClickButtonAddDataUserData}><span className={styles.noselect}>Подтвердить</span><div className={styles.circle}></div></div>

            <div id={'error2'} className={styles.error}>Отправка не удалась, попробуйте снова.</div>
            <div id={'loading2'} className={styles.loading}>
              <div style={{margin:'0 30px 0 0'}}>Отправка</div>
              <div className={styles.loading_blocks}>
                <Blocks i={1} />
                <Blocks i={2} />
                <Blocks i={3} />
                <Blocks i={4} />
                <Blocks i={5} />
                <Blocks i={6} />
                <Blocks i={7} />
                <Blocks i={8} />
                <Blocks i={9} />
                <Blocks i={10} />
                <Blocks i={11} />
                <Blocks i={12} />
                <Blocks i={13} />
                <Blocks i={14} />
                <Blocks i={15} />
                <Blocks i={16} />
                <Blocks i={17} />
                <Blocks i={18} />
                <Blocks i={19} />
                <Blocks i={20} />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

function Blocks({i}) {
  return (
    <div className='blocks'> <style jsx>{`
      .blocks {

          position: absolute;
          width: 2px;
          height: 8px;
          background-color: #050c09;

          transform: rotate(calc(18deg * ${i}));
          left: 50%;
          transform-origin: 0 25px;
          animation: animate 1.9s ease-in-out infinite;
          animation-delay: calc( 0.05s * ${i})
      }
      @keyframes animate {
        0%,50%
        {
          background: #050c09;
          box-shadow: none;
        }
        50.1%,100%
        {
          background: #EA2845;
          box-shadow: 0 0 5px #EA2845, 0 0 15px #EA2845, 0 0 30px #EA2845, 0 0 60px #EA2845, 0 0 90px #EA2845;
        }
      }
    `}</style>
    </div>
  )
}
