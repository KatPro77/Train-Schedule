// Initialize Firebase
var config = {
    apiKey: "AIzaSyAuKvaRn4pP20ezahoYqznjo8MdRBVLtSg",
    authDomain: "train-schedule-6186c.firebaseapp.com",
    databaseURL: "https://train-schedule-6186c.firebaseio.com",
    projectId: "train-schedule-6186c",
    storageBucket: "train-schedule-6186c.appspot.com",
    messagingSenderId: "868205397157"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#addTrains").on("click", function (event) {
    event.preventDefault();

    var trName = $("#name").val().trim();
    var trDestination = $("#destination").val().trim();
    var trTime = $("#time").val().trim();
    var trFrequency = $("#frequency").val().trim();

    var newTrain = {
        name: trName,
        destination: trDestination,
        time: trTime,
        frequency: trFrequency
    };

    // Upload train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#name").val("");
    $("#destination").val("");
    $("#time").val("");
    $("#frequency").val("");

});

    // Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
    var trName = childSnapshot.val().name;
    var trDestination = childSnapshot.val().destination;
    var trTime = childSnapshot.val().time;
    var trFrequency = childSnapshot.val().frequency;

    console.log(trName);
    console.log(trDestination);
    console.log(trTime);
    console.log(trFrequency);

    var trArrival;
    var trAway;
    
    
    var newTrain = moment(trTime, "HH:mm").subtract(1, "years");
    console.log(newTrain);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(newTrain), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var trAway = trFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trAway);

    // Next Train
    var newTrain = moment().add(trAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(newTrain).format("hh:mm"));


    // Add row to the time table
    var newRow = $("<tr>").append(
    $("<td>").text(trName),
    $("<td>").text(trDestination),
    $("<td>").text(trFrequency),
    $("<td>").text(trArrival),
    $("<td>").text(trAway),
    );

  // Append the new row to the table
  $("#timeTable > tbody").append(newRow);
  
    })
