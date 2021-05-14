import Link from 'next/link'
import styles from './footer.module.scss'
import { version } from '../package.json'

export default function Footer () {
  return (
    <footer className={styles.footer} itemScope itemType="http://schema.org/Organization">
      <div className={styles.pre_info}>О поступлении отсутствующих позиций узнавать по телефону <a href="tel:+79147730000" itemProp="telephone">+7 (914) 773-00-00</a></div>
      <hr style={{}}/>
      <div className={styles.wrapper}>
        <div>
          <ul className={styles.navItems}>
            <li className={styles.navItem}><Link href="/contacts"><a>Контакты</a></Link></li>
            <li className={styles.navItem} itemProp="unnamedSourcesPolicy"><Link href="/privacyPolicy"><a>Политика конфиденциальности</a></Link></li>
          </ul>
        </div>
        <div className={styles.wrapper__containerNameShop}>
          <div>
            <div className={styles.infoShop} itemProp="name">Магазин товаров из японии bestjap.ru</div>
          </div>
          <div>
            <div className={styles.infoShop}><a href="tel:+79147730000" itemProp="telephone">+7 (914) 773-00-00</a>, <a href="tel:+79144061391" itemProp="telephone">+7 (914) 406-13-91</a></div>
          </div>
          <div>

          </div>
          <div></div>
        </div>
        <div>
          <div className={styles.wrapper__copyright} itemProp="alternateName">Copyright ©2021 bestjap.ru — Магазин товаров из японии. Все права защищены. Доставка по всей России.</div>
        </div>
      </div>
    </footer>
  )
}
