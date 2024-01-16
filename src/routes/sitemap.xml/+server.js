import axios from 'axios'
//TODO add news posts
// export const prerender = true;
const website = 'https://thinkteacher.co.za'

export async function GET() {
  const resPartners = await axios.get('https://tt-strapi.glass.thinkteacher.co.za/api/partners')
  const partners = resPartners.data.data
  const resBenefits = await axios.get('https://tt-strapi.glass.thinkteacher.co.za/api/categories')
  const benefits = resBenefits.data.data
  const pages = [`about`, `benefits`, `partners`, `webinars`, `contact-us`, `login`, `register`]
  const body = sitemap(partners, benefits, pages)

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }
  
  return new Response(body, {
    headers: headers
  });
//   return {
//     headers,
//     body,
//   }
}

const sitemap = (
  partners,
  benefits,
  pages
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${website}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${pages
    .map(
      page => `
  <url>
    <loc>${website}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  `
    )
    .join('')}
  ${partners
    .map(partner => `
  <url>
    <loc>${website}/partners/${partner.attributes.slug}</loc>
    <lastmod>${partner.attributes.updatedAt}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
  ${benefits
    .map(benefit => `
  <url>
    <loc>${website}/benefits/${benefit.attributes.name}</loc>
    <lastmod>${benefit.attributes.updatedAt}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  `
    ).join('')}
</urlset>`