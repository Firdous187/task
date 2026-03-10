import React, { useState } from "react";
import axios from "axios";

function UploadCSV() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      setResult(res.data);

    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (

    <div>
      <h2>Upload CSV File</h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        Upload
      </button>

      {result && (
        <div>
          <h3>Upload Result</h3>
          <p>Total Rows: {result.totalRows}</p>
          <p>Inserted: {result.inserted}</p>
          <p>Failed: {result.failed.length}</p>
        </div>
      )}

    </div>

  );
}

export default UploadCSV;