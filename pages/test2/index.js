import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'

const fs2 = require('fs');



export async function getServerSideProps(context) {

  const postsDirectory = path.join(process.cwd(), 'pages/api/dataBase')

  const filePath = path.join(postsDirectory, 'dan.json')
  let resWeb = await JSON.parse(fs2.readFileSync(filePath))

  return {
    props: {
      data_version: resWeb.version
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

export default function Page ({data_version}) {


  const onClickDeal = React.useCallback((e) => {

    deal(data_version+1)
  }, []);

  return (
    <Layout>
    <Head>
      <meta name = "robots" content = "noindex, nofollow" />
    </Head>

        <div className={styles.div_test}>
          {data_version}
        </div>
        <div onClick={onClickDeal}>Изменить</div>

    </Layout>
  )



}
