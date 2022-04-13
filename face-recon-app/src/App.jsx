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

  return (
    <div className="App">
      <h1>AM Project Name</h1>
      <input type="file" accept=".jpg, .jpeg, .png" onChange={fileSelectedHandler} />
      {selectedFile &&  <img className="previewImg" alt="Preview" src={preview} /> }
    </div>
  );
}

export default App;
