<script>

</script>

<body>

    <div>
        <p id="openNotesTextLogo">openNotes_</p>
        <section id="auth">
            <div>
                <h2>Login</h2>
                <p>Create an account!</p>
            </div>
            <input id="emailInput" placeholder="Email" />
            <input id="passwordInput" placeholder="********" type="password" />
            <button>Submit</button>
            <hr />
            <div>
                <p>Don't have an account?</p>
                <button>Sign up</button>
            </div>
        </section>
    </div>
</body>

<style>
    /* Use a consistent font family */
    * {
        font-family: 'Roboto Mono', monospace;
        box-sizing: border-box;
    }

    /* Body styling for centering */
    body {
        margin: 0;
        display: flex;
        justify-content: center; /* Horizontal centering */
        align-items: center;     /* Vertical centering */
        min-height: 100vh;       /* Ensure body is at least viewport height */
        background-color: #f5f5f5;
    }

    #auth {
            background-color: #d9f7be;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            border-radius: 16px;
            padding: 3rem;
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

    /* Divider line */
    #auth hr {
        border: none;
        border-top: 1px solid #eeeeee;
        margin: 2rem 0;
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