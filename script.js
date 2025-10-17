const simInterval = {current: null};
let currentSample = 'limpa';
const UPDATE_INTERVAL = 1500;

const phEl = document.getElementById('phReading');
const turbEl = document.getElementById('turbReading');
const tempEl = document.getElementById('tempReading');
const chart = document.getElementById('chartPlaceholder');

function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function format(num, decimals = 2) {
  return Number(num).toFixed(decimals);
}

function sampleRanges(sample) {
  switch (sample) {
    case 'suja': return { ph: [6.0, 7.2], turb: [20, 120], temp: [18, 26] };
    case 'detergente': return { ph: [8.0, 10.5], turb: [5, 40], temp: [20, 26] };
    default: return { ph: [6.8, 7.8], turb: [0.5, 6], temp: [20, 24] };
  }
}

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const debouncedUpdate = debounce(updateReadings, 100);

function updateReadings() {
  const r = sampleRanges(currentSample);
  const ph = randBetween(r.ph[0], r.ph[1]);
  const turb = randBetween(r.turb[0], r.turb[1]);
  const temp = randBetween(r.temp[0], r.temp[1]);

  phEl.textContent = `pH — ${format(ph, 2)}`;
  turbEl.textContent = `Turbidez — ${format(turb, 1)} NTU`;
  tempEl.textContent = `Temperatura — ${format(temp, 1)} °C`;

  chart.textContent = `${new Date().toLocaleTimeString()} • Amostra: ${currentSample.toUpperCase()} • pH ${format(ph)}, Turb ${format(turb)} NTU, T ${format(temp)}°C`;
}

function startSim() {
  if (simInterval.current) return;
  debouncedUpdate();
  simInterval.current = setInterval(debouncedUpdate, UPDATE_INTERVAL);
}

function stopSim() {
  clearInterval(simInterval.current);
  simInterval.current = null;
}

function setSample(s) {
  currentSample = s;
  chart.style.opacity = 0.6;
  setTimeout(() => chart.style.opacity = 1, 180);
  updateReadings();
}

setTimeout(startSim, 800);
