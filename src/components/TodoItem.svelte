<script>

    export let index
    export let todo
    export let editToDo
    export let deleteToDo
</script>



<div class="todo">
    
    <p>
        {index+1}. {todo}
    </p>            
    <div class="actions">       
            <button on:click={() => editToDo(index)} >
                <i  class="fa-solid fa-pen"></i>
            </button>              
        <button on:click={() => deleteToDo(index)}> 
            <i class="fa-solid fa-trash"></i>
        </button>              
    </div>            
</div>


<style>
    .todo {
    padding: 8px 24px;
    background: #f0f0f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    }


    .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    }

    .actions i:hover {
    cursor: pointer;
    color:#003c5b
    }

    .actions button {
    border: none
    }
</style>