<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { makeUserRatioOptions } from "$lib/utils/graph.ts";
    import { queueRender } from "$utils/renderQueue";
    import uPlot from "uplot";
    import "uplot/dist/uPlot.min.css";
    import { Chart, registerables } from "chart.js";
    import annotationPlugin from "chartjs-plugin-annotation";

    Chart.register(...registerables, annotationPlugin);

    let { timestamps, values, name }: { timestamps: number[]; values: number[]; name: string } = $props();

    let chartCanvas: HTMLCanvasElement;
    let graphChart: Chart | undefined;
    let resizeFrame: number | undefined;
    let lastWidth = 0;
    let mounted = false;
    let queuedRenderCancel: (() => void) | undefined;

    const getData = (): uPlot.AlignedData => [timestamps, values];

    function createPlot() {
        if (!mounted || graphChart || !chartCanvas?.isConnected) {
            return;
        }

        lastWidth = chartCanvas.clientWidth;

        const chartDates = timestamps.map((ts) => new Date(ts * 1000));
        const getDateIndex = (dateStr: string) => {
            return chartDates.findIndex((d) => d.toISOString().startsWith(dateStr));
        };

        graphChart = new Chart(chartCanvas, {
            type: "line",
            data: {
                labels: chartDates,
                datasets: [
                    {
                        label: name,
                        data: values,
                        borderColor: "#ff66aa",
                        borderWidth: 2,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: "nearest",
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#e0def4",
                        },
                    },
                    title: {
                        display: true,
                        text: name,
                        color: "#e0def4",
                        font: {
                            size: 18,
                            weight: "bold",
                        },
                    },
                    tooltip: {
                        callbacks: {
                            title: (context) => {
                                return chartDates[context[0].dataIndex].toLocaleString("en-US");
                            },
                        },
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: "line",
                                xMin: getDateIndex("2024-01-29"),
                                xMax: getDateIndex("2024-01-29"),
                                borderColor: "#88b30080",
                                borderWidth: 1,
                                label: {
                                    content: "pp release",
                                    display: true,
                                    position: "end",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    font: {
                                        size: 10,
                                        weight: "normal",
                                    },
                                },
                            },
                            line2: {
                                type: "line",
                                xMin: getDateIndex("2024-07-24"),
                                xMax: getDateIndex("2024-07-24"),
                                borderColor: "#88b30080",
                                borderWidth: 1,
                                label: {
                                    content: "Daily challenges",
                                    display: true,
                                    position: "end",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    font: {
                                        size: 10,
                                        weight: "normal",
                                    },
                                },
                            },
                            line3: {
                                type: "line",
                                xMin: getDateIndex("2025-06-04"),
                                xMax: getDateIndex("2025-06-04"),
                                borderColor: "#88b30080",
                                borderWidth: 1,
                                label: {
                                    content: "Song select v2",
                                    display: true,
                                    position: "end",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    font: {
                                        size: 10,
                                        weight: "normal",
                                    },
                                },
                            },
                            line4: {
                                type: "line",
                                xMin: getDateIndex("2025-11-20"),
                                xMax: getDateIndex("2025-11-20"),
                                borderColor: "#88b30080",
                                borderWidth: 1,
                                label: {
                                    content: "Updated download page",
                                    display: true,
                                    position: "end",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    font: {
                                        size: 10,
                                        weight: "normal",
                                    },
                                },
                            },
                            line5: {
                                type: "line",
                                xMin: getDateIndex("2026-04-17"),
                                xMax: getDateIndex("2026-04-17"),
                                borderColor: "#88b30080",
                                borderWidth: 1,
                                label: {
                                    content: "Ranked play",
                                    display: true,
                                    position: "end",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    font: {
                                        size: 10,
                                        weight: "normal",
                                    },
                                },
                            },
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: "#26233a",
                        },
                        ticks: {
                            color: "#e0def4",
                            callback: (value) => `${value}%`,
                        },
                    },
                    x: {
                        grid: {
                            color: "#26233a",
                        },
                        ticks: {
                            color: "#e0def4",
                            maxRotation: 0,
                            maxTicksLimit: 10,
                            callback: (value, index, ticks) => {
                                return chartDates[index].toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                    day: undefined,
                                    weekday: undefined,
                                });
                            },
                        },
                    },
                },
            },
        });
    }

    function recreatePlot() {
        if (!mounted) {
            return;
        }

        graphChart?.destroy();
        graphChart = undefined;
        createPlot();
    }

    function queueResize() {
        if (resizeFrame != null) {
            return;
        }

        resizeFrame = requestAnimationFrame(() => {
            resizeFrame = undefined;

            if (!graphChart) {
                return;
            }

            const width = chartCanvas.clientWidth;
            if (width === 0 || width === lastWidth) {
                return;
            }

            lastWidth = width;
            graphChart.resize(width, 400);
        });
    }

    function queueCreatePlot() {
        queuedRenderCancel?.();
        queuedRenderCancel = queueRender(createPlot);
    }

    $effect(() => {
        if (graphChart) {
            graphChart.data.labels = timestamps;
            graphChart.data.datasets[0].data = values;
            graphChart.update();
        }
    });

    onMount(() => {
        mounted = true;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const onSchemeChange = () => queueRender(recreatePlot);

        mediaQuery.addEventListener("change", onSchemeChange);

        const ro = new ResizeObserver(queueResize);

        ro.observe(chartCanvas);

        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) {
                    return;
                }

                queueCreatePlot();
                io.disconnect();
            },
            { rootMargin: "300px" },
        );

        io.observe(chartCanvas);

        return () => {
            mounted = false;
            queuedRenderCancel?.();
            mediaQuery.removeEventListener("change", onSchemeChange);
            io.disconnect();
            ro.disconnect();

            if (resizeFrame != null) {
                cancelAnimationFrame(resizeFrame);
            }
        };
    });

    onDestroy(() => {
        graphChart?.destroy();
        graphChart = undefined;
    });
</script>

<div style="height: 450px; max-width: 700px; width: 100%">
    <canvas bind:this={chartCanvas} style="width: 100%; height: 100%;"></canvas>
</div>

<style>
    div :global(.u-legend) {
        color: light-dark(black, "#e0def4");
    }
    div :global(.u-title) {
        color: light-dark(black, "#e0def4");
    }
    div :global(.u-wrap) {
        border: none;
    }
</style>
