const db = require('./mogo')

const collectionName = 'mydocuments'
db.find(collectionName, { a: 1 }, (err, result) => {
    if (err) {
        console.log(`error:${err.message}`)
    }
    result.forEach(val => {
        console.log(`result : ${JSON.stringify(val)}`)
    });
    db.close()
})
