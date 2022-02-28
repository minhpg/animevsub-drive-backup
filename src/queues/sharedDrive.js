const Queue = require('bee-queue');
const { assignServiceAccountSharedDrive } = require('../google-drive-api/sharedDrive');
const userAuth = require('../google-drive-api/userAuth');

const options = {
    removeOnSuccess: true,
}

const sharedDriveQueue = new Queue('shared-drive-queue', options)

const createServiceAccountJob = (params) => {
    return sharedDriveQueue.createJob(params).save();
}

sharedDriveQueue.on('ready', () => {
    sharedDriveQueue.process(1, async (job, done) => {
        try {
            const { shared_drive_id } = job.data
            const auth = await userAuth()
            await assignServiceAccountSharedDrive(auth, shared_drive_id)
            return done()
        }
        catch (err) {
            await sharedDriveSchema.updateOne({ id: shared_drive_id }, {
                error: true,
                error_message: err.message
            })
        }

    })
}
)


module.exports = createServiceAccountJob
