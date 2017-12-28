const API_URL = process.env.API_URL;

$(document).ready(function() { 
    var provider_id = getUrlParam('provider_id');
    $.ajax({
        url: `${API_URL}api/order/` + provider_id,
        type: "GET", 
        crossDomain: true,
    })
    .done((response) => {
        for (var i=0; i<response.orders.length; i++) {
            var order = response.orders[i];
            console.log(order);
            $("#orders > tbody").append(`
            <tr> 
                <td> ${order.customer_name} </td>
                <td> ${order.contact_number} </td>
                <td> ${order.delivery_date} </td>
            </tr>
            `)
        }
    })
    .fail((err) => {
        console.log(err)
    });

    $("#submitFile").click(uploadFile);
    $("#reminderPage").click(() => {
        window.location = 'reminder.html?provider_id=' + provider_id;
    });
});

function uploadFile() {
    var file = $.param({
        orders_csv: $("input#file").val(), 
    });
    if (file) {
        $.ajax({
            url: `${API_URL}api/order/csv_upload`,
            type: "POST", 
            crossDomain: true,
            data: file,
        })
        .done((response) => {
            console.log(response);
        })
        .fail((err) => {
            console.log(err)
        });
    }
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