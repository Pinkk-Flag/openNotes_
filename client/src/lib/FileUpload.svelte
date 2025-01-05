<script>
    let selectedFile;
    const apiBase = "http://localhost:8000"
    import emitter from './eventEmitter.js';
    let tokens = null;
  
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

  // Get the current path (relative to root)
  const currentPath = decodeURIComponent(window.location.pathname);

  // Prepare the form data
  const formData = new FormData();
  formData.append('file', selectedFile);
  formData.append('path', currentPath); // Add the current path to the form data

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
        return data.tokens;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function fetchAndUpdateTokens() {
    try {
        tokens = await fetchUserTokens(); // Fetch tokens asynchronously
        emitter.emit('tokensUpdated', tokens); // Notify listeners
    } catch (error) {
        console.error('Error fetching tokens in library.js:', error);
    }
}

const handleInputChange = (event) => {
        handleFileChange(event);
        fetchAndUpdateTokens();
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
/* General container styling */
.upload-container {
    font-family: 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    border: 1px solid #444;
    border-radius: 8px;
    max-width: 400px;
    margin: 20px auto;
    background-color: #242424;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease;
}

/* Hover effect on the container */
.upload-container:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

/* Heading styling */
h2 {
    font-size: 1.6em;
    margin-bottom: 20px;
    color: #fff;
    font-weight: 500;
}

/* Input file styling */
input[type="file"] {
    padding: 12px;
    margin-bottom: 20px;
    font-size: 1em;
    border: 1px solid #444;
    border-radius: 6px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

/* Input file hover effect */
input[type="file"]:hover {
    background-color: #555;
}

/* Upload button styling */
.upload-button {
    padding: 12px 25px;
    font-size: 1.2em;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Button hover effect */
.upload-button:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}

/* Button active effect */
.upload-button:active {
    transform: translateY(1px);
}

/* Responsive adjustment for smaller screens */
@media (max-width: 480px) {
    .upload-container {
        padding: 20px;
        max-width: 90%;
    }

    h2 {
        font-size: 1.4em;
    }

    .upload-button {
        font-size: 1.1em;
        padding: 10px 20px;
    }
}

</style>
