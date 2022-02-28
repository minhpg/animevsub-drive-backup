const sharedDriveLib = require('../../functions/sharedDrive')

module.exports = async (req, res) => {
    try {
        const shared_drive_id = req.params.shared_drive_id
        const shared_drive = await sharedDriveLib.find(shared_drive_id)
        res.json({
            success: true,
            data: {
                id: shared_drive_id,
                file_count: shared_drive.file_count,
                disabled: shared_drive.disabled,
                error: shared_drive.error,
                error_message: shared_drive.error_message
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