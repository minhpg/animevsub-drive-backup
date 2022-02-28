// const { assignServiceAccountSharedDrive } = require("./src/google-drive-api/sharedDrive")
// const userAuth = require("./src/google-drive-api/userAuth");

// const copy = require("./src/google-drive-api/copy");
const MD5 = require("./src/google-drive-api/metadata");

const serviceAccountAuth = require("./src/google-drive-api/serviceAccountAuth");

// (async() => {
//         const auth = await userAuth()
//         console.log(auth)
//         const accounts = await assignServiceAccountSharedDrive(auth,'0AMTS4bEV6JWYUk9PVA')
// })()

(async ( ) => {
    const auth = await serviceAccountAuth()

    console.log('original:')
    const drive_id = '1PCStzCFI4nVStQMYtQEhQ4H2zL1BdEea'
    console.log(drive_id)
    await MD5(auth, drive_id)

    console.log('mp4:')
    const drive_id_2 = '1twAkxRxYyDRZlmAO9Rfe8g594JN11rZX'
    console.log(drive_id_2)
    await MD5(auth, drive_id_2)


    console.log('txt:')
    const drive_id_3 = '1um5LxHezSfP1izNqcgAplcNzZqTPVHP-'
    console.log(drive_id_3)
    await MD5(auth, drive_id_3)

})()