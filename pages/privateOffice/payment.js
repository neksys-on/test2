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


  function Forma({wallet, offer, summa}) {
    return (
      <>
        <form className={css.form_payment} method="POST" action="https://yoomoney.ru/quickpay/confirm.xml">
          <input type="hidden" name="receiver" value={wallet}/>
          <input type="hidden" name="formcomment" value="Описани formcomment"/>
          <input type="hidden" name="short-dest" value={`Заказ №${offer}`}/>
          <input type="hidden" name="label" value={`label ${offer}`}/>
          <input type="hidden" name="quickpay-form" value="donate"/>
          <input type="hidden" name="targets" value={`Оплата заказа №${offer}`}/> {/*Это название перевода для клиента*/}
          <input type="hidden" name="sum" value={summa} data-type="number"/>
          <input type="hidden" name="comment" value={`Оплата заказа №${offer} на сайте BestJap.ru`}/> {/*Это идет в описании перевода для клиента*/}
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
      <div className={css.wrapper} >
        <div className={css.container}>
          <Forma wallet={'410011094111112'} offer={'45'} summa={2}/>
          <hr style={{width:'100%', height:'4px', backgroundColor:'#000', margin:'20px 0'}}/>
          <a style={{marginBottom:'80px'}} href={'https://yoomoney.ru/quickpay/shop-widget?account=410011094111112&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=Оплата%20заказа%20№15&default-sum=10&button-text=01&successURL=%3B'}>ссылка для оплаты</a>
          <img style={{width:'150px', height:'150px'}} src="https://sbqr.ru/qr/api_png_QR_text.php?qrtext=https%3A%2F%2Fmoney.yandex.ru%2Fquickpay%2Fshop-widget%3Faccount%3D410011094111112%26quickpay%3Dshop%26payment-type-choice%3Don%26mobile-payment-type-choice%3Don%26writer%3Dseller%26targets%3DOrder_15%26default-sum%3D10%26button-text%3D01%26successURL%3D%3B&id_form=10" />
        </div>
      </div>
    </>
  )
}
