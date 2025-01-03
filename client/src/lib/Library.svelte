<script lang="js">
import { onMount } from "svelte";

let files = $state([]);
let isLoading = true;

async function fetchFiles() {
    try {
        const response = await fetch('http://localhost:8000/files/api/filedata');
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        files = await response.json();
    } catch (err) {
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
                            <a href="http://localhost:8000/files/download{file.path}" target="_blank">{file.name}</a>
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