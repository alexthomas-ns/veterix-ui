<script lang="ts">
    import {getAccounts} from "@service/account-service";
    import Account from "@component/Account.svelte";
    import Fa from "svelte-fa/src/fa.svelte";
    import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

    let accountsPromise = getAccounts();
</script>

<main>
    <div class="pb-4">
        <a href="create-account">
            <button class="primary">
                <Fa icon={faPlus} class="inline-block"/>
                Add Account
            </button>
        </a>
    </div>
    {#await accountsPromise}
        <p>Waiting...</p>
    {:then accounts}
        <div class="2xl:grid 2xl:grid-cols-6">
            <p class="hidden 2xl:block">Name</p>
            <p class="hidden 2xl:block">Email</p>
            <p class="hidden 2xl:block">Phone Number</p>
            <p class="hidden 2xl:block">Address</p>
            <p class="hidden 2xl:block">Pets</p>
            <p class="hidden 2xl:block"></p>
            {#each accounts as account}
                <Account bind:account on:requestRefresh={()=>{accountsPromise=getAccounts()}}/>
                <hr class="2xl:hidden"/>
            {/each}
        </div>
    {:catch error}
        <p class="text-xl">{error}</p>
    {/await}
</main>

