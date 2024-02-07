const PUZZLE_SCORES = [10, 20, 30, 50, 100, 200, 250, 300];
const HINT_COSTS = [0, 0, 10, 10, 20, 20, 100, 100];
const CHART_COLORS = ["blue", "green", "red", "pink", "orange", "grey", "purple", "teal", "indigo", "white"];

function parseSolveTime(value, timezoneOffset) {
    if (!value || value === "0") return null;
    const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)
        ? value.replace(" ", "T") + timezoneOffset
        : value;
    const timestamp = Date.parse(normalized);
    return Number.isNaN(timestamp) ? null : timestamp;
}

function formatDuration(totalSeconds) {
    if (!Number.isFinite(totalSeconds)) return "none";
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainder = seconds % 60;
    if (hours > 0) return hours + "hr " + minutes + "min " + remainder + "sec";
    if (minutes > 0) return minutes + "min " + remainder + "sec";
    return remainder + " seconds";
}

function rankUsers(information, event) {
    const startAt = Date.parse(event.startAt);
    return information.map(function buildStanding(user) {
        const puzzles = Array.from({ length: 8 }, function puzzleAt(_, index) {
            return parseSolveTime(user["puzzle" + (index + 1)], event.timezoneOffset);
        });
        let solved = 0;
        while (solved < puzzles.length && puzzles[solved] !== null) solved += 1;

        const hints = String(user.hint || "00000000").padEnd(8, "0");
        let score = 0;
        for (let index = 0; index < solved; index += 1) {
            score += PUZZLE_SCORES[index];
            if (hints[index] === "1") score -= HINT_COSTS[index];
        }

        const finishedAt = solved > 0 ? puzzles[solved - 1] : null;
        const elapsedSeconds = finishedAt === null ? Infinity : Math.max(0, Math.round((finishedAt - startAt) / 1000));
        return {
            username: user.username,
            solved: solved,
            score: score,
            elapsedSeconds: elapsedSeconds,
            elapsedLabel: formatDuration(elapsedSeconds),
            hints: hints,
            puzzles: puzzles,
        };
    }).sort(function compareStandings(left, right) {
        return right.score - left.score
            || left.elapsedSeconds - right.elapsedSeconds
            || left.username.localeCompare(right.username);
    });
}

function renderTable(standings) {
    const table = document.getElementById("hackerboard");
    table.textContent = "";
    standings.forEach(function appendStanding(standing, index) {
        const row = table.insertRow();
        const rank = document.createElement("th");
        rank.scope = "row";
        rank.textContent = index + 1;
        row.appendChild(rank);
        [standing.username, standing.solved, standing.elapsedLabel, standing.score].forEach(function appendValue(value) {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });
}

function chartDataset(standing, startAt, color) {
    const points = [{ x: new Date(startAt), y: 0 }];
    let score = 0;
    for (let index = 0; index < standing.solved; index += 1) {
        score += PUZZLE_SCORES[index];
        if (standing.hints[index] === "1") score -= HINT_COSTS[index];
        points.push({ x: new Date(standing.puzzles[index]), y: score });
    }
    return {
        label: standing.username,
        borderColor: color,
        steppedLine: true,
        fill: false,
        data: points,
    };
}

function renderChart(standings, event) {
    const canvas = document.getElementById("myChart");
    if (!canvas || typeof Chart === "undefined") return;
    const startAt = Date.parse(event.startAt);
    const datasets = standings
        .filter(function hasProgress(standing) { return standing.solved > 0; })
        .slice(0, 10)
        .map(function makeDataset(standing, index) {
            return chartDataset(standing, startAt, CHART_COLORS[index]);
        });

    new Chart(canvas.getContext("2d"), {
        type: "line",
        data: { datasets: datasets },
        options: {
            scales: {
                yAxes: [{ type: "linear", ticks: { beginAtZero: true } }],
                xAxes: [{
                    type: "time",
                    distribution: "series",
                    time: { unit: "minute", tooltipFormat: "MMM D, HH:mm:ss" },
                }],
            },
        },
    });
}

async function generateTable() {
    const table = document.getElementById("hackerboard");
    try {
        const results = await Promise.all([CtfApi.get("/GetAllUsers"), CtfApi.get("/event")]);
        const standings = rankUsers(results[0], results[1]);
        renderTable(standings);
        renderChart(standings, results[1]);
    } catch (error) {
        table.textContent = "";
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5;
        cell.textContent = error.message;
    }
}

window.CtfLeaderboard = Object.freeze({ formatDuration: formatDuration, parseSolveTime: parseSolveTime, rankUsers: rankUsers });
