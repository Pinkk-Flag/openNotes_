<script>
import { onMount } from "svelte";
import noteToken from '../assets/noteToken.svg'
const apiBase = 'http://localhost:8000'

import emitter from './eventEmitter.js';
let tokenAmount = $state(0);
let rootUrl = $state(window.location.origin);

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


emitter.on('tokensUpdated', (tokens) => {
     fetchUserTokens().then((res) => {
        tokenAmount = res;
     });
});

onMount(async () => {
    fetchUserTokens().then((res) => {
        tokenAmount = res;
     });  // Wait for the fetchFiles to complete before continuing
});
</script>

<main>
    <div class="header-container">
        <p id="openNotesTextLogo"><a href={rootUrl}>openNotes_</a></p>
        <div class="token-container">
            <img src={noteToken} alt="Token Icon" class="token-icon" />
            <p class="token-amount">Current amount of tokens: {tokenAmount}</p>
        </div>
    </div>
</main>

<style>
/* Header container styling */
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    background-color: transparent; /* No background box */
    transition: background-color 0.3s ease;
}

/* Token container for better alignment */
.token-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
}

/* Token icon styling */
.token-icon {
    width: 35px; /* Adjust size of the icon */
    height: 35px;
    transition: transform 0.3s ease, filter 0.3s ease;
}

/* Token icon hover effect */
.token-icon:hover {
    transform: scale(1.2);
    filter: drop-shadow(0 0 5px rgba(0, 123, 255, 0.5));
}

/* OpenNotes text logo styling */
#openNotesTextLogo {
    font-family: 'Roboto Mono', monospace;
    color: #fff;
    font-size: 2.2em;
    font-weight: 600;
    letter-spacing: 1px;
    transition: color 0.3s ease;
}

#openNotesTextLogo a {
    text-decoration: none; /* Remove underline */
    color: inherit; /* Inherit color from parent */
    font-size: inherit; /* Inherit font size */
    font-weight: inherit; /* Inherit font weight */
}

/* Cherry blossom color hover effect for logo */
#openNotesTextLogo:hover {
    color: #FFB7C5; /* Cherry Blossom color */
}

/* Token amount text styling */
.token-amount {
    font-family: 'Inter', sans-serif;
    color: #e0e0e0;
    font-size: 1.2em;
    font-weight: 400;
    background-color: #333;
    padding: 8px 15px;
    border-radius: 6px;
    display: inline-block;
}

/* Hover effect on token amount */
.token-amount:hover {
    color: #007BFF;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 480px) {
    .header-container {
        padding: 15px 20px;
        flex-direction: column; /* Stack elements vertically */
        align-items: center; /* Center items */
    }

    #openNotesTextLogo {
        font-size: 1.8em;
    }

    .token-container {
        margin-top: 10px; /* Space between logo and token container */
        justify-content: center;
    }

    .token-amount {
        font-size: 1.1em;
    }
}
</style>

