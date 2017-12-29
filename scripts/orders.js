const API_URL = process.env.API_URL;

$(document).ready(function() { 
    var provider_id = getUrlParam('provider_id');
    if (!provider_id) {
        alert("Please go back and select which provider you are");
    } 
    getOrders();

    $("#submitFile").click((e) => {
        e.preventDefault();
        uploadFile();
    });
    $("#reminderPage").click(() => {
        window.location = 'reminder.html?provider_id=' + provider_id;
    });
    $("#indexPage").click(() => {
        window.location = 'index.html';
    });
});



function uploadFile() {
    var files = $("input#file")[0].files;
    var data = new FormData();
    if (files.length == 0) {
        alert('Select one or more files!');
    } else {
        console.log(files[0]);
        data.append('orders_csv', files[0], 'csv');
        $.ajax({
            url: `${API_URL}/api/order/csv_upload`,
            type: "POST", 
            processData: false,
            contentType: false,
            crossDomain: true,
            data: data,
        })
        .done((response) => {
            alert(`You've successfully uploaded ${response}`);
            console.log(response);
        })
        .fail((err) => {
            if (err.status == 500) {
                alert("Please make sure you have no duplicates in your file!");
            }
            console.log(err)
        });
        getOrders();
    }
}

function getOrders() {
    var provider_id = getUrlParam('provider_id');
    $("#orders > tbody").empty();
    $.ajax({
        url: `${API_URL}/api/order/` + provider_id,
        type: "GET", 
        crossDomain: true,
    })
    .done((response) => {
        for (var i=0; i<response.orders.length; i++) {
            var order = response.orders[i];
            try {
                var time = order.choices[0].time_slot;
                var startTime = time.start_time.match(/\d{2}:00(?=:00Z)/);
                var endTime = time.end_time.match(/\d{2}:00(?=:00Z)/);
                var timeslot = startTime + ' - ' + endTime;
            } catch (e) {
                var timeslot = '';
            }
            console.log(timeslot);
            $("#orders > tbody").append(`
            <tr> 
                <td> ${order.customer_name} </td>
                <td> ${order.contact_number} </td>
                <td> ${order.delivery_date} </td>
                <td> ${timeslot} </td>
            </tr>
            `)
        }
    });
}

function getUrlParam(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "))
}