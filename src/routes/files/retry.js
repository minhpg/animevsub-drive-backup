const fileSchema = require('../../models/file')
const sharedDriveLib = require('../../functions/sharedDrive')
const uploadFileJob = require('../../queues/files')
module.exports = async (req, res) => {
    try {
        let file_id = req.params.file_id
        const file = await fileSchema.findOne({ origin: file_id }).exec()
        if (!file) throw new Error('file does not exist!')
        const shared_drive = await sharedDriveLib.get()
        const parent_id = shared_drive.id
        if (file.backups) {
            for (backup of file.backups) {
                if (backup.type == 'txt') file_id = backup.id
            }
        }
        console.log(`backing up from ${file_id}`)
        await uploadFileJob({ file_id, parent_id })
        await file.updateOne({ error: false, error_message: null }).exec()
        res.json({
            success: true,
            data: {
                id: file.id,
                parent: parent_id
            }
        })
    }

    catch (err) {
        res.json({
            success: false,
            error_message: err.message
        })
    }

}