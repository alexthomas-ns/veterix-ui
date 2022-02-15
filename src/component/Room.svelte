<script lang="ts">
    import {createRoom, Room as RoomModel, updateRoom} from '@service/room-service'
    import Fa from "svelte-fa/src/fa.svelte";
    import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
    import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";

    export let room: RoomModel
    export let editing = false;

    async function save() {
        if (room.id) {
            await updateRoom(room);
        } else {
            await createRoom(room);
        }
        editing = false;
    }
</script>


<div class="flex flex-row font-mono">

    {#if room.id}
        <div class="px-1">
            {room.id}
        </div>
    {/if}
    {#if (!editing)}
        <div class="px-1">
            {room.roomNumber}
        </div>
        <button on:click={()=>editing=true}>
            <Fa icon={faPencil}/>
        </button>
    {:else}
        <div class="px-1">
            <input bind:value={room.roomNumber} placeholder="Room Number">
        </div>
        <button on:click={save}>
            <Fa icon={faSave}/>
        </button>
    {/if}
</div>
