
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAOFse5laecU1w5H6jaeyNfSg3EBFwHsgI",
    authDomain: "train-a5f82.firebaseapp.com",
    databaseURL: "https://train-a5f82.firebaseio.com",
    projectId: "train-a5f82",
    storageBucket: "train-a5f82.appspot.com",
    messagingSenderId: "630810596183"
  };
  firebase.initializeApp(config);

  //list of variables
  var database = firebase.database();
  var trainName;
  var destination;
  var firstTrainTime;
  var frequency;

  //submit button is clicked
  $("#submit").on("click", function(event){
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(frequency);

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    });
  });


database.ref().on("child_added", function(snap){

  var trainTime = snap.val().firstTrainTime;
  var convertedTime = moment(trainTime, "HH:mm");
  //console.log("converted =" + convertedTime.format("HH:mm"));
  var minutesAway = (moment().add(convertedTime, "minutes"));
  var timeRemaining = (minutesAway % snap.val().frequency);
  var nextTrain = moment().add(timeRemaining, "m").format("HH:mm");
   //append the data entered
  var newRow =$("<tr>");
  newRow.append($("<td>" + snap.val().trainName + "</td>"));
  newRow.append($("<td>" + snap.val().destination + "</td>"));
  newRow.append($("<td>" + snap.val().frequency + "</td>"));
  newRow.append($("<td>" + nextTrain + "</td>"));
  newRow.append($("<td>" + timeRemaining + "</td>"));


$("tbody").append(newRow);

});
 

