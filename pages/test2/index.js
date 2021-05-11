import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'






export async function getServerSideProps(context) {

  // const postsDirectory = path.join(process.cwd(), 'pages/api/dataBase')
  //
  // const filePath = path.join(postsDirectory, 'dan.json')
  // const filePath2 = path.join(postsDirectory, 'dan2.json')
  // let resWeb


  // try {
  //   resWeb = await JSON.parse(fs2.readFileSync(filePath2))
  //   namberFile = 2
  // } catch(e) {
  //   resWeb = await JSON.parse(fs2.readFileSync(filePath))
  //   namberFile = 1
  // }


  // let resWeb = await JSON.parse(fs2.readFileSync(filePath))
  // let resWeb2 = await JSON.parse(fs2.readFileSync(filePath2))
  // let data
  // let namberFile = 0
  // const directory = path.join(process.cwd(), 'db')
  // const filePath = path.join(directory, 'testing.db')
  // var sqlite3 = require('sqlite3').verbose();
  // var db = new sqlite3.Database(filePath);
  //
  // db.serialize(function() {
  //   db.run("CREATE TABLE lorem (info TEXT)");
  //
  //   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  //   for (var i = 0; i < 2; i++) {
  //       stmt.run("Ipsum " + i);
  //   }
  //   stmt.finalize();
  //
  //   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
  //       console.log(row.id + ": " + row.info);
  //   });
  //
  // });
  //
  // db.close();

  return {
    props: {
      data: '1',
    },
  };



}

async function deal(infoPush) {


}

export default function Page () {


  const onClickDeal = React.useCallback((e) => {

    deal()
  }, []);

  return (
    <Layout>
    <Head>
      <meta name = "robots" content = "noindex, nofollow" />
    </Head>
      <div className={styles.wrapper}>
        <div className={styles.container}
          onMouseMove={(e) => {
            const card = document.querySelector(`#idCard1`)
            const coord = card.getBoundingClientRect()
            let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 15 *(650/card.clientHeight);
            let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 28 *(650/card.clientHeight)*0.5;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
          }}
          onMouseEnter={(e) =>{
            const card = document.querySelector(`#idCard1`)
            // const element = document.querySelector(`#idElement1`)
            card.style.transition = 'none'
            // element.style.transition = 'all 0.8s ease'
            // element.style.transform = 'translateZ(10deg)'
          }}
          onMouseLeave={(e) =>{
            const card = document.querySelector(`#idCard1`)
            // const element = document.querySelector(`#idElement1`)
            card.style.transform = `rotateY(0deg) rotateX(0deg)`
            card.style.transition = 'all 0.5s ease'
          }}
        >
          <div className={styles.card} id={'idCard1'}>
            <div className={styles.element} id={'idElement1'}>
              <div className={styles.text} style={{textAlign: 'center'}}>
                ИП Корнева Ольга Дмитриевна
              </div>
              <div className={styles.heading}>
                Телефон:
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                <a href="tel:+79147730000">+7 (914) 773-00-00</a>
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                <a href="tel:+79144061391">+7 (914) 406-13-91</a>
              </div>
              <div className={styles.heading}>
                EMAIL:
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
               не определен
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container}
          onMouseMove={(e) => {
            const card = document.querySelector(`#idCard2`)
            const coord = card.getBoundingClientRect()
            let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 15 *(650/card.clientHeight);
            let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 28 *(650/card.clientHeight)*0.5;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
          }}
          onMouseEnter={(e) =>{
            const card = document.querySelector(`#idCard2`)
            // const element = document.querySelector(`#idElement1`)
            card.style.transition = 'none'
            // element.style.transition = 'all 0.8s ease'
            // element.style.transform = 'translateZ(10deg)'
          }}
          onMouseLeave={(e) =>{
            const card = document.querySelector(`#idCard2`)
            // const element = document.querySelector(`#idElement1`)
            card.style.transform = `rotateY(0deg) rotateX(0deg)`
            card.style.transition = 'all 0.5s ease'
          }}
        >
          <div className={styles.card} id={'idCard2'}>
            <div className={styles.element} id={'idElement2'}>
              <div className={styles.heading}>
                Реквизиты:
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                Наименование банка: ФИЛИАЛ "ХАБАРОВСКИЙ" АО "АЛЬФА-БАНК"
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                БИК: 040813770
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                К/с: 30101810800000000770
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                Номер счета: 40802810420000004164
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                ИНН: 280115312806
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                ОГРН: 321272400011910
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container}
          onMouseMove={(e) => {
            const card = document.querySelector(`#idCard3`)
            const coord = card.getBoundingClientRect()
            let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 15 *(650/card.clientHeight);
            let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 28 *(650/card.clientHeight)*0.5;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
          }}
          onMouseEnter={(e) =>{
            const card = document.querySelector(`#idCard3`)
            // const element = document.querySelector(`#idElement1`)
            card.style.transition = 'none'
            // element.style.transition = 'all 0.8s ease'
            // element.style.transform = 'translateZ(10deg)'
          }}
          onMouseLeave={(e) =>{
            const card = document.querySelector(`#idCard3`)
            // const element = document.querySelector(`#idElement1`)
            card.style.transform = `rotateY(0deg) rotateX(0deg)`
            card.style.transition = 'all 0.5s ease'
          }}
        >
          <div className={styles.card} id={'idCard3'}>
            <div className={styles.element} id={'idElement3'}>
              <div className={styles.heading}>
                Заказы через сайт принимаются круглосуточно.
              </div>

              <div className={styles.heading}>
                Обработка заказов осуществляется по МСК:
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                Пн-Пт с 17 до 03 ч.
              </div>
              <div className={styles.text} style={{textAlign: 'center'}}>
                Сб-Вс с 18 до 02 ч.
              </div>
            </div>
          </div>
        </div>

      </div>



    </Layout>
  )



}
