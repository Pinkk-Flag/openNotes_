<script>
    let { loggedIn, setLoggedIn } = $props();

    const apiBase = "http://localhost:8000";
    let currentState = $state("Login");
    let token = localStorage.getItem('token');
    let currentModalHeader = $state("Login");
    let currentModalMessage = $state("Login to an existing account!");
    let submitButton = $state("Login");
    let bottomMessage = $state("Don't have an account?");
    let emailValue = $state('');
    let passwordValue = $state('');
    let error = $state('');
    let isAuthenticating = $state(false);
    let authText = $state('');

    const toggleState = () => {
        if (currentState === "Login") {
            currentState = "Signup";
            currentModalHeader = "Sign up";
            currentModalMessage = "Create a new account below!";
            submitButton = "Create account";
            bottomMessage = "Already have an account?";
            authText = "";
        } else {
            currentState = "Login";
            currentModalHeader = "Login";
            currentModalMessage = "Login to an existing account!";
            submitButton = "Login";
            bottomMessage = "Don't have an account?";
            authText = "";
        }
    };

    const authenticate = async () => {
    authText = "";
    if (!emailValue || !passwordValue) {
        error = 'Email and password are required.';
        return;
    }

    if (!emailValue.includes('@')) {
        authText = "Email is incorrectly parsed!";
        return;
    } else if (passwordValue.length < 6) {
        authText = "Password is not long enough!";
        return;
    } else if (isAuthenticating) {
        authText = "Already authenticating...";
        return;
    }

    authText = "";
    isAuthenticating = true;

    try {
        let data;
        let response;

        if (currentState === "Login") {
            response = await fetch(apiBase + "/auth/login", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: emailValue, password: passwordValue })
            });

            if (response.ok) {
                data = await response.json();
                localStorage.setItem('token', data.token);
                console.log('Token being sent:', localStorage.getItem('token')); // Add this line to check the token value

                setLoggedIn(true); // Update loggedIn state in the parent
            } else {
                const errorDetails = await response.json();
                throw new Error(`Authentication failed: ${errorDetails.message}`);
            }
        } else if (currentState === "Signup") {
            response = await fetch(apiBase + "/auth/register", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: emailValue, password: passwordValue })
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`Authentication failed: ${errorDetails.message}`);
            }
        }
    } catch (err) {
        console.error(err);
        isAuthenticating = false;
        authText = err.message || err;
    }
};
</script>

  

<div>
    <p id="openNotesTextLogo">openNotes_</p>
    <section id="auth">
        <div>
            <h2>{currentModalHeader}</h2>
            <p>{currentModalMessage}</p>
        </div>
        <input bind:value={emailValue} id="emailInput" placeholder="Email" />
        <input bind:value={passwordValue} id="passwordInput" placeholder="********" type="password" />
        <p>{authText}</p>
        <button onclick={(event) => {
            authenticate();
        }}>{submitButton}</button>
        <div>
            <br>
            <p>{bottomMessage}</p>
            <button onclick={toggleState}>{currentState === "Login" ? "Sign up" : "Login"}</button>
        </div>
    </section>
</div>


<style>
    /* Use a consistent font family */
    * {
        font-family: 'Roboto Mono', monospace;
        box-sizing: border-box;
    }


    #auth {
            background-color: #d9f7be;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px; /* Use max-width for responsiveness */
            width: 90%; /* Occupy 90% of the parent width */
            margin: 0 auto; /* Center horizontally */
        }

    /* Heading styling */
    #auth h2 {
        font-size: 2rem;
        font-weight: 700;
        color: #333333;
        margin-bottom: 0.5rem;
    }

    /* Paragraph styling */
    #auth p {
        font-size: 1.1rem;
        color: #666666;
        margin: 0.5rem 0 1.5rem;
    }

    /* Input fields */
    #auth input {
        width: 100%;
        padding: 1rem;
        margin: 0.8rem 0;
        border: 1px solid #cccccc;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    #auth input:focus {
        outline: none;
        border-color: #007BFF;
        box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
    }

    /* Buttons */
    #auth button {
        width: 100%;
        padding: 1rem;
        margin-top: 1rem;
        background-color: #007BFF;
        color: #ffffff;
        border: none;
        border-radius: 10px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    #auth button:hover {
        background-color: #0056b3;
    }

    /* Bottom section */
    #auth div:last-child {
        text-align: center;
    }

    #auth div:last-child p {
        margin-bottom: 0.5rem;
    }

    /* Smooth fade-in animation */
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Responsive design for smaller screens */
    @media (max-width: 480px) {
            #auth {
                padding: 2rem;
            }

            #auth h2 {
                font-size: 1.7rem;
            }

            #auth p {
                font-size: 1rem;
            }
        }

    #openNotesTextLogo {
        font-family: 'Roboto Mono', monospace;
        color: white;
        font-size: xx-large;
        padding:0.25em;
        text-align: center;
    }
</style>