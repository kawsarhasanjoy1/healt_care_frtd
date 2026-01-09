"use client";

import PaymentResultCard from "@/app/component/Reusible/payment/PaymentCard";
import { useSearchParams } from "next/navigation";


export default function PaymentSuccessPage() {
  const sp = useSearchParams();
  const amount = sp.get("amount") ?? "$149.99";
  const transactionId = sp.get("transactionId") ?? "TXN-789123456";
  const method = sp.get("method") ?? "**** 4242";
  const date = sp.get("date") ?? "Dec 15, 2024";
  const merchant = sp.get("merchant") ?? "TechStore Pro";
  const email = sp.get("email") ?? "customer@example.com";

  return (
    <PaymentResultCard
      variant="success"
      title="Payment Successful!"
      subtitle="Your payment has been processed successfully. You will receive a confirmation email shortly."
      amount={amount}
      transactionId={transactionId}
      method={method}
      date={date}
      merchant={merchant}
      email={email}
      primaryCta={{ label: "Go to Dashboard", href: "/dashboard" }}
      secondaryCta={{ label: "Back to Home", href: "/" }}
    />
  );
}