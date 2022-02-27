// const { assignServiceAccountSharedDrive } = require("./src/google-drive-api/sharedDrive")
// const userAuth = require("./src/google-drive-api/userAuth");

const copy = require("./src/google-drive-api/copy")

const serviceAccountAuth = require("./src/google-drive-api/serviceAccountAuth");

// (async() => {
//         const auth = await userAuth()
//         console.log(auth)
//         const accounts = await assignServiceAccountSharedDrive(auth,'0AMTS4bEV6JWYUk9PVA')
// })()

(async ( ) => {
    const auth = await serviceAccountAuth()
    console.log(auth)
    await copy(auth, '1PCStzCFI4nVStQMYtQEhQ4H2zL1BdEea', '0AMTS4bEV6JWYUk9PVA')
})()