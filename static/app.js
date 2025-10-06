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
    const url = `/api/backtest/?ticker=${encodeURIComponent(ticker)}&period=${encodeURIComponent(period)}`;
    let resp, text;
    try {
      resp = await fetch(url);
      text = await resp.text();
    } catch (err) {
      console.error("[BT] Network/Fetch error:", err);
      alert(`Request failed: ${err}`);
      return;
    }
    if (!resp.ok) {
      console.error("[BT] Non-OK response:", text.slice(0, 300));
      alert(`Error ${resp.status}: ${text.slice(0, 180)}`);
      return;
    }
    let j;
    try { j = JSON.parse(text); } catch (err) {
      console.error("[BT] JSON parse error. Raw:", text.slice(0, 300));
      alert("Server did not return JSON.");
      return;
    }
    if (j.error) {
      console.error("[BT] API error:", j.error);
      alert(j.error);
      return;
    }
    cagr.textContent   = (j.metrics.CAGR * 100).toFixed(2) + "%";
    sharpe.textContent = j.metrics.Sharpe.toFixed(2);
    dd.textContent     = (j.metrics.MaxDD * 100).toFixed(2) + "%";
    const labels  = j.series.dates;
    const equity  = j.series.equity;
    const buyhold = j.series.buy_hold;
    const ctx = document.getElementById("equity-chart").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          { label: "Strategy",   data: equity,  borderWidth: 2, fill: false },
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

// ===================== Research (Portfolio Module) =====================
(function() {
  const PF_COLORS = [
    "#6EA8FE", "#75B798", "#F7C948", "#E98B8B", "#B197FC",
    "#4DD0E1", "#FFB86B", "#94D2BD", "#F28482", "#A6A4E6"
  ];
  const PF_BG = "#0F172A";
  const PF_GRID = "rgba(148,163,184,0.12)";
  const PF_TEXT = "#E2E8F0";

  const pfLayout = (title = "", height = 320) => ({
    title: { text: title, font: { color: PF_TEXT, size: 14 } },
    paper_bgcolor: PF_BG,
    plot_bgcolor: PF_BG,
    height,
    margin: { l: 50, r: 20, t: 40, b: 40 },
    xaxis: { gridcolor: PF_GRID, tickfont: { color: PF_TEXT } },
    yaxis: { gridcolor: PF_GRID, tickfont: { color: PF_TEXT } },
    showlegend: true,
    legend: { font: { color: PF_TEXT } }
  });

  function fmt(v) {
    if (v == null || Number.isNaN(v)) return "—";
    if (Math.abs(v) < 1) return (v * 100).toFixed(2) + "%";
    return Number(v).toFixed(2);
  }

  function fmtPct(v) {
    if (v == null || Number.isNaN(v)) return "—";
    return (Number(v) * 100).toFixed(2) + "%";
  }
  
  function fmtNum(v, digits = 2) {
    if (v == null || Number.isNaN(v)) return "—";
    return Number(v).toFixed(digits);
  }

  async function postJSON(url, body) {
    console.log("[POST] URL:", url);
    console.log("[POST] Body:", body);
    try {
      const fetchWithTimeout = (url, options, timeout = 180000) => {
        console.log("[FETCH] Starting fetch to:", url);
        return Promise.race([
          fetch(url, options),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout - server took longer than 3 minutes')), timeout)
          )
        ]);
      };

      const res = await fetchWithTimeout(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body || {}),
        mode: "same-origin",
        cache: "no-cache"
      });
      const text = await res.text();
      console.log("[POST] Response text (first 500 chars):", text.slice(0, 500));
      if (!res.ok) {
        console.error(`[POST] ${url} -> ${res.status}`, text.slice(0, 500));
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
      }
      try { 
        const cleanedText = text.replace(/:\s*NaN/g, ': null');
        return JSON.parse(cleanedText); 
      } catch (e) {
        console.error(`[POST] JSON parse fail for ${url}. Raw:`, text.slice(0, 500));
        throw new Error("Server did not return JSON.");
      }
    } catch (err) {
      console.error("[POST] fetch error:", err);
      throw err;
    }
  }

  const PF = {
    initialized: false,

    init() {
      console.log("[PF] init() called");
      const btn = document.getElementById("pf-run");
      
      if (!btn) {
        console.log("[PF] pf-run button not found");
        return;
      }

      if (this.initialized) {
        console.log("[PF] Already initialized");
        return;
      }

      console.log("[PF] Binding click handler");
      btn.addEventListener("click", () => {
        console.log("[PF] Run button clicked!");
        PF.run();
      });
      
      this.initialized = true;
      console.log("[PF] Initialization complete");
    },

    async run() {
      console.log("[PF] run() started");

      const btn = document.getElementById("pf-run");
      const originalText = btn.textContent;
      btn.textContent = "Loading…";
      btn.disabled = true;

      document.getElementById("pf-metrics").innerHTML =
        '<div class="text-muted">Loading report…</div>';

      try {
        const tickers = (document.getElementById("pf-tickers").value || "")
          .split(",").map(s => s.trim()).filter(Boolean);
        const start     = document.getElementById("pf-start").value || "2015-01-01";
        const signal    = document.getElementById("pf-signal").value || "prob_up_1d";
        const allocator = document.getElementById("pf-allocator").value || "equal_weight";
        const rebalance = document.getElementById("pf-rebalance").value || "weekly";
        const cost_bps  = Number(document.getElementById("pf-cost").value || 5);

        const body = { tickers, start, signal, allocator, rebalance, cost_bps, benchmark: "SPY" };
        const R = await postJSON("/api/report", body);
        console.log("[PF] /api/report payload:", R);

        // ---------- Metrics card ----------
        const M  = (R.performance && R.performance.summary) || {};
        const ab = M.alpha_beta || {};
        document.getElementById("pf-metrics").innerHTML = `
          <ul class="list-unstyled mb-0">
            <li><strong>CAGR:</strong> ${fmtPct(M.cagr)}</li>
            <li><strong>Sharpe:</strong> ${fmtNum(M.sharpe)}</li>
            <li><strong>Sortino:</strong> ${fmtNum(M.sortino)}</li>
            <li><strong>Info Ratio:</strong> ${fmtNum(M.information_ratio)}</li>
            <li><strong>Alpha (ann):</strong> ${fmtPct(ab.alpha)}</li>
            <li><strong>Beta:</strong> ${fmtNum(ab.beta)}</li>
            <li><strong>MaxDD:</strong> ${fmtPct(M.max_drawdown)}</li>
          </ul>
        `;

        // ---------- Equity vs Benchmark ----------
        const eq = (R.performance && R.performance.equity) || [];
        if (eq.length) {
          const x  = eq.map(d => d.date);
          const ys = eq.map(d => d.equity);
          const yb = eq.map(d => d.bench_equity);
          Plotly.newPlot("pf-equity", [
            { x, y: ys, mode: "lines", name: "Strategy", line: { width: 2, color: PF_COLORS[0] } },
            { x, y: yb, mode: "lines", name: R.config?.benchmark || "Benchmark", line: { width: 2, color: PF_COLORS[3], dash: "dot" } }
          ], pfLayout("", 360), { displayModeBar: false });
        } else {
          Plotly.purge("pf-equity");
          document.getElementById("pf-equity").innerHTML =
            "<div class='text-muted small'>No equity series returned.</div>";
        }

        // ---------- Rolling Sharpe / Vol / Drawdown ----------
        const rs  = (R.rolling && R.rolling.sharpe)   || [];
        const rv  = (R.rolling && R.rolling.vol)      || [];
        const rdd = (R.rolling && R.rolling.drawdown) || [];
        const toTrace = (arr, name) => ({
          x: arr.map(d => d.date),
          y: arr.map(d => d.value),
          mode: "lines", name
        });

        if (rs.length) {
          Plotly.newPlot("pf-roll-sharpe", [toTrace(rs, "Rolling Sharpe (63d)")],
            { ...pfLayout("", 280) }, { displayModeBar: false });
        } else { Plotly.purge("pf-roll-sharpe"); }

        if (rv.length) {
          Plotly.newPlot("pf-roll-vol", [toTrace(rv, "Rolling Vol (ann., 63d)")],
            { ...pfLayout("", 280), yaxis: { tickformat: ".1%", gridcolor: "rgba(148,163,184,0.12)", tickfont: { color: PF_TEXT } } },
            { displayModeBar: false });
        } else { Plotly.purge("pf-roll-vol"); }

        if (rdd.length) {
          Plotly.newPlot("pf-roll-dd", [toTrace(rdd, "Drawdown")],
            { ...pfLayout("", 280), yaxis: { tickformat: ".1%", rangemode: "tozero" } },
            { displayModeBar: false });
        } else { Plotly.purge("pf-roll-dd"); }

        // ---------- Attribution ----------
        PF.renderAttribBar(R);
        PF.renderAttribStack(R);

        // ---------- Weights heatmap ----------
        const weights = R.weights || null;
        if (weights && Object.keys(weights).length) {
          const dates = Object.keys(weights).sort();
          const tickersAll = [...new Set(Object.values(weights).flatMap(o => Object.keys(o)))];
          const z = dates.map(d => tickersAll.map(t => (weights[d]?.[t] ?? 0)));
          Plotly.newPlot("pf-weights", [{
            z, x: tickersAll, y: dates, type: "heatmap", colorscale: "Blues", showscale: true,
            hovertemplate: '%{y}<br>%{x}: %{z:.1%}<extra></extra>'
          }], pfLayout("", 420), { displayModeBar: false });
        } else {
          Plotly.purge("pf-weights");
          document.getElementById("pf-weights").innerHTML =
            "<div class='text-muted small'>No weights returned in report.</div>";
        }

        // ---------- FF exposures (FIXED) ----------
        const ff = (R.exposures && R.exposures.factors) || null;
        const wrapFF = document.getElementById("pf-ff");
        
        console.log("[PF] FF data received:", ff);
        
        if (ff && ff.betas && typeof ff.betas === "object" && Object.keys(ff.betas).length > 0) {
          const labels = Object.keys(ff.betas);
          const betas  = labels.map(k => ff.betas[k]);
          const tstats = ff.tstats || {};
          const tlabels = labels.map(k => {
            const t = tstats[k];
            return (t != null && Number.isFinite(t)) ? `t=${Number(t).toFixed(2)}` : "";
          });
          
          console.log("[PF] Plotting FF - labels:", labels, "betas:", betas);
          
          Plotly.newPlot("pf-ff", [{
            x: labels,
            y: betas,
            type: "bar",
            marker: { color: PF_COLORS[0] },
            text: tlabels,
            textposition: "outside",
            hovertemplate: '%{x}: %{y:.3f}<br>%{text}<extra></extra>'
          }], {
            title: { text: "Fama-French Factor Exposures", font: { color: PF_TEXT, size: 14 } },
            paper_bgcolor: PF_BG,
            plot_bgcolor: PF_BG,
            height: 320,
            margin: { l: 50, r: 20, t: 40, b: 40 },
            xaxis: { gridcolor: PF_GRID, tickfont: { color: PF_TEXT } },
            yaxis: { gridcolor: PF_GRID, tickfont: { color: PF_TEXT }, title: "Beta" },
          }, { displayModeBar: false });
        } else {
          console.log("[PF] No FF exposures or empty betas");
          wrapFF.innerHTML = "<div class='text-muted small'>No factor exposures available (may be insufficient date overlap)</div>";
        }

        console.log("[PF] run() completed successfully");
      } catch (err) {
        console.error("[PF] run() error:", err);
        alert(err.message || String(err));
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    },

    renderAttribBar(R) {
      try {
        const last6 = (R.attribution && R.attribution.last_6m) || [];
        if (!last6.length) {
          document.getElementById("pf-attr").innerHTML =
            "<div class='text-muted small'>No attribution available.</div>";
          return;
        }
        const labels = last6.map(x => x.ticker);
        const vals   = last6.map(x => x.contribution);

        Plotly.newPlot("pf-attr", [
          { x: labels, y: vals, type: "bar", name: "Σ w·r (6m)", marker: { color: PF_COLORS[1] } }
        ], pfLayout("", 300), { displayModeBar: false });
      } catch (e) {
        console.warn("[PF] renderAttribBar error:", e);
      }
    },

    renderAttribStack(R) {
      try {
        const per = (R.attribution && R.attribution.per_period) || [];
        if (!per.length) {
          Plotly.purge("pf-attr-pct");
          document.getElementById("pf-attr-pct").innerHTML =
            "<div class='text-muted small'>No per-period attribution available.</div>";
          return;
        }
        const dates = per.map(r => r.date);
        const cols  = Object.keys(per[0]).filter(k => k !== "date");
        const traces = cols.map((c, i) => ({
          x: dates,
          y: per.map(r => r[c] ?? 0),
          type: "scatter",
          mode: "lines",
          stackgroup: "one",
          name: c,
          line: { color: PF_COLORS[i % PF_COLORS.length] }
        }));
        Plotly.newPlot("pf-attr-pct", traces, {
          ...pfLayout("", 300),
          showlegend: true
        }, { displayModeBar: false });
      } catch (e) {
        console.warn("[PF] renderAttribStack error:", e);
      }
    },
  };

  window.PF = PF;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      console.log("[PF] DOMContentLoaded fired");
      PF.init();
    });
  } else {
    console.log("[PF] DOM already loaded, initializing immediately");
    PF.init();
  }
})();