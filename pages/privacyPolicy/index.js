import Layout from '../../components/layout.js'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import styles from './index.module.scss'
import Head from 'next/head'


export default function Page () {
  const [wid, setWid] = useState(0)

  let [sumItem, setSumItem] = useState('0')
  useEffect(()=>{
    const localStor = localStorage.getItem('_basket')
    if (localStor) {
    const  localStorJson = JSON.parse(localStor)
      setSumItem(localStorJson.length)
    }
    else {
      setSumItem('0')
    }
    if ((typeof window !== 'undefined')&(wid === 0)) {
      setWid(document.documentElement.clientWidth)
    }

  })

  return(
    <Layout propsBasket={sumItem}>
    <Head>
      <title>Политика конфиденциальности</title>
      <meta name = "robots" content = "noindex, follow" />
    </Head>
      <div style={{
        width: '90%',
        margin: 'auto',
        padding: '30px 0px 30px 0px'
      }}>
        <h1>Политика конфиденциальности</h1>
        <div className={styles.div_main}>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.text} style={{ textAlign: 'center'}}>
                 Настоящая  Политика  конфиденциальности  персональных  данных  (далее - Политика   конфиденциальности)   действует  в  отношении  всей  информации, размещенной на сайте в сети Интернет по адресу: bestjap.ru (далее – Сайт). Использование сервисов Сайта означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации; в случае несогласия с этими условиями Пользователь должен воздержаться от использования сервисов.
              </div>

              <div className={styles.heading}>
                1. ОБЩИЕ ПОЛОЖЕНИЯ
              </div>
              <div className={styles.text}>
                1.1. В рамках настоящей Политики под персональной информацией Пользователя понимаются персональная информация, которую Пользователь предоставляет о себе самостоятельно при регистрации (создании учетной записи) или в процессе использования Сервисов, включая персональные данные Пользователя.
              </div>
              <div className={styles.text}>
                1.2. Настоящая Политика конфиденциальности применяется только к сайту bestjap.ru. Сайт bestjap.ru не контролирует и не несет ответственности за сайты третьих лиц, на которые Пользователь может перейти по ссылкам, доступным на сайте bestjap.ru.
              </div>

              <div className={styles.heading}>
                2. ЦЕЛИ ОБРАБОТКИ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЕЙ
              </div>
              <div className={styles.text}>
                2.1. Сайт собирает и хранит только ту персональную информацию, которая необходима для предоставления сервисов или исполнения договоров с Пользователем.
              </div>
              <div className={styles.text}>
                2.2. Персональную информацию Пользователя Сайт обрабатывает в следующих целях:
              </div>
              <div className={styles.text}>
                2.2.1. Предоставления Пользователю доступа к персонализированным ресурсам Сайта.
              </div>
              <div className={styles.text}>
                2.2.2. Установления с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования Сайта, оказания услуг, обработку запросов и заявок от Пользователя.
              </div>
              <div className={styles.text}>
                2.2.3. Создания учетной записи для использования сервисов Сайта, если Пользователь дал согласие на создание учетной записи.
              </div>
              <div className={styles.text}>
                2.2.4. Предоставления Пользователю эффективной клиентской и технической поддержки.
              </div>
              <div className={styles.text}>
                2.2.5. Осуществления рекламной деятельности с согласия Пользователя.
              </div>

              <div className={styles.heading}>
                3. УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЕЙ И ЕЕ ПЕРЕДАЧИ ТРЕТЬИМ ЛИЦАМ
              </div>
              <div className={styles.text}>
                3.1. Сайт хранит персональную информацию Пользователей в соответствии с внутренними регламентами конкретных сервисов.
              </div>
              <div className={styles.text}>
                 3.2. В отношении персональной информации Пользователя сохраняется ее конфиденциальность, кроме случаев добровольного предоставления Пользователем информации о себе для общего доступа неограниченному кругу лиц. При использовании отдельных сервисов Пользователь соглашается с тем, что определенная часть его персональной информации становится общедоступной.
              </div>
              <div className={styles.text}>
                3.3. Сайт вправе передать персональную информацию Пользователя третьим лицам в следующих случаях:
              </div>
              <div className={styles.text}>
                3.3.1. Пользователь выразил согласие на такие действия.
              </div>
              <div className={styles.text}>
                3.3.2. Передача необходима для использования Пользователем определенного сервиса либо для исполнения определенного договора с Пользователем.
              </div>
              <div className={styles.text}>
                 3.3.3. Передача предусмотрена российским или иным применимым законодательством в рамках установленной законодательством процедуры.
              </div>
              <div className={styles.text}>
                3.4. Обработка персональных данных Пользователя осуществляется без ограничения срока любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств. Обработка персональных данных Пользователей осуществляется в соответствии с Федеральным законом Российской Федерации от 27.07.2006 г. № 152-ФЗ «О персональных данных».
              </div>
              <div className={styles.text}>
                 3.5. Администрация Сайта принимает необходимые организационные и технические меры для защиты персональной информации Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
              </div>

              <div className={styles.heading}>
                4. ОБЯЗАТЕЛЬСТВА СТОРОН
              </div>
              <div className={styles.text}>
                4.1. Пользователь обязан:
              </div>
              <div className={styles.text}>
                4.1.1. Предоставить информацию о персональных данных, необходимую для пользования Сайтом.
              </div>
              <div className={styles.text}>
                4.1.2. Обновлять, дополнять предоставленную информацию о персональных данных в случае изменения данной информации.
              </div>
              <div className={styles.text}>
                4.2. Администрация Сайта обязана:
              </div>
              <div className={styles.text}>
                4.2.1. Использовать полученную информацию исключительно для целей, указанных в настоящей Политике конфиденциальности.
              </div>
              <div className={styles.text}>
                4.2.2. Обеспечить хранение конфиденциальной информации в тайне, не разглашать без предварительного письменного разрешения Пользователя, а также не осуществлять продажу, обмен, опубликование либо разглашение иными возможными способами переданных персональных данных Пользователя, за исключением предусмотренных настоящей Политикой конфиденциальности.
              </div>
              <div className={styles.text}>
                4.2.3. Принимать меры предосторожности для защиты конфиденциальности персональных данных Пользователя согласно порядку, обычно используемому для защиты такого рода информации в существующем деловом обороте.
              </div>
              <div className={styles.text}>
                4.2.4. Осуществить блокирование персональных данных, относящихся к соответствующему Пользователю, с момента обращения или запроса Пользователя или его законного представителя либо уполномоченного органа по защите прав субъектов персональных данных на период проверки в случае выявления недостоверных персональных данных или неправомерных действий.
              </div>

              <div className={styles.heading}>
                5. ОТВЕТСТВЕННОСТЬ СТОРОН
              </div>
              <div className={styles.text}>
                5.1. Администрация Сайта, не исполнившая свои обязательства, несет ответственность за убытки, понесенные Пользователем в связи с неправомерным использованием персональных данных, в соответствии с законодательством Российской Федерации.
              </div>
              <div className={styles.text}>
                5.2. В случае утраты или разглашения конфиденциальной информации Администрация Сайта не несет ответственности, если данная конфиденциальная информация:
              </div>
              <div className={styles.text}>
                5.2.1. Стала публичным достоянием до ее утраты или разглашения.
              </div>
              <div className={styles.text}>
                5.2.2. Была получена от третьей стороны до момента ее получения Администрацией Сайта.
              </div>
              <div className={styles.text}>
                5.2.3. Была разглашена с согласия Пользователя.
              </div>

              <div className={styles.heading}>
                6. РАЗРЕШЕНИЕ СПОРОВ
              </div>
              <div className={styles.text}>
                6.1. До обращения в суд с иском по спорам, возникающим из отношений между Пользователем Сайта и Администрацией Сайта, обязательным является предъявление претензии (письменного предложения о добровольном урегулировании спора).
              </div>
              <div className={styles.text}>
                 6.2. Получатель претензии в течение 14 календарных дней со дня получения претензии письменно уведомляет заявителя претензии о результатах рассмотрения претензии.
              </div>
              <div className={styles.text}>
                6.3. При недостижении соглашения спор может быть передан на рассмотрение в суд в соответствии с действующим законодательством Российской Федерации.
              </div>
              <div className={styles.text}>
                6.4. К настоящей Политике конфиденциальности и отношениям между Пользователем и Администрацией Сайта применяется действующее законодательство Российской Федерации.
              </div>

              <div className={styles.heading}>
                7. ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ
              </div>
              <div className={styles.text}>
                7.1. Администрация Сайта вправе вносить изменения в настоящую Политику конфиденциальности без согласия Пользователя.
              </div>
              <div className={styles.text}>
                7.2. Новая Политика конфиденциальности вступает в силу с момента ее размещения на Сайте, если иное не предусмотрено новой редакцией Политики конфиденциальности.
              </div>
              <div className={styles.text}>
                7.3. Все предложения или вопросы по настоящей Политике конфиденциальности следует сообщать по тел. +7 (914) 773-00-00.
              </div>
              <div className={styles.text}>
                7.4. Настоящая Политика конфиденциальности размещена на Сайте.
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
