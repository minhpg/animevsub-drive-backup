const fs = require('fs');

module.exports = async (file, eof_length) => {
    const end_buffer = []
    for (i of Array(eof_length).keys()) {
        end_buffer.push(0x00)
    }
    await fs.promises.appendFile(file, Buffer.from(end_buffer))
}