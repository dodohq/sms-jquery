const TIMESLOTS = [
    "1 day before",
    "2 days before",
    "3 days before",
    "5 days before",
    "1 week before",
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
    $("fieldset").append('<button type="submit">Submit</button>');
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
    var output = "";
    for (const entry of data) {
      output = entry[1];
    };
    alert(`You will receive the delivery notification ${output} your package arrives.`)
};