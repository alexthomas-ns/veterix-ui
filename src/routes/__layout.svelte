<script>
    // eslint-disable-next-line no-restricted-imports,@typescript-eslint/no-restricted-imports
    import '../tailwind.css'
    import Navbar from "@component/Navbar.svelte";
</script>

<Navbar/>
<div class="lg:layout-container m-3 ">
    <slot/>
</div>

<style>

    @tailwind components;
    @layer components {
        .layout-container {
            @apply container mx-auto;
        }
    }
</style>
