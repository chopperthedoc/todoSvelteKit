<script>

    import {onDestroy, onMount} from "svelte";
    import {auth, db} from "$lib/firebase/firebase";
    import {doc, getDoc, setDoc} from "firebase/firestore";
  import { authStore } from "../store/store";

    const nonAuthRoutes = ["/", "/login"];

    onMount(() => {
        console.log("onMount")
         const unsubscribe = auth.onAuthStateChanged(async (user) => {
            const currentPath = window.location.pathname;
            console.log(currentPath);

            if (!user && !nonAuthRoutes.includes(currentPath)) {
                window.location.href = "/";
                return;
            }

            if (!user) {
                return;
            }

            if (user && currentPath === "/") {
                window.location.href = "/dashboard";
                return;
            }
            let dataToStore;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            
            if (!docSnap.exists()) {
                const userRef = doc(db, "users", user.uid);
                 dataToStore = {
                    email: user.email,
                    todos: [],
                };
                await setDoc(
                    userRef,
                    dataToStore,
                    {merge: true}
                )
            } else {
                const userData = docSnap.data();
                console.log("userData", userData.data.todos)
                dataToStore = userData
            }

            authStore.update((curr) => {
                return {
                    ...curr,
                    user,
                    data: dataToStore,
                    loading: false

                }
            })
        })
        return unsubscribe;
    })

   


</script>



<div class="mainContainer">
    <slot></slot>
</div>

