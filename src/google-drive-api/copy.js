const sharePermission = require('./permissions')

module.exports = async (drive, fileId, parent_folder) => {
  console.log(`copying ${fileId} to ${parent_folder}`)
  const time = Date.now()
  const name = `${fileId}-${time}`
  const copyMP4 = copyRequest(drive, fileId, parent_folder, name + '.mp4')
  const copyTxt = copyRequest(drive, fileId, parent_folder, name + '.txt')
  const responses = await Promise.all([copyMP4, copyTxt])
  return responses
}

const copyRequest = async (drive, fileId, parent_folder, name) => {
  return new Promise((resolve, reject) => {
    const fileMetadata = {
      name,
      parents: [parent_folder],
    };
    drive.files.copy({
      resource: fileMetadata,
      supportsAllDrives: true,
      fileId,
      fields: 'id'
    }, async (err, new_file) => {
      if (err) {
        reject(err);
      } else {
        await sharePermission(drive, new_file.data.id)
        console.log(`copied ${fileId} to ${new_file.data.id}`)
        resolve(new_file.data.id)
      }
    })
  })
}