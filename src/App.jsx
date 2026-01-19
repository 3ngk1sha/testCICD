import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Bạn có thể dùng CSS mặc định hoặc xoá đi

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Vui lòng chọn file!");

    const formData = new FormData();
    formData.append('video', file);

    setLoading(true);
    setVideoUrl(null);

    try {
      // Gửi file sang Backend
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Nhận lại link video
      setVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error("Lỗi upload:", error);
      alert("Có lỗi xảy ra khi xử lý video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Blackmagic Video Processor</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input type="file" accept=".mov, .mp4" onChange={handleFileChange} />
        <button 
          onClick={handleUpload} 
          disabled={loading}
          style={{ marginLeft: '10px', padding: '5px 15px' }}
        >
          {loading ? 'Uploading' : 'Upload & Convert'}
        </button>
      </div>

      {loading && <p>Uploading</p>}

      {videoUrl && (
        <div>
          <h3>Result:</h3>
          {/* Thẻ Video HTML5 chuẩn */}
          <video 
            controls 
            width="600" 
            src={videoUrl} 
            style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            No support video
          </video>
        </div>
      )}
    </div>
  );
}

export default App;