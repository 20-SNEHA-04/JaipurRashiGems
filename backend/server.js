const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();

// Enable CORS for frontend requests
app.use(cors({ origin: true }));
app.use(express.json());

// Load Stripe SDK dynamically/safely when secret key is provided
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

// Helper to authenticate and get PayPal Access Token using client credentials flow
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('PayPal API credentials are not configured on the server.');
  }
  
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const mode = process.env.PAYPAL_MODE || 'sandbox';
  const url = mode === 'live' 
    ? 'https://api-m.paypal.com/v1/oauth2/token' 
    : 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
  
  const response = await fetch(url, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to retrieve PayPal token: ${errorBody}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

// GET /api/config
// Exposes public environment variables to the frontend client
app.get('/api/config', (req, res) => {
  res.json({
    paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    paypalMode: process.env.PAYPAL_MODE || 'sandbox'
  });
});

// POST /api/create-paypal-order
// Contacts PayPal V2 API to register an authorized transaction request
app.post('/api/create-paypal-order', async (req, res) => {
  try {
    const { total } = req.body;
    if (!total || isNaN(total)) {
      return res.status(400).json({ error: 'Invalid or missing checkout total.' });
    }

    const accessToken = await getPayPalAccessToken();
    const mode = process.env.PAYPAL_MODE || 'sandbox';
    const url = mode === 'live' 
      ? 'https://api-m.paypal.com/v2/checkout/orders' 
      : 'https://api-m.sandbox.paypal.com/v2/checkout/orders';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: parseFloat(total).toFixed(2)
          },
          description: 'Jaipur Rashi Gems Vedic Astrological Sourcing'
        }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`PayPal V2 Order Creation failed: ${errText}`);
    }

    const orderData = await response.json();
    res.json({ orderId: orderData.id });
  } catch (error) {
    console.error('PayPal Order Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/capture-paypal-order
// Captures and locks authorization keys for the PayPal transaction on the backend
app.post('/api/capture-paypal-order', async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Missing PayPal orderId parameter.' });
    }

    const accessToken = await getPayPalAccessToken();
    const mode = process.env.PAYPAL_MODE || 'sandbox';
    const url = mode === 'live' 
      ? `https://api-m.paypal.com/v2/checkout/orders/${orderId}/capture` 
      : `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`PayPal V2 Order Capture failed: ${errText}`);
    }

    const captureData = await response.json();
    res.json({ status: 'COMPLETED', details: captureData });
  } catch (error) {
    console.error('PayPal Capture Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/create-payment-intent
// Generates a Stripe client secret token for standard frontend elements flow
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { total } = req.body;
    if (!total || isNaN(total)) {
      return res.status(400).json({ error: 'Invalid or missing checkout total.' });
    }

    if (!stripe) {
      // Re-initialize stripe in case env variable changed dynamically
      if (process.env.STRIPE_SECRET_KEY) {
        stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      } else {
        throw new Error('Stripe API keys are not configured on the server.');
      }
    }

    const amountInCents = Math.round(parseFloat(total) * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      description: 'Jaipur Rashi Gems Vedic Astrological Purchase'
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Intent Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/create-stripe-session
// Generates a Stripe Checkout Session redirect link
app.post('/api/create-stripe-session', async (req, res) => {
  try {
    const { total } = req.body;
    if (!total || isNaN(total)) {
      return res.status(400).json({ error: 'Invalid or missing checkout total.' });
    }

    if (!stripe) {
      if (process.env.STRIPE_SECRET_KEY) {
        stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      } else {
        throw new Error('Stripe API keys are not configured on the server.');
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Jaipur Rashi Gems Vedic Astrological Sourcing',
            description: '100% Certified Natural Gemstones & Jewelry'
          },
          unit_amount: Math.round(parseFloat(total) * 100)
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout?stripe-success=true`,
      cancel_url: `${req.headers.origin}/checkout?stripe-cancel=true`
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe Session Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health Check Endpoint for Render / hosting environments
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Route catch-all mapping to 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found in Jaipur Rashi Gems secure api gateway.' });
});

// Export Express app as Firebase Function
exports.api = functions.https.onRequest(app);

// Start standard Express listening server if running directly (like on Render)
if (require.main === module || process.env.PORT) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
