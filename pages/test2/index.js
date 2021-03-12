import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'

const fs2 = require('fs');



export async function getServerSideProps(context) {

  const postsDirectory = path.join(process.cwd(), 'pages/api/dataBase')

  const filePath = path.join(postsDirectory, 'dan.json')
  const filePath2 = path.join(postsDirectory, 'dan2.json')
  let resWeb
  let namberFile
  try {
    resWeb = await JSON.parse(fs2.readFileSync(filePath2))
    namberFile = 2
  } catch(e) {
    resWeb = await JSON.parse(fs2.readFileSync(filePath))
    namberFile = 1
  }


  // let resWeb = await JSON.parse(fs2.readFileSync(filePath))
  // let resWeb2 = await JSON.parse(fs2.readFileSync(filePath2))
  console.log(resWeb)

  return {
    props: {
      data_version: resWeb.version,
      namberFile
    }, // will be passed to the page component as props
  }
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

export default function Page ({data_version, namberFile}) {


  const onClickDeal = React.useCallback((e) => {

    deal(data_version+1)
  }, []);

  return (
    <Layout>
    <Head>
      <meta name = "robots" content = "noindex, nofollow" />
    </Head>

        <div className={styles.div_test}>
          {data_version} || Фаил # {namberFile}
        </div>
        <div onClick={onClickDeal}>Изменить</div>

    </Layout>
  )



}
