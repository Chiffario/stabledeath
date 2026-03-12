<script lang="ts">
    const { stable, lazer }: { stable: number; lazer: number } = $props();
    const stable_percentage =
        Math.round((stable / (stable + lazer)) * 10000.0) / 100;
    const lazer_percentage =
        Math.round((100.0 - stable_percentage) * 100) / 100;
</script>

<div class="container">
    <div class="bar-container">
        <div class="stable-bar" style="width: {stable_percentage}%"></div>
    </div>
    <div class="subscripts">
        <div id="stable">
            stable: {stable} ({stable_percentage}%)
        </div>
        <div id="lazer">
            lazer: {lazer} ({lazer_percentage}%)
        </div>
    </div>
</div>

<style>
    .container {
        height: 50px;
        margin: 20px;
    }
    .subscripts {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .bar-container {
        background-color: #ff66aa;
    }
    .stable-bar {
        background-color: #66ccff;
    }

    .bar-container {
        width: 100%;
        height: 20px;
        display: block;
        margin-bottom: 1rem;
    }
    .stable-bar {
        height: 20px;
        display: inline-block;
    }
</style>
