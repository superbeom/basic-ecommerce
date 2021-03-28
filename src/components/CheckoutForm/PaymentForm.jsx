import React from 'react'
import {Typography, Button, Divider} from '@material-ui/core'
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken, userData, backStep, onCaptureCheckout, nextStep, timeout}) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!elements || !stripe) return;

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card: cardElement
        })

        if(error) {
            console.log("Error @handleSubmit_PaymentForm: ", error)
        } else {
            const orderData = {
                line_items: checkoutToken?.live?.line_items,
                customer: {
                  firstname: userData?.firstName,
                  lastname: userData?.lastName,
                  email: userData?.email
                },
                shipping: {
                  name: 'national',
                  street: userData?.address1, 
                  town_city: userData?.city, 
                  postal_zip_code: userData?.zip
                },
                payment: {
                  gateway: 'stripe',
                  stripe: {
                    payment_method_id: paymentMethod?.id,
                  },
                },
            };

            onCaptureCheckout(checkoutToken?.id, orderData)

            timeout()
            
            nextStep()
        }
    }
    
    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Card</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={event => handleSubmit(event, elements, stripe)}>
                            <CardElement options={{hidePostalCode: true}} />
                            <br /> <br />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!stripe}
                                    color="primary"
                                >
                                    Pay {checkoutToken?.live?.subtotal?.formatted}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
