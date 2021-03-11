import Layout from '../components/layout'
import Head from 'next/head'

export default function Page () {
  return (
    <Layout>
    <Head>
      <meta name = "robots" content = "noindex, nofollow" />
    </Head>
      <h1>API Example</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      <p><em>You must be signed in to see responses.</em></p>
      <h2>Session</h2>
      <p>/api/examples/session</p>
      <iframe src="/api/examples/session"/>
      <h2>JSON Web Token</h2>
      <p>/api/examples/jwt</p>
      <iframe src="/api/examples/jwt"/>
    </Layout>
  )
}
