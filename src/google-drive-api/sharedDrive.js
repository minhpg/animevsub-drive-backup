const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const Bottleneck = require('bottleneck');

const createSharedDrive = (drive) => {
    return new Promise((resolve, reject) => {
        const driveMetadata = {
            'name': `AVS-BACKUP-${Date.now()}`
        };
        const requestId = uuid.v4();
        drive.drives.create({
            resource: driveMetadata,
            requestId: requestId,
            fields: 'id'
        }, (err, shared) => {
            if (err) {
                reject(err);
            } else {
                resolve(shared)
            }
        })
    })
}

const assignServiceAccountSharedDrive = async (drive, parent_id) => {
    const permissions = await fetchServiceAccountPermissions()
    const limiter = new Bottleneck({
        maxConcurrent: 1,
        minTime: 1000
    })
    for (const permission of permissions) {
        await limiter.schedule(() => {
            drive.permissions.create({
                resource: permission,
                fileId: parent_id,
                fields: 'id',
                supportsAllDrives: true,
            }, (err, success) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(`added ${permission.emailAddress} to shared drive ${parent_id}`)
                }
            })
        })
    }

}

const fetchServiceAccountPermissions = () => {
    const dir = 'service_accounts'
    return new Promise((resolve, reject) => {
        return fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err)
            }
            const promises = files.map((filename) => {
                return new Promise((resolve, reject) => {
                    fs.readFile(path.join(dir, filename), (err, data) => {
                        if (err) {
                            reject(err)
                        }
                        const creds = JSON.parse(data)
                        const worker_creds = JSON.parse(Buffer.from(creds.privateKeyData, 'base64').toString('utf8'))
                        resolve({
                            'type': 'user',
                            'role': 'writer',
                            'emailAddress': worker_creds.client_email
                        })
                    })
                })
            })
            return resolve(Promise.all(promises))
        })

    })
}

module.exports = {
    createSharedDrive,
    assignServiceAccountSharedDrive
}
