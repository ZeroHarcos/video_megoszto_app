// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  // Fájl kiválasztása
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Feltöltés indítása
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Kérjük, válasszon ki egy fájlt!');
      return;
    }

    const formData = new FormData();
    // A 'video' kulcsnak meg kell egyeznie a server/routes/videoRoutes.js-ben lévővel
    formData.append('video', selectedFile); 
    formData.append('title', title);

    try {
      setUploadMessage('Feltöltés folyamatban...');
      
      const response = await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadMessage(`Sikeres feltöltés! S3 URL: ${response.data.video.s3Url}`);
      setTitle('');
      setSelectedFile(null);

    } catch (error) {
      console.error('Feltöltési hiba:', error);
      setUploadMessage(`Hiba történt a feltöltés során: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎬 Video Feltöltés S3-ra</h1>
      
      <input 
        type="text" 
        placeholder="Video cím" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        style={{ margin: '10px 0', padding: '8px', width: '300px' }}
      />
      <br/>
      <input 
        type="file" 
        accept="video/*" 
        onChange={handleFileChange} 
        style={{ margin: '10px 0' }}
      />
      <br/>
      <button 
        onClick={handleUpload} 
        disabled={!selectedFile}
        style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Feltöltés
      </button>

      <p style={{ marginTop: '20px', color: uploadMessage.includes('Hiba') ? 'red' : 'blue' }}>
        {uploadMessage}
      </p>
    </div>
  );
}

export default App;