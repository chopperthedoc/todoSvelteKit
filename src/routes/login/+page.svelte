<script>
import { auth } from "$lib/firebase/firebase";
let email = "";
let password = "";


async function login() {
    try{
        await auth.signInWithEmailAndPassword(email, password);
        console.log("Erfolgreich eingeloggt")
    }
    catch (error) {
        console.log("Login fehlgeschlagen", error)
    }
}

</script>



<form on:submit|preventDefault={login}>
    <input type="email" bind:value={email} placeholder="Email">
    <input type="password" bind:value={password} placeholder="Passwort">
    <button type="submit">Login</button>
</form>

