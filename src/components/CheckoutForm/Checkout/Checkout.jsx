import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core'

import { useCart } from '../../../context/ShoppingContext'

import {commerce} from '../../../lib/commerce'
import useStyles from './styles'

import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({onCaptureCheckout, order, error}) => {
    const history = useHistory()
    const classes = useStyles();
    const cart = useCart();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [userData, setUserData] = useState({})
    const [isFinished, setIsFinished] = useState(false)

    const backStep = () => setActiveStep(curStep => curStep - 1);
    const nextStep = () => setActiveStep(curStep => curStep + 1);

    const next = (data) => {
        setUserData(data);

        nextStep();
    }

    let Confirmation = () => (order?.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order?.customer?.firstname} {order?.customer?.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order?.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
      ) : isFinished ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order?.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));

      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

      const timeout = () => {
          setTimeout(() => {
            setIsFinished(true)
          }, 5000)
      }

      const Form = () => activeStep === 0 ? (
        <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
        <PaymentForm 
            checkoutToken={checkoutToken}
            userData={userData}
            backStep={backStep}
            onCaptureCheckout={onCaptureCheckout}
            nextStep={nextStep}
            timeout={timeout}
        />
    )
    
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart?.id, { type: 'cart' })
    
                console.log("token: ", token)
    
                if(token) {
                    setCheckoutToken(token)
                }                
            } catch (error) {
                console.log("Error @generateToken_Checkout: ", error.message);
                history.pushState('/')
            }
        }

        generateToken()
    }, [cart])
    
    return (
        <>
            <CssBaseline />
            <div className={classes.toobar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center" >Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper} >
                        {steps?.map(step => <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>)}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
                </Paper>
            </main>
        </>
    );
}

export default Checkout
