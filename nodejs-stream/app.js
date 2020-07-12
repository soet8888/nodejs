const express = require('express');
const fs = require('fs')
const app = express()
app.get('/', (req, res) => {
    res.send("Welcome from nodejs stream tutorial..")
    res.end()
})
app.get('/movie', (req, res) => {
    const path = '/home/soet/Videos/jumanji.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    res.writeHead(200, { 'Content-length': fileSize, 'Content-Type': 'video/mp4' })
    fs.createReadStream(path).pipe(res)
})
app.get('/stream', function (req, res) {
    const path = '/home/soet/Videos/jumanji.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        const chunksize = (end - start) + 1
        const file = fs.createReadStream(path, { start, end })
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head)
        file.pipe(res)
    } else {
        console.log('steam debug1.1')
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
    }
})
app.listen(3000, () => console.log('Sever listening at 3000...'))