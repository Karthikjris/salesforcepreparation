import React, { useState } from 'react';
import { Card, CardContent, Button, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
    },
  },
});

const Admindoc = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      setIsUploading(true);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
  };

  const handleCancelUpload = () => {
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#3b82f6' }}>
        <Card style={{ width: '24rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <CardContent style={{ padding: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>UPLOAD FILES</h2>

              {file && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{file.name}</p>
                  {isUploading && (
                    <>
                      <LinearProgress variant="determinate" value={uploadProgress} style={{ margin: '0.5rem 0' }} />
                      <button
                        onClick={handleCancelUpload}
                        style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Pause
                      </button>
                    </>
                  )}
                </div>
              )}

              <label
                htmlFor="file-input"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed #d1d5db',
                  borderRadius: '0.5rem',
                  padding: '2.5rem',
                  cursor: 'pointer',
                  backgroundColor: '#f9fafb',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                <CloudUploadIcon style={{ fontSize: 40, color: '#3b82f6', marginBottom: '0.5rem' }} />
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Drag files here or <span style={{ color: '#3b82f6' }}>browse</span>
                </span>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </label>

              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                variant="contained"
                style={{ marginTop: '1rem', width: '100%', backgroundColor: '#3b82f6', color: '#fff' }}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default Admindoc;
