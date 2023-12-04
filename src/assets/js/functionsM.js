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

function initSelect() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      
      var instances = M.FormSelect.init(elems, {});
      console.log(instances);
    });
  }

initSidebar(); 
