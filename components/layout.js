import Header from '../components/header'
import Footer from '../components/footer'
import styles from './layout.module.css'
import { useState, useEffect } from 'react'
import path from 'path'



export default function Layout ({children, propsBasket}) {

  const [state, setState] = useState([])
  const [show, setShow] = useState('2')
  const [wid, setWid] = useState(0)

    useEffect(()=>{
      function deletVision() {
          if (state.length>0) {
          let firstDate  = state[0].time
          let t1 =  Number(firstDate[3])*600+Number(firstDate[4])*60+Number(firstDate[6])*10+Number(firstDate[7])
          let secondDate  = time()
          let t2 = Number(secondDate[3])*600+Number(secondDate[4])*60+Number(secondDate[6])*10+Number(secondDate[7])
          if ((secondDate-firstDate) > 3000) {

            let copy = state
            state.shift()

            even(state.length)
          }

        }
      }
      setInterval(deletVision, 100)

      if ((typeof window !== 'undefined')&(wid === 0)) {
        setWid(document.documentElement.clientWidth)
      }

    })

  const even = n => {
    if (!(n % 2)) {
      setShow('2')
    }
    else {
      setShow('1')
    }
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function OpenVision() {

    return (
      <svg width="0" height="0">
        <defs>
          <clipPath id="myClip" >
            {state.map((item)=>(
              <circle key={state.length+item.x+item.y+item.time+item.radius+item.rand} cx={item.x} cy={item.y} r={item.radius}/>
              // <polygon points={`${item.x-10} ${item.y-40},${item.x+10} ${item.y-40},${item.x+40} ${item.y-10},${item.x+40} ${item.y+10},${item.x+10} ${item.y+40},${item.x-10} ${item.y+40},${item.x-40} ${item.y+10},${item.x-40} ${item.y-10},`}></polygon>
            ))}
          </clipPath>
        </defs>
      </svg>
    )
  }

  function  time() {
    const t = new Date()
    return (+t)
  }

  function sleep(millis) {
      var t = (new Date()).getTime();
      var i = 0;
      while (((new Date()).getTime() - t) < millis) {
          i++;
      }
  }


  function  _onMouseMove(e) {

    let newitem = {x: e.clientX+5, y: e.clientY+50, time: + new Date(), radius: state.length/3+100, rand: getRandomInt(10000000)}
    state.push(newitem)
    if (state.length > 200) {
      state.shift()
      state.shift()
    }
    even(state.length)

  }


if (show === '1') {
  return (
    <div className={styles.layout}>
      <Header propsBasket={propsBasket}/>
      <div className={styles.content} onMouseMove={_onMouseMove}>
        <main>
          {children}
        </main>
      </div>
      <div onMouseMove={_onMouseMove}>

        <div className={styles.div_wrapper}>
          <div className={styles.div_video}>
            {wid>767 && <>
              <video id={'idVideoFon'} autoPlay src={'./Fon_video2.mp4'} loop muted>

              </video>
              <style jsx>{`
                video {
                  clip-path: url(#myClip);
                }
              `}</style>
            </>}
            <div className={styles.div_fon}></div>
          </div>
          <OpenVision/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

if (show === '2') {
  return (
    <div className={styles.layout}>
      <Header propsBasket={propsBasket}/>
      <div className={styles.content} onMouseMove={_onMouseMove}>
        <main>
          {children}
        </main>
      </div>
      <div onMouseMove={_onMouseMove}>

        <div className={styles.div_wrapper}>
          <div className={styles.div_video}>
            {wid>767 && <>
              <video id={'idVideoFon'} autoPlay src={'./Fon_video2.mp4'} loop muted>

              </video>
              <style jsx>{`
                video {
                  clip-path: url(#myClip);
                }
              `}</style>
            </>}
            <div className={styles.div_fon}></div>
          </div>
          <OpenVision/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}


}
