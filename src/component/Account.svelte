<script lang="ts">
    import {Account as AccountModel, deleteAccount, updateAccount} from '@service/account-service'
    import Fa from "svelte-fa/src/fa.svelte";
    import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
    import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
    import {createEventDispatcher} from "svelte";
    import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

    export let account: AccountModel;

    let editing = false;
    let error;

    async function save() {
        try {
            await updateAccount(account);
            editing = false;
        } catch (e) {
            error = e;
        }
    }
    const dispatch = createEventDispatcher();
    async function doDelete() {
        try {
            await deleteAccount(account);
            dispatch('requestRefresh');
        } catch (e) {
            error = e;
        }
    }
</script>
{#if error}
    <p class="text-2xl text-red-700">{error}</p>
{/if}
{#if (editing)}
    <input bind:value={account.name} placeholder="Name">
    <input bind:value={account.email} placeholder="Email">
    <input bind:value={account.phoneNumber} placeholder="Phone Number">
    <input bind:value={account.address} placeholder="Address">
<div>

    <button on:click={save}>
        <Fa icon={faSave}/>
    </button>
</div>
{:else }
    <p>{account.name}</p>
    <p>{account.email}</p>
    <p>{account.phoneNumber}</p>
    <p>{account.address}</p>
    <div>

        <button on:click={()=>editing=true}>
            <Fa icon={faPencil}/>
        </button>
        <button on:click={doDelete} class="hover:bg-red-500">
            <Fa icon={faTrash}/>
        </button>
    </div>

{/if}


<style lang="postcss">
    td {
        @apply py-1 px-2;
    }

    p, button {
        @apply col-auto ;
    }
</style>
