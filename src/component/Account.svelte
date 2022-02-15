<script lang="ts">
    import {Account as AccountModel, updateAccount} from '@service/account-service'
    import Fa from "svelte-fa/src/fa.svelte";
    import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
    import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";

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
</script>
{#if error}
    <p class="text-2xl text-red-700">{error}</p>
{/if}
<tr>
    {#if (editing)}
        <td><input bind:value={account.name} placeholder="Name"></td>
        <td><input bind:value={account.email} placeholder="Email"></td>
        <td><input bind:value={account.phoneNumber} placeholder="Phone Number"></td>
        <td><input bind:value={account.address} placeholder="Address"></td>
        <td>
            <button on:click={save}>
                <Fa icon={faSave}/>
            </button>
        </td>
    {:else }
        <td>{account.name}</td>
        <td>{account.email}</td>
        <td>{account.phoneNumber}</td>
        <td>{account.address}</td>
        <td>
            <button on:click={()=>editing=true}>
                <Fa icon={faPencil}/>
            </button>
        </td>
    {/if}
</tr>


<style lang="postcss">
    td {
        @apply py-1 px-2;
    }
</style>
