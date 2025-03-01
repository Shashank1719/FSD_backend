const crypto = require('crypto');

function return_hmac_secret(emailId) {
    try {
        const secretKey = "deepthakkarkey";
        const jsonString = JSON.stringify(emailId);
        // Create HMAC signature
        const hmac = crypto.createHmac('sha256', secretKey).update(jsonString).digest('hex');
        const buffer = Buffer.from(hmac, 'hex');
        const base64String = buffer.toString('base64');
        return encodeURIComponent(base64String);
    } catch (err) {
        throw err
    }
}

module.exports = {return_hmac_secret};