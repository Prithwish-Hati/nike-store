"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";

// Call loadStripe outside of component so that it doesn't recreate "Stripe" object on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Page = () => {
  return (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
  )
};

export default Page;
