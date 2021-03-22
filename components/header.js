import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from './header.module.scss'
import BasketMy from './basket/basketMy.js';






// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header ({propsBasket}) {
  const [ session, loading ] = useSession()

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.mainDiv}>
        <div className={styles.div_container}>
          <div className={styles.mainLogo}/>
          <nav>
            <div className={styles.div_nav_container}>
              <ul className={styles.navItems} id='navItemId'>
                <li className={styles.navItem}><Link href="/"><a>Главная</a></Link></li>
                <li className={styles.navItem} onClick={(e)=>{
                  localStorage.setItem('_filter', 'Товары со скидкой')
                  localStorage.setItem('_filterId', '_1')
                }}><Link href="/catalog"><a>Акции</a></Link></li>
                <li className={styles.navItem}><Link href="/catalog"><a>Каталог</a></Link></li>
                <li className={styles.navItem}><Link href="/ShippingAndPayment"><a>Доставка и оплата</a></Link></li>
                <li className={styles.navItem}><Link href="/privateOffice"><a>Кабинет</a></Link></li>

              </ul>
              <div className={styles.burger} id='burgerId'
                onClick={(e) => {
                  const burger = document.querySelector(`#burgerId`)
                  const nav = document.querySelector(`#navItemId`)
                  const navLinks = document.querySelectorAll(`#navItemId li`)

                  nav.classList.toggle(`${styles.navActive}`)
                  navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                      link.style.animation = ''
                    } else {
                      link.style.animation = `${styles.navLinkFade} 0.5s ease forwards ${index/16+0.2}s`
                    }
                  })

                  burger.classList.toggle(`${styles.toggle}`)
                }}
              >
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
                <div className={styles.line3}></div>
              </div>
            </div>
          </nav>
          <BasketMy propsBasket={propsBasket}/>
          <div className={styles.group1}>


            <div className={styles.signedInStatus}>
              <p className={`nojs-show ${(!session && loading) ? styles.loading : styles.loaded}`}>
                {!session && <>

                  <a
                      href={`/api/auth/signin`}
                      className={styles.buttonPrimary}
                      onClick={(e) => {
                        e.preventDefault()
                        signIn()
                      }}
                    >
                      Авторизация
                    </a>
                </>}
                {session && <>
                  <span style={{backgroundImage: `url(${session.user.image})` }} className={styles.avatar}/>

                    <a
                      href={`/api/auth/signout`}
                      className={styles.button}
                      onClick={(e) => {
                        e.preventDefault()
                        signOut()
                      }}
                    >
                      Выход
                    </a>
                </>}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.div_hr}>
      </div>

    </header>
  )
}


//
// <ul className={styles.navItems}>
//   <Button1>Главная</Button1>
//   <Button2>Акции</Button2>
//   <Button3>Каталог</Button3>
//   <Button4>Отзывы</Button4>
//   <Button5>Доставка и оплата</Button5>
//   <Button6>Корзина</Button6>
// </ul>
