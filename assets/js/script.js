let interval;

async function kpu_api() {
  const response = await fetch(
    "https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json"
  );

  const result = await response.json();

  const paslon_01 = result.chart[100025];
  const paslon_02 = result.chart[100026];
  const paslon_03 = result.chart[100027];

  const total_suara = paslon_01 + paslon_02 + paslon_03;

  const persen_paslon_01 = (paslon_01 / total_suara) * 100;
  const persen_paslon_02 = (paslon_02 / total_suara) * 100;
  const persen_paslon_03 = (paslon_03 / total_suara) * 100;

  document.getElementById(
    "vote-01"
  ).innerHTML = `Votes : ${paslon_01.toLocaleString()}`;

  const progress_01 = document.getElementById("progress-01");

  progress_01.style.width = `${persen_paslon_01}%`;

  progress_01.innerHTML = `${persen_paslon_01.toFixed(2)}%`;

  progress_01.setAttribute("aria-valuenow", persen_paslon_01);

  document.getElementById(
    "vote-02"
  ).innerHTML = `Votes : ${paslon_02.toLocaleString()}`;

  const progress_02 = document.getElementById("progress-02");

  progress_02.style.width = `${persen_paslon_02}%`;

  progress_02.innerHTML = `${persen_paslon_02.toFixed(2)}%`;

  progress_02.setAttribute("aria-valuenow", persen_paslon_02);

  document.getElementById(
    "vote-03"
  ).innerHTML = `Votes : ${paslon_03.toLocaleString()}`;

  const progress_03 = document.getElementById("progress-03");

  progress_03.style.width = `${persen_paslon_03}%`;

  progress_03.innerHTML = `${persen_paslon_03.toFixed(2)}%`;

  progress_03.setAttribute("aria-valuenow", persen_paslon_03);

  // Updated version
  document.getElementById(
    "updated-version"
  ).innerHTML = `Updated At : ${result.ts}`;

  const progress_title = document.getElementById("progress-title");

  const progress = document.getElementById("progress");

  progress_title.innerHTML = `Progress : ${result.progres.progres.toLocaleString()} of ${result.progres.total.toLocaleString()} TPS`;

  const persen_progress = (result.progres.progres / result.progres.total) * 100;

  progress.style.width = `${persen_progress}%`;

  progress.innerHTML = `${persen_progress.toFixed(2)}%`;

  progress.setAttribute("aria-valuenow", persen_progress);
}

async function kawal_pemilu_api() {
  const response = await fetch("https://kp24-fd486.et.r.appspot.com/h?id=");

  const result = await response.json();

  const last_updated = new Date(result.result.lastCachedTs);

  const values = Object.values(result.result.aggregated);

  const flat_values = values.flatMap((value) => value);

  const paslon_01 = flat_values.reduce((acc, curr) => acc + curr.pas1, 0);

  const paslon_02 = flat_values.reduce((acc, curr) => acc + curr.pas2, 0);

  const paslon_03 = flat_values.reduce((acc, curr) => acc + curr.pas3, 0);

  const total_tps = flat_values.reduce((acc, curr) => acc + curr.totalTps, 0);

  const total_completed_tps = flat_values.reduce(
    (acc, curr) => acc + curr.totalCompletedTps,
    0
  );

  const persen_total_completed_tps = (total_completed_tps / total_tps) * 100;

  const total_suara = paslon_01 + paslon_02 + paslon_03;

  const persen_paslon_01 = (paslon_01 / total_suara) * 100;
  const persen_paslon_02 = (paslon_02 / total_suara) * 100;
  const persen_paslon_03 = (paslon_03 / total_suara) * 100;

  document.getElementById(
    "vote-01"
  ).innerHTML = `Votes : ${paslon_01.toLocaleString()}`;

  const progress_01 = document.getElementById("progress-01");

  progress_01.style.width = `${persen_paslon_01}%`;

  progress_01.innerHTML = `${persen_paslon_01.toFixed(2)}%`;

  progress_01.setAttribute("aria-valuenow", persen_paslon_01);

  document.getElementById(
    "vote-02"
  ).innerHTML = `Votes : ${paslon_02.toLocaleString()}`;

  const progress_02 = document.getElementById("progress-02");

  progress_02.style.width = `${persen_paslon_02}%`;

  progress_02.innerHTML = `${persen_paslon_02.toFixed(2)}%`;

  document.getElementById(
    "vote-03"
  ).innerHTML = `Votes : ${paslon_03.toLocaleString()}`;

  const progress_03 = document.getElementById("progress-03");

  progress_03.style.width = `${persen_paslon_03}%`;

  progress_03.innerHTML = `${persen_paslon_03.toFixed(2)}%`;

  progress_03.setAttribute("aria-valuenow", persen_paslon_03);

  document.getElementById(
    "updated-version"
  ).innerHTML = `Updated At : ${last_updated.toLocaleString()}`;

  const progress_title = document.getElementById("progress-title");

  const progress = document.getElementById("progress");

  progress_title.innerHTML = `Progress : ${total_completed_tps.toLocaleString()} of ${total_tps.toLocaleString()} TPS`;

  progress.style.width = `${persen_total_completed_tps}%`;

  progress.innerHTML = `${persen_total_completed_tps.toFixed(2)}%`;
}

const KPUButton = document.getElementById("kpu-button");

const KawalPemiluButton = document.getElementById("kawal-pemilu-button");

const dataVersion = document.getElementById("data-version");

KPUButton.addEventListener("click", () => {
  clearInterval(interval);
  dataVersion.innerHTML = "KPU Version";
  kpu_api();
  interval = setInterval(kpu_api, 5000);
});

KawalPemiluButton.addEventListener("click", () => {
  clearInterval(interval);
  dataVersion.innerHTML = "Kawal Pemilu Version";
  kawal_pemilu_api();
  interval = setInterval(kawal_pemilu_api, 5000);
});

kpu_api();
interval = setInterval(kpu_api, 5000);
