const Queue = require('bee-queue');
const fileProcess = require('../functions/files');
const serviceAccountAuth = require('../google-drive-api/serviceAccountAuth');
const fileSchema = require('../models/file')
const options = {
    removeOnSuccess: true,
}

const uploadQueue = new Queue('upload-queue', options)

const uploadFileJob = (params) => {
    return uploadQueue.createJob(params).save();
}

uploadQueue.on('ready', () => {
    uploadQueue.process(5, async (job, done) => {
        try {
            const { file_id, parent_id } = job.data
            const auth = await serviceAccountAuth()
            const { mp4, txt } = await fileProcess(auth, file_id, parent_id)
            await fileSchema.updateOne({
                origin: file_id
            }, {
                dest: mp4,
                backup: txt
            }).exec()
        }
        catch (err) {
            await fileSchema.updateOne({
                origin: file_id
            }, {
                error: true,
                error_message: err.message
            }).exec()
        }

        return done()
    })
}
)


module.exports = uploadFileJob
