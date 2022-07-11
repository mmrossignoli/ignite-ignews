import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "stream"
import Stripe from "stripe"
import { stripe } from "../../services/stripe"
import { saveSubscription } from "./_lib/manageSubscription"


async function buffer(readable:Readable) {
  const chunks:Buffer[] = []
  for await (const chunk of readable) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

export const config = {
  api:{
    bodyParser:false,
  }
}

const relevantEvents= new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])
export default async function webhooks(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
  const buf = await buffer(req)
  const secret = req.headers['stripe-signature'] as string

  let event:Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET!)

  } catch (err:any) {
    console.log(err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
  const type = event.type;
  console.log(type)
  if(relevantEvents.has(type)){
    try{
    switch(type){
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':  
      console.log("delete:",type)
        const subscription = event.data.object as Stripe.Subscription
        await saveSubscription(
          subscription.id, 
          subscription.customer.toString(),
          false,)
          break;
   
      case 'checkout.session.completed':

       const  checkoutSession = event.data.object as Stripe.Checkout.Session
        await saveSubscription(checkoutSession.subscription?.toString() as string,
        checkoutSession.customer?.toString() as string,true)
        break;
      default:
        throw new Error(`Unknown event type: ${type}`)
      }
    }catch(e){
      return res.json({error:'Webhook handler failed.'})
    }
  }
    
    res.status(200).json({})
  }else{
    res.setHeader("Allow", "POST")
    res.status(405).json({message:"Method not allowed"})
  }
}