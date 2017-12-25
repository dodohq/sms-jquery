// var moment = require('moment');

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
// to be imported dynamically
const order = {
    "year": 2017,
    "month": 11,
    "day": 25,
};

var orderDate = new Date(order.year, order.month, order.day);

$(document).ready(function() {
    $("#orderInfo").text(`Your order can be delivered by ${orderDate.toDateString()} at earliest.`);
    TIMESLOTS.forEach((i) => {
        $("ul[name=deliveryTime]").append(`
        <li>
            <input type='radio' name='deliveryTime' id=${i} value=${i}>
            <label for=${i}> ${i} </label>
        </li>
        `)
    });
    Array(7).fill().map((_, i) => {
        orderDate.setDate(order.day + i);
        $("ul[name=deliveryDay]").append(`
        <li>
            <input type='radio' name='deliveryDay' id=${i} value=${i}>
            <label for=${i}> ${orderDate.toDateString()} </label>
        </li>
        `)
    });
    $("ul[name=deliveryDay]").append(`
    <li> 
        <input type='radio' name='deliveryDay' id=7 value=7>
        <label for=7> I don't want the delivery this week, send me the reminder again in 3 days. </label>
    </li>`);
    
    $("form").append('<button type="submit">Submit</button>');
    $("form").submit((e) => {
        e.preventDefault();
        if ($("input[name='deliveryDay']:checked").val() && $("input[name='deliveryTime']:checked").val()) {
            handleSubmit();
        } else {
            alert("Make sure you've selected a day and a timeslot!");
        }
    })
});

function handleSubmit() {
    var form = $("form")[0];
    console.log(form);
    var data = new FormData(form);
    var output = [];
    for (const entry of data) {
      output.push(entry[0] + "=" + entry[1] + "\r");
    };
    console.log(output);
};