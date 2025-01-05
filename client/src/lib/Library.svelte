<script lang="js">
import { onMount } from "svelte";
import emitter from './eventEmitter.js';

const apiBase = 'http://localhost:8000';
let tokens = null;


let files = $state([]);
let isLoading = true;

async function fetchFiles() {
    try {
        // Get the token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(apiBase + '/files/api/filedata', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        files = data; // Assign the fetched files to the files variable
    } catch (err) {
        console.error('Error fetching files:', err.message);
    } finally {
        isLoading = false;  // Set loading state to false after fetching
    }
}

onMount(async () => {
    await fetchFiles();  // Wait for the fetchFiles to complete before continuing
});

function outputWebLayer(arrayOfObjectFiles, i) {
    return (arrayOfObjectFiles[i].path.split('/').length - 1)
}

function getCurrentPath() {
    return window.location.pathname;
}

function getLayerFromString(strPath) {
    if (strPath.endsWith('/')) {
        strPath = strPath.slice(0, -1);
    }
    return (strPath.split('/').length - 1);
}

function outputWebLayerObjVer(fileObject) {
    return (fileObject.path.split('/').length - 1);
}


function fetchCurrentResources(arrayOfObjectFiles, path) {
    const currentPath = decodeURIComponent(getCurrentPath());
    let currentResources = [];

    for (let element of arrayOfObjectFiles) {
        let currentLayer = getLayerFromString(currentPath);
        let currentElementLayer = outputWebLayerObjVer(element);

        // Decode element path as well
        let decodedElementPath = decodeURIComponent(element.path);

        if (decodedElementPath.startsWith(currentPath) && decodedElementPath !== currentPath) {
            if (currentElementLayer === currentLayer + 1) {
                currentResources.push(element);
            }
        }
    }

    return currentResources;
}

async function fetchUserTokens() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(apiBase + '/auth/tokens', {
            method: 'GET',
            headers: {
                'Authorization': token, // Replace with your token storage mechanism
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

async function downloadFile(filePath) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(apiBase + `/files/download${filePath}`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        });

        if (!response.ok) {
            throw new Error(`Error downloading file: ${response.statusText}`);
        }

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filePath.split('/').pop();  // Extract the file name from the path
        link.click();  // Trigger the download
    } catch (error) {
        console.error("Error downloading file:", error);
    }
}

async function afterLinkDownloadEvent(filePath) {
    downloadFile(filePath);
    fetchAndUpdateTokens();
}

function getParentUrl() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    url.pathname = url.pathname.substring(0, url.pathname.lastIndexOf('/'));
    const parentUrl = url.href;
    return parentUrl;
}


let currentResources = $state([]);
let currentPath = $state(getCurrentPath());

$effect(() => {
    currentResources = fetchCurrentResources(files, currentPath);
})



</script>


<div>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            <tr class="folder">
                <td class="file-name">
                    <a href={getParentUrl()} class="folder-link">
                        <span class="folder-icon">📁</span>../
                    </a>
                </td>
                <td>folder</td>
            </tr>
            {#each currentResources as file, i}
                <tr class={file.type}>
                    <td class="file-name">
                        {#if file.type === 'folder'}
                            <a href={file.path} class="folder-link">
                                <span class="folder-icon">📁</span>{file.name}
                            </a>
                        {:else}
                            <a href="#" onclick={(event) => { 
                                event.preventDefault(); 
                                afterLinkDownloadEvent(file.path); 
                            }} class="file-link">
                                <span class="file-icon">📄</span>{file.name}
                            </a>
                        {/if}
                    </td>
                    <td>{file.type}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
/* Font import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

/* General table styles */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-family: 'Inter', sans-serif;
    color: #fff;
}

/* Header styles */
th {
    padding: 12px;
    text-align: left;
    background-color: #333;
    font-weight: 500;
}

/* Row and cell styling */
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #444;
    font-size: 14px;
    line-height: 1.5;
}

/* Row styling */
tr {
    background-color: #242424;
}

/* Hover effect */
tr:hover {
    background-color: #333;
}

/* Styling for folders vs files */
.folder a {
    color: #4CAF50;
}

.file a {
    color: #bbb;
}

/* Hover effect for links */
a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s;
}

a:hover {
    color: #007BFF;
}

/* Icons for file and folder */
.folder-icon, .file-icon {
    margin-right: 8px;
}

/* Different icon styles for folders and files */
.folder-icon {
    font-size: 18px;
}

.file-icon {
    font-size: 16px;
}

/* Folder link hover effect */
.folder-link:hover {
    color: #4CAF50;
}

/* File link hover effect */
.file-link:hover {
    color: #bbb;
}

/* Styling for the "../" link to look like a folder */
.folder {
    background-color: #242424; /* Same as other folder rows */
}

.folder a {
    color: #4CAF50; /* Same green color as other folder links */
}

.folder a:hover {
    color: #4CAF50; /* Maintain hover effect consistency */
}

</style>