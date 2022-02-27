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
    sharedDriveQueue.process(3, async (job, done) => {
        const { shared_drive_id } = job.data
        const auth = await userAuth()
        await assignServiceAccountSharedDrive(auth, shared_drive_id)
        return done()
    })
}
)


module.exports = createServiceAccountJob
