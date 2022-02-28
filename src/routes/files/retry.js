const fileSchema = require('../../models/file')
const sharedDriveLib = require('../../functions/sharedDrive')
const uploadFileJob = require('../../queues/files')
module.exports = async (req, res) => {
    try {
        const file_id = req.params.file_id
        const file = await fileSchema.findOne({ origin: file_id }).exec()
        if (!file) throw new Error('file does not exist!')
        const shared_drive = await sharedDriveLib.get()
        const parent_id = shared_drive.id
        let origin_id = file_id
        if (file.backups) {
            for (backup of file.backups) {
                if (backup.type == 'txt') origin_id = backup.id
            }
        }
        await uploadFileJob({ origin_id, parent_id })
        await file.updateOne({ error: false, error_message: null }).exec()
        res.json({
            success: true,
            data: {
                origin: file_id,
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