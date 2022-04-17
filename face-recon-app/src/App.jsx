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
  height: '600px',
  width: '80%',
  maxWidth: '1000px',
  margin: 'auto',
  marginTop: '100px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Title = styled(Typography)({
  marginTop: '8px',
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
  maxWidth: '256px',
})

const SButton = styled(Button)({
  marginTop: '10px',
  marginBottom: '10px'
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
    if(selectedFile) {
      console.log("Analisando");
    } else {
      console.log("Nenhuma imagem para analisar");
    }
  }

  return (
    <SPaper elevation={6} className="App">
      <Title variant="h4">Expression Recognizer</Title>
      <Container>
        <SStack spacing={0.5}>
          {selectedFile &&
          <ImgPreview alt="Preview" src={preview} />
          }
          <label>
            <Input type="file" accept=".jpg, .jpeg, .png" onChange={fileSelectedHandler} />
            <SButton id="upload-button" variant="outlined" size="small" component="span">
              Escolher Arquivo
            </SButton>
          </label>
          {/* State when clearing not updating correct find out why */}
          {/* <button onClick={clearSelectedFile}>Clear Image</button> */}
          <Button variant="contained" onClick={predictFelling}>Prever Sentimento</Button>
        </SStack>
      </Container>
    </SPaper>
  );
}
export default App;
