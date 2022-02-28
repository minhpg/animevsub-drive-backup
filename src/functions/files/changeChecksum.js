const fs = require('fs');

module.exports = async (file) => {
    const end_buffer = []
    const eof_length = Math.floor(Math.random() * 10)
    for(i of Array(eof_length).keys()){
        end_buffer.push(0x00)
    }
    await fs.promises.appendFile(file, Buffer.from(end_buffer))
}