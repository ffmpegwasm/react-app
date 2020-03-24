import React, { useState, useEffect } from 'react';
import { createWorker } from '@ffmpeg/ffmpeg';
import './App.css';

function App() {
  const [videoSrc, setVideoSrc] = useState('');
  const [message, setMessage] = useState('Click Start to transcode');
  const worker = createWorker();
  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await worker.load();
    setMessage('Start transcoding');
    await worker.write('test.avi', '/flame.avi');
    await worker.transcode('test.avi', 'test.mp4');
    setMessage('Complete transcoding');
    const { data } = await worker.read('test.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  return (
    <div className="App">
      <p/>
      <video src={videoSrc} controls></video><br/>
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
