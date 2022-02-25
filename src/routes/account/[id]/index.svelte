<script>
    import Account from "@component/Account.svelte";
    import {page} from "$app/stores";
    import {getAccount} from "@service/account-service";
    import Pet from "@component/Pet.svelte";
    import Fa from "svelte-fa/src/fa.svelte";
    import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
    import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
    import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

    $: id = $page.params.id;
    let accountsPromise;
    $: accountsPromise = getAccount(id);

</script>

{#await accountsPromise}
    <p>waiting...</p>
{:then account}
    <button class="primary"><Fa icon={faPencil}/>Edit Account</button>
    <button class="hover:bg-red-500"><Fa icon={faTrash}/>Delete Account</button>
    <Account account={account} hideButtons={true}/>
    {#if account.pets}
        <div class="my-4">
            <p class="text-2xl">Pets <a href="./add-pet"><button class="pt-0"><Fa icon={faPlus}/>Add Pet</button></a></p>
            <hr class="my-1"/>
            {#each account.pets as pet}
                <div class="pet">
                    <Pet pet={pet} account={account} on:requestRefresh={()=>accountsPromise=getAccount(id)}/>
                </div>
            {/each}
        </div>
    {/if}
{:catch error}
    <p>{error}</p>
{/await}

<style>
    .pet :global(*) {
        @apply inline-block;
    }
</style>
