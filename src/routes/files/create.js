const fileSchema = require('../../models/file')
const authDrive = require('../../google-drive-api/serviceAccountAuth')
const copy = require('../../google-drive-api/copy')
const sharedDriveLib = require('../../functions/sharedDrive')
module.exports = async (req, res) => {
    try {
        const file_id = req.params.file_id
        const file = await fileSchema.findOne({ origin: file_id }).exec()
        if (file) throw new Error('file exist!')

        const drive = await authDrive()
        const shared_drive = await sharedDriveLib.get()
        const parent_id = shared_drive.id
        const new_file_ids = await copy(drive, file_id, parent_id)

        const new_file = new fileSchema({
            origin: file_id,
            dest: new_file_ids[0],
            backup: new_file_ids[1],
            parent: parent_id
        })
        await sharedDriveLib.updateCount(2, parent_id)
        await new_file.save()
        res.json({
            success: true,
            data: {
                origin: file_id,
                dest: new_file_ids[0],
                backup: new_file_ids[1],
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