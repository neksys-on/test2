import styles from './instagramIcon.module.scss'
import Link from 'next/link'




export default function YandexMetrica() {
  const randWave = [
    {color:'#a4c639', alignItems: 'flex-start', justifyContent: 'flex-start'},
    {color:'#b5c327', alignItems: 'flex-start', justifyContent: 'center'},
    {color:'#f9e498', alignItems: 'flex-start', justifyContent: 'flex-end'},
    {color:'#52057f', alignItems: 'center', justifyContent: 'flex-start'},
    {color:'#b1d4e5', alignItems: 'center', justifyContent: 'center'},
    {color:'#ed7902', alignItems: 'center', justifyContent: 'flex-end'},
    {color:'#2baf2b', alignItems: 'flex-end', justifyContent: 'flex-start'},
    {color:'#fff200', alignItems: 'flex-end', justifyContent: 'center'},
    {color:'#00aeef', alignItems: 'flex-end', justifyContent: 'flex-end'}
  ]

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container} onMouseEnter={(e)=>{
          const smeshenie = document.querySelector(`#id_Smeshenie`)
          const wave = document.querySelector(`#id_Wave`)
          const randCol = Math.floor(Math.random() * 9)
          const rand = Math.floor(Math.random() * 9)
          wave.style.width = '60px'
          wave.style.height = '60px'
          console.log(randCol)
          wave.style.backgroundColor = randWave[randCol].color
          smeshenie.style.alignItems = randWave[rand].alignItems
          smeshenie.style.justifyContent = randWave[rand].justifyContent

          setTimeout(function(){
            wave.style.width = '0px'
            wave.style.height = '0px'
          }, 500);
        }}>
          <div className={styles.sloy}>
            <Link href="https://www.instagram.com/bestjap_2021/"><a className={styles.element}></a></Link>
            <div id={'id_Smeshenie'}className={styles.smeshenie}>
              <div id={'id_Wave'} className={styles.wave}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
