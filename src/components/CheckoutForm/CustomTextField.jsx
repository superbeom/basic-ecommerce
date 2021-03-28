import React from 'react'
import {TextField, Grid} from '@material-ui/core'
import {useFormContext, Controller} from 'react-hook-form'

const FormInput = ({ name, label }) => {
    const { control} = useFormContext()
    const isError = false;
    
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                as={TextField}
                label={label}
                fullWidth
                required
                error={isError}
                defaultValue=""
      />
        </Grid>
    )
}

export default FormInput
