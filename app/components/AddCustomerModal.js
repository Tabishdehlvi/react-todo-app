"use client"

import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField } from '@material-ui/core';
import { ConstructionOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, updateCustomer } from '@/store/customerSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[800],
                    }}
                >
                    <CloseIcon style={{ color: 'white', position: 'absolute',
                        right: -66,
                        top: -15, }} />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const DUMMY_IMAGE = "https://reqres.in/img/faces/5-image.jpg"

export default function AddCustomerModal({ isOpen, closeModal, modalButton, modalHeading, type, customerRecord = false }) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {customers} = useSelector(state => state.customer);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name:"",
    email:""
})


  React.useEffect(()=>{
    if(type === "edit"){
    setFormData({
        first_name: customerRecord.first_name,
        last_name: customerRecord.last_name,
        email: customerRecord.email
    })
}
  },[type, customerRecord])


  const handleChange = (value, key) => {
    setFormData({
        ...formData,
        [key]: value,
    })
  }


  const handleSubmit = () => {

    const allIds = customers.length > 0 ? customers.map(c => Number(c.id)) : [0]

    const maxIdNumber = Math.max.apply(null, allIds)

    const objForNewRecord = type === "edit"? {
        ...customerRecord,
        ...formData
    } : {
        ...formData,
        id:maxIdNumber+1,
        avatar: DUMMY_IMAGE
    }

    dispatch(type === "edit" ?  updateCustomer(objForNewRecord) : addCustomer(objForNewRecord))


    setFormData({last_name:"", first_name:"", email:""})
    closeModal()

  } 

    return (
        <div>
            <BootstrapDialog
                onClose={closeModal}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={closeModal} style={{ backgroundColor: '#3D9A78', color: 'white', display: 'flex', justifyContent: 'center' }}>
                    <Box>
                        <h2>{modalHeading}</h2>
                    </Box>
                </BootstrapDialogTitle>
                <DialogContent dividers>

                    <form>
                        <TextField
                            style={{ width: "400px", margin: "10px", borderRadius: 8 }}
                            type="text"
                            value={formData.first_name}
                            onChange={(e)=>handleChange(e.target.value,"first_name")}
                            label="Customer Name"
                            variant="outlined"
                        />

                        <br />
                        <TextField
                            style={{ width: "400px", margin: "10px", borderRadius: 8 }}
                            type="text"
                            value={formData.last_name}
                            onChange={(e)=>handleChange(e.target.value,"last_name")}
                            label="Customer Name"
                            variant="outlined"
                        />

                        <br />

                        <TextField
                            style={{ width: "400px", margin: "10px", borderRadius: 8 }}
                            type="email"
                            label="Email"
                            value={formData.email}
                            onChange={(e)=>handleChange(e.target.value,"email")}
                            variant="outlined"
                        />

                        <br />
                        <Button onClick={handleSubmit} variant="contained" className={classes.myBtn} disabled={!formData.first_name || !formData.last_name || !formData.email}
                        >
                            {modalButton}
                        </Button>
                    </form>


                </DialogContent>
                
            </BootstrapDialog>
        </div>
    );
}

const useStyles = makeStyles({
    myBtn : {
    padding: '15px',
    backgroundColor: '#3A9776',
    width: "400px", margin: "10px", borderRadius: 8,
    "&:hover" : {
      backgroundColor: '#156754'
    }
    }
  });