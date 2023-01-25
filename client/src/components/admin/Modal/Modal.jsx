import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from '../Form/Form';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4

};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);
  props.get()}

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: "black", padding: "0" }}>{props.btn}</Button>
      <Modal style={{ overflow: "scroll" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ height: "fit-content", width: "50%" }}>
          <Typography  id="modal-modal-title" variant="h6" component="h2">
            {props.title} Workshop
          </Typography>

          <Form btn={props.btn} data={props.data} set={handleClose} />

        </Box>
      </Modal>
    </div>
  );
}