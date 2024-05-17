import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';
import { Button, Card, CardMedia, Grid, Typography, Box, Paper, Container, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Navbar from './navbar';
import './styles.css'; // Ruta al archivo CSS

const ImageDropzone = ({ getRootProps, getInputProps }) => (
  <Box {...getRootProps()} className="boxImageDropzone">
    <input {...getInputProps()} />
    <Typography variant="body1">Arrastra y suelta una imagen aquí o haz clic para seleccionar una</Typography>
  </Box>
);

const WebcamSection = ({ showWebcam, handleTakePhoto, handleToggleWebcam, webcamRef }) => (
  <>
    {showWebcam && (
      <Box className="boxWebcamSection">
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="webcamSectionStyles" />
        <Button variant="contained" onClick={handleTakePhoto} sx={{ mt: 2 }} startIcon={<CameraIcon />}>
          Tomar Foto
        </Button>
      </Box>
    )}
    <Box className="boxWebcamSectionButton">
      <Button variant="contained" onClick={handleToggleWebcam} startIcon={<CameraIcon />}>
        {showWebcam ? 'Cerrar Cámara' : 'Abrir Cámara'}
      </Button>
    </Box>
  </>
);


const ImagePreview = ({ selectedImage }) => {
  if (!selectedImage) return null;
  return (
    <Grid item>
      <Card className="cardImagePreview">
        <CardMedia
          component="img"
          image={selectedImage}
          alt="Vista previa"
          className="cardMediaImagePreview"
        />
      </Card>
    </Grid>
  );
};

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [isDropzoneActive, setIsDropzoneActive] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const webcamRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
      setOpenSnackbar(true);
      setSnackbarMessage('Imagen cargada exitosamente');
    };

    if (file) {
      const extension = file.name.split('.').pop().toLowerCase();
      if (extension !== 'png' && extension !== 'jpeg' && extension !== 'jpg') {
        setSnackbarMessage('La imagen no está en el formato seleccionado');
        setOpenSnackbar(true);
      } else {
        reader.readAsDataURL(file);
        setShowWebcam(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/png, image/jpeg',
    multiple: false
  });

  const handleTakePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImage(imageSrc);
    setShowWebcam(false);
    setOpenSnackbar(true);
    setSnackbarMessage('Imagen tomada exitosamente');
  };

  const handleToggleWebcam = () => {
    setShowWebcam(!showWebcam);
    setSelectedImage(null);
    setIsDropzoneActive(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Navbar />
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <ImageDropzone getRootProps={getRootProps} getInputProps={getInputProps} />
            <WebcamSection
              showWebcam={showWebcam}
              handleTakePhoto={handleTakePhoto}
              handleToggleWebcam={handleToggleWebcam}
              webcamRef={webcamRef}
            />
          </Grid>
          <Grid item>
            <ImagePreview selectedImage={selectedImage} />
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default App;
