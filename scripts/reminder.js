const TIMESLOTS = [
    "9am-11am",
    "10am-12pm",
    "11am-1pm",
    "12pm-2pm",
    "1pm-3pm",
    "2pm-4pm",
    "3pm-5pm",
    "4pm-6pm",
    "5pm-7pm",
    "6pm-8pm",
];

$(document).ready(function() { 
    TIMESLOTS.forEach((i) => {
        $("ul").append(`
        <li>
            <input type='radio' name='reminderTime' id='${i}' value='${i}'>
            <label for='${i}'> ${i} </label>
        </li>`
        )
    });
    $("#serviceProvider").change(() => {
        $("#sendTime").css("display", "block");
    });
    $("form").append('<button type="submit">Submit</button>');
    $("form").submit((e) => {
        e.preventDefault();
        if ($("input[name='reminderTime']:checked").val()) {
            handleSubmit();
        } else {
            alert("Make sure you've selected a timeslot!");
        }    
    });
});

function handleSubmit() {
    var form = $("form")[0];
    console.log(form);
    var data = new FormData(form);
    console.log(data.values());
    var output = [];
    for (const entry of data) {
      output.push(entry[1]);
    };
    alert(`Customers will receive the delivery notification at ${output[1]} the day before delivery.`)
};