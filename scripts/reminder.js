const API_URL = process.env.API_URL

const TIMESLOTS = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
]

$(document).ready(function() { 
    var provider_id = getUrlParam('provider_id');
    TIMESLOTS.forEach((i) => {
        $("#timeSlots").append(`
        <option value='${i}'> ${i} </option>`);
    });
    $("form").submit((e) => {
        e.preventDefault();
        handleSubmit();   
    });
    $("#ordersPage").click(() => {
        window.location = 'orders.html?provider_id=' + provider_id;
    });
});

function handleSubmit() {
    var result = $.param({
        reminder_time: $("#timeSlots").val(),
    });
    if (result) {
        $.ajax({
            url: `${API_URL}api/provider/${provider_id}/set_reminder`, 
            type: "PUT", 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: result, 
            crossDomain: true,
        })
        .done((data) => {
            alert(`You have successfully set the reminder time!`);
        })
        .fail((err) => {
            console.log(err);
        });
    } else {
        alert("Make sure you've selected a timeslot!");
    }   
};

function getUrlParam(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "))
}