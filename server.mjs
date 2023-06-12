const http = await import('node:http')
const fs = await import('node:fs/promises')

const port = 3000

const html = await fs.readFile('assets/index.html')
const css = await fs.readFile('assets/style.css')
const mjs = await fs.readFile('assets/index.mjs')

const mimeTypes = {
  'html': 'text/html',
  'mjs': 'text/javascript',
  'css': 'text/css',
}

const server = http.createServer((request, response) => {

  let contentType
  let contentBody

  switch (request.url) {

    case '/':
      contentType = 'text/html'
      contentBody = html
      break

    case '/style.css':
      contentType = 'text/css'
      contentBody = css
      break

    case '/index.mjs':
      contentType = 'text/javascript'
      contentBody = mjs
      break

    default:
      contentType = 'text/plain'
      contentBody = 'Error 404: Page Not Found'
  }

  response.statusCode = 200
  response.setHeader('Content-Type', contentType)
  response.end(contentBody)
})

server.on('error', () => {
  console.error('some server error!')
})

server.listen(port, () => console.log(`server listen on port ${port}`))
