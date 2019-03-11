if (process.env.NODE_ENV === 'production') {
    console.log('production')
    module.exports = require('./keys_prod');
} else {
    console.log('dev')
    module.exports = require('./keys_dev');
}