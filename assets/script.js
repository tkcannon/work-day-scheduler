var schedule = {};
//time vars
var now = dayjs(); // timestamp at load
$("#currentDay").text(now.format("dddd, MMMM D"));
var firstReload = now.add(1, 'h').subtract(now.minute(), "m").subtract(now.second(), "s").subtract(now.millisecond(), "ms"); // the next even hour from page load
var delay = firstReload.diff(now); // leftover time in this hour

function loadSchedule() {
    $(".container").empty();
    schedule = JSON.parse(localStorage.getItem("schedule"));

    // if no existing schedule exists, create new empty schedule obj
    if (!schedule) {
        schedule = {
            slot: [
                ["9AM", ""],
                ["10AM", ""],
                ["11AM", ""],
                ["12PM", ""],
                ["1PM", ""],
                ["2PM", ""],
                ["3PM", ""],
                ["4PM", ""],
                ["5PM", ""],
            ]
        }
    }

    for (i = 0; i < schedule.slot.length; i++) {
        // time block info
        var timeBlock = $("<div>").addClass("time-block row");
        var hour = $("<div>").addClass("col-sm-2 col-md-1 hour");
        var hourtext = $("<p>").addClass("p-3").text(schedule.slot[i][0]);
        hour.append(hourtext);
        // text content of time-block
        var text = $("<textarea>").addClass("col-sm-8 col-md-10 text-area " + timeState(i)).text(schedule.slot[i][1]);
        // save button
        var saveButton = $("<button>").addClass("col-sm-2 col-md-1 saveBtn").attr("id", schedule.slot[i][0]); // adds id of the hour so button clicks can check against array data in schedule
        var saveIcon = $("<i>").addClass("fas fa-save");
        saveButton.append(saveIcon);
        // add all to time-block
        timeBlock.append(hour, text, saveButton,);

        // add time-block to container
        $(".container").append(timeBlock);
    }
}

function saveSchedule() {
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

// checks schedule times based on index and returns past, present, or future
function timeState(slotIndex) {
    var startTime = 9;
    if (now.hour() < slotIndex + startTime) {
        return ("future");
    }
    else if (now.hour() === slotIndex + startTime) {
        return ("present");
    }
    else if (now.hour() > slotIndex + startTime) {
        return ("past");
    }
}

// when save button clicked
$(".container").on("click", "button", function () {
    var id = $(this).attr("id");
    // iterates through schedule until slot with time matching save button id is found
    for (let i = 0; i < schedule.slot.length; i++) {
        if (id === schedule.slot[i][0]) {
            //changes text of data to save to match text in time-block
            text = $(this).siblings(".text-area").val().trim();
            schedule.slot[i][1] = text;
            saveSchedule();
        }
    }
});
loadSchedule();

// first reload counts down from leftover time in hour so all subsequent reloads are every hour on the hour
setInterval(function () {
    now = now.add(1, "h");
    loadSchedule();
    delay = 360000;
}, delay);