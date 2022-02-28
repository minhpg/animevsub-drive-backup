const upload = require('./upload')
const download = require('../../google-drive-api/download')
const changeChecksum = require('./changeChecksum')
const uuid = require('uuid')
const fs = require('fs')
module.exports = async (drive, fileId, parent_folder) => {
    const filename = uuid.v4()

    try {
        console.log(`copying ${fileId} to ${parent_folder}`)
        const time = Date.now()
    
        const file = await download(drive, fileId, filename)
        const name = `${fileId}-${time}`
        
        await changeChecksum(file)
        const copyMP4 = upload(drive, fileId, parent_folder, file, name + '.mp4')
    
        await changeChecksum(file)
        const copyTxt = upload(drive, fileId, parent_folder, file, name + '.txt')
    
        const responses = await Promise.all([copyMP4, copyTxt])
    
        await fs.promises.unlink(filename)
        return {
            mp4: responses[0],
            txt: responses[1]
        }
    
    }
    catch(err) {
        await fs.promises.unlink(filename)
        throw err
    }
  }