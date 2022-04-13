import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [selectedFile, setSelectedFile]= useState();
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
    <div className="App">
      <h1>AM Project Name</h1>
      {selectedFile ? 
      <img className="previewImg" alt="Preview" src={preview} /> : 
      <div></div>
      }
      <input type="file" accept=".jpg, .jpeg, .png" onChange={fileSelectedHandler} />
      {/* State when clearing not updating correct find out why */}
      {/* <button onClick={clearSelectedFile}>Clear Image</button> */}
      <button onClick={predictFelling}>Prever Sentimento</button>
    </div>
  );
}

export default App;