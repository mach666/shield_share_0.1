import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import BackupSharpIcon from "@material-ui/icons/BackupSharp";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import images from "./images.jpg";
import image1 from "./image2.jpg"
import axios from "axios";
import {
  Typography,
  Container,
  Button,
  Box,
  AppBar,
  Toolbar,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

function FileBin() {
  const [file, setFile] = useState(null);
  const [choosed, setChoosed] = useState(false);
  const [resData, setdata] = useState({});

  
  const [open, setOpen] = useState(false);

   
  const submitHandler1 = (e) => {
    if (choosed) {
      e.preventDefault();
      const FILEDATA = new FormData();
      FILEDATA.append("file", file);

      axios
        .post("http://localhost:8000/uploadfile", FILEDATA, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((Res) => {
          if (Res) {
        
            setdata({
              ...resData,
              fileurl: Res.data.Res.fileurl,
              msg: Res.data.msg,
            });

            setChoosed(false);
            setOpen(true);
          }
        })
        .catch((Err) => {
          console.log(Err);
        });
    }
  };
  const useStyle = makeStyles((theme) => ({
    root: {
      width: "100vw",
      height: "100vh",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    footer: {
      backgroundColor: theme.palette.primary,
      margin: "0px",
      width: "100vw",
    },
  }));
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyle();
  return (
    <Container className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" align="left" style={{ flexGrow: 1 }}>
           SHIELD SHARE
          </Typography>
          <Box mr={2} my={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={submitHandler1}
            >
              <BackupSharpIcon style={{ margin: 2 }}>Backup</BackupSharpIcon>
              UPLOAD
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <br />
      <div className="container" mt={50}>
        <img src={image1} height="200px" width="300px" alt="Cloud Icon" />
      </div>
      <Box mr={2} mt={10}>
        <Button
          variant="contained"
          component="label"
          color="Primary"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setChoosed(true);
          }}
        >
          SELECT YOUR UPLOAD
          <input type="file" hidden />
        </Button>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <p id="transition-modal-description">{resData.fileurl}</p>
            <CopyToClipboard text={resData.fileurl}>
              <Button variant="contained" color="secondary">
                <FileCopyIcon>FileCopy</FileCopyIcon>
              </Button>
            </CopyToClipboard>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}
export default FileBin;
