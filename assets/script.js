var schedule = {};

function loadSchedule() {
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
        // time
        var timeBlock = $("<div>").addClass("time-block row");
        var hour = $("<div>").addClass("hour col-1");
        var hourtext = $("<p>").addClass("p-3").text(schedule.slot[i][0]);
        hour.append(hourtext);
        // items to do
        var toDoList = $("<textarea>").addClass("past col-10");
        var toDo = $("<p>").text(schedule.slot[i][1]);
        toDoList.append(toDo);
        // save button
        var saveButton = $("<button>").addClass("saveBtn col-1");
        var saveIcon = $("<i>").addClass("fas fa-save");
        saveButton.append(saveIcon);
        timeBlock.append(hour, toDoList, saveButton,);

        //add all to container
        $(".container").append(timeBlock);
    }
}

loadSchedule();