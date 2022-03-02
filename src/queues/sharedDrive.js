const Queue = require('bee-queue');
const metadata = require('../google-drive-api/metadata');
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
            console.log('adding service accounts to '+shared_drive_id)
            const auth = await userAuth()
            const file_metadata = await metadata(auth, shared_drive_id)
            console.log(file_metadata)
            if (file_metadata) {
                await assignServiceAccountSharedDrive(auth, shared_drive_id)
            }
        }
        catch (err) {
            await sharedDriveSchema.updateOne({ id: shared_drive_id }, {
                error: true,
                error_message: err.message
            }).exec()
            return done()
        }

    })
}
)


module.exports = createServiceAccountJob
