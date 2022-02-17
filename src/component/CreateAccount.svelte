<script lang="ts">

    import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
    import Fa from "svelte-fa/src/fa.svelte";
    import {Account, saveAccount} from "@service/account-service";

    const account = {};
    let error;

    async function save() {
        try {
            await saveAccount(account as Account);
            window.location = '/accounts'
        } catch (e) {
            error = e;
        }
    }
</script>

<main>
    {#if error}
        <p class="text-red-500 text-2xl">{error}</p>
    {/if}
        <div class="grid grid-cols-2 gap-2">
        <label for="name">Name</label>
        <input id="name" bind:value={account.name} placeholder="Name">
        <label for="email">Email</label>
        <input id="email" bind:value={account.email} placeholder="Email">
        <label for="phoneNumber">Phone Number</label>
        <input id="phoneNumber" bind:value={account.phoneNumber} placeholder="Phone Number">
        <label for="address">Address</label>
        <input id="address" bind:value={account.address} placeholder="Address">
        </div>
    <button on:click={save} class="primary float-right mt-2 mr-1">
        <Fa icon={faSave} class="inline-block"/>&nbsp; Save
    </button>
</main>

<style>
    label {
        @apply font-bold;
    }

    label::after {
        content: ":"
    }
</style>
