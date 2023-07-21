"use client"

import React, { useState } from 'react'
import Image from 'next/image';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import AddCustomerModal from './AddCustomerModal';
import DeleteModal from './DeleteModal';
import { deleteCustomer } from '@/store/customerSlice';
import { useDispatch } from 'react-redux';

const CustomerTable = ({ customerData }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);


  const [currCustomer, setCurrCustomer] = useState()
    const classes = useStyles();
    const dispatch = useDispatch()

    return (
        <div>
            <Paper sx={{ width: "100%" }}>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table" >
                        <TableHead style={{ backgroundColor: '#156754' }}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell className={classes.tableCell} align="center">Customer ID</TableCell>
                                <TableCell className={classes.tableCell} align="center">Customer Name</TableCell>
                                <TableCell className={classes.tableCell} align="center">Customer Email</TableCell>
                                <TableCell className={classes.tableCell} align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customerData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell width="200">
                                        <img
                                            width="60px"
                                            height="60px"
                                            src={row.avatar}
                                            alt='Avatar'
                                        />
                                        {/* {row.avatar} */}
                                    </TableCell>
                                    <TableCell align='center' width="200">{row.id}</TableCell>
                                    <TableCell align="center" width="200" style={{
                                        color: '#015249',
                                        textDecoration: 'underline'
                                    }}>{`${row.first_name} ${row.last_name}`}</TableCell>
                                    <TableCell align="center" width="250">{row.email}</TableCell>
                                    <TableCell align="right" width="250">
                                        <Box style={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
                                            <Button variant="contained" style={{ marginRight: 15}} onClick={() => {
                                            setCurrCustomer(row)
                                            setIsOpen(true)
                                            }}
                                            > Edit
                                            </Button>
                                            <Button variant="contained" onClick={() => {
                                                setCurrCustomer(row)
                                                setIsOpenDelete(true)
                                            }}
                                            > Delete
                                            </Button>
                                        </Box>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
   <AddCustomerModal isOpen={isOpen} closeModal={() => {
    setCurrCustomer()
    setIsOpen(false)
    }} type="edit" customerRecord={currCustomer} modalHeading={'Edit Customer'} modalButton={'EDIT CUSTOMER'} />
   <DeleteModal isOpenDelete={isOpenDelete} closeDeleteModal={() => {
       setIsOpenDelete(false)
       setCurrCustomer()
}} confirmDeleteModal={() =>{
    dispatch(deleteCustomer(currCustomer))
    setIsOpenDelete(false)
    setCurrCustomer()
    }} />
        </div>
    )
}

export default CustomerTable


const useStyles = makeStyles({
    table: {
        minWidth: '100%',
        borderRadius: '10px 0 0 10px', // Set border radius here
        m: 4,
        width: '5rem',
        height: '5rem',
        overflow: `scroll`,
    },
    tableCell: {
        color: 'white',
        fontWeight: 600
    }
});