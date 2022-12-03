const DEFAULT_SECURITY_HEADERS = {
  'Content-Security-Policy': 'upgrade-insecure-requests',
  'Strict-Transport-Security': 'max-age=31556952',
  'X-Xss-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
}

const BLOCKED_HEADERS = ['Public-Key-Pins', 'X-Powered-By', 'X-AspNet-Version']
addEventListener('fetch', event => {
  event.respondWith(addHeaders(event.request))
})
async function addHeaders(req) {
  let response = await fetch(req)
  let newHeaders = new Headers(response.headers)

  const tlsVersion = req.cf.tlsVersion
  // This sets the headers for HTML responses:
  if (
    newHeaders.has('Content-Type') &&
    !newHeaders.get('Content-Type').includes('text/html')
  ) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    })
  }

  Object.keys(DEFAULT_SECURITY_HEADERS).map(function(name) {
    newHeaders.set(name, DEFAULT_SECURITY_HEADERS[name])
  })

  BLOCKED_HEADERS.forEach(function(name) {
    newHeaders.delete(name)
  })

  if (tlsVersion !== 'TLSv1.2' && tlsVersion !== 'TLSv1.3') {
    return new Response('You need to use TLS version 1.2 or higher.', {
      status: 400,
    })
  } else {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    })
  }
}

addEventListener('fetch', event => {
  event.respondWith(addHeaders(event.request))
})
