import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='main-wrapper' style={{ backgroundImage: `url('https://images.unsplash.com/photo-1661010854520-32ab127f1783?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
      <div className='container'>
        <div className='wrapper'>
          <h1>FireFly!</h1>
          <p>Upload and share the download link🔗.</p>

          <button onClick={() => onUploadClick()}>Upload</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <a href={result} target='_blank'>{result}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
