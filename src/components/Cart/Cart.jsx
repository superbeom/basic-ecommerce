import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'

import CartItem from './CartItem/CartItem'
import useStyles from './styles'

const Cart = ({cart}) => {
    const classes = useStyles()

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart, start adding some!</Typography>
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
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
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
