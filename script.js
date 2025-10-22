// Alternar abas
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Simulação
let simActive = false;
let interval;

function startSim() {
  if (simActive) return;
  simActive = true;
  document.querySelector(".btn.start").classList.add("active");
  document.querySelector(".btn.stop").classList.remove("active");
  runSim();
  interval = setInterval(runSim, 1500);
}

function stopSim() {
  simActive = false;
  clearInterval(interval);
  document.querySelector(".btn.stop").classList.add("active");
  document.querySelector(".btn.start").classList.remove("active");
}

function runSim() {
  const ph = +(6.5 + Math.random() * 3).toFixed(2);
  const turb = +(Math.random() * 10).toFixed(1);
  const temp = +(20 + Math.random() * 6).toFixed(1);

  document.getElementById("phReading").textContent = `pH — ${ph}`;
  document.getElementById("turbReading").textContent = `Turbidez — ${turb} NTU`;
  document.getElementById("tempReading").textContent = `Temperatura — ${temp} °C`;

  const chart = document.getElementById("chartPlaceholder");
  chart.textContent = `
  pH:       ${"▇".repeat(Math.round(ph))} ${ph}
  Turbidez: ${"▇".repeat(Math.round(turb))} ${turb}
  Temp:     ${"▇".repeat(Math.round(temp/2))} ${temp}°C
  `;

  const status = document.getElementById("statusAgua");
  if (ph > 8.5) {
    status.textContent = "⚠️ Água com presença de detergente (pH elevado)";
    status.style.color = "#ff8800ff";
  } else if (turb > 7) {
    status.textContent = "⚠️ Água turva — possível contaminação por resíduos";
    status.style.color = "#ff2600ff";
  } else {
    status.textContent = "✅ Água limpa e estável";
    status.style.color = "#00ff99";
  }
}
