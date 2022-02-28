const upload = require('./upload')
const download = require('./download')
const changeChecksum = require('./changeChecksum')
module.exports = async (drive, fileId, parent_folder) => {
    console.log(`copying ${fileId} to ${parent_folder}`)
    const time = Date.now()

    const file = await download(drive, fileId)
    const name = `${fileId}-${time}`
    
    await changeChecksum(file)
    const copyMP4 = upload(drive, fileId, parent_folder, file, name + '.mp4')

    await changeChecksum(file)
    const copyTxt = upload(drive, fileId, parent_folder, file, name + '.txt')

    const responses = await Promise.all([copyMP4, copyTxt])

    return {
        mp4: responses[0],
        txt: responses[1]
    }
  }