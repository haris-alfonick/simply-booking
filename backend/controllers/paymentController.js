const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const paypalClient = require('../config/paypal');
const Payment = require('../models/Payment');

exports.createPaypalOrder = async (req, res) => {
    try {
        const { amount, customerName, customerEmail } = req.body;

        if (!amount || !customerName || !customerEmail) {
            return res.status(400).json({ error: "Missing required payment details" });
        }
        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount
                },
                description: `Payment by ${customerName}`
            }]
        });

        const order = await paypalClient.client().execute(request);
        const paypalOrderId = order.result.id;
        await Payment.create({
            user_id: req.user.userId,
            paypal_order_id: paypalOrderId,
            amount: parseFloat(amount),
            currency: 'USD',
            customer_name: customerName,
            customer_email: customerEmail,
            status: 'processing'
        });

        console.log(`Order Created in DB: ${paypalOrderId} for user ${req.user?.id}`);
        res.json({ id: paypalOrderId });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.captureOrder = async (req, res) => {
    try {
        const { orderID } = req.body;
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});
        const capture = await paypalClient.client().execute(request);
        const captureId = capture.result.purchase_units[0].payments.captures[0].id;

        await Payment.updateOne(
            { paypal_order_id: orderID },
            { status: 'success', paypal_transaction_id: captureId }
        );
        console.log(`Payment Captured. Order ID: ${orderID}, Transaction ID: ${captureId}`);
        res.json({
            success: true,
            transactionId: captureId,
            status: 'COMPLETED'
        });
    } catch (error) {
        console.error("Capture Order Error:", error);

        await Payment.updateOne(
            { paypal_order_id: req.body.orderID },
            { status: 'error' });

        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllPayment = async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const search = req.query.search || "";
    const skip = (page - 1) * limit

    try {
        const searchQuery = search ? {
            $or: [
                { customerName: { $regex: search, $options: "i" } },
                { customerEmail: { $regex: search, $oprions: "i" } }
            ]
        } : {};

        const [transections, total] = await Promise.all([
            Payment.find(searchQuery)
                .sort({ createAt: -1 })
                .skip(skip)
                .limit(limit),
            Payment.countDocuments(searchQuery)
        ])

        res.status(200).json({
            data: transections,
            pagimation: {
                total,
                page,
                limit,
                totalpages: Math.ceil(total / limit)
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch contacts" })
    }
}



