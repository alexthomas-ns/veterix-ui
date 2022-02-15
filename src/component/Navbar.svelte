<script lang="ts">
   function routeTo(href):()=>{}{
      return ()=>window.location=href;
   }
</script>

<nav >
   <div on:click={routeTo("/rooms")}>Rooms</div>
   <div on:click={routeTo("/accounts")}>Accounts</div>
</nav>

<style lang="postcss">
   nav {
      @apply px-4 bg-slate-700 text-gray-100 ;
   }
   nav div {
      @apply h-full py-3 my-1 border border-slate-700 inline-block px-3 cursor-pointer hover:border-slate-500 rounded;
   }
</style>
