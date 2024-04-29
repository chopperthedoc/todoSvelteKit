<script>
  import { authHandlers } from "../store/store";

    let email = "";
    let password = "";
    let confirmPassword = "";
    let error = false;
    let register = true;
    let authenticating = false;

    async function handleAuthentification() {
        if (authenticating) return;

        console.log(`register: ${register}`)

        error = false;
        
        if (!email || !password || (register && !confirmPassword)) {
            console.log(email, password, confirmPassword, register)
            console.log("Bitte füllen Sie alle Felder aus");
            error = true
            return;
        }

        authenticating = true;

        try {
        if (register) {
            console.log("Registrierung");
            await authHandlers.signup(email, password);
        } else {
            console.log("Login");
            await authHandlers.login(email, password);
        }
    } catch (err) {
        console.log("Authentifizierung fehlgeschlagen", err);
        error = true;
    } finally {
        authenticating = false;
    }
        
    }

    function toggleRegister() {
    register = !register;  // Umschalten zwischen true und false
    error = false;         // Fehlerstatus zurücksetzen, wenn man zwischen den Formularen wechselt
}

</script>


<div class=authContainer>
    <form>
        <h1>{!register ? "Login" : "Registrierung"}</h1>
        {#if error}
        <p class="error">Informationen zum Login fehlen.</p>
        {/if}
        
        <label> 
            <input bind:value={email} type="email" placeholder="Email">
        </label>
        <label> 
            <input bind:value={password} type="password" placeholder="Passwort">
        </label>
        {#if register}
        <label> 
            <input bind:value={confirmPassword} type="password" placeholder="Passwort bestätigen">
        </label>
        {/if}
        <button type="button" class="submitBtn" on:click={handleAuthentification}>
            {#if authenticating}
            <i class="fa-solid fa-spinner spin"></i>
            {:else}
            Submit
            {/if}
        </button>
    </form>
    <div class="options">
        <p>Oder</p>
        {#if register}
        <div>
            <p>Hast du schon einen Account?</p>
            <button on:click={toggleRegister}>Login</button>
        </div>
        {:else}
        <div>
            <p>Noch keinen Account?</p>
            <button on:click={toggleRegister}>Registrieren</button>
        </div>
        {/if}
    </div>
</div>


<style>
    .authContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    form, .options {
        width: 400px;
        max-width: 100%;
        margin: 0 auto;
    }

    form label:focus-within {
        background-color: #f0f0f0;

    }

    input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    form button {
        cursor: pointer;
        padding: 8px;
        
        border-radius: 5px;
        display: grid;
        place-items: center;

    }

    form button:hover {
        background-color: #f0f0f0;
    }

    h1 {
        text-align: center;
    }

    .error {
        color: red;
        text-align: center;

    }

    .options {
        display: flex;
        justify-content: center;
        flex-direction: column;   
        overflow: hidden;
        padding: 14px 0;

    }

    .options > p {
        position: relative;
        text-align: center;
        width: fit-content;
        margin: 0 auto;
        padding: 0 8px;
    }

    .options > p::after,
    .options > p::before {
        content: "";
        position: absolute;
        top: 50%;

        transform: translateY(-50%);
        width: 100vw;
        height: 1.5px;
        background: black;

    }

    .options > p::after {
        right: 100%;
    }

    .options > p::before {
        left: 100%;
    }

    .options > div {
        display: flex;
       align-items: center;
       justify-content: center;
        gap: 8px;
    }

    .options button {
        cursor: pointer;
        padding: 0;
        background: none;
        border: none;
        text-decoration: underline;
        color: blue
    }

    .options button:hover, button:focus {
        text-decoration: none;
        background-color: transparent;
    }

    .spin {
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>