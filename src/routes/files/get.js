const fileSchema = require('../../models/file')

module.exports = async (req, res) => {
    try {
        const file_id = req.params.file_id
        const file = await fileSchema.findOne({ id: file_id }).exec()
        if (!file) throw new Error('file does not exist!')
        res.json({
            success: true,
            data: {
                id: file_id,
                backups: file.backups,
                parent: file.parent,
                live: file.live,
                error: file.error,
                error_message: file.error_message,
                created_at: file.createdAt,
                updated_at: file.updatedAt
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