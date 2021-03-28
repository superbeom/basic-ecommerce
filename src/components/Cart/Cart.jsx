import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Typography, Button, Grid} from '@material-ui/core'

import {useCart, useEmptyCart} from '../../context/ShoppingContext'

import CartItem from './CartItem/CartItem'
import useStyles from './styles'

const Cart = () => {
    const classes = useStyles()
    const cart = useCart()
    const emptyCart = useEmptyCart()

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
            <Link to={'/'} className={classes.link}>start adding some!</Link>
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart?.line_items?.map(item => (
                    <Grid key={item.id} item xs={12} sm={4}>
                        <CartItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart?.subtotal?.formatted}</Typography>
                <div>
                    <Button 
                        className={classes.emptyButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={emptyCart}
                    >
                        Empty Cart
                    </Button>
                    <Button 
                        className={classes.checkoutButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="primary"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    )

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title}>Your Shopping Cart</Typography>
            {!cart.total_items ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
