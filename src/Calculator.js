import React from 'react'
import AgentNavbar from './AgentNavbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


export default function Calculator() {
  return (
    <div>
        <AgentNavbar/>
        <form className='mt-5 container'  style={{ maxWidth: '600px'}}>
        <Typography variant='h4' bgcolor={'orange'}  sx={{textAlign:'center',borderRadius:'5px' }}>
            Distance Calculator
          </Typography>
            <Grid container spacing={3} className='mt-3'>
                <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
                    <TextField
                        label="From Pincode"
                        variant="outlined"
                         name="toPincode"
                         id="toPincode"
                        size='small'
                        placeholder="Enter From Pincode"
                        style={{ marginBottom: '8px' }}
                        fullWidth
                    />
                    <TextField
                        label="To Pincode"
                        variant="outlined"
                        name="toLocation"
                        id="toLocation"
                        className='mt-2'
                        size='small'
                        placeholder="Enter To Pincode"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Divider orientation="vertical" color="textPrimary" style={{ height: '30%', borderWidth: '1px', borderStyle: 'solid', fontWeight: 'bold' }} />
                    <Typography variant="body2" color="textPrimary" style={{ marginTop: '8px' }}>
                        (or)
                    </Typography>
                    <Divider orientation="vertical" color="textPrimary" className='mt-2' style={{ height: '30%', borderWidth: '1px', borderStyle: 'solid', fontWeight: 'bold' }}/>
                </Grid>
                <Grid item xs={12} md={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <TextField
                        label="From Location"
                        variant="outlined"
                        name="fromPincode"
                        id="fromPincode"
                        size='small'
                        placeholder="Enter From Location"
                        style={{ marginBottom: '8px' }}
                        fullWidth
                    />
                    <TextField
                        label="To Location"
                        variant="outlined"
                        name="fromLocation"
                        size='small'
                        id="fromLocation"
                        placeholder="Enter To Location"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </Grid>
            </Grid>
        </form>



    </div>
  )
}
