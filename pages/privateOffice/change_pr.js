import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import styles from './change_pr.module.scss'
import Link from 'next/link'
import Router from "next/router"
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


async function pushInData(infoPush) {
  const response = await fetch('/api/data/setData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      doPush: infoPush,
      type: 'products'
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
      type: 'products'
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
      type: 'products'
     }),
  })
  const data = await response.json()
  return data.id
}

export default function Page ({email_1, email_2, email_3}) {
  const [dataProducts, setDataProducts] = useState([{id: 's'}])
  const [dataCategory, setDataCategory] = useState([])
  const [ session, loading ] = useSession()

  const [input1, setInput1] = useState([])
  const [input2, setInput2] = useState([])
  const [input2Load, setInput2Load] = useState(false)
  const [input3, setInput3] = useState([])
  const [input4, setInput4] = useState([])
  const [input5, setInput5] = useState([])
  const [input6, setInput6] = useState([])
  const [input7, setInput7] = useState([])
  const [input8, setInput8] = useState([])
  const [input9, setInput9] = useState([])
  const [input10, setInput10] = useState([])
  const [input11, setInput11] = useState([])
  const [sumItem, setSumItem] = useState('0')
  const [listCategory, setListCategory] = useState(undefined)
  const [listNoChose, setListNoChose] = useState(undefined)
  let list_filtre = []
  let list_filtre2 = []



  // Fetch content from protected route
  useEffect(()=>{

    const fetchData = async () => {
      if (dataProducts[0].id === 's') {


        const response = await fetch('/api/data/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'products'
           }),
        })
        const json2 = await response.json();
        setDataProducts(json2.products)

        const response2 = await fetch('/api/data/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'category'
           }),
        })
        const json3 = await response2.json();
        setDataCategory(json3.category)



        json2.products.map((prod)=>{
          let filtrmini = []
          let filtrminiAdd = []
          let filtrmini2 = []
          let filtrmini2Add = []
          let obj = {}
          let obj2 = {}
          json3.category.map((categAll)=>{
            let display = 'none'
            let display2 = 'flex'
            prod.category.map((categHave)=>{
              if (categAll.title === categHave) {
                display = 'flex'
                display2 = 'none'
              }
            })

            obj = {
              category: categAll.title,
              display: display
            }
            obj2 = {
              category: categAll.title,
              display: display2
            }
            filtrmini.push(obj)
            filtrmini2.push(obj2)
          })

          json3.category.map((categAll)=>{
            obj = {
              category: categAll.title,
              display: 'none'
            }
            obj2 = {
              category: categAll.title,
              display: 'flex'
            }
            filtrminiAdd.push(obj)
            filtrmini2Add.push(obj2)
          })
          list_filtre[0] = filtrminiAdd
          list_filtre[prod.id] = filtrmini
          list_filtre2[0] = filtrmini2Add
          list_filtre2[prod.id] = filtrmini2
        })
        setListNoChose(list_filtre2)
        setListCategory(list_filtre)


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

  const onClickButtonAddData = React.useCallback((e) => {

    let categoryGoToData = []
    listCategory[0].map((item)=>{
      if (item.display === 'flex')
      categoryGoToData.push(item.category)
    })


    let parameters = document.querySelector(`#idDistinctiveParameters`).value
    let ulr_hair = ''
    let param = ''
    let needPush = false
    let distinctiveParameters = []

    let i = 0
    while (i < parameters.length) {
      while ((i < parameters.length)&(parameters[i] === '\n')) {
        i++
        console.log('n')
      }
      while ((i < parameters.length)&(parameters[i] === ' ')) {
        i++
      }
      while ((i < parameters.length)&(parameters[i] !== ' ')) {
        ulr_hair += parameters[i]
        needPush = true
        i++
      }
      while ((i < parameters.length)&(parameters[i] === ' ')) {
        i++
      }
      while ((i < parameters.length)&(parameters[i] !== ',')) {
        param += parameters[i]
        i++
      }
      while ((i < parameters.length)&(parameters[i] === ',')) {
        i++
      }
      if (needPush) {
        needPush = false
        distinctiveParameters.push({ulr_hair,param})
      }
      param = ''
      ulr_hair = ''
    }

    // ${e.target.id}
    const addData = {
      url: document.querySelector(`#idUrlInput`).value,
      title: document.querySelector(`#idTitleInput`).value,
      description: document.querySelector(`#idDescriptionInput`).value,
      volume: document.querySelector(`#idVolumeInput`).value,
      typeVolume: document.querySelector(`#idTypeVolumeInput`).value,
      price: document.querySelector(`#idPriceInput`).value,
      priceDiscount: document.querySelector(`#idPriceDiscountInput`).value,
      value: document.querySelector(`#idValueInput`).value,
      typePrice: "рубли",
      width: '32%',
      category: categoryGoToData,
      distinctiveParameters: distinctiveParameters,
    }



    pushInData(addData).then(setTimeout(Router.reload, 700))
  }, [listCategory]);

  var sum = function(f) {
  return  {
    listCategory
  }
}

  const onClickChangeData = React.useCallback((e) => {

    if (e.target.getAttribute('value') === '1')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputTitle${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '2')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputDescription${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '3')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputUrl${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '4')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputVolume${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '5')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputTypeVolume${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '6')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputPrice${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '7')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputValue${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '8')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputWidth${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '9') {
      let categoryGoToData = []
      listCategory[e.target.id].map((item)=>{
        if (item.display === 'flex')
        categoryGoToData.push(item.category)
      })
      changeInData(e.target.id, e.target.getAttribute('title'), categoryGoToData).then(setTimeout(Router.reload, 700))
    }

    if (e.target.getAttribute('value') === '10')
    changeInData(e.target.id, e.target.getAttribute('title'), document.querySelector(`#idInputPriceDiscount${e.target.id}`).value).then(setTimeout(Router.reload, 700))

    if (e.target.getAttribute('value') === '11') {
      let parameters = document.querySelector(`#idInputParams${e.target.id}`).value
      let ulr_hair = ''
      let param = ''
      let needPush = false
      let distinctiveParameters = []

      let i = 0
      while (i < parameters.length) {
        while ((i < parameters.length)&(parameters[i] === '\n')) {
          i++
          console.log('n')
        }
        while ((i < parameters.length)&(parameters[i] === ' ')) {
          i++
        }
        while ((i < parameters.length)&(parameters[i] !== ' ')) {
          ulr_hair += parameters[i]
          needPush = true
          i++
        }
        while ((i < parameters.length)&(parameters[i] === ' ')) {
          i++
        }
        while ((i < parameters.length)&(parameters[i] !== ',')) {
          param += parameters[i]
          i++
        }
        while ((i < parameters.length)&(parameters[i] === ',')) {
          i++
        }
        if (needPush) {
          needPush = false
          distinctiveParameters.push({ulr_hair,param})
        }
        param = ''
        ulr_hair = ''
      }



      changeInData(e.target.id, e.target.getAttribute('title'), distinctiveParameters).then(setTimeout(Router.reload, 700))
    }



  }, [listCategory]);

  const onClickDeletData = React.useCallback((e) => {
    deleteData(e.target.id).then(setTimeout(Router.reload, 700))
  }, []);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><Head>
    <meta name = "robots" content = "noindex, nofollow" />
  </Head><AccessDenied/></Layout> }

  // If session exists, display content
  if (((session.user.email === email_1)||(session.user.email === email_2)||(session.user.email === email_3))&(listCategory !== undefined)&(listNoChose !== undefined)) {

    if (!input2Load) {
      setInput2Load(true)
      let copyInput1 = input1
      let copyInput2 = input2
      // let copyInput3 = input3
      let copyInput4 = input4
      let copyInput5 = input5
      let copyInput6 = input6
      let copyInput7 = input7
      let copyInput11 = input11

      dataProducts.map((product)=>{
        if (product.distinctiveParameters!== undefined) {
          let textParam = ''
          product.distinctiveParameters.map((item)=>{
            textParam+= item.ulr_hair + ' '+ item.param+ ','+'\n'
          })
          copyInput11[product.id-1] = textParam
          setInput11(copyInput11)
        }
        copyInput1[product.id-1] = product.title
        copyInput2[product.id-1] = product.description
        // copyInput3[product.id-1] = product.url
        copyInput4[product.id-1] = product.volume
        copyInput5[product.id-1] = product.typeVolume
        copyInput6[product.id-1] = product.price
        copyInput7[product.id-1] = product.value


      })
      setInput1(copyInput1)
      setInput2(copyInput2)
      // setInput3(copyInput3)
      setInput4(copyInput4)
      setInput5(copyInput5)
      setInput6(copyInput6)
      setInput7(copyInput7)

    }

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
          <h1>Protected Page</h1>
          <h2>Список товаров</h2>
        </div>
          <div className={styles.addInDataDiv}>
            <h2>Добавить новую категорию каталога товаров</h2>
            <div key={'addDiv'} className={styles.list}>
              <div><h3>Название:</h3> <input id={`idTitleInput`} type='text' placeholder={'Название товара'} value={input9[0]} className={styles.inputN} onChange={(e) => {
                let n = input9
                n[0] = e.target.value
                setInput9(n)
                setInput9([])
              }}></input> </div>
              <div><h3>Описание:</h3> <textarea wrap="hard" id={`idDescriptionInput`} type='text' placeholder={'Описание товара'} value={input9[1]} className={styles.inputN1} onChange={(e) => {
                let n = input9
                n[1] = e.target.value
                setInput9(n)
                setInput9([])
              }}></textarea> </div>
              <div><h3>Url адрес фото:</h3> <input id={`idUrlInput`} placeholder={'Url картинки товара'} value={input9[2]} className={styles.inputN} onChange={(e) => {
                let n = input9
                n[2] = e.target.value
                setInput9(n)
                setInput9([])
              }}></input></div>
              <div><h3>Обьем/вес:</h3> <input id={`idVolumeInput`} type='number' placeholder={'Обьем/вес товара'} value={input9[3]} className={styles.inputN} onChange={(e) => {
                let n = input9
                n[3] = e.target.value
                setInput9(n)
                setInput9([])
              }}></input> </div>
              <div><h3>Ед.изм:</h3> <input id={`idTypeVolumeInput`} type='text' placeholder={'Ед.изм. веса/обьема'} value={input9[4]} className={styles.inputN} onChange={(e) => {
                let n = input9
                n[4] = e.target.value
                setInput9(n)
                setInput9([])
              }}></input> </div>
              <div><h3>Цена:</h3> <input id={`idPriceInput`} type='number' placeholder={'Цена товара в рублях'} value={input9[5]} className={styles.inputN} onChange={(e) => {
                let n = input9
                n[5] = e.target.value
                setInput9(n)
                setInput9([])
              }}></input> </div>
              <div><h3>Цена со скидкой:</h3> <input id={`idPriceDiscountInput`} type='number' placeholder={'Цена товара со скидкой'} value={input9[6]} className={styles.inputN} onChange={(e) => {
                let n = input9
                n[6] = e.target.value
                setInput9(n)
                setInput9([])
              }}></input> </div>
              <div><h3>Количество товара:</h3> <input id={`idValueInput`} type='number' placeholder={'Количество'} value={input9[7]} className={styles.inputN} onChange={(e) => {
                let n = input9
                n[7] = e.target.value
                setInput9(n)
                setInput9([])
              }}></input> </div>
              <div className={styles.catalog_list}>
                  <div className={styles.chose_list}>
                  <div className={styles.name_list}>Выбранные:</div>
                    {listCategory[0].map((item)=>(
                      <div style={{display: item.display}} key={'listCategoryAdd'+'0'+item.category} id={'idListCatAdd'+'0'+item.category[0]+item.category[1]+item.category[2]+item.category.length} onClick={()=>{
                        const itemDiv = document.querySelector(`#idListCatAdd`+'0'+item.category[0]+item.category[1]+item.category[2]+item.category.length)
                        const itemDiv2 = document.querySelector(`#idListNoChoseAdd`+'0'+item.category[0]+item.category[1]+item.category[2]+item.category.length)
                        itemDiv.style.display = 'none'
                        itemDiv2.style.display = 'flex'
                        item.display = 'none'
                        listNoChose[0].map((target)=>{
                          if (target.category === item.category) {
                            target.display = 'flex'
                          }
                        })

                      }}><div>{item.category}</div><div> ❯</div></div>
                    ))}
                  </div>
                <div  className={styles.simvol}>⇄</div>
                  <div className={styles.chose_list}>
                  <div className={styles.name_list2}>Можно добавить:</div>
                    {listNoChose[0].map((item)=>(
                      <div style={{display: item.display}} key={'listNoChoseAdd'+'0'+item.category} id={'idListNoChoseAdd'+'0'+item.category[0]+item.category[1]+item.category[2]+item.category.length} onClick={()=>{
                        const itemDiv = document.querySelector(`#idListCatAdd`+'0'+item.category[0]+item.category[1]+item.category[2]+item.category.length)
                        const itemDiv2 = document.querySelector(`#idListNoChoseAdd`+'0'+item.category[0]+item.category[1]+item.category[2]+item.category.length)
                        itemDiv.style.display = 'flex'
                        itemDiv2.style.display = 'none'
                        item.display = 'none'
                        listCategory[0].map((target)=>{
                          if (target.category === item.category) {
                            target.display = 'flex'
                          }
                        })

                      }}><div>❮ </div><div>{item.category}</div>
                      </div>
                    ))}
                  </div>
              </div>
              <div><h3>Отличительные параметры:</h3> <textarea wrap="hard" id={`idDistinctiveParameters`} type='text' placeholder={'Отличительные параметры'} value={input9[8]} className={styles.inputN1} onChange={(e) => {
                let n = input9
                n[8] = e.target.value
                setInput9(n)
                setInput9([])
              }}></textarea> </div>
              <button className={styles.addDataButton} onClick={onClickButtonAddData}>Добавить товар в базу</button>
            </div>
          </div>
          <hr/>
          <div className={styles.mainDiv}>
            {dataProducts.map((product) => {
              return (
              <div key={product.id} className={styles.list}>
                <div><h3>ID: {product.id}</h3></div>
                <div className={styles.elem2}><h3>Название:</h3> <input id={'idInputTitle'+product.id} placeholder={product.title} value={input1[product.id-1]} className={styles.inputN} onChange={(e) => {
                  let n = input1
                  n[product.id-1] = e.target.value
                  setInput1(n)
                  setInput1([])
                }}></input> <button id={product.id} title={'title'} value={'1'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Описание:</h3> <textarea wrap="hard" id={'idInputDescription'+product.id} placeholder={product.description} value={input2[product.id-1]} className={styles.inputN1} onChange={(e) => {
                  let n = input2
                  n[product.id-1] = e.target.value
                  setInput2(n)
                  setInput2([])
                }}></textarea> <button id={product.id} title={'description'} value={'2'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Url адрес фона:</h3> <input id={'idInputUrl'+product.id} placeholder={product.url} value={input3[product.id-1]} className={styles.inputN} onChange={(e) => {
                  let n = input3
                  n[product.id-1] = e.target.value
                  setInput3(n)
                  setInput3([])
                }}></input> <button id={product.id} title={'url'} value={'3'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Обьем/вес:</h3> <input id={'idInputVolume'+product.id} placeholder={product.volume} value={input4[product.id-1]} className={styles.inputN} onChange={(e) => {
                  let n = input4
                  n[product.id-1] = e.target.value
                  setInput4(n)
                  setInput4([])
                }}></input> <button id={product.id} title={'volume'} value={'4'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Ед.изм.:</h3> <input id={'idInputTypeVolume'+product.id} placeholder={product.typeVolume} value={input5[product.id-1]} className={styles.inputN} onChange={(e) => {
                  let n = input5
                  n[product.id-1] = e.target.value
                  setInput5(n)
                  setInput5([])
                }}></input> <button id={product.id} title={'typeVolume'} value={'5'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Цена:</h3> <input id={'idInputPrice'+product.id} placeholder={product.price} value={input6[product.id-1]} className={styles.inputN} onChange={(e) => {
                  let n = input6
                  n[product.id-1] = e.target.value
                  setInput6(n)
                  setInput6([])
                }}></input> <button id={product.id} title={'price'} value={'6'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Количество:</h3> <input id={'idInputValue'+product.id} placeholder={product.value} value={input7[product.id-1]} className={styles.inputN} onChange={(e) => {
                  let n = input7
                  n[product.id-1] = e.target.value
                  setInput7(n)
                  setInput7([])
                }}></input> <button id={product.id} title={'value'} value={'7'} onClick={onClickChangeData}>Изменить</button></div>

                <div className={styles.elem}><h3>Размер фона:</h3> <input id={'idInputWidth'+product.id} placeholder={product.width} value={input8[product.id-1]} className={styles.inputSize} onChange={(e) => {
                  let n = input8
                  n[product.id-1] = e.target.value
                  setInput8(n)
                  setInput8([])
                }}></input> <button id={product.id} title={'width'} value={'8'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Категории:</h3>
                  <div className={styles.catalog_list}>
                      <div className={styles.chose_list}>
                      <div className={styles.name_list}>Выбранные:</div>
                        {listCategory[product.id].map((item)=>(
                          <div style={{display: item.display}} key={'listCategory'+product.id+item.category} id={'idListCat'+product.id+item.category[0]+item.category[1]+item.category[2]+item.category.length} onClick={()=>{
                            const itemDiv = document.querySelector(`#idListCat`+product.id+item.category[0]+item.category[1]+item.category[2]+item.category.length)
                            const itemDiv2 = document.querySelector(`#idListNoChose`+product.id+item.category[0]+item.category[1]+item.category[2]+item.category.length)
                            itemDiv.style.display = 'none'
                            itemDiv2.style.display = 'flex'
                            item.display = 'none'
                            listNoChose[product.id].map((target)=>{
                              if (target.category === item.category) {
                                target.display = 'flex'
                              }
                            })

                          }}><div>{item.category}</div><div> ❯</div></div>
                        ))}
                      </div>
                    <div  className={styles.simvol}>⇄</div>
                      <div className={styles.chose_list}>
                      <div className={styles.name_list2}>Можно добавить:</div>
                        {listNoChose[product.id].map((item)=>(
                          <div style={{display: item.display}} key={'listNoChose'+product.id+item.category} id={'idListNoChose'+product.id+item.category[0]+item.category[1]+item.category[2]+item.category.length} onClick={()=>{
                            const itemDiv = document.querySelector(`#idListCat`+product.id+item.category[0]+item.category[1]+item.category[2]+item.category.length)
                            const itemDiv2 = document.querySelector(`#idListNoChose`+product.id+item.category[0]+item.category[1]+item.category[2]+item.category.length)
                            itemDiv.style.display = 'flex'
                            itemDiv2.style.display = 'none'
                            item.display = 'none'
                            listCategory[product.id].map((target)=>{
                              if (target.category === item.category) {
                                target.display = 'flex'
                              }
                            })
                          }}><div>❮ </div><div>{item.category}</div>
                          </div>
                        ))}
                      </div>
                  </div>

                <button id={product.id} title={'category'} value={'9'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Параметры:</h3> <textarea wrap="hard" id={'idInputParams'+product.id}  value={input11[product.id-1]} className={styles.inputN1} onChange={(e) => {
                  let n = input11
                  n[product.id-1] = e.target.value
                  setInput11(n)
                  setInput11([])
                }}></textarea> <button id={product.id} title={'params'} value={'11'} onClick={onClickChangeData}>Изменить</button></div>
                <div className={styles.elem}><h3>Цена со скидкой:</h3> <input id={'idInputPriceDiscount'+product.id} placeholder={product.priceDiscount} value={input10[product.id-1]} className={styles.inputN} onChange={(e) => {
                  let n = input10
                  n[product.id-1] = e.target.value
                  setInput10(n)
                  setInput10([])
                }}></input> <button id={product.id} title={'priceDiscount'} value={'10'} onClick={onClickChangeData}>Изменить</button></div>

                <div className={styles.deleteDiv}><button id={product.id} title={'delete'} value={''} onClick={onClickDeletData}>Удалить товар с ID:{product.id}</button></div>

              </div>
            )})}
          </div>
        </div>
      </Layout>
    )
  }
  else {
    if (((session.user.email === email_1)||(session.user.email === email_2)||(session.user.email === email_3))&((listCategory === undefined)||(listNoChose !== undefined))) {
      return (
        <Layout propsBasket={sumItem}>
        <Head>
          <meta name = "robots" content = "noindex, nofollow" />
        </Head>
          <div style={{
            width: '90%',
            margin: 'auto',
            padding: '30px 0px 30px 30px'
          }}>
          <h1>Protected Page</h1>
          <h2>Загрузка ...</h2>


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
            padding: '30px 0px 30px 30p'
          }}>
          <h1>Protected Page</h1>
          <h2>У вас нет прав на внесение измениний</h2>


          </div>
        </Layout>
      )
    }
  }
}
