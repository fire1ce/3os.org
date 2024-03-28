window.onload = function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "/" + mm + "/" + yyyy;
  document.getElementById("today").innerHTML = today;
};

function frameIt() {
  var url = document.getElementById("url").value;
  var iframe = document.getElementById("iframe");

  iframe.src = url;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submit-test").addEventListener("click", function () {
    frameIt();
  });
});
