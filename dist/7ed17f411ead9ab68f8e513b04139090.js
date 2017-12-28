// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
const e="http://localhost:8080/",o=["06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];$(document).ready(function(){var e=t("provider_id");o.forEach(e=>{$("#timeSlots").append(`\n        <option value='${e}'> ${e} </option>`)}),$("form").submit(e=>{e.preventDefault(),r()}),$("#ordersPage").click(()=>{window.location="orders.html?provider_id="+e})});function r(){var o=$.param({reminder_time:$("#timeSlots").val()});o?$.ajax({url:`${e}api/provider/${provider_id}/set_reminder`,type:"PUT",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:o,crossDomain:!0}).done(e=>{alert("You have successfully set the reminder time!")}).fail(e=>{}):alert("Make sure you've selected a timeslot!")}function t(e){var o=window.location.href;e=e.replace(/[\[\]]/g,"\\$&");var r=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(o);return r?r[2]?decodeURIComponent(r[2].replace(/\+/g," ")):"":null}
},{}]},{},[7])