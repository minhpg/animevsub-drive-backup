const fileSchema = require('../../models/file')

module.exports = async (req, res) => {
    let page = 1, limit = 10
    if(req.query.page) page = parseInt(req.query.page)
    if(req.query.limit) limit = parseInt(req.query.limit)
    try {
        const file_count = await fileSchema.count().exec()
        const page_count = Math.round(file_count/limit)+1
        const list_files = await fileSchema.find({},{_id: false, __v: false}).limit(limit).skip((page-1)*limit).sort({_id: -1}).exec()
        res.json({
            success: true,
            data: {
                limit: 10,
                current_page: page,
                page_count,
                file_count,
                files: list_files
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