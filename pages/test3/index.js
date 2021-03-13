import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'





export async function getServerSideProps(context) {

  let data
  let namberFile = 0
  const directory = path.join(process.cwd(), 'db')
  const filePath = path.join(directory, 'testing.db')
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database(filePath);

  db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 2; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });

  });

  db.close();

  return {
    props: {
      data_version: '1',
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
        sss
        </div>
        <div onClick={onClickDeal}>Изменить</div>

    </Layout>
  )



}
