<script lang="ts">
  import Bars from "$components/Bars.svelte";

  const { data } = $props();

  const changelogs = data.changelogs;
  const peak = data.peak;
  const peakRel = data.peakRel;
</script>

<h1>lazer vs stable user counts</h1>
{#if changelogs}
  <p>
    current (last check was at {new Date(changelogs.timestamp).toLocaleString(
      "en-UK",
    )})
  </p>
{:else}
  <div>uhhh</div>
{/if}
<Bars stable={changelogs.stable} lazer={changelogs.lazer} />
<p>
  lazer user count peak (at {new Date(peak.timestamp).toLocaleString("en-UK")})
</p>
{#if peak}
  <Bars stable={peak.stable} lazer={peak.lazer} />
  <p>
    lazer user percentage peak (at {new Date(peakRel.timestamp).toLocaleString(
      "en-UK",
    )})
  </p>
  <Bars stable={peakRel.stable} lazer={peakRel.lazer} />
{/if}

<style>
  @media (prefers-color-scheme: light) {
    body,
    html,
    :root {
      background-color: white;
      color: black;
    }
  }
  @media (prefers-color-scheme: dark) {
    body,
    html,
    :root {
      background-color: black;
      color: white;
    }
  }
</style>
