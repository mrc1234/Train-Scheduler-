// Steps to complete:



// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyBW8UeCZwlLjI_O334LUz5Uum_re6DG51A",
  authDomain: "q-timesheet.firebaseapp.com",
  databaseURL: "https://q-timesheet.firebaseio.com",
  projectId: "q-timesheet",
  storageBucket: "q-timesheet.appspot.com",
  messagingSenderId: "1055234541865"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#train-name-input").val().trim();
  var empdes = $("#des-input").val().trim();
  var empfirst = moment($("#first-input").val(), "HH:MM").format("HH:MM");
  var empfreq = $("#freq-input").val().trim(); 

  // Crfreqs local "temporary" object for holding train data
  var newEmp = {
    name: empName,
    des: empdes,
    first: empfirst,
    freq: empfreq
  };

  // Uploads train data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  // console.log(newEmp.traom);
  // console.log(newEmp.des);
  // console.log(newEmp.first);
  // console.log(newEmp.freq);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#des-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

// 3. Crfreq Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empdes = childSnapshot.val().des;
  var empfirst = childSnapshot.val().first;
  var empfreq = childSnapshot.val().freq;

  // train Info
  // console.log(empName);
  // console.log(empdes);
  // console.log(empfirst);
  // console.log(empfreq);

  // Prettify the train first
  var empfirstPretty = moment().format("HH:MM");
console.log(empfirstPretty);
  // Calcufreq the months worked using hardcore math
  // To calcufreq the months worked
  var empMonths = moment().diff(moment(empfirst, "X"), "months");
  console.log(empMonths);

  // Calcufreq the total billed freq
  var empBilled = empMonths * empfreq;
  console.log(empBilled);

  // Crfreq the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empdes),
    $("<td>").text(empfirstPretty),
    $("<td>").text(empMonths),
    $("<td>").text(empfreq),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


