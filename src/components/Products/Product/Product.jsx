import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import {AddShoppingCart} from '@material-ui/icons'

import {useAddToCart} from '../../../context/ShoppingContext'

import useStyles from './styles'

const Product = ({product: {id, name, description, price, media}}) => {
    const classes = useStyles();
    const addToCart = useAddToCart()
    
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={media?.source} title={name} />
            
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="h5">
                        {price?.formatted}
                    </Typography>
                    <Typography dangerouslySetInnerHTML={{
                        __html: description
                    }} variant="body2" color="textSecondary" />
                </div>
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Card" onClick={addToCart.bind(this, id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
