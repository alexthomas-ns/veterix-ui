<script>
    import AddPet from "@component/AddPet.svelte";
    import {page} from "$app/stores";
    $: id = $page.params.id;
</script>

<AddPet id={id}/>
