const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    // Use sandbox for development
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);

    // For production, use:
    // return new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);
}

function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

module.exports = { client };
