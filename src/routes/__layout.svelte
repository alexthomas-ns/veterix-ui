<script>
    // eslint-disable-next-line no-restricted-imports,@typescript-eslint/no-restricted-imports
    import '../tailwind.css'
    import Navbar from "@component/Navbar.svelte";
</script>

<Navbar/>
<div class="m-3 lg:container">
    <slot/>
</div>
