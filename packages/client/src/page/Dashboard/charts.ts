import Chart from "chart.js/auto";

export function createDailySalesVolumeChart(
    canvas: HTMLCanvasElement,
    data: Array<DailyChartData>,
) {
    new Chart(canvas, {
        type: "line",
        data: {
            labels: data.map((row) => new Date(row.date).getDate()),
            datasets: [
                {
                    label: "Total earnings",
                    data: data.map((row) => row.total),
                    tension: 0.2
                },
            ],
        },
        options: {
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display:false
                },
            }
        }
    });
}

export function createContributionChart(canvas: HTMLCanvasElement, data: Array<DailyChartData>) {
    new Chart(canvas, {
        type: "doughnut",
        data: {
            labels: data.map((row) => new Date(row.date).getDate()),
            datasets: [
                {
                    label: "Total earnings",
                    data: data.map((row) => row.total),
                },
            ],
        },
        options: {
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    position: "bottom"
                },
            }
        }
    });

}
