

export default function YandexMetrica() {
  return (
    <>
      <script type="text/javascript" >{`
         (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
         m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
         (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

         ym(78632355, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
         });`}
      </script>
      <div><img src="https://mc.yandex.ru/watch/78632355" style={{position: 'absolute', left:'-1px'}} alt=""></img></div>
    </>
  )
}
