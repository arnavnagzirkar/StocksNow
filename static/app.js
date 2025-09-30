// ---- Sentiment page ----
const sentimentForm = document.getElementById("sentiment-form");
if (sentimentForm) {
  sentimentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const elOut = document.getElementById("sentiment-output");
    elOut.textContent = "Loading…";
    const ticker = document.getElementById("sentiment-ticker").value.trim() || "TSLA";
    try {
      const r = await fetch(`/analyze?ticker=${encodeURIComponent(ticker)}`);
      const j = await r.json();
      elOut.textContent = JSON.stringify(j, null, 2);
    } catch (err) {
      elOut.textContent = String(err);
    }
  });
}

// ---- Predictor page ----
const predictForm = document.getElementById("predict-form");
if (predictForm) {
  predictForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ticker = document.getElementById("predict-ticker").value.trim() || "TSLA";
    const card = document.getElementById("predict-card");
    const nameEl = document.getElementById("predict-name");
    const dateEl = document.getElementById("predict-date");
    const probEl = document.getElementById("predict-prob");
    const featsEl = document.getElementById("predict-feats");

    card.classList.add("d-none");
    probEl.textContent = "Loading…";
    try {
      const r = await fetch(`/api/v1/predict?ticker=${encodeURIComponent(ticker)}`);
      const j = await r.json();
      if (j.error) throw new Error(j.error);
      nameEl.textContent = j.ticker;
      dateEl.textContent = j.as_of;
      probEl.textContent = (j.prob_up * 100).toFixed(2) + "%";
      featsEl.textContent = JSON.stringify(j.features, null, 2);
      card.classList.remove("d-none");
    } catch (err) {
      probEl.textContent = String(err);
      card.classList.remove("d-none");
    }
  });
}

// ---- Backtest page ----
const backtestForm = document.getElementById("backtest-form");
let chart;
if (backtestForm) {
  backtestForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ticker = document.getElementById("backtest-ticker").value.trim() || "TSLA";
    const period = document.getElementById("backtest-period").value;
    const box = document.getElementById("backtest-results");
    const cagr = document.getElementById("m-cagr");
    const sharpe = document.getElementById("m-sharpe");
    const dd = document.getElementById("m-dd");

    box.classList.add("d-none");

    // use trailing slash to avoid 308s
    const url = `/api/backtest/?ticker=${encodeURIComponent(ticker)}&period=${encodeURIComponent(period)}`;
    console.log("[BT] Fetching:", url);

    let resp, text;
    try {
      resp = await fetch(url);
      text = await resp.text();
    } catch (err) {
      console.error("[BT] Network/Fetch error:", err);
      alert(`Request failed: ${err}`);
      return;
    }
    console.log("[BT] HTTP", resp.status, resp.statusText);

    if (!resp.ok) {
      console.error("[BT] Non-OK response:", text.slice(0, 300));
      alert(`Error ${resp.status}: ${text.slice(0, 180)}`);
      return;
    }

    let j;
    try {
      j = JSON.parse(text);
    } catch (err) {
      console.error("[BT] JSON parse error. Raw:", text.slice(0, 300));
      alert("Server did not return JSON.");
      return;
    }

    if (j.error) {
      console.error("[BT] API error:", j.error);
      alert(j.error);
      return;
    }

    console.log("[BT] Metrics:", j.metrics);

    // Metrics
    cagr.textContent   = (j.metrics.CAGR * 100).toFixed(2) + "%";
    sharpe.textContent = j.metrics.Sharpe.toFixed(2);
    dd.textContent     = (j.metrics.MaxDD * 100).toFixed(2) + "%";

    // Series
    const labels  = j.series.dates;
    const equity  = j.series.equity;
    const buyhold = j.series.buy_hold;
    console.log("[BT] Series lengths:", labels.length, equity.length, buyhold.length);

    // Chart
    const ctx = document.getElementById("equity-chart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          { label: "Strategy",  data: equity,  borderWidth: 2, fill: false },
          { label: "Buy & Hold", data: buyhold, borderWidth: 2, fill: false }
        ]
      },
      options: {
        responsive: true,
        interaction: { mode: "index", intersect: false },
        scales: { y: { beginAtZero: false } }
      }
    });

    box.classList.remove("d-none");
  });
}
