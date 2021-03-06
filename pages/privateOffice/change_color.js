import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import styles from './change_color.module.scss'
import Link from 'next/link'
import Router from "next/router"
const fs = require('fs');
import Head from 'next/head'


export async function getServerSideProps(context) {
  const hostname = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const res = await fs.readFileSync('./pages/control.scss').toString()
  const res2 = await fs.readFileSync('./pages/control2.scss').toString()
  let colorObj = {}
  for (let i = 0; i < res.length; i++) {
   if (res[i] === '$') {
     colorObj[res[i]+res[i+1]+res[i+2]+res[i+3]+res[i+4]+res[i+5]+res[i+6]] = res[i+9]+res[i+10]+res[i+11]+res[i+12]+res[i+13]+res[i+14]+res[i+15]
   }
  }
  const email_1 = process.env.ADMIN_EMAIL_1 || null
  const email_2 = process.env.ADMIN_EMAIL_2 || null
  const email_3 = process.env.ADMIN_EMAIL_3 || null

  return {
    props: {
      colorObj: colorObj,
      email_1: email_1,
      email_2: email_2,
      email_3: email_3
    }, // will be passed to the page component as props
  }
}


async function pushInData(infoPush) {
  const response = await fetch('/api/styling/changeStyling', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      doPush: infoPush,
     }),
  })
  const data = await response.json()
  return data.doPush
}


export default function Page ({colorObj, email_1, email_2, email_3}) {
  const [color1, setColor1] = useState(colorObj.$color1)
  const [color2, setColor2] = useState(colorObj.$color2)
  const [color3, setColor3] = useState(colorObj.$color3)
  const [color4, setColor4] = useState(colorObj.$color4)
  const [color5, setColor5] = useState(colorObj.$color5)
  const [color6, setColor6] = useState(colorObj.$color6)
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [input1, setInput1] = useState([])
  const [input2, setInput2] = useState([])
  const [input3, setInput3] = useState([])
  const [input4, setInput4] = useState([])
  const [input5, setInput5] = useState([])
  const [sumItem, setSumItem] = useState('0')

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }

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

  const onClickButtonAddData = React.useCallback((e) => {
    const addData = {
      $color1: document.querySelector(`#idColorInput1`).value,
      $color2: document.querySelector(`#idColorInput2`).value,
      $color3: document.querySelector(`#idColorInput3`).value,
      $color4: document.querySelector(`#idColorInput4`).value,
      $color5: document.querySelector(`#idColorInput5`).value,
      $color6: document.querySelector(`#idColorInput6`).value
    }
    let error = false
    let error_color = ''
    let error_symbol = ''
    for (let i = 1; i < addData.$color1.length; i++) {
      // addData.$color1[i]
      if ((addData.$color1[i] !== '0')&(addData.$color1[i] !== '1')&(addData.$color1[i] !== '2')&(addData.$color1[i] !== '3')&(addData.$color1[i] !== '4')&(addData.$color1[i] !== '5')&(addData.$color1[i] !== '6')&(addData.$color1[i] !== '7')&(addData.$color1[i] !== '8')&(addData.$color1[i] !== '9')) {
        if ((addData.$color1[i] !== 'A')&(addData.$color1[i] !== 'B')&(addData.$color1[i] !== 'C')&(addData.$color1[i] !== 'D')&(addData.$color1[i] !== 'E')&(addData.$color1[i] !== 'F')&(addData.$color1[i] !== 'a')&(addData.$color1[i] !== 'b')&(addData.$color1[i] !== 'c')&(addData.$color1[i] !== 'd')&(addData.$color1[i] !== 'e')&(addData.$color1[i] !== 'f')) {
          error = true
          error_color = '?????????? ???1'
          if (error_symbol !== '') {
            error_symbol = error_symbol +', '+addData.$color1[i]
          } else {
            error_symbol = addData.$color1[i]
          }

        }
      }
    }

    if (error) {
      alert('???????????????????????? ?????????????? ?????? ?????????? ???????? ?????? '+error_color+'. ?????????????????????????? ?????????????????? ???????????????? "'+error_symbol+'"')
    } else {
      pushInData(addData).then(setTimeout(Router.reload, 700))
    }

  }, []);


  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><Head>
    <meta name = "robots" content = "noindex, nofollow" />
  </Head><AccessDenied/></Layout> }

  // If session exists, display content
  if ((session.user.email === email_1)||(session.user.email === email_2)||(session.user.email === email_3)) {
    return (
      <Layout propsBasket={sumItem}>
      <Head>
        <meta name = "robots" content = "noindex, nofollow" />
      </Head>
        <div style={{

        }}>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px 0px 30px 30px'
        }}>
          <h2>???????????????????????????? ???????????????? ?????????? ??????????</h2>
        </div>
          <div className={styles.mainDiv}>
            <div className={styles.color_div}>
              <div className={styles.list}>
                <h3>???????? ???1:</h3> <input key={`keyInputColor1`} id={`idColorInput1`} type='text' placeholder={color1} value={color1} className={styles.inputN} maxLength='7' onChange={(e) => {
                  let val = e.target.value
                  if (e.target.value[0] !== '#') {
                    val = '#'+e.target.value
                  }
                  setColor1(val)
                }} ></input>
              </div>
              <div className={styles.list}>
                <h3>???????? ???2:</h3> <input key={`keyInputColor1`} id={`idColorInput2`} type='text' placeholder={color2} value={color2} className={styles.inputN} maxLength='7' onChange={(e) => {
                  let val = e.target.value
                  if (e.target.value[0] !== '#') {
                    val = '#'+e.target.value
                  }
                  setColor2(val)
                }} ></input>
              </div>
              <div className={styles.list}>
                <h3>???????? ???3:</h3> <input key={`keyInputColor1`} id={`idColorInput3`} type='text' placeholder={color3} value={color3} className={styles.inputN} maxLength='7' onChange={(e) => {
                  let val = e.target.value
                  if (e.target.value[0] !== '#') {
                    val = '#'+e.target.value
                  }
                  setColor3(val)
                }} ></input>
              </div>
              <div className={styles.list}>
                <h3>???????? ???4:</h3> <input key={`keyInputColor1`} id={`idColorInput4`} type='text' placeholder={color4} value={color4} className={styles.inputN} maxLength='7' onChange={(e) => {
                  let val = e.target.value
                  if (e.target.value[0] !== '#') {
                    val = '#'+e.target.value
                  }
                  setColor4(val)
                }} ></input>
              </div>
              <div className={styles.list}>
                <h3>???????? ???5:</h3> <input key={`keyInputColor1`} id={`idColorInput5`} type='text' placeholder={color5} value={color5} className={styles.inputN} maxLength='7' onChange={(e) => {
                  let val = e.target.value
                  if (e.target.value[0] !== '#') {
                    val = '#'+e.target.value
                  }
                  setColor5(val)
                }} ></input>
              </div>
              <div className={styles.list}>
                <h3>???????? ???6:</h3> <input key={`keyInputColor1`} id={`idColorInput6`} type='text' placeholder={color6} value={color6} className={styles.inputN} maxLength='7' onChange={(e) => {
                  let val = e.target.value
                  if (e.target.value[0] !== '#') {
                    val = '#'+e.target.value
                  }
                  setColor6(val)
                }} ></input>
              </div>
              <button className={styles.addDataButtonSave} onClick={onClickButtonAddData}>??????????????????</button>
            </div>
          </div>

        </div>
      </Layout>
    )
  }
  else {
    return (
      <Layout propsBasket={sumItem}>
      <Head>
        <meta name = "robots" content = "noindex, nofollow" />
      </Head>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px'
        }}>
        <h1>Protected Page</h1>
        <h2>?? ?????? ?????? ???????? ???? ???????????????? ??????????????????</h2>


        </div>
      </Layout>
    )
  }
}
