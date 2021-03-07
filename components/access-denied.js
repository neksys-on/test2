import { signIn } from 'next-auth/client'
import Layout from '../components/layout'

export default function AccessDenied () {
  return (
    <>
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px'
      }}>
        <h2>Что бы получить доступ, необходимо пройти <p>
          <a href="/api/auth/signin"
             onClick={(e) => {
             e.preventDefault()
             signIn()
          }}>Авторизацию</a>
        </p></h2>

      </div>
    </>
  )
}
