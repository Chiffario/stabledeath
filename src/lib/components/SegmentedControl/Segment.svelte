<script lang="ts">
    import { getContext } from "svelte";

    let { value, children }: { value: string; children: any } = $props();

    const ctx = getContext<{
        selected: string;
        select: (v: string) => void;
    }>("segmented-control");

    // derived reactive value
    let isActive = $derived(ctx.selected === value);

    function handleClick() {
        ctx.select(value);
    }
</script>

<button
    role="tab"
    aria-selected={isActive}
    class:active={isActive}
    onclick={handleClick}
>
    {@render children()}
</button>

<style>
    button {
        border: none;
        background: transparent;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        color: light-dark(#e0def4, #575279);
    }

    button.active {
        background: light-dark(#403d52, #dfdad9);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
</style>
