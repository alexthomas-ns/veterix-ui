<script lang="ts">

import {getRooms} from "@service/room-service";
import Room from "@component/Room.svelte";
import Fa from "svelte-fa/src/fa.svelte";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
</script>

<main class="flex flex-col">
<div class="pb-4">
    <a href="create-room"><button class="primary"><Fa icon={faPlus} class="inline-block"/> Add Room</button></a>
</div>
    {#await getRooms()}
        <p>waiting...</p>
    {:then rooms}
        {#each rooms as room}
            <Room room="{room}"/>
            {/each}
    {:catch error}
        <h3>{error}</h3>
    {/await}
</main>
