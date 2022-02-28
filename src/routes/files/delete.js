const fileSchema = require('../../models/file')

module.exports = async (req, res) => {
    try {
        const file_id = req.params.file_id
        const file = await fileSchema.deleteOne({ origin: file_id }).exec()
        if (!file) throw new Error('file does not exist!')
        res.json({
            success: true
        })
    }

    catch (err) {
        res.json({
            success: false,
            error_message: err.message
        })
    }

}