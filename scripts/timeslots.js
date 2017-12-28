const API_URL = process.env.API_URL

const TIMESLOTS = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
]

$(document).ready(function() { 
    TIMESLOTS.forEach((i) => {
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
    $("form").submit((e) => {
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
        crossDomain: true,
    })
    .done((response) => {
        var providers = response.providers;
        for (var i=0; i<providers.length; i++) {
            var title = providers[i].title;
            var id = providers[i].id;
            $("#serviceProvider").append(`
                <label class="serviceProvider"> 
                    <input type="radio" name="serviceProvider" value=${id}>
                    ${title}
                </label>
            `)
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
            },
        })
        .done((data) => {
            handleExistingTimeslots(provider_id);
        })
        .fail((err) => {
            if (err.status == 500) {
                alert('You already have an overlapping slot registered.')
            }   
            if (err.status == 400) {
                alert('Something went wrong.')
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
    }).done((response) => {
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
        for (var i =0; i<sorted.length; i++) {
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
    `)
}
