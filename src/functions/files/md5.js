const crypto = require('crypto');
const fs = require('fs');
module.exports = async (file) => {
    const fileBuffer = await fs.promises.readFile(file);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);

    const hex = hashSum.digest('hex');

    console.log(hex);
    return hex
}