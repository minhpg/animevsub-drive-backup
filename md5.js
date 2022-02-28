 const md5 = require('./src/functions/files/md5')
 const changeChecksum = require('./src/functions/files/changeChecksum');

(async () => {
    filename = 'test.stl'
    await md5(filename)
    await changeChecksum(filename)
    await md5(filename)
    await changeChecksum(filename)
    await md5(filename)
})()

