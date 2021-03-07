import styles from './elementM.module.css'


let products = [
  {
    url: '/HairСare.jpg',
    title: 'Красная краска ККК',
    description: 'Красная краска для ваших волос',
    volume: '50',
    typeVolume: 'мл',
    price: '1000',
    typePrice: 'рубли',
    width: '32%',
    id: '1',
  },
  {
    url: '/HairDye2.jpg',
    title: 'Розовая краска ККК',
    description: 'Розовая краска для ваших волос',
    volume: '150',
    typeVolume: 'мл',
    price: '3000',
    typePrice: 'рубли',
    width: '32%',
    id: '2',
  },
  {
    url: '/cosmetics.jpg',
    title: 'Бальзам для волос WWW',
    description: 'Бальзам для ухода за волосами',
    volume: '510',
    typeVolume: 'мл',
    price: '1500',
    typePrice: 'рубли',
    width: '32%',
    id: '3',
  },
]


export default function ExactlyProducts() {
  return (
    <div className={styles.mainDiv}>
    {products.map((product) => (
      <div className={styles.elementDiv} key={product.id}>
        <div
          className={styles.imageSrc}
          style={{
          backgroundImage: `url(${product.url})`,
        }}>
        </div>
        <div className={styles.titleItem}>{product.title}</div>
        <div className={styles.descriptionItem}>{product.description}</div>
        <div className={styles.VolumeAndType}>{product.volume}    {product.typeVolume}</div>
        <div className={styles.price}>{product.price} ₽</div>
        <div className={styles.butt}>
            <a href="#">
                <p><span className={styles.bg}></span><span className={styles.base}></span><span className={styles.text}>В   корзину</span></p>
            </a>
        </div>
      </div>
    ))}
    </div>

  )
}

// Моя кнопка
// <div className={styles.divAddToCartButton}><button type='button' className={styles.addToCartButton}>В корзину</button></div>
