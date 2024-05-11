import { useEffect, useState } from "react";
import AutocompleteSearch from "./autoinput";

const SongForm = () => {
  const [title, settitle] = useState("");
  const [artist, setartist] = useState("");
  const [tags, settags] = useState([]);
  const [rating, setrating] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleChange = async (event) => {
    const value = event.target.value;
    settitle(value);
  };

  useEffect(() => {
    splitAudio();
  }, [audioFile]);

  async function splitAudio() {
    const file = audioFile;
    if (!file) {
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
        <label htmlFor="title">Title</label>
        <div>
          <AutocompleteSearch
            value={title}
            oninputchange={settitle}
            id="title"
            name="title"
            type="text"
          />
        </div>
      </div>

      <div>
        <label htmlFor="artist">artist</label>
        <AutocompleteSearch
          oninputchange={setartist}
          id="artist"
          ind={3}
          name="artist"
          type="text"
        />
      </div>

      <div>
        <label htmlFor="tags">tags</label>
        <AutocompleteSearch
          oninputchange={settags}
          id="tags"
          ind={1}
          name="tags"
          type="text"
        />
      </div>

      <div>
        <label htmlFor="rating">rating</label>
        <AutocompleteSearch
          oninputchange={setrating}
          id="rating"
          ind={0}
          name="rating"
          type="number"
        />
      </div>

      <div>
        <label htmlFor="file">Song File</label>
        <input id="file" name="file" type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Submit</button>
    </>
  );
};

export default SongForm;
