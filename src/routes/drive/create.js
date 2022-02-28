const sharedDriveLib = require('../../functions/sharedDrive')

module.exports = async (req, res) => {
    try {
        const shared_drive_id = req.params.shared_drive_id
        const new_shared_drive = await sharedDriveLib.create(shared_drive_id)
        res.json({
            success: true,
            data: {
                id: shared_drive_id,
                file_count: new_shared_drive.file_count,
                disabled: new_shared_drive.disabled,
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