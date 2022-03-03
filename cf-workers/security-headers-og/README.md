# Cloudflare Worker

This worker is used to add `security headers` and `Open Graph html meta tags` to the response.

## Cloudflare Worker Wrangler Docs

Full Documentation for the Cloudflare Worker Wrangler can be found at [Wrangler Docs][wrangler-docs]

[wrangler-docs]: https://developers.cloudflare.com/workers/ 'Wrangler Docs'

## Installing the Workers CLI

```shell
npm install -g @cloudflare/wrangler
```

## Configure the Workers CLI

Login to the Cloudflare account:

```shell
wrangler login
```

Test the login with the following command:

```shell
wrangler whoami
```

## Configure wrangler toml file

Example:

```shell
name = "security-headers"
type = "javascript"

workers_dev = true
route = "*3os.org/*"
account_id = "$AccountID"
zone_id = "$ZoneID"
compatibility_date = "2022-03-03"
```

## Run the Worker in the Cloudflare Workers CLI locally

The js script is located in the `workers` directory as index.js.

```shell
wrangler dev
```

## Deploy the Worker to production in the Cloudflare Workers CLI

```shell
wrangler publish
```

## License

**MIT License**

Copyright &copy; 2022 Stas Yakobov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
