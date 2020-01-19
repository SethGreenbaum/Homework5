moment().format();

var schedule = [];
var slot = $(".slot");
var comment = $(".comment");
var save = $(".save");



var time = moment().format('MMMM Do YYYY, h:mm:ss a');
var date = moment().format('MMMM Do YYYY');
var hourMeridian = moment().format('ha');
var hour = moment().format('h');
var meridian = moment().format('a');
console.log(hourMeridian);
console.log(hour);
console.log(meridian);
var allSlots =["8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm"];
for (i=0; i<allSlots.length; i++) {
    var timeSlot = allSlots[i];
    var timeMomentDiv = $("div[data-time='"+timeSlot+"']");
    var momento = timeMomentDiv.attr("data-time");
    var divTime = moment(momento,'ha');
    var nowTime = moment(hourMeridian,'ha');
    console.log(divTime.isBefore(nowTime));
    
    if (divTime.isSame(nowTime)){
        timeMomentDiv.attr("class","col-md-10 present slot");
        timeMomentDiv.children().attr("class","form-control present comment");
     } else if (divTime.isBefore(nowTime)){
        timeMomentDiv.attr("class","col-md-10 past slot");
        timeMomentDiv.children().attr("class","form-control past comment");
     } else if (divTime.isAfter(nowTime)){
        timeMomentDiv.attr("class","col-md-10 future slot");
        timeMomentDiv.children().attr("class","form-control future comment");
     }

     
};
var comment = localStorage.getItem("schedule");


if (localStorage.getItem("date") === date && comment != null) {
    var commentObj = JSON.parse(comment);
    
for (i=0; i<commentObj.length; i++) {
    schedule.push(commentObj[i]);
    var eventDivOld = $("<p>");
    var timeObj = commentObj[i]
    timeObjProp = Object.keys(timeObj)
    timeCode = timeObjProp[0]

    var timeDiv = $("div[data-time='"+timeCode+"']");
    eventDivOld.text(timeObj[timeCode]);
    timeDiv.prepend(eventDivOld);
}} else {
    localStorage.clear();
};


dayDiv = $("#currentDay");

dayDiv.text(time)





save.on("click", function(){
    localStorage.setItem("date",date)
    var eventParent = $(this).parent().parent();
    var eventChild  = eventParent.children(".slot");
    var eventComment = eventChild.children(".comment");
    var eventCommentValue = eventComment.val();

    var eventDiv = $("<p>");
    eventDiv.text(eventCommentValue);
    eventChild.prepend(eventDiv);
    eventComment.val("");
    var timeKey = eventChild.attr("data-time");
    var timeObj = {};
    timeObj[timeKey] = eventCommentValue;
    schedule.push(timeObj)
    var timeObjString = JSON.stringify(schedule);
    localStorage.setItem("schedule",timeObjString);
})