const options = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || null,
    password: process.env.REDIS_PASS,
}

module.exports = options