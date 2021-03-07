import styles from './element3d.module.css'


export default function ExactlyProducts({ data }) {

  return (
    <div className={styles.mainDiv}>
    {data.map((product) => (
      <div className={styles.container}
      onMouseMove={(e) => {
        const card = document.querySelector(`#idCard${product.id}`)
        const coord = card.getBoundingClientRect()
        let xAxis =  (coord.x + (coord.width / 2) - e.clientX) / 20;
        let yAxis =  -1*(coord.y + (coord.height / 2) - e.clientY) / 35;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
      }}
      onMouseEnter={(e) =>{
        const card = document.querySelector(`#idCard${product.id}`)
        const сircle = document.querySelector(`#idCircle${product.id}`)
        const img = document.querySelector(`#idImg${product.id}`)
        const title = document.querySelector(`#idTitle${product.id}`)
        const description = document.querySelector(`#idDescription${product.id}`)
        const volume = document.querySelector(`#idVolume${product.id}`)
        const price = document.querySelector(`#idPrice${product.id}`)
        const button = document.querySelector(`#idButton${product.id}`)
        card.style.transition = 'none'

        сircle.style.transition = 'all 0.5s ease'
        img.style.transition = 'all 0.5s ease'
        title.style.transition = 'all 0.7s ease'
        description.style.transition = 'all 0.9s ease'
        volume.style.transition = 'all 1.1s ease'
        price.style.transition = 'all 1.3s ease'
        button.style.transition = 'all 1.5s ease'

        сircle.style.transform = 'translateZ(30px)'
        img.style.transform = 'translateZ(80px)'
        title.style.transform = 'translateZ(70px)'
        description.style.transform = 'translateZ(60px)'
        volume.style.transform = 'translateZ(60px)'
        price.style.transform = 'translateZ(80px)'
        button.style.transform = 'translateZ(80px)'
      }}
      onMouseLeave={(e) =>{
        const card = document.querySelector(`#idCard${product.id}`)
        const сircle = document.querySelector(`#idCircle${product.id}`)
        const img = document.querySelector(`#idImg${product.id}`)
        const title = document.querySelector(`#idTitle${product.id}`)
        const description = document.querySelector(`#idDescription${product.id}`)
        const volume = document.querySelector(`#idVolume${product.id}`)
        const price = document.querySelector(`#idPrice${product.id}`)
        const button = document.querySelector(`#idButton${product.id}`)
        card.style.transform = `rotateY(0deg) rotateX(0deg)`
        card.style.transition = 'all 0.5s ease'

        сircle.style.transition = 'all 0.4s ease'
        img.style.transition = 'all 0.45s ease'
        title.style.transition = 'all 0.6s ease'
        description.style.transition = 'all 0.75s ease'
        volume.style.transition = 'all 0.9s ease'
        price.style.transition = 'all 1.05s ease'
        button.style.transition = 'all 1.2s ease'

        сircle.style.transform = 'translateZ(0px)'
        img.style.transform = 'translateZ(0px)'
        title.style.transform = 'translateZ(0px)'
        description.style.transform = 'translateZ(0px)'
        volume.style.transform = 'translateZ(0px)'
        price.style.transform = 'translateZ(0px)'
        button.style.transform = 'translateZ(0px)'
      }}
      key={product.id}>
        <div className={styles.card} id={'idCard'+product.id}>
          <div className={styles.element} id={'idElement'+product.id}>
            <div className={styles.circle} id={'idCircle'+product.id}></div>
            <div
              className={styles.imageSrc} id={'idImg'+product.id}
              style={{
              backgroundImage: `url(${product.url})`,
            }}></div>
          </div>
          <div className={styles.info}>
            <h1 className={styles.title} id={'idTitle'+product.id}>{product.title}</h1>
            <h3 className={styles.descriptionItem} id={'idDescription'+product.id}>{product.description}</h3>
            <h3 className={styles.VolumeAndType} id={'idVolume'+product.id}>{product.volume}    {product.typeVolume}</h3>
            <h3 className={styles.ValueItem} id={'idValue'+product.id}>{product.value}</h3>
            <div className={styles.price} id={'idPrice'+product.id}>{product.price} ₽</div>
            <div className={styles.butt} id={'idButton'+product.id}>
                <a onClick={()=>{
                  let localStorStr
                  let localStorJson
                  const localStor = localStorage.getItem('_basket')
                  if (localStor) {
                    localStorJson = JSON.parse(localStor)
                    localStorJson.push({
                      id:`${product.id}`,
                      title:`${product.title}`,
                      description:`${product.description}`,
                      volume:`${product.volume}`,
                      typeVolume:`${product.typeVolume}`,
                      price:`${product.price}`,
                      typePrice:`${product.typePrice}`,
                      url:`${product.url}`
                    })
                    localStorStr = JSON.stringify(localStorJson)
                  }
                  else {
                    localStorJson = []
                    localStorJson.push({
                      id:`${product.id}`,
                      title:`${product.title}`,
                      description:`${product.description}`,
                      volume:`${product.volume}`,
                      typeVolume:`${product.typeVolume}`,
                      price:`${product.price}`,
                      typePrice:`${product.typePrice}`,
                      url:`${product.url}`
                    })
                    localStorStr = JSON.stringify(localStorJson)
                  }

                  localStorage.setItem('_basket', `${localStorStr}`)
                }}>
                    <p><span className={styles.bg}></span><span className={styles.base}></span><span className={styles.text}>В     корзину</span></p>
                </a>
            </div>
          </div>
        </div>

      </div>
    ))}
    </div>

  )
}
