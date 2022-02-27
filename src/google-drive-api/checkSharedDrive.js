const sharedDriveSchema = require('../models/sharedDrive')
const createSharedDrive = require('../google-drive-api/sharedDrive')
module.exports = async () => {
    var shared_drive = await sharedDriveSchema.findOne({ default: true }).exec()
    if (shared_drive) {
        if ((shared_drive.file_count) < 200000) {
            console.log(`found shared drive ${shared_drive.shared_drive_id} with ${shared_drive.file_count}`)
        }
        else {
            try {
                console.log('folder exceeded 400k file limit - creating new shared drive')
                const { sharedDriveId, folderId } = await createSharedDrive()
                console.log('created shared drive - ' + sharedDriveId)
                const new_shared_drive = new sharedDriveSchema({
                    shared_drive_id: sharedDriveId,
                    folder_id: folderId,
                    file_count: 0,
                    default: true
                })
                await sharedDriveSchema.updateMany({}, { default: false })
                await new_shared_drive.save()
                done()
            }
            catch {
                console.error(error)
            }
        }
    }
    try {
        console.log('no shared drive found - creating new shared drive')
        const { sharedDriveId, folderId } = await createSharedDrive()
        console.log('created shared drive - ' + sharedDriveId)
        const new_shared_drive = new sharedDriveSchema({
            shared_drive_id: sharedDriveId,
            folder_id: folderId,
            file_count: 0,
            default: true
        })
        await new_shared_drive.save()
        return new_shared_drive
    }
    catch (error) {
        console.error(error)
    }
}