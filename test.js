// const { assignServiceAccountSharedDrive } = require("./src/google-drive-api/sharedDrive")
const userAuth = require("./src/google-drive-api/userAuth");

const copy = require("./src/google-drive-api/copy");
const metadata = require("./src/google-drive-api/metadata");
const MD5 = require("./src/google-drive-api/metadata");

const serviceAccountAuth = require("./src/google-drive-api/serviceAccountAuth");

(async() => {
        const auth = await userAuth()
        console.log(auth)
        const meta = await metadata(auth, '0AF5brO3FAf3tUk9PVA')
        console.log(meta)
})()

// (async ( ) => {
//     const auth = await serviceAccountAuth()

//     console.log('original:')
//     const drive_id = '1PCStzCFI4nVStQMYtQEhQ4H2zL1BdEea'
//     console.log(drive_id)
//     await MD5(auth, drive_id)

//     console.log('mp4:')
//     const drive_id_2 = '1smHugbLq4Aqg845-u9jNNuZIgX4Ue8QV'
//     console.log(drive_id_2)
//     await MD5(auth, drive_id_2)


//     console.log('txt:')
//     const drive_id_3 = '1Vme39PC52XMdfFYEs4RoEt7ngAVRqwmu'
//     console.log(drive_id_3)
//     await MD5(auth, drive_id_3)

// })()