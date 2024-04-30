<script>
  import { authHandlers, authStore } from "../../store/store";
  import {doc, getDoc, setDoc} from "firebase/firestore";
    import { db } from "../../lib/firebase/firebase";
import TodoItem from "../../components/TodoItem.svelte";

    let todoList = [];
    let currTodo = ""
    let error = false
    
    $: todoList = $authStore.data?.todos || [];
    $: console.log('todoList hat sich geändert:', todoList);

    function addTodo() {
       
        error = false
        if (!currTodo) {
            error = true
            return
        }
        todoList = [...todoList, currTodo]

        currTodo = ""
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            addTodo()
        } 
    }

    function deleteToDo(index) {
        todoList.splice(index, 1)
        todoList = todoList.slice()
    }

    function editToDo (index) {
    let newText = prompt("Editieren Sie Ihr Todo:", todoList[index]);
    if (newText !== null && newText.trim() !== "") {
        todoList[index] = newText;
        todoList = [...todoList]; // aktualisiere die Liste für Reaktivität
    }
}

    async function saveTodos() {
        console.log("saveTodos")
        try {
            const userRef = doc(db, "users", $authStore.user.uid);
            console.log(userRef)
            setDoc(userRef, {data: {todos: todoList,} }, {merge: true})
        } catch (e) {
            console.error(e)
        }
}
</script>

{#if !authStore.loading}
<div class="mainContainer">
    <div class="headerContainer">
        <h1>ToDo Liste</h1>
        <div class="headerButtons">
            <button on:click={saveTodos}> 
                <i class="fa-solid fa-floppy-disk"></i>
                <p>Speichern</p>
            </button>
                <button on:click={authHandlers.logout}>
                     <i class="fa-solid fa-right-from-bracket"></i>
                    <p>Logout</p>
                </button>
        </div>
        
    </div>
    <main>
        {#each todoList as todo, index}
        {#if todoList.length === 0}
        <p>Keine Todos vorhanden</p>
        {/if}
        <TodoItem todo={todo} index={index} deleteToDo={deleteToDo} editToDo={editToDo}/>
        {/each}
    </main>
    <div class={"enterTodo" + (error ? " errorBorder" : "")}>
        <input bind:value={currTodo} type="text" placeholder="Todo eingeben...">
        <button on:click={addTodo} on:keydown={handleKeyDown}>
           Hinzufügen
        </button>
    </div>
</div>
{:else}
<p class="loading">Loading...</p>

{/if}



<style>
    .mainContainer {
        display: flex;
        flex-direction: column;

        min-height: 100vh;
        gap: 24px;
        padding: 24px;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
    }

    .headerContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .headerContainer button {
        padding: 4px 16px;
        background: #003c5b;
        color: white;
        border: none;
        cursor: pointer;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 4px;
    }

    .headerContainer button i {
        font-size: 16px;
    }

    .headerContainer button:hover {
        background: #002f47;
        cursor: pointer;
    }

    .headerButtons {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
        
    }

    .todo {
        padding: 8px 24px;
        background: #f0f0f0;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .todo input {
        background: transparent;
        border: none;
        padding: 14px;
        color: gray;
        flex: 1;
        border: 1px solid #003c5b;
    }
    .actions {
        display: flex;
        align-items: center;
        gap: 8px;
    }

   

    .actions button {
        border: none
    }

    .enterTodo {
        display: flex;
        align-items: stretch;

    }

    .enterTodo.errorBorder input {
    border: 1px solid red !important;
}

    .enterTodo input {
        background: transparent;
        border: none;
        padding: 14px;
        color: gray;
        flex: 1;
        border: 1px solid #003c5b;
    }

    .enterTodo input:focus {
        outline: none;
    }

    .enterTodo button {
        padding: 0 14px;
        border: none;
        background: #003c5b;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }

    .enterTodo button:hover {
        background: #002f47;
    }

    .loading {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }
</style>