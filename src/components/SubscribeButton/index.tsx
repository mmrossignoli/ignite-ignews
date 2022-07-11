import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJS } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session, status }= useSession()
  async function handleSubscribe() {
    if(status !== "authenticated") {
      signIn("github");
      return;
    }
    try{
      const response = await api.post('/subscribe')
      const {sessionId } = response.data
      const stripe = await getStripeJS()
      await stripe?.redirectToCheckout({sessionId})
    }catch(error) {
      console.log(error)
    }
  }
  
  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      <span>Subscribe now</span>
    </button>
  );
}
