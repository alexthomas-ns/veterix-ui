<script lang="ts">
    import Room from "@component/Room.svelte";

    let editing=true;
    $: if(!editing){window.location='/rooms'}
</script>
<Room bind:editing room={{}}/>
