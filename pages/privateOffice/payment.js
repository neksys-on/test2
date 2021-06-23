import Head from 'next/head'
import css from './payment.module.scss'
import React, { useState, useEffect, useCallback } from 'react'
// const nodemailer = require("nodemailer");

export default function Page() {

  useEffect(()=>{
  })

  async function parsData( site , info ) {
    const responseWA = await fetch('/api/parsing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sites: site,
        typeInfo: info,
       }),
    })
    const respMsg = await responseWA.json()
  }

  const onClickPars = React.useCallback((e) => {
    console.log('click')

    parsData(['https://remanga.org/'], ['title'])

  }, []);


  function Forma() {
    return (
      <>
        <form className={css.form_payment} method="POST" action="https://yoomoney.ru/quickpay/confirm.xml">
          <input type="hidden" name="receiver" value="410018886939843"/>
          <input type="hidden" name="formcomment" value="Описани formcomment"/>
          <input type="hidden" name="short-dest" value="Заказ №число (Короткое описание)"/>
          <input type="hidden" name="label" value="$order_id"/>
          <input type="hidden" name="quickpay-form" value="donate"/>
          <input type="hidden" name="targets" value="Оплата заказа №Такой-то (название перевода для клиента)"/> {/*Это название перевода для клиента*/}
          <input type="hidden" name="sum" value="10" data-type="number"/>
          <input type="hidden" name="comment" value="Описание того что оплачивается (описании перевода для клиента)"/> {/*Это идет в описании перевода для клиента*/}
          <input type="hidden" name="need-fio" value="false"/>
          <input type="hidden" name="need-email" value="false"/>
          <input type="hidden" name="need-phone" value="false"/>
          <input type="hidden" name="need-address" value="false"/>
          <div className={css.payment_metod}>
          <label style={{margin:'0 15px'}}><input type="radio" name="paymentType" value="PC"/>ЮMoney</label>
          <label style={{margin:'0 15px'}}><input type="radio" name="paymentType" value="AC"/>Банковской картой</label>
          </div>
          <input className={css.button_for_payment} type="submit" value="Перевести"/>
        </form>
      </>
    )
  }

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.container}>
          <Forma />
        </div>
      </div>
    </>
  )
}
