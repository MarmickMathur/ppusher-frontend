import { useEffect, useState, useRef } from "react";
import AudioPlayer from "./Try";

const Peerplayer = (song) => {
  const [audioFile, setAudioFile] = useState(null);
  const [mergedBuffer, setmergedbuffer] = useState(null);

  const sourceNode = useRef(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  async function splitAudio() {
    const file = audioFile;
    if (!file) {
      alert("Please select an audio file.");
      return;
    }

    const audiocontext = new AudioContext();
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const buffer = await audiocontext.decodeAudioData(fileReader.result);
      const numberOfChunks = 5;
      const chunkSize = Math.ceil(buffer.length / numberOfChunks);

      const db = await openDatabase();
      const transaction = db.transaction("audioChunks", "readwrite");
      const chunksStore = transaction.objectStore("audioChunks");

      for (let i = 0; i < numberOfChunks; i++) {
        const startOffset = i * chunkSize;
        const endOffset = Math.min(startOffset + chunkSize, buffer.length);
        const chunkData = buffer
          .getChannelData(0)
          .subarray(startOffset, endOffset);

        // Store the chunk with index as key
        chunksStore.put(chunkData, i);

        // Print the chunk
        console.log(`Chunk ${i + 1}`, chunkData);
      }

      await transaction.complete;
      db.close();
    };

    fileReader.readAsArrayBuffer(file);
  }

  async function mergeAudio() {
    const db = await openDatabase();
    if (!db) {
      console.error("Error opening database.");
      return;
    }

    const transaction = db.transaction("audioChunks", "readonly");
    const chunksStore = transaction.objectStore("audioChunks");

    const audioChunks = [];
    for (let i = 0; i < 5; i++) {
      const getRequest = chunksStore.get(i);
      getRequest.onsuccess = function (event) {
        const chunk = event.target.result;
        if (chunk) {
          audioChunks.push(chunk);
          if (audioChunks.length === 5) {
            console.log("All chunks fetched:", audioChunks);
            mergeChunks(audioChunks);
          }
        } else {
          console.error("Chunk not found for key:", i);
        }
      };
      getRequest.onerror = function (event) {
        console.error("Error fetching chunk", event.target.error);
      };
    }
  }

  function mergeChunks(chunks) {
    const audiocontext = new AudioContext();
    const mergedLength = chunks.reduce(
      (totalLength, chunk) => totalLength + chunk.length,
      0
    );
    const sampleRate = chunks[0]?.sampleRate || 44100;
    const mergedbuffer = audiocontext.createBuffer(1, mergedLength, sampleRate);
    const mergedChannelData = mergedbuffer.getChannelData(0);
    let offset = 0;
    for (const chunk of chunks) {
      mergedChannelData.set(chunk, offset);
      offset += chunk.length;
    }

    // Print the size of the merged audio
    const mergedSizeMB = (mergedLength * 4) / (1024 * 1024); // Each sample is 4 bytes
    console.log("Size of Merged Audio:", mergedSizeMB.toFixed(2), "MB");

    setmergedbuffer(mergedbuffer);

    // Play the merged audio
    // const source = audiocontext.createBufferSource();
    // source.buffer = mergedBuffer;
    // sourceNode.current = source;
    // source.connect(audiocontext.destination);
    // source.start();
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("audioChunksDB", 1);
      request.onerror = function (event) {
        reject("Error opening database");
      };
      request.onsuccess = function (event) {
        resolve(event.target.result);
      };
      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        db.createObjectStore("audioChunks");
      };
    });
  }

  return (
    <>
      <div>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button onClick={mergeAudio}>Merge Audio</button>
        <button onClick={splitAudio}>Split Audio</button>
        <AudioPlayer mergedBuffer={mergedBuffer} />
      </div>
    </>
  );
};


export default Peerplayer;
