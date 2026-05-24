<script lang="ts">
    import ComparisonGraph from "$components/ComparisonGraph.svelte";
    import RatioGraph from "$components/RatioGraph.svelte";
    import GraphSet from "./GraphSet.svelte";
    import Segment from "./SegmentedControl/Segment.svelte";
    import SegmentedControl from "./SegmentedControl/SegmentedControl.svelte";

    type ComparisonEntry = {
        timestamp: number[];
        stable: number[];
        lazer: number[];
        sum: number[];
    };

    type RatioEntry = {
        timestamp: number[];
        ratio: number[];
    };
    let {
        comparison,
        comparison_name,
        ratio,
        ratio_name,
        is24h,
        children,
    }: {
        comparison: {
            comparison_daily: ComparisonEntry;
            comparison_weekly: ComparisonEntry;
        };
        comparison_name: string;
        ratio: { ratio_daily: RatioEntry; ratio_weekly: RatioEntry };
        ratio_name: string;
        is24h?: boolean;
        children: any;
    } = $props();

    let selected: "Day" | "Week" = $state("Day");
</script>

<div class="children">
    {@render children()}
</div>
<div class="outer-box">
    <SegmentedControl value={selected} onChange={(v) => (selected = v)}>
        <Segment value="Day">Daily</Segment>
        <Segment value="Week">Weekly</Segment>
    </SegmentedControl>
</div>
<div>
    {#if selected == "Day"}
        <GraphSet
            comparison={comparison.comparison_daily}
            {comparison_name}
            ratio={ratio.ratio_daily}
            {ratio_name}
        ></GraphSet>
    {:else if selected == "Week"}
        <GraphSet
            comparison={comparison.comparison_weekly}
            {comparison_name}
            ratio={ratio.ratio_weekly}
            {ratio_name}
        ></GraphSet>
    {/if}
</div>

<style>
</style>
