<script lang="ts">
    import {getAvailableWindows} from "@service/appointment-service";
    import Accounts from "@component/Accounts.svelte";

    const windows = getAvailableWindows();
    let stages = ["Select Appointment window"]
    $: currentStage = stages[stages.length - 1];
    let selectedWindow;

    function selectWindow(window) {
        selectedWindow = window;
        stages = [...stages, "Select Account"]
    }

    function selectStage(stage) {
        stages = stages.slice(0, stages.indexOf(stage) + 1);
    }
</script>


<div>
    {#each stages as stage,i}
        <span class="stage-label" class:current-stage={stage===currentStage}
              on:click={()=>selectStage(stage)}>{stage}</span>
        {#if i !== stages.length - 1}
            <span class="stage-separator">/</span>
        {/if}
    {/each}
    {#if currentStage === "Select Appointment window"}
        {#await windows  }
            <p>Loading windows</p>
        {:then w}
            {#each w as window}
                <p on:click={()=>selectWindow(window)}>{window.startTime}->{window.endTime}</p>
            {/each}
        {:catch e}
            <p>{e}</p>
        {/await}
    {/if}
    {#if currentStage === "Select Account"}
        <Accounts/>
    {/if}
</div>

<style>
    .stage-label {
        @apply text-blue-400 hover:text-blue-600 px-1;
        cursor: pointer;
    }

    .current-stage {
        @apply text-gray-500 hover:text-gray-500;
        cursor: default;
    }

    .stage-separator {
        @apply px-1;
    }
</style>
