import React from 'react'
import {Typography, Button, Card, CardMedia, CardContent, CardActions} from '@material-ui/core'

import {useUpdateCartQty, useRemoveFromCart} from '../../../context/ShoppingContext'

import useStyles from './styles'

const CartItem = ({item}) => {
    const classes = useStyles()
    const updateCartQty = useUpdateCartQty()
    const removeFromCart = useRemoveFromCart()

    return (
        <Card>
            <CardMedia image={item?.media?.source} alt={item?.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item?.name}</Typography>
                <Typography variant="h5">{item?.line_total?.formatted}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={updateCartQty.bind(this, item?.id, Math.max(0, item?.quantity - 1))}>-</Button>
                    <Typography>{item?.quantity}</Typography>
                    <Button type="button" size="small" onClick={updateCartQty.bind(this, item?.id, Math.min(10, item?.quantity + 1))}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={removeFromCart.bind(this, item?.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
