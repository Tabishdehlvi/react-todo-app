import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from '@material-ui/core';


export default function DeleteModal({ isOpenDelete, closeDeleteModal, confirmDeleteModal }) {

  return (
    <div>
      <Dialog
        open={isOpenDelete}
        onClose={closeDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
                    aria-label="close"
                    onClick={closeDeleteModal}
                    
                >
                    <CloseIcon style={{ color: 'black', position: 'absolute',
                        right: 8,
                        top: 8 }} />
                </IconButton>
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: 30,
                height: 400
            }}
        >
          <DeleteForeverIcon
           sx={{ fontSize: 80, color: 'red' }} 
          />
          <h2 style={{margin: 0}}>Are you sure ?</h2>
          <p style={{fontSize: 18, marginBottom: 0}}>Do you really want to delete this Customer ?</p>
          <p style={{fontSize: 18, margin: 0}}>This process can not be undone.</p>
          <Box style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
          <button 
            style={{padding: '10px 40px', cursor: 'pointer', borderRadius: 10, border: 'none', color: 'white', marginRight: 20, backgroundColor: '#333333'}}
            onClick={closeDeleteModal}
          >
            Cancel
          </button>
          <button 
            style={{padding: '10px 40px', cursor: 'pointer', borderRadius: 10, border: 'none', color: 'white', backgroundColor: '#D80000'}}
            onClick={confirmDeleteModal}  
          >
            Delete
          </button>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={closeDeleteModal}>Disagree</Button>
          <Button onClick={closeDeleteModal} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
