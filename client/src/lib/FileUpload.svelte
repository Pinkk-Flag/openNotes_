<script>
    let selectedFile;
    const apiBase = "http://localhost:8000"
  
    // Function to handle file selection
    const handleFileChange = (event) => {
      selectedFile = event.target.files[0];
    };
  
    // Function to upload the file to the server
    const uploadFile = async () => {
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(apiBase + '/files/upload', {
          method: 'POST',
          headers: {
            'Authorization': token,
          },
          body: formData,
        });
  
        if (response.ok) {
          alert('File uploaded successfully!');
        } else {
          alert('Failed to upload file.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file.');
      }
    };

    async function fetchUserTokens() {
    try {
        const response = await fetch(apiBase + '/auth/tokens', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token'), // Replace with your token storage mechanism
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching tokens: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`User has ${data.tokens} tokens`);
        return data.tokens;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

const handleInputChange = (event) => {
        handleFileChange(event);
        fetchUserTokens();
    };

const uploadFileWrapper = async () => {
        await fetchUserTokens();
        uploadFile();
    };
  </script>
  
  <div class="upload-container">
    <h2>Upload a File</h2>
    <input type="file" onchange={(event) => handleInputChange(event)} />
    <button onclick={uploadFileWrapper} class="upload-button">Upload</button>
  </div>
  
  <style>
    .upload-container {
      font-family: 'Roboto Mono';
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      max-width: 400px;
      margin: 20px auto;
      background-color: #242424;
    }
  
    h2 {
      font-size: 1.5em;
      margin-bottom: 10px;
      color: white;

    }
  
    input[type="file"] {
      padding: 10px;
      margin-bottom: 15px;
      font-size: 1em;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .upload-button {
      padding: 10px 20px;
      font-size: 1.2em;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .upload-button:hover {
      background-color: #45a049;
    }
  </style>
  