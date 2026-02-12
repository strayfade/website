const path = require('path')
const express = require('express')
const app = express()
const port = 3000

const { log, logColors } = require('./log')

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