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
})({3:[function(require,module,exports) {
const API_URL = "http://localhost:8080/";

const TIMESLOTS = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

$(document).ready(function () {
  TIMESLOTS.forEach(i => {
    $("#startTime").append(`
        <option value='${i}'> ${i} </option>`);
    $("#endTime").append(`
        <option value='${i}'> ${i} </option>`);
  });
  getProviders();
  $("#serviceProvider").change(() => {
    $("#selectSlots").css("display", "block");
    var provider_id = $("input[name='serviceProvider']:checked").val();
    handleExistingTimeslots(provider_id);
  });
  $("form").append('<button type="submit">Submit</button>');
  $("form").submit(e => {
    e.preventDefault();
    handleSubmit();
  });
  $("#reminderPage").click(() => {
    var provider_id = $("input[name='serviceProvider']:checked").val();
    if (provider_id) {
      window.location = 'reminder.html?provider_id=' + provider_id;
    } else {
      alert("Please select the type of provider you are!");
    }
  });
  $("#ordersPage").click(() => {
    var provider_id = $("input[name='serviceProvider']:checked").val();
    if (provider_id) {
      window.location = 'orders.html?provider_id=' + provider_id;
    } else {
      alert("Please select the type of provider you are!");
    }
  });
});

function getProviders() {
  $.ajax({
    url: `${API_URL}api/provider`,
    type: "GET",
    crossDomain: true
  }).done(response => {
    var providers = response.providers;
    for (var i = 0; i < providers.length; i++) {
      var title = providers[i].title;
      var id = providers[i].id;
      $("#serviceProvider").append(`
                <label class="serviceProvider"> 
                    <input type="radio" name="serviceProvider" value=${id}>
                    ${title}
                </label>
            `);
    }
  });
}

function handleSubmit() {
  var start_time = $("#startTime").val();
  var end_time = $("#endTime").val();
  var provider_id = $("input[name='serviceProvider']:checked").val();
  if (start_time && end_time && provider_id) {
    var result = $.param({
      start_time: start_time,
      end_time: end_time,
      provider_id: provider_id
    });
    console.log(result);
    $.ajax({
      url: `${API_URL}api/time_slot`,
      type: "POST",
      data: result,
      crossDomain: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).done(data => {
      handleExistingTimeslots(provider_id);
    }).fail(err => {
      if (err.status == 500) {
        alert('You already have an overlapping slot registered.');
      }
      if (err.status == 400) {
        alert('Something went wrong.');
      }
    });
  } else {
    alert("Make sure you've selected a timeslot!");
  }
};

function handleExistingTimeslots(provider_id) {
  $("#timeSlots").empty();
  $.ajax({
    url: `${API_URL}/api/provider/` + provider_id,
    type: "GET"
  }).done(response => {
    var times = [];
    for (i in response.slots) {
      var slot = response.slots[i];
      var startTime = slot.start_time.match(/\d{2}:00(?=:00Z)/);
      var endTime = slot.end_time.match(/\d{2}:00(?=:00Z)/);
      times[startTime] = endTime[0];
    }
    var sorted = [];
    sorted = Object.keys(times).sort((a, b) => {
      return a > b;
    });
    for (var i = 0; i < sorted.length; i++) {
      var start = sorted[i];
      addTimeSlot(start, times[start]);
    }
  });
}

function addTimeSlot(start, end) {
  $("#timeSlots").append(`
    <li> 
        <span class="startTime"> ${start} </span>
            -
        <span class="endTime"> ${end} </span>
    </li>
    `);
}
},{}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://localhost:59555/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,3])