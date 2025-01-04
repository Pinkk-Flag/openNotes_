<script lang="js">
import { onMount } from "svelte";

let files = $state([]);
let isLoading = true;
const apiBase = 'http://localhost:8000';

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
        console.log(`User has ${data.tokens} tokens`);
        return data.tokens;
    } catch (error) {
        console.error("Error:", error);
        return null;
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
    fetchUserTokens();
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
            </tr>
        </thead>
        <tbody>
            <!-- TODO SOLVE THE PARENT DIRECTORY (../) PROBLEM!!!
            <tr>
                <td>
                    <a href={getParentDirectory(currentPath)}>../</a>
                </td>
            </tr>

            -->
            {#each currentResources as file, i}
                <tr>
                    <td class={file.type}>
                        {#if file.type === 'folder'}
                            <a href={file.path}>{file.name}</a>
                        {:else}
                        <a href="#" onclick={(event) => { 
                            event.preventDefault(); 
                            afterLinkDownloadEvent(file.path); 
                        }}>{file.name}</a>
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>







<style>
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-family: 'Roboto Mono', monospace;
        color: white;
    }

    td {
        padding: 10px;
        text-align: left;
        border: 0px;
    }

    tr {
        background-color: #1b1b1b;
    }

    .file {
        color: #555;
    }

    .action {
        color: #007BFF;
        cursor: pointer;
    }

    .action:hover {
        text-decoration: underline;
    }
</style>