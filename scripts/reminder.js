
const TIMESLOTS = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
]

$(document).ready(function() { 
    TIMESLOTS.forEach((i) => {
        $("#startTime").append(`
        <option value='${i}'> ${i} </option>`);
        $("#endTime").append(`
        <option value='${i}'> ${i} </option>`);
    });
    $("#serviceProvider").change(() => {
        $("#timeSlots").css("display", "block");
    });
    $("form").append('<button type="submit">Submit</button>');
    $("form").submit((e) => {
        e.preventDefault();
        if ($("#timeSlots").val()) {
            handleSubmit();
        } else {
            alert("Make sure you've selected a timeslot!");
        }    
    });
});

function handleSubmit() {
    var form = $("form")[0];
    var result = {
        start_time: $("#startTime").val(), 
        end_time: $("#endTime").val(),
        provider_id: $("input[name='serviceProvider']:checked").val(),
    }
    var data = new FormData(form);
    var output = [];
    for (const entry of data) {
      output.push(entry[1]);
    };
    $.ajax({
        url: "localhost:8080/api/time_slot", 
        type: "POST", 
        data: result, 
        success: function(s) {
            console.log(s);
        }
    })
    // alert(`Customers will receive the delivery notification at ${output[1]} the day before delivery.`)
};