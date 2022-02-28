const uuid = require('uuid')
const download = require('../../google-drive-api/download')
const serviceAccountAuth = require('../../google-drive-api/serviceAccountAuth')

module.exports = async (drive, file_id) => {
    const filename = uuid.v4()
    const file = await download(drive, file_id, filename)
    return file
}