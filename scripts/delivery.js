
const TIMESLOTS = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
]
// to be imported dynamically
const order = {
    "year": 2017,
    "month": 11,
    "day": 25,
};

var orderDate = new Date(order.year, order.month, order.day);

$(document).ready(function() {

    // $("#orderInfo").text(`Your order can be delivered by ${orderDate.toDateString()} at earliest.`);
    // TIMESLOTS.forEach((i) => {
    //     $("ul[name=deliveryTime]").append(`
    //     <li>
    //         <input type='radio' name='deliveryTime' id=${i} value=${i}>
    //         <label for=${i}> ${i} </label>
    //     </li>
    //     `)
    // });
    // Array(7).fill().map((_, i) => {
    //     orderDate.setDate(order.day + i);
    //     $("ul[name=deliveryDay]").append(`
    //     <li>
    //         <input type='radio' name='deliveryDay' id=${i} value=${i}>
    //         <label for=${i}> ${orderDate.toDateString()} </label>
    //     </li>
    //     `)
    // });
    // $("ul[name=deliveryDay]").append(`
    // <li> 
    //     <input type='radio' name='deliveryDay' id=7 value=7>
    //     <label for=7> I don't want the delivery this week, send me the reminder again in 3 days. </label>
    // </li>`);
    
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

// var postData = querystring.stringify({
//     msg: 'hello world'
// });

// var options = {
//     hostname: 'localhost',
//     port: 3000,
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Length': postData.length
//     }
// };

// var req = http.request(options, function (res) {
//     console.log('STATUS:', res.statusCode);
//     console.log('HEADERS:', JSON.stringify(res.headers));

//     res.setEncoding('utf8');

//     res.on('data', function (chunk) {
//         console.log('BODY:', chunk);
//     });

//     res.on('end', function () {
//         console.log('No more data in response.');
//     });
// });

// req.on('error', function (e) {
//     console.log('Problem with request:', e.message);
// });

// req.write(postData);
// req.end();

