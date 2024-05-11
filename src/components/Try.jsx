import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ mergedBuffer }) => {
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    return () => {
      if (context.state !== 'closed') {
        context.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioContext || !mergedBuffer) return;
    if(isPlaying){
      source.stop();
      setStartTime(0);
    }
    const newSource = audioContext.createBufferSource();
    newSource.buffer = mergedBuffer;
    newSource.connect(audioContext.destination);
    newSource.start(0, startTime);
    setSource(newSource);
    setIsPlaying(true);
  }, [audioContext, mergedBuffer]);

  const togglePlayback = () => {
    if (!audioContext || !mergedBuffer) return;

    if (isPlaying) {
      source.stop();
      setStartTime(audioContext.currentTime);
    } else {
      const newSource = audioContext.createBufferSource();
      newSource.buffer = mergedBuffer;
      newSource.connect(audioContext.destination);
      newSource.start(0, startTime);
      setSource(newSource);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlayback}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default AudioPlayer;
