require("dotenv").config();

const express = require("express");
const cors = require("cors");

const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {

  const { products } = req.body;

  const lineItems = products.map(product => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.title
      },
      unit_amount: Math.round(product.price * 100)
    },
    quantity: product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: lineItems,

    mode: "payment",

    success_url:
      "http://localhost:4200/payment-success",

    cancel_url:
      "http://localhost:4200/payment-cancel"
  });

  res.json({
   id: session.id,
  url: session.url
  });

});

app.listen(3000, () => {
  console.log("Server Running");
});