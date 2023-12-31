const { config } = require('dotenv');
const { resolve } = require('path');

const result = config({ path: resolve(__dirname, '../config/.env') });
if (result.error) {
    console.log(result.error);
}
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    //Option for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
    });
};
module.exports = sendToken;
