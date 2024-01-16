"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";

const PaymentForm = () => {
  // Stripe Hooks
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: 89 },
      });

      const clientSecret = data;
      
      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      return alert("Payment successful!");
    } catch (error: any) {
      console.log(`stripe and/or cardElement is missing ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="m-10 lg:mx-96 px-20 py-10 shadow-xl rounded-md"
    >
      <h1 className="text-5xl font-bold text-center">Check Out</h1>
      <input
        type="text"
        className="bg-slate-100 w-full rounded-md p-3 mt-20 text-sm"
        placeholder="Name on Card"
      />
      <textarea
        rows={3}
        className="bg-slate-100 w-full rounded-md p-3 mt-5 text-sm"
        placeholder="Address"
      />

      <CardElement className="mt-5 bg-slate-100 p-3 rounded-md" />

      <button
        type="submit"
        className="w-full bg-violet-500 mt-10 rounded-md text-white p-3"
      >
        Submit
      </button>
    </form>
  );
};

export default PaymentForm;
