import { SitemapStream, streamToPromise } from 'sitemap';
import products from '../../dataBase/products.json'

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 6000000,
    });


    // List of posts

    const productsMas = products.products

    const links = [
      { url: `/catalog`, changefreq: 'daily', priority: 0.9 },
      { url: `/`, changefreq: 'daily', priority: 0.6 },
      { url: `/ShippingAndPayment`, changefreq: 'daily', priority: 0.5 },
      { url: `/contacts`, changefreq: 'daily', priority: 0.4 },
      { url: `/privacyPolicy`, changefreq: 'daily', priority: 0.3 },
    ];


    links.forEach(link => {
      smStream.write(link);
    });
    // Create each URL row
    productsMas.forEach(prod => {
      smStream.write({
        url: `/catalog/${prod.id}`,
        changefreq: 'daily',
        priority: 0.8
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }

}
