import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'


export default function Page () {



  return (
    <Layout>


        <div className={styles.div_test}>
          <video id={'idVideoFon'} autoPlay src={'./Fon_video2.mp4'} loop muted></video>
        </div>

    </Layout>
  )



}
