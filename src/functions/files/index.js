const upload = require('./upload')
const download = require('../../google-drive-api/download')
const changeChecksum = require('./changeChecksum')
const uuid = require('uuid')
const fs = require('fs')
module.exports = async (drive, fileId, parent_folder) => {
    const filename = uuid.v4()
    const backups = []
    try {
        console.log(`copying ${fileId} to ${parent_folder}`)
        const time = Date.now()
    
        const file = await download(drive, fileId, filename)

        const name = `${fileId}-${time}`
        
        const copies = process.env.COPIES || 1
        for(i of Array(parseInt(copies)).keys()) {
            await changeChecksum(file)
            const copyMP4 = await upload(drive, fileId, parent_folder, file, name + '.mp4')
            backups.push({
                id: copyMP4,
                type: 'mp4'
            })
        }
    
        await changeChecksum(file)
        const copyTxt = await upload(drive, fileId, parent_folder, file, name + '.txt')
        backups.push({
            id: copyTxt,
            type: 'txt'
        })
    
        await fs.promises.unlink(filename)
         
        return backups
    
    }
    catch(err) {
        console.log(err)
        await fs.promises.unlink(filename)
        throw err
    }
  }