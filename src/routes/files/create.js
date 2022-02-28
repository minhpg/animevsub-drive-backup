const fileSchema = require('../../models/file')
const sharedDriveLib = require('../../functions/sharedDrive')
const uploadFileJob = require('../../queues/files')
module.exports = async (req, res) => {
    try {
        const file_id = req.params.file_id
        const file = await fileSchema.findOne({ id: file_id }).exec()
        if (file) throw new Error('file exist!')
        const shared_drive = await sharedDriveLib.get()
        const parent_id = shared_drive.id
        const new_file = new fileSchema({
            id: file_id,
            parent: parent_id
        })
        await new_file.save()
        await uploadFileJob({file_id, parent_id})

        res.json({
            success: true,
            data: {
                id: file_id,
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