import Layout from '../../components/layout'
import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/client'
import styles from './statistics.module.scss'
import AccessDenied from '../../components/access-denied'
import Head from 'next/head'


export default function Page () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [sumItem, setSumItem] = useState('0')
  const [dataStatistics, setDataStatistics] = useState()
  const [yearOpen, setYearOpen] = useState('0')
  const [mounthOpen, setMounthOpen] = useState('0')
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }

      const responseStatistics = await fetch('/api/data/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'statistics'
         }),
      })
      const jsonStatistics = await responseStatistics.json();
      setDataStatistics(jsonStatistics.statistics)

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


  if (typeof window !== 'undefined' && loading) return null
  if (typeof dataStatistics === 'undefined') {
    return (
      <Layout><div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px'
      }}>
      <Head>
        <meta name = "robots" content = "noindex, nofollow" />
      </Head>
        <h1>Защищенная страница</h1>
        <h2>Загрузка</h2>
      </div>
      </Layout>
  )
}

  // If no session exists, display access denied message
  if (!session) { return  <Layout><Head>
    <meta name = "robots" content = "noindex, nofollow" />
  </Head><AccessDenied/></Layout> }

  if ((session.user.email === process.env.ADMIN_EMAIL_1)||(session.user.email === process.env.ADMIN_EMAIL_2)||(session.user.email === process.env.ADMIN_EMAIL_3)) {
    let i = 2021
    // console.log(dataStatistics[2021])
    let dataYear = []
    for (i = 2021; i < 2099; i++) {
      dataStatistics[i] !== undefined ? dataYear.push(i) : dataYear = dataYear
    }
    let dataMounth = []
    for (i = 0; i < 13; i++) {
      dataStatistics[dataYear][i] !== undefined ? dataMounth.push(i) : dataMounth = dataMounth
        // if (dataStatistics[dataYear][i] !== undefined) {
        //   dataMounth[dataYear] === undefined ? dataMounth[dataYear] = [] : dataMounth[dataYear] = dataMounth[dataYear]
        //   dataMounth[dataYear].push(dataStatistics[dataYear][i])
        // }

    }
    return (
      <Layout propsBasket={sumItem}>
        <div style={{
          width: '90%',
          margin: 'auto',
          padding: '30px'
        }}>
        <Head>
          <meta name = "robots" content = "noindex, nofollow" />
        </Head>
        <h1>Защищенная страница</h1>
        <h2>Статистика товаров</h2>
        <div className={styles.main_div}>
          {dataYear.map((year)=>(
            <div className={styles.div_year}>
              {dataMounth.map((mounth)=>{
                let data = dataStatistics[year][mounth]
                let data_prod = []
                if (data.initial_state !== undefined) {
                  data.initial_state.map((prod)=>{
                    let needPush = true
                    if (data_prod !== undefined) {
                      data_prod.map((d_prod)=>{
                        d_prod.id === prod.id ? needPush = false : needPush = needPush
                      })
                    }
                    needPush ? data_prod.push({id:prod.id, title:prod.title}) : data_prod = data_prod
                  })
                }

                if (data.coming !== undefined) {
                  data.coming.map((prod)=>{
                    let needPush = true
                    if (data_prod !== undefined) {
                      data_prod.map((d_prod)=>{
                        d_prod.id === prod.id ? needPush = false : needPush = needPush
                      })
                    }
                    needPush ? data_prod.push({id:prod.id, title:prod.title}) : data_prod = data_prod
                  })
                }

                if (data.write_off !== undefined) {
                  data.write_off.map((prod)=>{
                    let needPush = true
                    if (data_prod !== undefined) {
                      data_prod.map((d_prod)=>{
                        d_prod.id === prod.id ? needPush = false : needPush = needPush
                      })
                    }
                    needPush ? data_prod.push({id:prod.id, title:prod.title}) : data_prod = data_prod
                  })
                }

                if (data.expense !== undefined) {
                  data.expense.map((prod)=>{
                    let needPush = true
                    if (data_prod !== undefined) {
                      data_prod.map((d_prod)=>{
                        d_prod.id === prod.id ? needPush = false : needPush = needPush
                      })
                    }
                    needPush ? data_prod.push({id:prod.id, title:prod.title}) : data_prod = data_prod
                  })
                }

                if (data.final_state !== undefined) {
                  data.final_state.map((prod)=>{
                    let needPush = true
                    if (data_prod !== undefined) {
                      data_prod.map((d_prod)=>{
                        d_prod.id === prod.id ? needPush = false : needPush = needPush
                      })
                    }
                    needPush ? data_prod.push({id:prod.id, title:prod.title}) : data_prod = data_prod
                  })
                }

                return (
                  <div className={styles.div_mounth}>

                    <div className={styles.div_year_mounth}>Год: {year}  Месяц: {mounth<10 && <>0</>}{mounth}</div>

                    <div className={styles.div_table}>
                      <div className={styles.div_id}>id товара:</div>
                      <div className={styles.div_title}>Название:</div>
                      <div className={styles.div_initial_state}>Начало месяца:</div>
                      <div className={styles.div_coming}>Приход:</div>
                      <div className={styles.div_write_off}>Списание:</div>
                      <div className={styles.div_expense}>Расход:</div>
                      <div className={styles.div_final_state}>Конец месяца:</div>
                    </div>
                    <div className={styles.div_data}>

                        {data_prod.map((item)=>{
                          let needBlock_initial_state = true
                          let needBlock_coming = true
                          let needBlock_write_off = true
                          let needBlock_expense = true
                          let needBlock_final_state = true
                          return (

                          <div className={styles.div_item}>

                            <div className={styles.div_id}>{item.id}</div>
                            <div className={styles.div_title}>{item.title}</div>
                            {data.initial_state!==undefined && <>
                              {data.initial_state.map((element)=>{
                                if (element.id === item.id) {
                                  needBlock_initial_state = false
                                  return(
                                    <div className={styles.div_initial_state}>
                                      <div className={styles.div_price}>
                                        <div>Количество: {element.value}</div>
                                        <div>по цене: {element.price}  ₽</div>
                                      </div>
                                    </div>
                                  )
                                }
                              })}
                            </>}

                            {needBlock_initial_state && <>
                              <div className={styles.div_initial_state}></div>
                            </>}

                            {data.coming!==undefined && <>
                              {data.coming.map((element)=>{
                                if (element.id === item.id) {
                                  needBlock_coming = false
                                  return(
                                    <div className={styles.div_coming}>
                                      {element.state_of_prices!==undefined && <>
                                        {element.state_of_prices.map((state_prices)=>(
                                          <div className={styles.div_price}>
                                            <div>Количество: {state_prices.value}</div>
                                            <div>по цене: {state_prices.price}  ₽</div>
                                          </div>
                                        ))}
                                      </>}
                                    </div>
                                  )
                                }
                              })}
                            </>}

                            {needBlock_coming && <>
                              <div className={styles.div_coming}></div>
                            </>}

                            {data.write_off!==undefined && <>
                              {data.write_off.map((element)=>{
                                if (element.id === item.id) {
                                  needBlock_write_off = false
                                  return(
                                    <div className={styles.div_write_off}>
                                      {element.state_of_prices!==undefined && <>
                                        {element.state_of_prices.map((state_prices)=>(
                                          <div className={styles.div_price}>
                                            <div>Количество: {state_prices.value}</div>
                                            <div>по цене: {state_prices.price}  ₽</div>
                                          </div>
                                        ))}
                                      </>}
                                    </div>
                                  )
                                }
                              })}
                            </>}

                            {needBlock_write_off && <>
                              <div className={styles.div_write_off}></div>
                            </>}

                            {data.expense!==undefined && <>
                              {data.expense.map((element)=>{
                                if (element.id === item.id) {
                                  needBlock_expense = false
                                  return(
                                    <div className={styles.div_expense}>
                                      {element.state_of_prices!==undefined && <>
                                        {element.state_of_prices.map((state_prices)=>(
                                          <div className={styles.div_price}>
                                            <div>Количество: {state_prices.value}</div>
                                            <div>по цене: {state_prices.price}  ₽</div>
                                          </div>
                                        ))}
                                      </>}
                                    </div>
                                  )
                                }
                              })}
                            </>}

                            {needBlock_expense && <>
                              <div className={styles.div_expense}></div>
                            </>}

                            {data.final_state!==undefined && <>
                              {data.final_state.map((element)=>{
                                if (element.id === item.id) {
                                  needBlock_final_state = false
                                  return(
                                    <div className={styles.div_final_state}>
                                      {element.state_of_prices!==undefined && <>
                                        {element.state_of_prices.map((state_prices)=>(
                                          <div className={styles.div_price}>
                                            <div>Количество: {state_prices.value}</div>
                                            <div>по цене: {state_prices.price}  ₽</div>
                                          </div>
                                        ))}
                                      </>}
                                    </div>
                                  )
                                }
                              })}
                            </>}

                            {needBlock_final_state && <>
                              <div className={styles.div_final_state}></div>
                            </>}

                          </div>

                        )})}
                    </div>


                  </div>
                )
              })}
            </div>
          ))}
        </div>
        </div>
      </Layout>
  )

  }

}








//
// <div className={styles.div_zagolovok}>Состояние на начало месяца:</div>
// <div className={styles.div_table}>
//   {data.initial_state!==undefined && <>
//     {data.initial_state.map((com)=>(
//       <div className={styles.div_item}>
//         <div>id товара: {com.id}</div>
//         <div>Название: {com.title}</div>
//         <div>
//           <div className={styles.div_state_of_price}>
//             <div>Количество: {com.value}</div>
//             {com.sale === 'true' && <>
//               <div>по цене: {com.priceDiscount} ₽</div>
//             </>}
//             {com.sale !== 'true' && <>
//               <div>по цене: {com.price} ₽</div>
//             </>}
//           </div>
//         </div>
//       </div>
//     ))}
//   </>}
// </div>
//
// <div className={styles.div_zagolovok}>Приход:</div>
// <div className={styles.div_table}>
//   {data.coming!==undefined && <>
//     {data.coming.map((com)=>(
//       <div className={styles.div_item}>
//         <div>id товара: {com.id}</div>
//         <div>Название: {com.title}</div>
//         <div>
//           {com.state_of_prices.map((pr)=>(
//             <div className={styles.div_state_of_price}>
//               <div>Количество: {pr.value}</div>
//               <div>по цене: {pr.price} ₽</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </>}
// </div>
//
// <div className={styles.div_zagolovok}>Списание:</div>
// <div className={styles.div_table}>
//   {data.write_off!==undefined && <>
//     {data.write_off.map((com)=>(
//       <div className={styles.div_item}>
//         <div>id товара: {com.id}</div>
//         <div>Название: {com.title}</div>
//         <div>
//           {com.state_of_prices.map((pr)=>(
//             <div className={styles.div_state_of_price}>
//               <div>Количество: {pr.value}</div>
//               <div>по цене: {pr.price} ₽</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </>}
// </div>
//
// <div className={styles.div_zagolovok}>Расход:</div>
// <div className={styles.div_table}>
//   {data.expense!==undefined && <>
//     {data.expense.map((com)=>(
//       <div className={styles.div_item}>
//         <div>id товара: {com.id}</div>
//         <div>Название: {com.title}</div>
//         <div>
//           {com.state_of_prices.map((pr)=>(
//             <div className={styles.div_state_of_price}>
//               <div>Количество: {pr.value}</div>
//               <div>по цене: {pr.price} ₽</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </>}
// </div>
//
// <div className={styles.div_zagolovok}>Состояние на конец месяца:</div>
// <div className={styles.div_table}>
//   {data.final_state!==undefined && <>
//     {data.final_state.map((com)=>(
//       <div className={styles.div_item}>
//         <div>id товара: {com.id}</div>
//         <div>Название: {com.title}</div>
//         <div>
//           {com.state_of_prices.map((pr)=>(
//             <div className={styles.div_state_of_price}>
//               <div>Количество: {pr.value}</div>
//               <div>по цене: {pr.price} ₽</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </>}
// </div>
