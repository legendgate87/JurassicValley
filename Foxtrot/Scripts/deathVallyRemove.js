var numFoxes = 2;
var numRabbits = 140;
var monthNumber = 0;
var consumF = 0;
var year = 0;
var i = 0;
var monthNext;
var myTimer;
var SpeciesOne = "Fox";
var SpeciesTwo = "Rabbit";


//----- Weather
var rain;
var snow;
var sun;
var cloud;




// Arrays --------------------------------------
var foxEatMonthHigh = [22, 23, 24, 25, 26, 27,28,29];
var foxEatMonthAverage = [16, 17, 18, 19, 20, 21, 22];
var foxEatMonthLow = [10, 11, 12, 13, 14, 15];

//var foxEatMonthHigh = [8*numFoxes, 9*numFoxes, 10*numFoxes];            check with number of foxes
//var foxEatMonthAverage = [4 * numFoxes, 5 * numFoxes, 6 * numFoxes];
//var foxEatMonthLow = [1 * numFoxes, 2 * numFoxes, 3 * numFoxes];


var foxBirth = [1, 2, 3, 4, 5];
var rabbitBirth = [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var foxMortality = [1, 2,3,4];
var rabbitMortality = [1, 2, 3, 4, 5];

var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//----------------------------------------




function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



function simFox() {

    //Random numbers---------------------
    var RanRabB = rabbitBirth[Math.floor(Math.random() * rabbitBirth.length)];
    var RanFoxB = foxBirth[Math.floor(Math.random() * foxBirth.length)];

    var RanFoxEatHigh = foxEatMonthHigh[Math.floor(Math.random() * foxEatMonthHigh.length)];
    var RanFoxEatAverage = foxEatMonthAverage[Math.floor(Math.random() * foxEatMonthAverage.length)];
    var RanFoxEatLow = foxEatMonthLow[Math.floor(Math.random() * foxEatMonthLow.length)];


    var RanFoxM = foxMortality[Math.floor(Math.random() * foxMortality.length)];
    var RanRabM = rabbitMortality[Math.floor(Math.random() * rabbitMortality.length)];

    var weatherRanNum = Math.floor((Math.random() * 10) + 1);

    //------------------------------------------------------
    
    
    
    
    
        //weather--------------------

        if (monthNumber >=4 || monthNumber <=10)
        {
            

            if (weatherRanNum > 3 && weatherRanNum <= 6)
            {
                //sun = High Chance
                consumF = RanFoxEatHigh;
                //consumF = RanFoxEatHigh * numFoxes;

                //numRabbits - consumF;
                 

                document.getElementById("out4").innerHTML = (consumF + " Rabbits got eaten,weather was mostly sunny");
            }
            if(weatherRanNum > 6)
            {
                //rain = Low Chance
                consumF = RanFoxEatLow;
                document.getElementById("out4").innerHTML = (consumF + " Rabbits got eaten, weather was mostly rainy");
            } 
            if(weatherRanNum < 3)
            {
                consumF = RanFoxEatAverage;
                document.getElementById("out4").innerHTML = (consumF + " Rabbits got eaten, weather was mostly cloudy");

            }

            

        }


        if (monthNumber <= 4 || monthNumber >=10) {
            

            if (weatherRanNum > 3 && weatherRanNum < 6) {

                //sun = High Chance
                consumF = RanFoxEatHigh;
                document.getElementById("out4").innerHTML = (consumF + " Rabbits got eaten, weather was mostly sunny");
            }

            if(weatherRanNum > 6)
                {

                //snow = Low Chance

                consumF = RanFoxEatLow;
                document.getElementById("out4").innerHTML = (consumF + " Rabbits got eaten, weather was mostly snowy");
            }
            if(weatherRanNum < 3)
            {
                consumF = RanFoxEatAverage;
                document.getElementById("out4").innerHTML = (consumF + " Rabbits got eaten, weather was mostly cloudy");
            }
        }

           
        //------------------------------




        if (monthNumber >= 2 && monthNumber <= 4) {

            //Fox births
            numFoxes += RanFoxB;
            
        }

        if (monthNumber >= 3 && monthNumber <= 9) {

            //Rabbit births
            numRabbits += RanRabB;
        }


        //Year ++
        if (monthNumber === 12) {
            year++;
            monthNumber = 0;
            i = 0;
        }

      
        if (monthNumber > 4 && monthNumber % 2 === 0) {
            
            //Fox deaths
            numFoxes -= RanFoxM;
      
            document.getElementById("out2").innerHTML = (RanFoxM + " Foxes died of old age");
        }


        if (monthNumber > 4 && monthNumber % 2 === 0) {

            //Rabbit deaths
            numRabbits -= RanRabM;
            
           
            document.getElementById("out3").innerHTML = (RanRabM + " Rabbits died of old age");
        }




       

     //    if (numFoxes > 10000) {
     //
     //       var removeFoxes = numFoxes / 2;
     //
     //       numFoxes = numFoxes - removeFoxes;
     //
     //       document.getElementById("demo2").innerHTML = (+ removeFoxes + " Foxes moved away");
     //
     //    }
      //  if (numRabbits > 500) {
      //
      //      numRabbits--;
      //      numFoxes++;
      //
    //  }

               //Population Max value
        if (numFoxes > 10000000 | numRabbits > 10000000) {
            buttonClear();
        }

           //Population Min value
        if (numFoxes <= 1 | numRabbits <= 1) {
            buttonClear();
         }
         
         //Months progression
        monthNumber++;
        monthNext = monthName[i++];
        

            //sends it out to our web page
        document.getElementById("out").innerHTML = ("There will be " + numFoxes + " Foxes " +
            " and " + numRabbits + " Rabbits " + " this " + monthNext + ", Year " + year);
        //var test = consumF;
        //console.log(test);

        
    // loop timeout function
        


}


// submit form js  
function submitMyForm() {
    //var sendData = document.getElementById("SendToDatabase");
    //sendData.onclick(function () {
  
    var dataToSend = {Id:1, PopValue: numFoxes, Species: SpeciesOne };
    
        $.ajax({
            type: "POST",
            url: "/Tomb/Create02",
            data: dataToSend,
            success: function (response) {
          //      if (response.data === "Done!") {
          //          alert("Data has been added");
          //      } else {
          //          alert(response);
          //      }
          //    //  alert("Done");
            },
            error: function () {
              //  alert("Something went wrong");
            }
        });
    //});
}

function submitMyFormTwo() {
    //var sendData = document.getElementById("SendToDatabase");
    //sendData.onclick(function () {
    
    var dataToSend = {Id:2,PopValue: numRabbits, Species: SpeciesTwo };

    $.ajax({
        type: "POST",
        url: "/Tomb/Create02",
        data: dataToSend,
        success: function (response) {
            //      if (response.data === "Done!") {
            //          alert("Data has been added");
            //      } else {
            //          alert(response);
            //      }
            //    //  alert("Done");
        },
        error: function () {
            //  alert("Something went wrong");
        }
    });
    //});
}




function timeout() {
    myTimer = setTimeout(function () {
        simFox();
        timeout();
    }, 1000);
}

function pause() {
    clearTimeout(myTimer);
}


// Manual fox add
    function addFoxes()
    {
        numFoxes++;
        document.getElementById("out").innerHTML = ("There will be " + numFoxes + " Foxes " + " and " + numRabbits + " Rabbits " + " after " + monthNumber + " month " + " Year " + year);
    }


// Manual rabbit add, NOT Implimented
    function addRabbits() {
        numRabbits++;
        document.getElementById("out").innerHTML = ("There will be " + numFoxes + " Foxes " + " and " + numRabbits + " Rabbits " + " after " + monthNumber + " month " + " Year " + year);
    }


//Button clear all
    function buttonClear() 
    {
        submitMyForm();
        submitMyFormTwo();
        clearTimeout(myTimer);
    numFoxes = 2;
    numRabbits = 140;
    monthNumber = 0;
    year = 0;
    document.getElementById("out").innerHTML = ("");
    document.getElementById("out2").innerHTML = ("");
    document.getElementById("out3").innerHTML = ("");
    document.getElementById("out4").innerHTML = ("");
}