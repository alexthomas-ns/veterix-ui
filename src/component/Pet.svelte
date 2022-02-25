<script lang="ts">
    import Fa from "svelte-fa/src/fa.svelte";
    import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
    import accountService from "@service/account-service"
    import {createEventDispatcher} from "svelte";
    export let pet;
    export let account;

    const dispatch = createEventDispatcher();
    async function deletePet(){
        await accountService.deletePet(account,pet);
        dispatch('requestRefresh');
    }
</script>

<p>{pet.name}</p>
<p>{pet.species.name}</p>
<p>{pet.breed}</p>
<p>{pet.age}</p>
<button class="hover:bg-red-500" on:click={deletePet}>
    <Fa icon={faTrash} />
</button>
