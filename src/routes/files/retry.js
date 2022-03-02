const fileSchema = require('../../models/file')
const sharedDriveLib = require('../../functions/sharedDrive')
const uploadFileJob = require('../../queues/files')
module.exports = async (req, res) => {
    try {
        const file_id = req.params.file_id
        const file = await fileSchema.findOne({ id: file_id }).exec()
        if (!file) throw new Error('file does not exist!')
        const shared_drive = await sharedDriveLib.get()
        const parent_id = shared_drive.id
        console.log(`retry backing up ${file_id} to ${parent_id}`)
        let txt_id
        if (file.backups) {
            for (backup of file.backups) {
                if (backup.type == 'txt') txt_id = backup.id
            }
        }
        console.log(`backing up from ${file_id}`)
        await uploadFileJob({ file_id, parent_id , txt_id})
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