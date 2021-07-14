import Layout from '../../../components/layout.js'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import styles from './[id].module.scss'
import { useSession } from 'next-auth/client'


async function changeDelivMetod(id, metod) {
  const response = await fetch('/api/data/changeDelivMetod', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      metod: metod,
     }),
  })
  const res = await response.json()
  return res
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

async function sendEmail( send_to , send_title ,  send_text) {
  const responseEm = await fetch('/api/sendEmail_directly', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: send_to,
      title: send_title,
      text: send_text,
     }),
  })
}


export default function ProductIndex(context) {
  const router = useRouter()

  const [ session, loading ] = useSession()

  const [sumItem, setSumItem] = useState('0')
  const [loadOffer, setLoadOffer] = useState(false)

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
  const [priceAllItem, setPriceAllItem] = useState(0)
  const [choice, setChoice] = useState('0')
  const [ordersId, setOrdersId] = useState(null)

  const deliv = [
    {},
    {
      company: 'Энергия',
      region: 'ДВ регион',
      period: '3-5',
      price: 350,
    },
    {
      company: 'Энергия',
      region: 'Все регионы России',
      period: '8-21',
      price: 800,
    },
    {
      company: 'Почта России',
      region: 'Все регионы России',
      period: '8-21',
      price: 550,
    },
    {
      company: 'СДЭК без курьера',
      region: 'Все регионы России',
      period: '8-21',
      price: 500,
    },
    {
      company: 'СДЭК с курьером до адреса',
      region: 'Все регионы России',
      period: '8-21',
      price: 1200,
    },
    {
      company: 'СДЭК наложенным платежом',
      region: 'Все регионы России',
      period: '8-21',
      price: 0,
    },
  ]


  useEffect(()=>{
    const fetchData = async () => {
      if (!loadOffer && router.query.id) {
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

        let check = false
        const lSOrders = localStorage.getItem('_orders')
        if (lSOrders) {
          const lSOrdersJson = JSON.parse(lSOrders)
          lSOrdersJson.map(item => {
            if (item === router.query.id) { check = true }
          })
        }

        if (json.orders) {
          let personOrders = undefined
          json.orders.map((order)=>{

            let check2 = false
            if (session) {
              if (order.email === session.user.email) { check2 = true }
            }

            if ((check || check2) && (order.id === router.query.id)) {
              if (personOrders === undefined) {
                personOrders = [order]
              }
              else {
                personOrders.unshift(order)
              }
            }
          })
          if (personOrders !== undefined) {
            setOrdersData(personOrders)
            let summa = 0
            personOrders[0].products.map((item)=>{
              summa = summa+(item.value*item.price)
            })
            setPriceAllItem(summa)

            if (personOrders[0].state.delivery) {
              const choiceNew = document.querySelector(`#choice${personOrders[0].state.delivery}`)
              if (choiceNew) {
                choiceNew.style.opacity = '1'
              }
              setChoice(personOrders[0].state.delivery)
            }
          }

        }
        setLoadOffer(true)
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

  const choiceMetod = (e)=>{
    setChoice(e.target.title)
  }

  const onClickButtonChangeDelivMetod = React.useCallback(async (e) => {
    const button_send = document.querySelector(`#button_send1`)
    button_send.style.display = 'none'
    const loading = document.querySelector(`#loading1`)
    loading.style.display = 'flex'
    const error = document.querySelector(`#error1`)
    error.style.display = 'none'
    const res = await changeDelivMetod( router.query.id , '6' )
    const res2 = await telegram_send(res.text)
    await sendEmail('nikxabarovsk0000@gmail.com' , 'Заказ наложенным платежом' , res.text).then(setTimeout(router.reload, 1200))
  }, [router]);


  function Forma({wallet, offer, summa}) {
    if (choice === '0') {
      return (
        <>
          <form className={styles.form_payment} method="POST" action="https://yoomoney.ru/quickpay/confirm.xml" disabled>
            <input type="hidden" name="receiver" value={wallet}/>
            <input type="hidden" name="formcomment" value="Интернет магазин BestJap.ru"/>
            <input type="hidden" name="short-dest" value={`Заказ №${offer}`}/>
            <input type="hidden" name="label" value={offer}/>
            <input type="hidden" name="quickpay-form" value="donate"/>
            <input type="hidden" name="targets" value={`Оплата заказа №${offer}`}/> {/*Это название перевода для клиента*/}
            <input type="hidden" name="sum" value={summa} data-type="number"/>
            <input type="hidden" name="comment" value={`Оплата заказа №${offer} на сайте BestJap.ru`}/> {/*Это идет в описании перевода для клиента*/}
            <input type="hidden" name="need-fio" value="false"/>
            <input type="hidden" name="need-email" value="false"/>
            <input type="hidden" name="need-phone" value="false"/>
            <input type="hidden" name="need-address" value="false"/>

            <div>Выберите способ доставки</div>
          </form>
        </>
      )
    }
    if (choice === '6') {
      return (
        <>
          <div className={styles.payment_nallSDEK}>
            <div style={{margin: '30px 0'}}>Оплата будет производится по факту получения посылки в СДЭК</div>
            <div className={styles.payment_butt_div} >
              <input id={'button_send1'} className={styles.button_for_payment} type="submit" value="Подтвердить" onClick={onClickButtonChangeDelivMetod}/>

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
        </>
      )
    }
    return (
      <>
        <form className={styles.form_payment} method="POST" action="https://yoomoney.ru/quickpay/confirm.xml">
          <input type="hidden" name="receiver" value={wallet}/>
          <input type="hidden" name="formcomment" value="Интернет магазин BestJap.ru"/>
          <input type="hidden" name="short-dest" value={`Заказ №${offer}`}/>
          <input type="hidden" name="label" value={offer}/>
          <input type="hidden" name="quickpay-form" value="donate"/>
          <input type="hidden" name="targets" value={`Оплата заказа №${offer}`}/> {/*Это название перевода для клиента*/}
          <input type="hidden" name="sum" value={summa} data-type="number"/>
          <input type="hidden" name="comment" value={`Оплата заказа №${offer} на сайте BestJap.ru`}/> {/*Это идет в описании перевода для клиента*/}
          <input type="hidden" name="need-fio" value="false"/>
          <input type="hidden" name="need-email" value="false"/>
          <input type="hidden" name="need-phone" value="false"/>
          <input type="hidden" name="need-address" value="false"/>
          <div className={styles.payment_metod}>
          <label className={styles.container_lab} style={{margin:'0 15px'}}><input type="radio" name="paymentType" value="PC"/><span className={styles.radio_class}></span>ЮMoney</label>
          <label className={styles.container_lab} style={{margin:'0 15px'}}><input type="radio" name="paymentType" value="AC"/><span className={styles.radio_class}></span>Банковской картой</label>
          </div>
          <div className={styles.payment_butt_div} >
            <input className={styles.button_for_payment} type="submit" value="Оплатить"/>
          </div>
        </form>
      </>
    )
  }


  if ((ordersData[0].name !== '')&&(loadOffer === true)) {

    return (
      <Layout propsBasket={sumItem}>
      <Head>
        <title>Заказ №{router.query.id}</title>
        <meta name = "robots" content = "noindex, nofollow" />
      </Head>
        <div style={{
          display: 'flex',
          width: '90%',
          margin: 'auto',
          padding: '51px 0px 30px 0px',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <h1>Оплата заказа</h1>
          <div className={styles.wrapper}>
          <div id={'idLuppa_hair'} className={styles.div_luppa_hair}></div>
            <div className={styles.container}>
            <div className={styles.titleForm}>Форма оплаты заказа №{router.query.id}</div>
              <div className={styles.list}>
                <div>Содержание заказа:</div>
                {ordersData[0].products.map((item)=>(
                  <div key={item.params? item.title+item.params.param+item.id : item.title+item.id}>
                    <div className={styles.list_content} >
                      <div style={{margin:'0 10px 0 1%', minWidth:'180px'}}>- {item.title}</div>
                      <div style={{width: '280px', display:'flex', justifyContent:'center', flexWrap: 'wrap'}}>
                        <div style={{width: '70px'}}>{item.value} шт.</div>
                        <div style={{width: '35px'}}>x</div>
                        <div style={{width: '70px'}}>{item.price} ₽</div>
                        <div style={{width: '35px'}}>=</div>
                        <div style={{width: '70px'}}>{item.value*item.price} ₽</div>
                      </div>
                    </div>
                    <div className={styles.hr}></div>
                  </div>
                ))}
                <div className={styles.priceAllItem}><div style={{width: '170px'}}>Сумма товаров: </div><div style={{width: '70px'}}>{priceAllItem} ₽</div></div>
                {!ordersData[0].state.delivery && <>
                  <div>Выберите способ доставки:</div>
                </>}
                {ordersData[0].state.delivery && <>
                  <div>Выбранный способ доставки:</div>
                </>}
                <div className={styles.delivery}>
                  <div className={styles.line2}>
                    <div className={styles.delivery__choice}></div>
                    <div className={styles.delivery__company}>Компания</div>
                    <div className={styles.delivery__region}>Регион</div>
                    <div className={styles.delivery__period}>Срок доставки (дни)</div>
                    <div className={styles.delivery__price}>Стоимость</div>
                  </div>
                  {!ordersData[0].state.delivery && <>
                    <div className={styles.line} title={'1'} onClick={choiceMetod}>
                        <div className={styles.delivery__choice} title={'1'}><div className={styles.chois_external} title={'1'}><div id={'choice1'} className={styles.chois_interior} title={'1'} style={choice==='1' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                        <div className={styles.delivery__company} title={'1'}>{deliv[1].company}</div>
                        <div className={styles.delivery__region} title={'1'}>{deliv[1].region}</div>
                        <div className={styles.delivery__period} title={'1'}>{deliv[1].period}</div>
                        <div className={styles.delivery__price} title={'1'}>{deliv[1].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}
                  {ordersData[0].state.delivery==='1' && <>
                    <div className={styles.line} title={'1'} onClick={choiceMetod}>
                        <div className={styles.delivery__choice} title={'1'}><div className={styles.chois_external} title={'1'}><div id={'choice1'} className={styles.chois_interior} title={'1'} style={choice==='1' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                        <div className={styles.delivery__company} title={'1'}>{deliv[1].company}</div>
                        <div className={styles.delivery__region} title={'1'}>{deliv[1].region}</div>
                        <div className={styles.delivery__period} title={'1'}>{deliv[1].period}</div>
                        <div className={styles.delivery__price} title={'1'}>{deliv[1].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}

                  {!ordersData[0].state.delivery && <>
                    <div className={styles.line} title={'2'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'2'}><div className={styles.chois_external} title={'2'}><div id={'choice2'} className={styles.chois_interior} title={'2'} style={choice==='2' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'2'}>{deliv[2].company}</div>
                      <div className={styles.delivery__region} title={'2'}>{deliv[2].region}</div>
                      <div className={styles.delivery__period} title={'2'}>{deliv[2].period}</div>
                      <div className={styles.delivery__price} title={'2'}>{deliv[2].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}
                  {ordersData[0].state.delivery==='2' && <>
                    <div className={styles.line} title={'2'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'2'}><div className={styles.chois_external} title={'2'}><div id={'choice2'} className={styles.chois_interior} title={'2'} style={choice==='2' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'2'}>{deliv[2].company}</div>
                      <div className={styles.delivery__region} title={'2'}>{deliv[2].region}</div>
                      <div className={styles.delivery__period} title={'2'}>{deliv[2].period}</div>
                      <div className={styles.delivery__price} title={'2'}>{deliv[2].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}

                  {!ordersData[0].state.delivery && <>
                    <div className={styles.line} title={'3'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'3'}><div className={styles.chois_external} title={'3'}><div id={'choice3'} className={styles.chois_interior} title={'3'} style={choice==='3' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'3'}>{deliv[3].company}</div>
                      <div className={styles.delivery__region} title={'3'}>{deliv[3].region}</div>
                      <div className={styles.delivery__period} title={'3'}>{deliv[3].period}</div>
                      <div className={styles.delivery__price} title={'3'}>{deliv[3].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}
                  {ordersData[0].state.delivery==='3' && <>
                    <div className={styles.line} title={'3'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'3'}><div className={styles.chois_external} title={'3'}><div id={'choice3'} className={styles.chois_interior} title={'3'} style={choice==='3' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'3'}>{deliv[3].company}</div>
                      <div className={styles.delivery__region} title={'3'}>{deliv[3].region}</div>
                      <div className={styles.delivery__period} title={'3'}>{deliv[3].period}</div>
                      <div className={styles.delivery__price} title={'3'}>{deliv[3].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}

                  {!ordersData[0].state.delivery && <>
                    <div className={styles.line} title={'4'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'4'}><div className={styles.chois_external} title={'4'}><div id={'choice4'} className={styles.chois_interior} title={'4'} style={choice==='4' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'4'}>{deliv[4].company}</div>
                      <div className={styles.delivery__region} title={'4'}>{deliv[4].region}</div>
                      <div className={styles.delivery__period} title={'4'}>{deliv[4].period}</div>
                      <div className={styles.delivery__price} title={'4'}>{deliv[4].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}
                  {ordersData[0].state.delivery==='4' && <>
                    <div className={styles.line} title={'4'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'4'}><div className={styles.chois_external} title={'4'}><div id={'choice4'} className={styles.chois_interior} title={'4'} style={choice==='4' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'4'}>{deliv[4].company}</div>
                      <div className={styles.delivery__region} title={'4'}>{deliv[4].region}</div>
                      <div className={styles.delivery__period} title={'4'}>{deliv[4].period}</div>
                      <div className={styles.delivery__price} title={'4'}>{deliv[4].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}

                  {!ordersData[0].state.delivery && <>
                    <div className={styles.line} title={'5'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'5'}><div className={styles.chois_external} title={'5'}><div id={'choice5'} className={styles.chois_interior} title={'5'} style={choice==='5' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'5'}>{deliv[5].company}</div>
                      <div className={styles.delivery__region} title={'5'}>{deliv[5].region}</div>
                      <div className={styles.delivery__period} title={'5'}>{deliv[5].period}</div>
                      <div className={styles.delivery__price} title={'5'}>{deliv[5].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}
                  {ordersData[0].state.delivery==='5' && <>
                    <div className={styles.line} title={'5'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'5'}><div className={styles.chois_external} title={'5'}><div id={'choice5'} className={styles.chois_interior} title={'5'} style={choice==='5' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'5'}>{deliv[5].company}</div>
                      <div className={styles.delivery__region} title={'5'}>{deliv[5].region}</div>
                      <div className={styles.delivery__period} title={'5'}>{deliv[5].period}</div>
                      <div className={styles.delivery__price} title={'5'}>{deliv[5].price} ₽</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}

                  {!ordersData[0].state.delivery && <>
                    <div className={styles.line} title={'6'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'6'}><div className={styles.chois_external} title={'6'}><div id={'choice6'} className={styles.chois_interior} title={'6'} style={choice==='6' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'6'}>{deliv[6].company}</div>
                      <div className={styles.delivery__region} title={'6'}>{deliv[6].region}</div>
                      <div className={styles.delivery__period} title={'6'}>{deliv[6].period}</div>
                      <div className={styles.delivery__price} title={'6'}>Определяется СДЭК</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}
                  {ordersData[0].state.delivery==='6' && <>
                    <div className={styles.line} title={'6'} onClick={choiceMetod}>
                      <div className={styles.delivery__choice} title={'6'}><div className={styles.chois_external} title={'6'}><div id={'choice6'} className={styles.chois_interior} title={'6'} style={choice==='6' ? {opacity: '1'} : {opacity: '0'}}></div></div></div>
                      <div className={styles.delivery__company} title={'6'}>{deliv[6].company}</div>
                      <div className={styles.delivery__region} title={'6'}>{deliv[6].region}</div>
                      <div className={styles.delivery__period} title={'6'}>{deliv[6].period}</div>
                      <div className={styles.delivery__price} title={'6'}>Определяется СДЭК</div>
                    </div>
                    <div className={styles.hr}></div>
                  </>}


                  <div className={styles.priceAllItem}><div style={{width: '170px'}}>Сумма итого: </div><div style={{width: '70px'}}>{choice!=='0' ? priceAllItem+deliv[choice].price : priceAllItem} ₽</div></div>
                  {ordersData[0].state.summ_payment && <>
                    <div className={styles.priceAllItem}><div style={{width: '170px'}}>Оплачено: </div><div style={{width: '70px'}}>{ordersData[0].state.summ_payment} ₽</div></div>
                  </>}
                  <div className={styles.priceAllItem}><div style={{width: '170px'}}>Состояние оплаты: </div><div className={styles.pay_state} style={ordersData[0].state.payment==='Оплачено' ? {backgroundImage: 'url("/pay_1.webp")'} : {backgroundImage: 'url("/pay_2.webp")'}}></div></div>
                  {ordersData[0].state.payment!=='Оплачено' && <>
                    {ordersData[0].state.delivery==='6' && <>
                      <div style={{display:'flex', width:'100%', justifyContent:'center'}}>Выбранный способ СДЭК наложенным платежом зафиксирован</div>
                    </>}
                    {ordersData[0].state.delivery!=='6' && <>
                      <div>Выберите способ оплаты:</div>
                      <Forma wallet={'4100116919669449'} offer={router.query.id} summa={ordersData[0].state.summ_payment ? priceAllItem+deliv[choice].price-ordersData[0].state.summ_payment : priceAllItem+deliv[choice].price}/>
                    </>}
                  </>}

                </div>
              </div>
            </div>
          </div>

        </div>
      </Layout>
    )
  }


  if ((ordersData[0].name === '')&&(loadOffer === true)) {
    const linkTitle = ' >>> Контакты <<< '
    return (
      <Layout propsBasket={sumItem}>
      <Head>
        <title>Заказ не найден</title>
        <meta name = "robots" content = "noindex, nofollow" />
      </Head>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px 0px 30px 0px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div className={styles.wrapperNotFoundInfo}>
            <div className={styles.containerNotFoundInfo}>
              <div>Либо заказа с таким номером нет в базе данных, либо вы пытаетесь посмотреть чужой заказ.</div>
              <div>Обратитесь в поддержку.</div>
              <ul className={styles.navItems}>
                <li className={styles.navItem}><Link href="/contacts"><a>{linkTitle}</a></Link></li>
              </ul>
            </div>
          </div>

        </div>
      </Layout>
    )
  }

  return (
    <Layout propsBasket={sumItem}>
    <Head>
      <title>Поиск информации по заказу</title>
      <meta name = "robots" content = "noindex, nofollow" />
    </Head>
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px 0px 30px 0px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div className={styles.wrapperNotFoundInfo}>
          <div className={styles.containerNotFoundInfo}>
            Поиск информации по заказу...
          </div>
        </div>
      </div>
    </Layout>
  )
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
