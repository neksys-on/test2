import styles from './productInBasket.module.scss'
import { useState, useEffect } from 'react'
import Popup from '../popup/popup.js'
import { useSession } from 'next-auth/client'




export default function ExactlyProducts() {
    let [prData, setPrData] = useState([])
    const [ session, loading ] = useSession()
    let [sumItem, setSumItem] = useState('0')
    let [leng, setLeng] = useState('0')
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
      const localStor = localStorage.getItem('_basket')
      if (localStor) {
        let localStorJson = JSON.parse(localStor)
        if (leng!==localStorJson.length) {
          setPrData(localStorJson)
        }
        setLeng(localStorJson.length)
        setSumItem(localStorJson.length)
      }

      const fetchData = async () => {

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
                if (user.email === session.user.email) {
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
      fetchData()
    },[session])

let haveItemIn = false
if (prData.length > 0) {
  haveItemIn = true
}
let productsWeHave = undefined
prData.map((product) => {
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



if (haveItemIn) {
  let totalPrice = 0
  productsWeHave.map((prod) => {
    prod.sale === 'true' ? totalPrice += prod.priceDiscount*prod.value : totalPrice += prod.price*prod.value
  })
  return (

      <div>
        <div className={styles.mainDiv}>
        {productsWeHave.map((product) => (
          <div key={product.id} className={styles.content}>
            <div className={styles.imageAndDescription}>
              <div className={styles.imageDiv}
              style={{
                backgroundImage: `url(${product.url})`,
              }}></div>
              <div className={styles.description}>
                <h1>{product.title}</h1>
                <h2>{product.description}</h2>
              </div>
            </div>
            <div className={styles.othersItem}>
            <div className={styles.priceForOne}>
              <h2>Цена за 1 ед.</h2>
              {product.sale === 'true' && <>
                <h3>{product.priceDiscount} ₽</h3>
              </>}
              {product.sale === 'false' && <>
                <h3>{product.price} ₽</h3>
              </>}
            </div>
            <div className={styles.value}>
              <h2>В количестве</h2>
              <div className={styles.valueChange}>
                <h3>{product.value} шт</h3>
                <div className={styles.buttonDiv}>
                  <button className={styles.cornerButton}
                    onClick={()=>{
                      let localStorStr
                      let localStorJson
                      let localStor = localStorage.getItem('_basket')
                      localStorJson = JSON.parse(localStor)
                      let newLStor = []
                      let newLStorBack = []
                      let delItem = false
                      localStorJson.map((item1) =>{
                        newLStorBack.unshift({
                          id:`${item1.id}`,
                          title:`${item1.title}`,
                          description:`${item1.description}`,
                          volume:`${item1.volume}`,
                          typeVolume:`${item1.typeVolume}`,
                          price:`${item1.price}`,
                          priceDiscount: `${item1.priceDiscount}`,
                          sale: `${item1.sale}`,
                          typePrice:`${item1.typePrice}`,
                          url:`${item1.url}`
                        })
                      })

                      newLStorBack.map((item) => {
                        if ((item.id === product.id)&(!delItem)) {
                          delItem = true
                        }
                        else {
                          newLStor.unshift({
                            id:`${item.id}`,
                            title:`${item.title}`,
                            description:`${item.description}`,
                            volume:`${item.volume}`,
                            typeVolume:`${item.typeVolume}`,
                            price:`${item.price}`,
                            priceDiscount: `${item.priceDiscount}`,
                            sale: `${item.sale}`,
                            typePrice:`${item.typePrice}`,
                            url:`${item.url}`
                          })
                        }
                      })

                      const newLStorStr = JSON.stringify(newLStor)
                      localStorage.setItem('_basket', `${newLStorStr}`)
                      localStor = localStorage.getItem('_basket')
                      const span = document.getElementById(`basketSpanSumItems`)
                      if (localStor) {
                        localStorJson = JSON.parse(localStor)
                        setPrData(localStorJson)
                        setSumItem(localStorJson.length)
                        span.textContent = Number(span.textContent)-1
                      }

                    }}>
                    <span>−</span>
                  </button>
                  <button className={styles.cornerButton}
                    onClick={()=>{
                      let localStorStr
                      let localStorJson
                      let localStor = localStorage.getItem('_basket')
                      localStorJson = JSON.parse(localStor)
                      localStorJson.push({
                        id:`${product.id}`,
                        title:`${product.title}`,
                        description:`${product.description}`,
                        volume:`${product.volume}`,
                        typeVolume:`${product.typeVolume}`,
                        price:`${product.price}`,
                        priceDiscount: `${product.priceDiscount}`,
                        sale: `${product.sale}`,
                        typePrice:`${product.typePrice}`,
                        url:`${product.url}`
                      })
                      localStorStr = JSON.stringify(localStorJson)
                      localStorage.setItem('_basket', `${localStorStr}`)
                      localStor = localStorage.getItem('_basket')
                      const span = document.getElementById(`basketSpanSumItems`)
                      if (localStor) {
                        localStorJson = JSON.parse(localStor)
                        setPrData(localStorJson)
                        setSumItem(localStorJson.length)
                        span.textContent = Number(span.textContent)+1
                      }


                  }}>
                    <span>+</span>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.sum}>
              <h2>Сумма</h2>
              {product.sale === 'true' && <>
                <h3>{product.priceDiscount*product.value} ₽</h3>
              </>}
              {product.sale === 'false' && <>
                <h3>{product.price*product.value} ₽</h3>
              </>}
            </div>

            <div>
            <div className={styles.butt} id={'idButton'+product.id}>
                <a onClick={()=>{
                  let localStorStr
                  let localStorJson
                  let localStor = localStorage.getItem('_basket')
                  localStorJson = JSON.parse(localStor)
                  let newLStor = []
                  let newLStorBack = []
                  localStorJson.map((item1) =>{
                    newLStorBack.unshift({
                      id:`${item1.id}`,
                      title:`${item1.title}`,
                      description:`${item1.description}`,
                      volume:`${item1.volume}`,
                      typeVolume:`${item1.typeVolume}`,
                      price:`${item1.price}`,
                      priceDiscount: `${item1.priceDiscount}`,
                      sale: `${item1.sale}`,
                      typePrice:`${item1.typePrice}`,
                      url:`${item1.url}`
                    })
                  })
                  let score = 0
                  newLStorBack.map((item) => {
                    if (item.id !== product.id) {
                      newLStor.unshift({
                        id:`${item.id}`,
                        title:`${item.title}`,
                        description:`${item.description}`,
                        volume:`${item.volume}`,
                        typeVolume:`${item.typeVolume}`,
                        price:`${item.price}`,
                        priceDiscount: `${item.priceDiscount}`,
                        sale: `${item.sale}`,
                        typePrice:`${item.typePrice}`,
                        url:`${item.url}`
                      })
                    }
                    else {
                      score++
                    }
                  })

                  const newLStorStr = JSON.stringify(newLStor)
                  localStorage.setItem('_basket', `${newLStorStr}`)
                  localStor = localStorage.getItem('_basket')
                  const span = document.getElementById(`basketSpanSumItems`)
                  if (localStor) {
                    localStorJson = JSON.parse(localStor)
                    setPrData(localStorJson)
                    setSumItem(localStorJson.length)
                    span.textContent = Number(span.textContent)-score
                  }

                }}>
                  <p><span className={styles.bg}></span><span className={styles.base}></span><span className={styles.text}>Удалить</span></p>
                </a>
            </div>
            </div>
            </div>

          </div>
        ))}
        <hr  className={styles.hr_div}/>
        <div className={styles.Offer}>
        <div className={styles.totalPrice}>Итого {totalPrice} ₽</div>
        <div className={styles.butt} id={'offer'} >
            <a onClick={()=>{
              const popup = document.querySelector('#id_popup_fon')
              const container = document.querySelector('#id_popup_container')
              popup.style.opacity = '1'
              popup.style.visibility = 'visible'
              container.style.opacity = '1'
              container.style.transform = 'perspective(600px) translate(0px, 0%) rotateX(0deg)'
            }}>
              <p><span className={styles.bg}></span><span className={styles.base}></span><span className={styles.text}>Оформить</span></p>
            </a>
        </div>
        </div>
        </div>
        <Popup title={'Укажите и подтвердите ваши данные'} content={userData} typePopup={'order'}/>
      </div>
  )
}
else {
  return (
    <div className={styles.mainDiv}>Нет выбранных товаров</div>
  )
}


}
