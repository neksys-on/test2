import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import styles from './change_k.module.scss'
import Link from 'next/link'
import Router from "next/router"


async function pushInData(infoPush) {
  const response = await fetch('/api/data/setData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      doPush: infoPush,
      type: 'category'
     }),
  })
  const data = await response.json()
  return data.doPush
}

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
      type: 'category'
     }),
  })
  const data = await response.json()
  return data.id
}

async function deleteData(id) {
  const response = await fetch('/api/data/deleteData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      type: 'category'
     }),
  })
  const data = await response.json()
  return data.id
}

export default function Page () {
  const [dataCategory, setDataCategory] = useState([])
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

      const response = await fetch('/api/data/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'category'
         }),
      })
      const json2 = await response.json();
      setDataCategory(json2.category)
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
      url: document.querySelector(`#idUrlInput`).value,
      title: document.querySelector(`#idTitleInput`).value,
      width: '32%',
    }
    pushInData(addData).then(setTimeout(Router.reload, 700))
  }, []);
  const onClickChangeData = React.useCallback((e) => {
    if (e.target.getAttribute('value') === '1')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputTitle${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '2')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputUrl${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '3')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputWidth${e.target.id}`).value).then(setTimeout(Router.reload, 700))
  }, []);

  const onClickDeletData = React.useCallback((e) => {
    deleteData(e.target.id).then(setTimeout(Router.reload, 700))
  }, []);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  if ((session.user.email === 'neksyz@gmail.com')||(session.user.email === 'neksyz@gmail.com')) {
    return (
      <Layout propsBasket={sumItem}>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px'
        }}>
          <h1>Protected Page</h1>
          <h2>Список категорий каталога товаров</h2>
          <div className={styles.mainDiv}>
            {dataCategory.map((image) => (
              <div key={image.id} className={styles.list}>
                <div><h3>ID:</h3> {image.id}</div>
                <div><h3>Название:</h3> <input id={'idInputTitle'+image.id} placeholder={image.title} value={input1[image.id-1]} className={styles.inputN} onChange={(e) => {
                  let n1 = input1
                  n1[image.id-1] = e.target.value
                  setInput1(n1)
                  setInput1([])
                }}></input> <button id={image.id} title={'title'} value={'1'} onClick={onClickChangeData}>Изменить</button></div>
                <div><h3>Url адрес фона:</h3> <input id={'idInputUrl'+image.id} placeholder={image.url} value={input2[image.id-1]} className={styles.inputN} onChange={(e) => {
                  let n2 = input2
                  n2[image.id-1] = e.target.value
                  setInput2(n2)
                  setInput2([])
                }}></input> <button id={image.id} title={'url'} value={'2'} onClick={onClickChangeData}>Изменить</button></div>
                <div><h3>Размер фона:</h3> <input id={'idInputWidth'+image.id} placeholder={image.width} value={input3[image.id-1]} className={styles.inputSize} onChange={(e) => {
                  let n3 = input3
                  n3[image.id-1] = e.target.value
                  setInput3(n3)
                  setInput3([])
                }}></input> <button id={image.id} title={'width'} value={'3'} onClick={onClickChangeData}>Изменить</button>
                    <div className={styles.deleteDiv}><button id={image.id} title={'delete'} value={''} onClick={onClickDeletData}>Удалить {image.id} категорию</button></div></div>
              </div>
            ))}
          </div>
          <hr/>
          <div className={styles.addInDataDiv}>
            <h2>Добавить новую категорию каталога товаров</h2>
            <div key={'addDiv'} className={styles.list}>
              <div><h3>Название:</h3> <input id={`idTitleInput`} type='text' placeholder={'Название категории'} value={input4} className={styles.inputN} onChange={(e) => {
                setInput4(e.target.value)
              }}></input> </div>
              <div><h3>Url адрес фона:</h3> <input id={`idUrlInput`} placeholder={'Url фона для категории'} value={input5} className={styles.inputN} onChange={(e) => {
                setInput5(e.target.value)
              }}></input></div>
              <button className={styles.addDataButton} onClick={onClickButtonAddData}>Добавить</button>
            </div>
          </div>
          <p><strong>{content}</strong></p>
        </div>
      </Layout>
    )
  }
  else {
    return (
      <Layout propsBasket={sumItem}>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px'
        }}>
        <h1>Protected Page</h1>
        <h2>У вас нет прав на внесение измениний</h2>


        </div>
      </Layout>
    )
  }
}
