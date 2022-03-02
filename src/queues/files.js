const Queue = require('bee-queue');
const fileProcess = require('../functions/files');
const { updateCount } = require('../functions/sharedDrive');
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
            const { original_md5, backups} = await fileProcess(auth, file_id, parent_id)
            await fileSchema.updateOne({
                id: file_id
            }, {
                backups: backups,
                parent_id: parent_id,
                md5: original_md5
            }).exec()
            await updateCount(backups.length)
        }
        catch (err) {
            await fileSchema.updateOne({
                id: file_id
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
