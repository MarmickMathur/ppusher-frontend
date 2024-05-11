import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ mergedBuffer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    // Initialize the audio context when the component mounts
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);

    // Clean up audio context when the component unmounts
    return () => {
      if (context.state !== 'closed') {
        context.close();
      }
    };
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      source.stop();
      setStartTime(audioContext.currentTime); // Save the current playback position
    } else {
      const buffer = audioContext.createBufferSource();
      buffer.buffer = mergedBuffer;
      buffer.connect(audioContext.destination);
      buffer.start(0, startTime); // Start playback from the saved position
      setSource(buffer);
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
