const path = require('path')
const express = require('express')
const app = express()
const port = 3000

const { log, logColors } = require('./log')
const https = require('https');
const sendDiscordWebhook = async (content, webhookUrl = atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQ5MTI3MjUxNDY0OTg1NDAyMi9RS2hqLVowZG1fRzYtUlYyci1hRkUtTGJMVjFLUTlzazZqeWVFdktiY2wtRW1QMWZvSUJ3NzFwRHR1UnZIb3Q2ZTFoQw==')) => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.stringify({ content });

      const url = new URL(webhookUrl);
      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve();
          } else {
            reject(
              new Error(
                `Discord webhook request failed: ${res.statusCode} ${res.statusMessage} - ${responseData}`
              )
            );
          }
        });
      });

      req.on('error', (err) => reject(err));
      req.write(data);
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

app.get('/escaperoom', async (Request, Response) => {
  let ip = Request.headers['x-forwarded-for'] || Request.socket.remoteAddress.replace("::ffff:", "");
  await sendDiscordWebhook(`i presaved escape room and all i got was this lousy discord message\nsent by ${ip}`)
  Response.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <script>
            setTimeout(() => location.href = "https://distrokid.com/hyperfollow/strayfade/escape-room", 1000);
            </script>
        </body>
        </html>
    `)
})
app.get(`/teapot`, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `articles/teapot.html`))
})
app.get(`/sf2040`, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `articles/sf2040.html`))
})
app.get(`/sf46`, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `articles/sf46.html`))
})
app.get(`/typing`, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `articles/typing.html`))
})
app.get(`/wpa`, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, `articles/wpa.html`))
})

app.get('/favicon.ico', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/icons/favicon.ico"))
})
app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public/index.html"))
})
app.get('/:page', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "articles/404.html"))
})

app.listen(port, () => {
  log(`Website listening on port ${port}`)
  log(`URL: http://127.0.0.1:${port}/`)
})