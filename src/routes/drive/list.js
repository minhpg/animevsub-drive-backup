const sharedDriveSchema = require('../../models/sharedDrive')

module.exports = async (req, res) => {
    let page = 1, limit = 10
    if(req.query.page) page = parseInt(req.query.page)
    if(req.query.limit) limit = parseInt(req.query.limit)
    try {
        const drive_count = await sharedDriveSchema.count().exec()
        const page_count = Math.round(drive_count/limit)+1
        const list_drives = await sharedDriveSchema.find({},{_id: false, __v: false}).limit(limit).skip((page-1)*limit).sort({_id: -1}).exec()
        res.json({
            success: true,
            data: {
                limit: 10,
                current_page: page,
                page_count,
                drive_count,
                drives: list_drives
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