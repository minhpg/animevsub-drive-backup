const fileSchema = require('../../models/file')

module.exports = async (req, res) => {
    try {
        const file_id = req.params.file_id
        const file = await fileSchema.findOne({ origin: file_id }).exec()
        if (!file) throw new Error('file does not exist!')
        res.json({
            success: true,
            data: {
                origin: file_id,
                dest: file.dest,
                backup: file.backup,
                parent: file.parent,
                live: file.live,
                error: file.error,
                error_message: file.error_message,
                created_at: file._id.getTimestamp()
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