import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

// Stripe Instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

// “POST” -> This naming convention is necessary because Next.js needs to determine the corresponding HTTP method to execute.
export async function POST(req: NextRequest) {
  const { data } = await req.json(); //destructuring the data from the request.
  const { amount } = data; //Further destructuring the amount from the data object.

  try {
    // Create payment intertent to hold important information about the transaction, including the supported payment methods, the amount to be collected, and the desired currency.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "INR",
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 }); //we will return a response containing the client secret obtained from Stripe. This step is crucial as we will utilize the client secret on the client side to assist Stripe in confirming the payment.
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
