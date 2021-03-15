import Layout from '../../components/layout'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'
import AccessDenied from '../../components/access-denied'
import Link from 'next/link'
import Router from "next/router"
import styles from './index.module.scss'
import OfficeContent from '../../components/officeContent/officeContent.js'
import Head from 'next/head'


export async function getServerSideProps(context) {
  const email_1 = process.env.ADMIN_EMAIL_1
  const email_2 = process.env.ADMIN_EMAIL_2
  const email_3 = process.env.ADMIN_EMAIL_3
  return {
    props: {
      email_1: email_1,
      email_2: email_2,
      email_3: email_3
    }, // will be passed to the page component as props
  }
}

// sda

export default function Page ({email_1, email_2, email_3}) {
  const [ session, loading ] = useSession()

  const [sumItem, setSumItem] = useState('0')
  const [tabSelect, setTabSelect] = useState('Order history')


  useEffect(()=>{
    const fetchData = async () => {

      // const res2 = await fetch('/api/getdataCategory')
      // const json2 = await res2.json();
      // setDataCategory(json2.category)
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



  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout propsBasket={sumItem}><AccessDenied/></Layout> }

if ((session.user.email === email_1)||(session.user.email === email_2)||(session.user.email === email_3)) {
  return (
    <Layout propsBasket={sumItem}>
      <div style={{
        width: '90%',
        margin: 'auto',
        paddingLeft: '30px',
        paddingRight: '30px',
        paddingTop: '30px'
      }}>
      <Head>
        <meta name = "robots" content = "noindex, nofollow" />
      </Head>
        <h1>Личный кабинет</h1>
        <p>
         Администратор
        </p>
        <p>
          Здесь вы можете взаимодействовать с вашей информацией.
        </p>
        <div className={styles.div_fon}>
        <div className={styles.div_button}>
          <li onClick={() => {Router.push('/privateOffice/change_k')}}>Управление Категориями</li>
          <li onClick={() => {Router.push('/privateOffice/change_pr')}}>Управление Товарами</li>
          <li onClick={() => {Router.push('/privateOffice/change_offers')}}>Управление Заказами</li>
          <li onClick={() => {Router.push('/privateOffice/statistics')}}>Статистика Товаров</li>
        </div>
        <div className={styles.otstup}></div>
        <div className={styles.div_main}>
          <div className={styles.div_menu}>
            <div className={styles.div_menu_block} onClick={(e)=>{setTabSelect('Order history')}}>
              <div className={styles.div_menu_item}>
                История Заказов
              </div>
            </div>
            <div className={styles.div_menu_block} onClick={(e)=>{setTabSelect('Personal data')}}>
              <div className={styles.div_menu_item}>
                Личные данные
              </div>
            </div>
          </div>
          <div className={styles.div_content_clock}>
            <div className={styles.div_content}>
              <OfficeContent  selected_tab={tabSelect} users_email={session.user.email}/>
            </div>
          </div>
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
          Здесь вы можете взаимодействовать с вашей информацией.
        </p>
        <div className={styles.div_fon}>
        <div className={styles.otstup}></div>
        <div className={styles.div_main}>
          <div className={styles.div_menu}>
            <div className={styles.div_menu_block} onClick={(e)=>{setTabSelect('Order history')}}>
              <div className={styles.div_menu_item}>
                История Заказов
              </div>
            </div>
            <div className={styles.div_menu_block} onClick={(e)=>{setTabSelect('Personal data')}}>
              <div className={styles.div_menu_item}>
                Личные данные
              </div>
            </div>
          </div>
          <div className={styles.div_content_clock}>
            <div className={styles.div_content}>
              <OfficeContent  selected_tab={tabSelect} users_email={session.user.email}/>
            </div>
          </div>
        </div>
        </div>


      </div>
    </Layout>
  )
}
