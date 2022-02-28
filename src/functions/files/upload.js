const sharePermission = require('../../google-drive-api/permissions')
const fs = require('fs')

const upload = async (drive, fileId, parent_folder, file, name) => {
  return new Promise((resolve, reject) => {
    const fileMetadata = {
        name,
        parents: [parent_folder]
      };
      const media = {
        mimeType: name.includes('txt') ? 'text/plain' : 'video/mp4',
        body: fs.createReadStream(file),
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        supportsAllDrives: true,
        fields: 'id'
    }, async (err, new_file) => {
      if (err) {
        reject(err);
      } else {
        await sharePermission(drive, new_file.data.id)
        console.log(`uploaded ${fileId} to ${new_file.data.id}`)
        resolve(new_file.data.id)
      }
    })
  })
}

module.exports = upload 
