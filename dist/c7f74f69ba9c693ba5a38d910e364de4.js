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
const r="http://localhost:8080/";$(document).ready(function(){var o=n("provider_id");$.ajax({url:`${r}api/order/`+o,type:"GET",crossDomain:!0}).done(r=>{for(var e=0;e<r.orders.length;e++){var n=r.orders[e];$("#orders > tbody").append(`\n            <tr> \n                <td> ${n.customer_name} </td>\n                <td> ${n.contact_number} </td>\n                <td> ${n.delivery_date} </td>\n            </tr>\n            `)}}).fail(r=>{}),$("#submitFile").click(e),$("#reminderPage").click(()=>{window.location="reminder.html?provider_id="+o})});function e(){var e=$.param({orders_csv:$("input#file").val()});e&&$.ajax({url:`${r}api/order/csv_upload`,type:"POST",crossDomain:!0,data:e}).done(r=>{}).fail(r=>{})}function n(r){var e=window.location.href;r=r.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+r+"(=([^&#]*)|&|#|$)").exec(e);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}
},{}]},{},[7])