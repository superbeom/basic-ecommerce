import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {AppBar, Toolbar, IconButton, Badge, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'

import { useCart } from '../../context/ShoppingContext'

import logo from '../../assets/commerce.png'
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles()
    const location = useLocation()
    const cart = useCart()

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar className={classes.toolbar}>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="E-Commerce" className={classes.image} />
                        E-Commerce
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button} >
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit" >
                                <Badge badgeContent={cart?.total_items} color="secondary" >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
