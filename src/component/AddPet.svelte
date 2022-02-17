<script lang="ts">
    import {addPet, getAccount, Pet} from "@service/account-service";
    import Fa from "svelte-fa/src/fa.svelte";
    import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
    import {getTypes} from "@service/types-service";

    export let id;
    let accountPromise;
    $: if(id) {accountPromise = getAccount(id)}
    const petTypesPromise = getTypes("pet");
    $: dataPromise = Promise.all([accountPromise,petTypesPromise]);
    let error;
    const request = {};

    function save(account): () => Promise<never> {
        return async () => {
            try {
                await addPet(account, request as Pet);
                window.location = '/accounts';
            } catch (e) {
                error = e;
            }
        }
    }
</script>
{#if error}
    <p class="text-2xl text-red-500">{error}</p>
{/if}
{#await dataPromise}
    <p>waiting...</p>
{:then [account,types]}
    <p class="text-2xl mb-4">Add a pet to {account.name}'s account</p>
    <div class="max-w-lg">
        <div class="grid grid-cols-2 gap-2">
            <label for="age">Age</label>
            <input id="age" type="number" bind:value={request.age} placeholder="Age"/>
            <label for="breed">Breed</label>
            <input id="breed" bind:value={request.breed} placeholder="Breed"/>
            <label for="name">Name</label>
            <input id="name" bind:value={request.name} placeholder="Name"/>
            <label for="species">Species</label>
            <select id="species" bind:value={request.species}>
                {#each types as petType}
                <option value={petType}>{petType.name}</option>
                    {/each}
            </select>
        </div>
        <button class="primary float-right mt-2" on:click={save(account)}>
            <Fa icon={faSave} class="inline-block"/>
            Save
        </button>
    </div>
{:catch error}
    <p>{error}</p>
{/await}

