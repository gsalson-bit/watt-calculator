import { useState } from "react";

const GOOGLE_FONT = `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;900&family=Barlow:wght@300;400;500&display=swap');`;

const css = `
  ${GOOGLE_FONT}

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    font-family: 'Barlow', sans-serif;
    background: #0a0c10;
    min-height: 100vh;
    color: #e8eaf0;
    padding: 24px 16px 48px;
    position: relative;
    overflow-x: hidden;
  }

  .app::before {
    content: '';
    position: fixed;
    top: -200px; left: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(255,80,0,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .app::after {
    content: '';
    position: fixed;
    bottom: -150px; right: -100px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,180,255,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  .header {
    text-align: center;
    margin-bottom: 32px;
  }

  .header-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #ff5000;
    margin-bottom: 8px;
  }

  .header-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(36px, 8vw, 64px);
    font-weight: 900;
    line-height: 0.95;
    text-transform: uppercase;
    letter-spacing: -1px;
    color: #fff;
  }

  .header-title span {
    color: #ff5000;
  }

  .header-sub {
    font-size: 13px;
    color: #6b7280;
    margin-top: 10px;
    font-weight: 300;
  }

  .card {
    background: #13161d;
    border: 1px solid #1e2230;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 12px;
  }

  .card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ff5000;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #1e2230;
  }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }

  .field label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #6b7280;
    margin-bottom: 6px;
  }

  .field input, .field select {
    width: 100%;
    background: #0d0f14;
    border: 1px solid #1e2230;
    border-radius: 7px;
    color: #e8eaf0;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    font-weight: 600;
    padding: 10px 12px;
    outline: none;
    transition: border-color 0.2s;
    -moz-appearance: textfield;
  }
  .field input::-webkit-outer-spin-button,
  .field input::-webkit-inner-spin-button { -webkit-appearance: none; }
  .field input:focus, .field select:focus {
    border-color: #ff5000;
  }
  .field .unit {
    font-size: 11px;
    color: #4b5563;
    margin-top: 4px;
  }

  .field select option { background: #13161d; }

  .results-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  .result-card {
    background: #0d0f14;
    border: 1px solid #1e2230;
    border-radius: 10px;
    padding: 14px;
    position: relative;
    overflow: hidden;
  }

  .result-card.primary {
    grid-column: 1 / -1;
    background: linear-gradient(135deg, #1a0d05 0%, #0d0f14 100%);
    border-color: #ff5000;
  }

  .result-card.primary::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff5000, #ff8c00);
  }

  .result-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #6b7280;
    margin-bottom: 4px;
  }

  .result-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 36px;
    font-weight: 900;
    line-height: 1;
    color: #fff;
  }

  .result-card.primary .result-value {
    font-size: 52px;
    color: #ff5000;
  }

  .result-unit {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #6b7280;
    margin-left: 4px;
  }

  .result-sub {
    font-size: 11px;
    color: #4b5563;
    margin-top: 4px;
  }

  .breakdown-bar {
    margin-top: 14px;
  }

  .breakdown-bar-label {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #6b7280;
    margin-bottom: 5px;
  }

  .bar-track {
    height: 6px;
    background: #1e2230;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  }

  .watts-breakdown {
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }

  .wbd-item {
    background: #0d0f14;
    border: 1px solid #1e2230;
    border-radius: 8px;
    padding: 10px 8px;
    text-align: center;
  }

  .wbd-icon { font-size: 16px; margin-bottom: 4px; }
  .wbd-val {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #e8eaf0;
  }
  .wbd-lab { font-size: 10px; color: #4b5563; margin-top: 2px; }

  .category-badge {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 8px;
  }

  .tabs {
    display: flex;
    gap: 4px;
    background: #0d0f14;
    border: 1px solid #1e2230;
    border-radius: 8px;
    padding: 4px;
    margin-bottom: 12px;
  }
  .tab {
    flex: 1;
    padding: 8px 4px;
    border: none;
    background: transparent;
    color: #6b7280;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .tab.active {
    background: #ff5000;
    color: #fff;
  }

  .divider {
    height: 1px;
    background: #1e2230;
    margin: 16px 0;
  }

  .tip {
    font-size: 12px;
    color: #4b5563;
    text-align: center;
    margin-top: 24px;
    font-style: italic;
  }
`;

// ISA model: rho = 1.225 * (1 - 0.0000226 * alt)^4.256
function altitudeToRho(alt) {
  return 1.225 * Math.pow(1 - 0.0000226 * Math.max(0, alt), 4.256);
}

// Coggan & Allen power profile reference table (W/kg, hommes)
// Durées de référence en secondes: 5s, 60s, 300s, 1200s (FTP ~20min)
const COGGAN_DURATIONS = [5, 60, 300, 1200];
const COGGAN_LEVELS = [
  { label: "Débutant",        color: "#4b5563", bg: "#1e2230", values: [9.0, 5.5, 3.0, 2.5] },
  { label: "Récréatif",          color: "#3b82f6", bg: "#0f1f3d", values: [10.5, 6.5, 3.6, 3.0] },
  { label: "Sportif",         color: "#10b981", bg: "#062019", values: [12.5, 7.5, 4.2, 3.6] },
  { label: "Régional",        color: "#f59e0b", bg: "#1f1505", values: [14.5, 8.7, 4.8, 4.2] },
  { label: "National",          color: "#f97316", bg: "#1f0e03", values: [16.5, 10.0, 5.5, 4.8] },
  { label: "Pro Conti", color: "#ef4444", bg: "#1f0505", values: [18.5, 11.5, 6.2, 5.6] },
  { label: "World Tour",      color: "#a855f7", bg: "#1a0a2e", values: [21.5, 13.5, 7.2, 6.5] },
];

// Interpolate the W/kg threshold for a given level at a given duration (log scale on duration)
function thresholdAt(levelValues, durationSec) {
  const d = Math.min(Math.max(durationSec, COGGAN_DURATIONS[0]), COGGAN_DURATIONS[COGGAN_DURATIONS.length - 1]);
  const logD = Math.log(d);
  for (let i = 0; i < COGGAN_DURATIONS.length - 1; i++) {
    const d0 = COGGAN_DURATIONS[i], d1 = COGGAN_DURATIONS[i + 1];
    if (d >= d0 && d <= d1) {
      const t = (logD - Math.log(d0)) / (Math.log(d1) - Math.log(d0));
      return levelValues[i] + t * (levelValues[i + 1] - levelValues[i]);
    }
  }
  return levelValues[levelValues.length - 1];
}

// Returns category based on W/kg AND effort duration, using Coggan power profile
function getCategoryByDuration(wpkg, durationSec) {
  let matched = COGGAN_LEVELS[0];
  for (const level of COGGAN_LEVELS) {
    const threshold = thresholdAt(level.values, durationSec);
    if (wpkg >= threshold) matched = level;
    else break;
  }
  return matched;
}

function calcPower({ weight, bikeWeight, speed, gradient, crr, cda, rho, efficiency }) {
  const totalMass = weight + bikeWeight;
  const g = 9.81;
  const vms = speed / 3.6;

  const pGravity = totalMass * g * Math.sin(Math.atan(gradient / 100)) * vms;
  const pRolling = totalMass * g * Math.cos(Math.atan(gradient / 100)) * crr * vms;
  const pAero = 0.5 * rho * cda * vms * vms * vms;
  const pTotal = (pGravity + pRolling + pAero) / efficiency;

  return {
    total: Math.max(0, Math.round(pTotal)),
    gravity: Math.max(0, Math.round(pGravity)),
    rolling: Math.max(0, Math.round(pRolling)),
    aero: Math.max(0, Math.round(pAero)),
  };
}

function calcSpeed({ weight, bikeWeight, power, gradient, crr, cda, rho, efficiency }) {
  // Binary search for speed
  let lo = 0, hi = 100;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const res = calcPower({ weight, bikeWeight, speed: mid, gradient, crr, cda, rho, efficiency });
    if (res.total < power) lo = mid;
    else hi = mid;
  }
  return Math.round(((lo + hi) / 2) * 10) / 10;
}

export default function App() {
  const [mode, setMode] = useState("power"); // "power" | "speed"
  const [raw, setRaw] = useState({
    weight: "70",
    bikeWeight: "8",
    speed: "25",
    power: "200",
    gradient: "0",
    crr: "0.0044",
    cda: "0.35",
    altitude: "0",
    efficiency: "0.975",
    position: "route",
    distance: "",
  });

  const set = (k, v) => setRaw(p => ({ ...p, [k]: v }));

  // Parse raw strings to numbers for calculations (fallback to 0)
  const inputs = {
    weight: parseFloat(raw.weight) || 0,
    bikeWeight: parseFloat(raw.bikeWeight) || 0,
    speed: parseFloat(raw.speed) || 0,
    power: parseFloat(raw.power) || 0,
    gradient: parseFloat(raw.gradient) || 0,
    crr: parseFloat(raw.crr) || 0,
    cda: parseFloat(raw.cda) || 0,
    altitude: parseFloat(raw.altitude) || 0,
    efficiency: parseFloat(raw.efficiency) || 0.975,
    position: raw.position,
  };
  const computedRho = altitudeToRho(inputs.altitude);

  const positionPresets = {
    route: { cda: 0.35, label: "Route / Cocottes" },
    drops: { cda: 0.30, label: "Drops" },
    aero: { cda: 0.24, label: "Position aéro / TT" },
    vtt: { cda: 0.45, label: "VTT / upright" },
  };

  const handlePosition = (pos) => {
    setRaw(p => ({ ...p, position: pos, cda: String(positionPresets[pos].cda) }));
  };

  const result = mode === "power"
    ? calcPower({ ...inputs, rho: computedRho })
    : { total: 0, ...calcPower({ ...inputs, rho: computedRho, speed: calcSpeed({ ...inputs, rho: computedRho }) }) };

  const speedResult = mode === "speed" ? calcSpeed({ ...inputs, rho: computedRho }) : inputs.speed;
  const displayPower = mode === "power" ? result.total : inputs.power;
  const displaySpeed = mode === "power" ? inputs.speed : speedResult;

  const wpkg = displayPower / inputs.weight;

  const distanceKm = parseFloat(raw.distance);
  const hasDistance = distanceKm > 0 && displaySpeed > 0;
  const durationSec = hasDistance ? (distanceKm / displaySpeed) * 3600 : null;
  const cat = hasDistance ? getCategoryByDuration(wpkg, durationSec) : null;

  const total = result.gravity + result.rolling + result.aero;
  const pct = (v) => total > 0 ? Math.round((v / total) * 100) : 0;

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="header">
          <div className="header-eyebrow">Cyclisme · Physique</div>
          <div className="header-title">
            Calculateur<br /><span>Watts</span>
          </div>
          <div className="header-sub">Modèle physique complet — résistance aéro, roulement & gravité</div>
        </div>

        {/* Mode tabs */}
        <div className="tabs">
          <button className={`tab${mode === "power" ? " active" : ""}`} onClick={() => setMode("power")}>
            → Calcul watts
          </button>
          <button className={`tab${mode === "speed" ? " active" : ""}`} onClick={() => setMode("speed")}>
            → Calcul vitesse
          </button>
        </div>

        {/* Rider */}
        <div className="card">
          <div className="card-title">🚴 Cycliste & vélo</div>
          <div className="field">
            <label>Poids cycliste</label>
            <input type="number" value={raw.weight} onChange={e => set("weight", e.target.value)} />
            <div className="unit">kg</div>
          </div>

          <div className="field" style={{ marginTop: 12 }}>
            <label>Poids vélo + équipement (gourdes, casque, chaussures…)</label>
            <input type="number" value={raw.bikeWeight} onChange={e => set("bikeWeight", e.target.value)} />
            <div className="unit">kg</div>
          </div>
        </div>

        {/* Effort */}
        <div className="card">
          <div className="card-title">⚡ {mode === "power" ? "Vitesse cible" : "Puissance cible"}</div>
          {mode === "power" ? (
            <div className="field">
              <label>Vitesse</label>
              <input type="number" value={raw.speed} onChange={e => set("speed", e.target.value)} />
              <div className="unit">km/h</div>
            </div>
          ) : (
            <div className="field">
              <label>Puissance</label>
              <input type="number" value={raw.power} onChange={e => set("power", e.target.value)} />
              <div className="unit">watts</div>
            </div>
          )}

          <div className="field" style={{ marginTop: 12 }}>
            <label>Pente</label>
            <input type="number" step="0.1" value={raw.gradient} onChange={e => set("gradient", e.target.value)} />
            <div className="unit">% (négatif = descente)</div>
          </div>
        </div>

        {/* Aero */}
        <div className="card">
          <div className="card-title">💨 Paramètres aérodynamiques</div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label>Position</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {Object.entries(positionPresets).map(([k, v]) => (
                <button key={k} onClick={() => handlePosition(k)}
                  style={{
                    padding: "6px 12px", borderRadius: 6, border: "1px solid",
                    borderColor: raw.position === k ? "#ff5000" : "#1e2230",
                    background: raw.position === k ? "#1a0d05" : "#0d0f14",
                    color: raw.position === k ? "#ff5000" : "#6b7280",
                    fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12,
                    fontWeight: 600, cursor: "pointer", letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid-3">
            <div className="field">
              <label>CdA</label>
              <input type="number" step="0.01" value={raw.cda} onChange={e => set("cda", e.target.value)} />
              <div className="unit">m²</div>
            </div>
            <div className="field">
              <label>Crr</label>
              <input type="number" step="0.001" value={raw.crr} onChange={e => set("crr", e.target.value)} />
              <div className="unit">coeff.</div>
            </div>
            <div className="field">
              <label>Altitude moy.</label>
              <input type="number" step="50" value={raw.altitude} onChange={e => set("altitude", e.target.value)} />
              <div className="unit" style={{ display: "flex", justifyContent: "space-between" }}>
                <span>m</span>
                <span style={{ color: "#ff5000", fontWeight: 600 }}>ρ = {computedRho.toFixed(4)} kg/m³</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="card">
          <div className="card-title">📊 Résultats</div>
          <div className="results-grid">
            <div className="result-card primary">
              <div className="result-label">{mode === "power" ? "Puissance requise" : "Puissance fournie"}</div>
              <div>
                <span className="result-value">{displayPower}</span>
                <span className="result-unit">W</span>
              </div>
              <div className="result-sub">
                {wpkg.toFixed(2)} W/kg · {displaySpeed} km/h
              </div>
              {cat ? (
                <span className="category-badge" style={{ color: cat.color, background: cat.bg }}>
                  {cat.label}
                </span>
              ) : (
                <div style={{ fontSize: 11, color: "#ff5000", marginTop: 8, fontStyle: "italic" }}>
                  Renseigne la distance du segment pour estimer le niveau
                </div>
              )}
            </div>

            <div className="result-card">
              <div className="result-label">Vitesse</div>
              <div>
                <span className="result-value">{displaySpeed}</span>
                <span className="result-unit">km/h</span>
              </div>
            </div>

            <div className="result-card">
              <div className="result-label">W/kg</div>
              <div>
                <span className="result-value">{wpkg.toFixed(2)}</span>
                <span className="result-unit">W/kg</span>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="watts-breakdown">
            {[
              { icon: "⛰️", label: "Gravité", val: result.gravity, color: "#ff5000" },
              { icon: "🛞", label: "Roulement", val: result.rolling, color: "#3b82f6" },
              { icon: "💨", label: "Aéro", val: result.aero, color: "#10b981" },
            ].map(item => (
              <div className="wbd-item" key={item.label}>
                <div className="wbd-icon">{item.icon}</div>
                <div className="wbd-val" style={{ color: item.color }}>{item.val}W</div>
                <div className="wbd-lab">{item.label} · {pct(item.val)}%</div>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="breakdown-bar">
            {[
              { label: "Gravité", val: result.gravity, color: "#ff5000" },
              { label: "Roulement", val: result.rolling, color: "#3b82f6" },
              { label: "Aéro", val: result.aero, color: "#10b981" },
            ].map(item => (
              <div key={item.label}>
                <div className="breakdown-bar-label">
                  <span>{item.label}</span>
                  <span style={{ color: item.color }}>{pct(item.val)}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct(item.val)}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Segment */}
        <div className="card">
          <div className="card-title">📍 Segment</div>
          <div className="field" style={{ marginBottom: 14 }}>
            <label>Distance</label>
            <input type="number" step="0.1" value={raw.distance} onChange={e => set("distance", e.target.value)} />
            <div className="unit">km</div>
          </div>
          {(() => {
            const dist = parseFloat(raw.distance);
            if (!dist || dist <= 0 || displaySpeed <= 0) return (
              <div style={{ color: "#4b5563", fontSize: 13, textAlign: "center", padding: "10px 0" }}>
                Renseigne une distance pour estimer le temps et le niveau
              </div>
            );
            const totalSec = (dist / displaySpeed) * 3600;
            const h = Math.floor(totalSec / 3600);
            const m = Math.floor((totalSec % 3600) / 60);
            const s = Math.round(totalSec % 60);
            const timeStr = h > 0
              ? `${h}h ${String(m).padStart(2,"0")}min ${String(s).padStart(2,"0")}s`
              : `${m}min ${String(s).padStart(2,"0")}s`;
            const minPerKm = totalSec / 60 / dist;
            const mpkMin = Math.floor(minPerKm);
            const mpkSec = Math.round((minPerKm - mpkMin) * 60);
            return (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="result-card primary" style={{ gridColumn: "1 / -1" }}>
                  <div className="result-label">Temps estimé</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 40, fontWeight: 900, color: "#ff5000", lineHeight: 1 }}>
                    {timeStr}
                  </div>
                  <div className="result-sub" style={{ marginTop: 6 }}>
                    {dist} km à {displaySpeed} km/h
                  </div>
                </div>
                <div className="result-card">
                  <div className="result-label">Allure</div>
                  <div>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: "#fff" }}>
                      {mpkMin}:{String(mpkSec).padStart(2,"0")}
                    </span>
                    <span className="result-unit">min/km</span>
                  </div>
                </div>
                <div className="result-card">
                  <div className="result-label">Énergie totale</div>
                  <div>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: "#fff" }}>
                      {Math.round(displayPower * totalSec / 1000)}
                    </span>
                    <span className="result-unit">kJ</span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}
