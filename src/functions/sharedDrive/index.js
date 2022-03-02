const { assignServiceAccountSharedDrive } = require('../../google-drive-api/sharedDrive')
const userAuth = require('../../google-drive-api/userAuth')
const sharedDriveSchema = require('../../models/sharedDrive')
const createServiceAccountJob = require('../../queues/sharedDrive')

const get = async () => {
    const drive = await sharedDriveSchema.findOne({
        count: { $lt: process.env.SHAREDDRIVE_FILE_LIMIT || 300000 },
        disabled: false,
        error: false
    }).exec()
    if (!drive) throw new Error('no shared drive available!')
    return drive
}

const find = async (id) => {
    const drive = await sharedDriveSchema.findOne({
        id,
    }).exec()
    if (!drive) throw new Error('shared drive not found!')
    return drive
}

const updateCount = async (add_by, shared_drive_id) => {
    const success = await sharedDriveSchema.updateOne({id: shared_drive_id},{
        $inc: { file_count: add_by }
    }).exec()
    return success
}

const create = async (id) => {
    const shared_drive = await sharedDriveSchema.findOne({ id }).exec()
    if (shared_drive) throw new Error('drive exist!')
    const new_drive = new sharedDriveSchema({
        id
    })
    await createServiceAccountJob({ shared_drive_id: id })
    await new_drive.save()
    return new_drive
}

const retry = async (id) => {
    const shared_drive = await sharedDriveSchema.findOne({ id }).exec()
    if (!shared_drive) throw new Error('drive does not exist!')
    await createServiceAccountJob({ shared_drive_id: id })
    await shared_drive.updateOne({
        error: false,
        error_message: null,
        disabled: false
    }).exec()
    return shared_drive
}

const deleteDrive = async (id) => {
    const response = await sharedDriveSchema.deleteOne({ id }).exec()
    return response
}

module.exports = {
    get,
    create,
    find,
    retry,
    updateCount,
    delete: deleteDrive
}