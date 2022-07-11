import { query as q} from "faunadb"
import { fauna } from "../../../services/fauna"
import { stripe } from "../../../services/stripe"

type User = {
  ref:{
    id:string;
  }
  data:{
    stripeCustomerId:string;
  }
}

export async function saveSubscription(
  subscriptionId:string ,
  customerId:string,
){
  const userRef = await fauna.query<User>(
    q.Select(
      "ref",
    q.Get(
      q.Match(
        q.Index('user_by_stripe_customer_id'),
        customerId
      )
    )
  )
  )
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,

  }

  const query = await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      {data:subscriptionData}
    )
  ) 
  console.log(query) 
}