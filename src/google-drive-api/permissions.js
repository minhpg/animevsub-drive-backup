
module.exports = (drive, file_id) => {
    return new Promise((resolve, reject) => {
        drive.permissions.create({
            resource: {
                'type': 'anyone',
                'role': 'reader',
            },
            fileId: file_id,
            fields: 'id',
            supportsAllDrives: true,
        }, (err, success) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(success)
            }
        })
    })
}