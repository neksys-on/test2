import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'





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

  const response = await fetch('/api/test', {
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

export default function Page () {


  const onClickDeal = React.useCallback((e) => {

    deal(data_version+1)
  }, []);

  return (
    <Layout>
    <Head>
      <meta name = "robots" content = "noindex, nofollow" />
    </Head>

        <div className={styles.div_test}>

        </div>
        <div onClick={onClickDeal}>Изменить</div>

    </Layout>
  )



}
