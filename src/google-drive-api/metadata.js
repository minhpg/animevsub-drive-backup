module.exports = (drive, file_id) => {
    return new Promise((resolve, reject) => {
        drive.files.get(
            { fileId: file_id, supportsAllDrives: true, fields: 'id'},
            (err, data) => {
                if (err) {
                    reject(err)
                }
                console.log(data)
                resolve(data)
            }
        );

    })
}