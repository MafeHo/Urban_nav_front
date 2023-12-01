function initSidebar() {
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {

    });
  });
}

function initRecaptcha() {
  var onloadCallback = function () {
    alert("grecaptcha is ready!");
  };
}

initSidebar(); 