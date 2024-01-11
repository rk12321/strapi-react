import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { API } from "../constant";
import { Link } from 'react-router-dom'


const UploadData = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({ success: null, error: null });

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus({ success: null, error: 'Please select a file.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const excelData = XLSX.utils.sheet_to_json(sheet);
      const formattedData = excelData.map((item) => ({
        data: {
          Name: item.Name,
          Contact: item.Contact,
          Genre: item.Genre
        }
      }));

      try {
        const apiUrl = `${API}/datas`;
        for (let i = 0; i < formattedData.length; i++) {
          const response = await axios.post(apiUrl, formattedData[i]);
          //console.log('Data uploaded to Strapi:', response.data);
        }
        setUploadStatus({ success: 'Data uploaded successfully! Wait 3 seconds, you will be redirected.', error: null });
      } catch (error) {
        console.error('Error uploading data:', error);
        setUploadStatus({ success: null, error: 'Error uploading data. Please try again.' });
      }
    };
    reader.readAsBinaryString(file);

    setTimeout(() => {
      //console.log('a');
      window.location.href = '/dashboard';
    }, 3000);

  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div className="flex justify-center items-center" style={{ "height": "80vh" }}>
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Data</h2>
        <div className="mb-6">
          <label htmlFor="file-upload" className="block mb-1 text-sm font-medium text-gray-700">
            Upload Excel file:
          </label>
          <input type="file" id="file-upload" onChange={handleFileChange} />

          <button
            type="button"
            className="mt-4 w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-500 transition duration-300"
            onClick={handleFileUpload}
          >
            Submit
          </button>
        </div>
        {uploadStatus.success && <p className="text-green-500 mt-4">{uploadStatus.success}</p>}
        {uploadStatus.error && <p className="text-red-500 mt-4">{uploadStatus.error}</p>}
      </div>
    </div>
  );
};

export default UploadData;
