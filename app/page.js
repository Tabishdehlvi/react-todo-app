"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core/styles';
import CustomerTable from './components/CustomerTable';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Pagination } from "@mui/material";
import AddCustomerModal from './components/AddCustomerModal';
import { initializeCustomers } from '@/store/customerSlice';


const drawerWidth = 300;

export default function ResponsiveDrawer() {

  const classes = useStyles();
  const dispatch = useDispatch()
  const {customers} = useSelector(state => state.customer)
  const [customerData, setCustomerData] = useState([])
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  

  const modalHeading = 'Add New Customer';
  const modalButton = 

  useEffect(() => {
    initiazeData()
  }, [])

  const initiazeData = (event, value) => {
    const dataFromLocalStorage = localStorage.getItem("customers")

    let dataFromLocal = JSON.parse(dataFromLocalStorage)
    if(dataFromLocal && dataFromLocal.length > 0){
      setCustomerData(dataFromLocal)
      dispatch(initializeCustomers(dataFromLocal))
    }else{
      fetch("https://reqres.in/api/users?page=1")
      .then((data) => data.json())
      .then((data) => {
        setCustomerData(data.data)
        if(data.data.length > 0){
          dispatch(initializeCustomers(data.data))
        }
      })
    }
        
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Image src="https://saviynt.com/wp-content/uploads/2019/04/saviynt-logo.svg" className='my-logo' alt="logo" width={200} height={150} />
      </Toolbar>
      <List>
        <ListItem>
          <ListItemButton style={{ backgroundColor: '#043933', borderRadius: '8px', padding: 10 }}>
            <ListItemIcon>
              <Diversity1Icon style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="CUSTOMERS" style={{ color: 'white' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar style={{ backgroundColor: '#FFFFFF' }}>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" className={classes.myHead}>
            CUSTOMERS
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#015249 ' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#015249 ' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        style={{ backgroundColor: '#F3F3F3' }}
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Button variant="contained" className={classes.myBtn} onClick={() => setIsOpen(true)}>
          <AddIcon />ADD NEW CUSTOMER
        </Button>

        <Box m="40px 0 0 0">
              <CustomerTable customerData={customers} page={page} />
              <Box style={{display: 'flex', justifyContent: 'center', margin: 30}}>
              {/* <Pagination count={3} page={page} onChange={handleChange}/> */}

              </Box>
        </Box>
      </Box>
   <AddCustomerModal isOpen={isOpen} type="add" closeModal={() => setIsOpen(false)}  modalHeading={'Add New Customer'} modalButton={'ADD CUSTOMER'} />
    </Box>
  );
}


const useStyles = makeStyles({
  myHead: {
    color: 'black',
    padding: 5,
    fontWeight: 600
  },
  myBtn : {
  padding: '15px',
  backgroundColor: '#3A9776',
  "&:hover" : {
    backgroundColor: '#156754'
  }
  }
});