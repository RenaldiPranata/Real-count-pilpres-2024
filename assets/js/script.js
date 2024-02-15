$(document).ready(function () {
  var w = window.innerWidth;

  if (w > 767) {
    $("#menu-jk").scrollToFixed();
  } else {
    // $('#menu-jk').scrollToFixed();
  }
});

$(document).ready(function () {
  $("#testimonial-slider").owlCarousel({
    items: 2,
    itemsDesktop: [1000, 2],
    itemsDesktopSmall: [979, 2],
    itemsTablet: [768, 1],
    pagination: false,
    navigation: true,
    navigationText: ["", ""],
    autoPlay: true,
  });
});

$(document).ready(function () {
  $(".filter-button").click(function () {
    var value = $(this).attr("data-filter");

    if (value == "all") {
      //$('.filter').removeClass('hidden');
      $(".filter").show("1000");
    } else {
      //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
      //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
      $(".filter")
        .not("." + value)
        .hide("3000");
      $(".filter")
        .filter("." + value)
        .show("3000");
    }
  });

  if ($(".filter-button").removeClass("active")) {
    $(this).removeClass("active");
  }
  $(this).addClass("active");
});

async function count() {
  const response = await fetch(
    "https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json"
  );

  const result = await response.json();

  console.log(result);

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

count();

// update every 5 minutes
setInterval(count, 5000);
