import Link from 'next/link'
import styles from './catalogElements.module.css'


export default function CategoryCatalog({ data }) {
  return (
    <div className={styles.mainDiv}>
      {data.map((image) => (
        <Link key={image.id} href={`/catalogOld1/title`} passHref>
          <div className={styles.imgDiv} style={{backgroundImage: `url(${image.url})`, width: `${image.width}`}}>
            <div className={styles.blackoutDiv}>
              <div className={styles.container}>
                <div className={styles.title}>{image.title}</div>
                <div className={styles.outline}></div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
