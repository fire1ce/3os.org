// @ts-check

const securityHeaders = {
    'Content-Security-Policy': 'upgrade-insecure-requests',
    'Strict-Transport-Security': 'max-age=31556952',
    'X-Xss-Protection': '1; mode=block',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'geolocation=(), microphone=(), camera=(), payment=()',
  },
  sanitiseHeaders = {
    Server: '',
  },
  removeHeaders = ['Public-Key-Pins', 'X-Powered-By', 'X-AspNet-Version']

async function addHeaders(req) {
  // get the response from the backend
  const response = await fetch(req) // create Header object from the backend response

  const newHeaders = new Headers(response.headers) // combine security headers with the backend response headers

  const setHeaders = Object.assign({}, securityHeaders, sanitiseHeaders)

  if (
    newHeaders.has('Content-Type') &&
    !newHeaders.get('Content-Type').includes('text/html')
  ) {
    // exit the worker
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    })
  }
  let html = await response.text() // get the html from the response
  const title = html.match(/<title>([^<]*)<\/title>/)
  const description = html.match(/<meta name="description" content="([^<]*)">/) // if file is HTML, then set the headers
  if (title) {
    html = html.replace(
      title[0],
      `<title>${title[1]}</title>
<meta name="og:title" content="${title[1]}"/>
<meta name="twitter:title" content="${title[1]}"/>
<meta property="og:title" content="${title[1]}"/>
<meta property="og:type" content="website">
<meta property="og:url" content="${req.url}">
<meta property="og:image" content="https://3os.org/3os-preview.png">
<meta property="twitter:title" content="${title[1]}">
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${req.url}">
<meta property="twitter:image" content="https://3os.org/3os-preview.png">`,
    )
  }

  if (description) {
    html = html.replace(
      description[0],
      `<meta name="description" content="${description[1]}" />
<meta property="og:description" content="${description[1]}">
<meta property="twitter:description" content="${description[1]}">`,
    )
  } // loop over COMBINED headers, magic????

  Object.keys(setHeaders).forEach(name => {
    newHeaders.set(name, setHeaders[name])
  })

  removeHeaders.forEach(name => {
    newHeaders.delete(name)
  })

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  })
}

addEventListener('fetch', event => {
  event.respondWith(addHeaders(event.request))
})
