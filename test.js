// const { assignServiceAccountSharedDrive } = require("./src/google-drive-api/sharedDrive")
// const userAuth = require("./src/google-drive-api/userAuth");

const copy = require("./src/google-drive-api/copy");
const MD5 = require("./src/google-drive-api/MD5");

const serviceAccountAuth = require("./src/google-drive-api/serviceAccountAuth");

// (async() => {
//         const auth = await userAuth()
//         console.log(auth)
//         const accounts = await assignServiceAccountSharedDrive(auth,'0AMTS4bEV6JWYUk9PVA')
// })()

(async ( ) => {
    const auth = await serviceAccountAuth()
    const drive_id = '1Kpai3G9w8-sGNHgwZJGYMmF9HJYtt7km'
    console.log(drive_id)
    await MD5(auth, drive_id)
})()