import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'
// import bcrypt from 'bcrypt'


export default function Page () {

  // const hashing = async () => {
  //   const hash = await bcrypt.hash(155, 3);
  //   console.log(hash)
  // }

  return (
    <Layout>
    <Head>
      <meta name = "robots" content = "noindex, nofollow" />
    </Head>

        <div className={styles.div_test}>
          <video id={'idVideoFon'} autoPlay src={'./Fon_video2.mp4'} loop muted></video>
        </div>

    </Layout>
  )



}
