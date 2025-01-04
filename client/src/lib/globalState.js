// globalState.js
export let tokens = 0; // Initial token count

export async function fetchUserTokens() {
  try {
    const response = await fetch('http://localhost:8000/auth/tokens', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'), // Replace if needed
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching tokens: ${response.statusText}`);
    }

    const data = await response.json();
    tokens = data.tokens;
    console.log(`User has ${tokens} tokens`);
  } catch (error) {
    console.error("Error:", error);
    tokens = null; // Handle error state if needed
  }
}