import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Typography,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import './App.css';

const SPaper = styled(Paper)({
  backgroundColor: 'white',
  height: '700px',
  width: '80%',
  maxWidth: '1000px',
  minWidth: '600px',
  margin: 'auto',
  marginTop: '100px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Title = styled(Typography)({
  marginTop: '8px',
  // marginBottom: '10px',
  color: '#2c6fd1',
  borderBottom: '1px solid black',
  width: '60%',
  textAlign: 'center'
})

const Container = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const SStack = styled(Stack)({
  textAlign: 'center'
})

const Input = styled('input')({
  display: 'none',
})

const ImgPreview = styled('img')({
  height: '496px'
})

const SButton = styled(Button)({
  marginTop: '10px',
})

const MainButton = styled(SButton)({
  width: '200px'
})

const NoImageDiv = styled('div')({
  height: '496px',
  width: '496px',
  backgroundColor: 'whitesmoke'
})

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile])

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const clearSelectedFile = () => {
    setSelectedFile();
  }

  const predictFelling = () => {
    if (selectedFile) {
      var formData = new FormData()
      formData.append('file', selectedFile)
      var oReq = new XMLHttpRequest();
      oReq.open("POST", "http://localhost:9874/", true)

      oReq.onload = function (oEvent) {
        if (oReq.status === 200) {
          console.log(oReq.response)
        }
      }

      oReq.send(formData)


    } else {
      console.log("Nenhuma imagem para analisar");
    }
  }

  return (
    <SPaper elevation={6} className="App">
      <Title variant="h4">Expression Recognizer</Title>
      <Container>
        <SStack spacing={0.5} alignItems="center">
          {selectedFile ? (
            <ImgPreview alt="Preview" src={preview} />
          ) : (
            <NoImageDiv />
          )}
          <label style={{ marginBottom: '10px' }}>
            <Input type="file" accept=".jpg, .jpeg, .png" onChange={fileSelectedHandler} />
            <SButton id="upload-button" variant="outlined" size="small" component="span">
              Escolher Arquivo
            </SButton>
          </label>
          {/* State when clearing not updating correct find out why */}
          {/* <button onClick={clearSelectedFile}>Clear Image</button> */}
          <MainButton variant="contained" onClick={predictFelling}>Prever Sentimento</MainButton>
        </SStack>
      </Container>
    </SPaper>
  );
}
export default App;
