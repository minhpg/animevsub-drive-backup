const sharedDriveLib = require('../../functions/sharedDrive')

module.exports = async (req, res) => {
    try {
        const shared_drive_id = req.params.shared_drive_id
        const shared_drive = await sharedDriveLib.delete(shared_drive_id)
        res.json({
            success: true,
        })
    }

    catch (err) {
        res.json({
            success: false,
            error_message: err.message
        })
    }

}