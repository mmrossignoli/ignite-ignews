import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "stream"
import Stripe from "stripe"
import { stripe } from "../../services/stripe"


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
])
export default async function webhooks(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
  const buf = await buffer(req)
  const secret = req.headers['Stripe-Signature'] as string

  let event:Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET!)

  } catch (err:any) {
    console.log(err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
  const event
    
    res.status(200).json({})
  }else{
    res.setHeader("Allow", "POST")
    res.status(405).json({message:"Method not allowed"})
  }
}