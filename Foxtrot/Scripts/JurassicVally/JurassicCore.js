//----------Made by Stefan Hellhager--and holder of copyrights-------------

/// <reference path="angular.min.js" />
/// <reference path="../Bootstrap/ui-bootstrap.js" />
/// <reference path="../AngularScripts/angular-cookies.js" />



//------------------AngularJS
//--------------------vars----------

var levelUp;

var setPlayerstrength;
var setPlayerAttackPower;
var setPlayerDamageResistance;

var setOpponentstrength;
var setOpponentAttackPower;
var setOpponentDamageResistance;

var setXpMax;
var setPlayerHealth;
var setOpponentHealth;
var setMaxHP;

//---------------------------------------------------------------------

var playerStrengthArray = [];
var playerAttackPowerArray = [];
var playerDamageResistanceArray = [];

var opponentStrengthArray = [];
var opponentAttackPowerArray = [];
var opponentDamageResistanceArray = [];


var xpMaxArray = [];
var playerHealthArray = [];
var opponentHealthArray = [];
var MaxHPArray = [];

var achievementLable = "";

var damageResult;
var damageResistanceCal;
var playerDamageResult;

var playerHealth;
var playerStrength;
var playerAttackPower;
var playerDamageResistance;


var opponentHealth;
var opponentStrength;
var opponentAttackPower;
var opponentDamageResistance;
var opponentDamageResult;

var dinoDeathCount = 0;

var powerArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var xpBar = 0;
var xpLevelGain = 0;

var dice = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//var playerDialogArray = ["", "", "", "", "", "", "", "", "", "", "", "", ];
//var opponentDialogArray = ["", "", "", "", "", "", "", "", "", "", "", "", ];


var GameNotRunning = false;

var gamePlayerBool = false;
var gameOpponentBool = false;


var gameStatus = "";


var term = "";
var side = 'front';


var playerName = "Player";
var opponent = "Opponent";


var randDinoGet;

var imgSrc = "";
var imgSrc2 = "";
var imgSrcB = "";
var imgSrc2B = "";

var percentXpbar;
var percentXpbarB;
var percentXpbarC;

var strength;
var attackPower;
var damageResistance;


var xpMax;
var MaxHP;

var dinoReturn;
var herbivoreCount = 0;
var carnivoreCount = 0;
var omnivoreCount = 0;
var cookieGet2;
var dinoShape;

var stomp;
var scrat;
var bite;
var heal;

var comment = [];

var buffIsActive;

//-------------MainModule--------------
var playerApp = angular.module('myModule', ['ngCookies', 'ngRoute', 'ngAnimate', 'angulike']);

playerApp.run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '[]'; // set your facebook app id here
      }
]);

playerApp.controller('ComController', ['$scope', '$http',
  

    function ($scope, $http) {
        //$scope.comment = [];

        $scope.myModel = {
            Url: 'http://jasonwatmore.com/post/2014/08/01/AngularJS-directives-for-social-sharing-buttons-Facebook-Like-GooglePlus-Twitter-and-Pinterest.aspx',
            Name: "JurassicValley",
            ImageUrl: 'http://www.jasonwatmore.com/pics/jason.jpg'
        };
    
    
        $scope.btn_add = function (val) {

            if ($scope.Comment != '') {
                
                var comentValue = { 'Comment': val };
                $http.post("/Comments/CreateComment", comentValue).then(function (response) {
                    if (response.data === "Done!") {
                        $scope.Comment = "";
                    }

                }, function (error) {
                    console.log(error);
                });
                $http.get('/Comments/GetComments').then(successCallBackComments);
            }
        }

        
        $http.get('/Comments/GetComments').then(
        successCallBackComments = function (response) {
            var remItem = response.data;
           
            
            $.each(remItem, function (index, value) {
                comment.push(value.Comment);
            });

            $scope.comment = comment;
        });

        }
]);


playerApp.controller('dinoController', ['$scope', '$http', '$log', '$cookies', '$timeout',

    function ($scope, $http, $log, $cookies, $timeout, battle) {

        levelUp = 1;
       
        popArrays();
        doCalculations();

        var main = this;
        main.bar2ProgressVal = 0;

        
        xpMax = xpMaxArray[0];
        MaxHP = MaxHPArray[0];

        opponentHealth = opponentHealthArray[0];
        playerHealth = playerHealthArray[0];



        //-----------calls to database-------------------------------------------

        //----Get dino list from database------------------
        var successCallBack = function (response) {
            $scope.dinList = response.data;
            //$scope.dinList.splice(0, 0, "Player");
            dinList = response.data;
            //console.log(response);

        };


        $http.get('/InGen/GetDinos?term=' + term).then(successCallBack);


        //----Get shape list from database------------------
        var successCallBack = function (response) {
            //$log.info(response.data[0]);

            dinoShapePlayer = response.data[0];

            if ($scope.side == "front") {
                imgSrc = "/Content/images/DinoPics/" + response.data[0] + ".png";

                $scope.imgSrc = imgSrc;

            } else {

                imgSrcB = "/Content/images/DinoPics/" + response.data[0] + ".png";

                $scope.imgSrcB = imgSrcB;
            }

            $scope.dinoShapePlayer = response.data[0];

        };


        var successCallBack2 = function (response) {
            //$log.info(response.data[0]);

            dinoShapeOpponent = response.data[0];

            if ($scope.side == "front") {
                imgSrc2 = "/Content/images/DinoPics/" + response.data[0] + ".png";

                $scope.imgSrc2 = imgSrc2;
            } else {

                imgSrc2B = "/Content/images/DinoPics/" + response.data[0] + ".png";

                $scope.imgSrc2B = imgSrc2B;
            }
            $scope.dinoShapeOpponent = response.data[0];

        };

        var successCallBack3 = function (response) {
            //$log.info(response.data[0]);
            $scope.dinoPeriodPlayer = response.data[0];
        };
        var successCallBack4 = function (response) {
            //$log.info(response.data[0]);
            $scope.dinoPeriodOpponent = response.data[0];
        };

        var successCallBack5 = function (response) {
            //$log.info(response.data[0]);
            dinoReturn = response.data[0];
            
            if (dinoReturn == 1) {
                carnivoreCount++;

            }
            if (dinoReturn == 2) {
                herbivoreCount++;

            }
            if (dinoReturn == 3) {
                omnivoreCount++;
            }

            
        };

        var errorCallBack = function (response) {
            $scope.error = response.data;
            //$log.info(response);
        };


        //------------------------FlipFunction---ANd---Cookie Save Load Name and load URL-------------------------------
        $scope.toggle = function (playerName) {

            $scope.side = $scope.side == 'front' ? 'back' : 'front';

            // random dino for opponent            
            randDinoGet = dinList[Math.floor(Math.random() * dinList.length)];


            $scope.opponent = randDinoGet;

            var opponent = randDinoGet;

            // Setting  cookie
            var cookiePut = $cookies.put('playerCookie', playerName);
            var cookieGet = $cookies.get('playerCookie');

            var cookiePut2 = $cookies.put('opponentCookie', opponent);
             cookieGet2 = $cookies.get('opponentCookie');

            $http.get('/InGen/GetShapePlayer?playerName=' + cookieGet).then(successCallBack);
            $http.get('/InGen/GetShapeOpponent?opponent=' + cookieGet2).then(successCallBack2);


        }

        //---get only opponent info---------------
        $scope.toggleOpponent = function () {

            randDinoGet = dinList[Math.floor(Math.random() * dinList.length)];

            $scope.opponent = randDinoGet;

            var opponent = randDinoGet;

            var cookiePut2 = $cookies.put('opponentCookie', opponent);
            var cookieGet2 = $cookies.get('opponentCookie');

            $http.get('/InGen/GetShapeOpponent?opponent=' + cookieGet2).then(successCallBack2);
        }
        //---------------------------------------------------------------



        //------Scopes------------------------

        
        $scope.achievementsList = ["Achievements"];


        $scope.playerName = playerName;
      
        $scope.opponent = opponent;

        $scope.GameNotRunning = GameNotRunning;

        $scope.levelUp = levelUp;


        $scope.dinoDeathCount = dinoDeathCount;

        $scope.term = term;


        //----------ProgressBars----------------------------------

        $scope.xpMax = xpMax;
        $scope.MaxHP = MaxHP;
    
  
        $scope.xpBar = xpBar + xpLevelGain;
        

       

        $scope.percentXpbar = ((playerHealth / MaxHP) * 100);


        $scope.percentXpbarB = (opponentHealth / MaxHP) * 100;
        $scope.percentXpbarC = (xpBar / xpMax) * 100;
        

        $scope.gameStatus = gameStatus;

        $scope.gameOpponentBool = gameOpponentBool;
        $scope.gamePlayerBool = gamePlayerBool;


        $scope.playerHP = playerHealth;
        $scope.opponentHP = opponentHealth;

        //$scope.ScrollToBottom = function () {

        //    window.scrollTo(0, document.body.scrollHeight)

        //}


        //-----------Keep-going button----------------------        
        $scope.Keepgoing = function () {

            buffbuffIsActive = false;

            popArrays();
            doCalculations();

            var cookieGet = $cookies.get('playerCookie');

            $http.get('/InGen/GetDietPlayer?playerName=' + cookieGet).then(successCallBack5);
            

            xpMax = xpMaxArray[0];
            MaxHP = MaxHPArray[0];


            opponentHealth = opponentHealthArray[0];
            playerHealth = playerHealthArray[0];

            
            $scope.levelUp = levelUp;

            $scope.gameOpponentBool = false;
            $scope.GameNotRunning = false;

            $scope.gameOpponentBool = gameOpponentBool;
            $scope.GameNotRunning = GameNotRunning;

            $scope.gameStatus = gameStatus;

            $scope.playerHP = playerHealth;
            $scope.opponentHP = opponentHealth;

            $scope.MaxHP = MaxHP;
            $scope.xpMax = xpMax;
            $scope.xpBar = xpBar;

            $scope.percentXpbar = (playerHealth / MaxHP) * 100
            $scope.percentXpbarB = (opponentHealth / MaxHP) * 100;
            $scope.percentXpbarC = (xpBar / xpMax) * 100;



        }

        //----------Retry button--------------
        $scope.Retry = function () {
           
            buffbuffIsActive = false;
            var cookieGet = $cookies.get('playerCookie');

            $http.get('/InGen/GetDietPlayer?playerName=' + cookieGet).then(successCallBack5);

            popArrays();
            doCalculations();

            
            if (dinoReturn == 1) {
                carnivoreCount++;
            }
            if (dinoReturn == 2) {
                herbivoreCount++;

            }
            if (dinoReturn == 3) {
                omnivoreCount++;
            }

            xpMax = xpMaxArray[0];
            MaxHP = MaxHPArray[0];


            opponentHealth = opponentHealthArray[0];
            playerHealth = playerHealthArray[0];

            $scope.playerHP = playerHealth;
            $scope.opponentHP = opponentHealth;


            $scope.levelUp = levelUp;

            $scope.gamePlayerBool = false;

            $scope.GameNotRunning = false;

            $scope.gameStatus = gameStatus;


            $scope.MaxHP = MaxHP;

            $scope.xpMax = xpMax;
            $scope.xpBar = xpBar;

            $scope.percentXpbar = ((playerHealth / MaxHP) * 100);
            $scope.percentXpbarB = ((opponentHealth / MaxHP) * 100);
            $scope.percentXpbarC = (xpBar / xpMax) * 100;
        }
        

        //---------Battle button---------------
        $scope.runBattle = function (battle, $timeout) {

            //----BattleFunction-----

            battleResultGet();

            $scope.levelUp = levelUp;

            $scope.gameStatus = gameStatus;

            //-----------XP-And--bars----------------------
            $scope.xpMax = xpMax;
            $scope.xpBar = xpBar;

            $scope.MaxHP = MaxHP;

            $scope.percentXpbar = ((playerHealth / MaxHP) * 100);
            $scope.percentXpbarB = ((opponentHealth / MaxHP) * 100);
            $scope.percentXpbarC = (xpBar / xpMax) * 100;


            //------Health--------------------------

            $scope.playerHP = playerHealth;
            $scope.opponentHP = opponentHealth;

            //-------------Damage-----------------------

            $scope.opponentDamage = opponentDamageResult;
            $scope.playerDamage = playerDamageResult;

            if (xpBar <= 0) {
                xpBar = 0;
                $scope.xpBar = xpBar;
            }

            
            
            //-------------------------------Opponent Wins-------------------------
            if (playerHealth <= 0) {


                $scope.Buff = "";
                buffIsActive = false;
                popArrays();
                doCalculations();
                $scope.levelUp = levelUp;

                // pct / 100 * number;
                xpBarPercent = Math.round(15 / 100 * xpBar);

                xpBar = xpBar - xpBarPercent;

                $scope.xpBar = xpBar;


                playerStrength = playerStrengthArray[0];
                playerAttackPower = playerAttackPowerArray[0];
                playerDamageResistance = playerDamageResistanceArray[0];


                xpMax = xpMaxArray[0];
                MaxHP = MaxHPArray[0];


                opponentHealth = opponentHealthArray[0];
                playerHealth = playerHealthArray[0];


                //Opponent VINS, Game Over, Heal or Quit
                $scope.gameStatus = "YOU LOST!"


                $scope.xpBar = xpBar;

                $scope.MaxHP = MaxHP;

                $scope.percentXpbar = ((playerHealth / MaxHP) * 100);
                $scope.percentXpbarB = ((opponentHealth / MaxHP) * 100);
                $scope.percentXpbarC = (xpBar / xpMax) * 100;

                $scope.gamePlayerBool = true;

                $scope.GameNotRunning = true;

            }

          
            //-------------------------------Player Wins-------------------------
            if (opponentHealth <= 0) {
                

                $scope.Buff = "";
                buffIsActive = false;
                popArrays();
                doCalculations();
                $scope.levelUp = levelUp;

                opponentStrength = opponentStrengthArray[0];
                opponentAttackPower = opponentAttackPowerArray[0];
                opponentDamageResistance = opponentDamageResistanceArray[0];
                

                xpMax = xpMaxArray[0];
                MaxHP = MaxHPArray[0];


                opponentHealth = opponentHealthArray[0];
                playerHealth = playerHealthArray[0];


                dinoDeathCount++;
                $scope.dinoDeathCount = dinoDeathCount;
                $scope.levelUp = levelUp;

                $scope.gameStatus = "YOU WON!"

                //<---------xpLevelGain = levelUp^3/2--------->
                xpLevelGain = Math.pow(levelUp, 3 / 2);


                xpBar + xpLevelGain;

                xpBar = xpBar + Math.floor((Math.random() * 30) + 2);


                $scope.xpBar = xpBar;

                $scope.MaxHP = MaxHP;

                $scope.percentXpbar = ((playerHealth / MaxHP) * 100);
                $scope.percentXpbarB = ((opponentHealth / MaxHP) * 100);
                $scope.percentXpbarC = (xpBar / xpMax) * 100;


                $scope.gameOpponentBool = true;
                $scope.GameNotRunning = true;
                //Save to database tbPlayer

                
            }



            if (xpBar > xpMax) {

                levelUp++;
                $scope.levelUp = levelUp;

                $scope.Buff = "";
                buffIsActive = false;

                popArrays();
                doCalculations();

                playerStrength = playerStrengthArray[0];
                playerAttackPower = playerAttackPowerArray[0];
                playerDamageResistance = playerDamageResistanceArray[0];
                opponentStrength = opponentStrengthArray[0];
                opponentAttackPower = opponentAttackPowerArray[0];
                opponentDamageResistance = opponentDamageResistanceArray[0];

                
                xpMax = xpMaxArray[0];
                MaxHP = MaxHPArray[0];


                opponentHealth = opponentHealthArray[0];
                playerHealth = playerHealthArray[0];

                $scope.gameStatus = "Level UP!"

                xpBar = 0;

                $scope.playerHP = playerHealth;
                $scope.opponentHP = opponentHealth;
                $scope.xpBar = xpBar;
                $scope.MaxHP = MaxHP;

                //------------skills up----------------------------------
                // skill points to set 3

                //bite   
                //scratch
                //stomp
                //heal

            }

            $scope.achievementsList = ["Achievements"];

            //---------Herbivore----------------------- 
            if (herbivoreCount == 10) {
                $scope.achievementsList.push("Herbivore - Played as a plant eater ten times");

            }
            if (herbivoreCount == 20) {
                $scope.achievementsList.push("Paleobotanist - Played as a plant eater twenty times");

            }
            //---------Carnivore-----------------------
            if (carnivoreCount == 10) {
                $scope.achievementsList.push("Carnivorous - Played as a meat eater ten times");

            }
            if (carnivoreCount == 20) {
                $scope.achievementsList.push("Top of the food chain - Played as a meat eater twenty times");

            }
            //---------Omnivore-----------------------
            if (omnivoreCount == 10) {
                $scope.achievementsList.push("Omnivorous - Played as an all eater ten times");

            }
            if (omnivoreCount == 20) {
                $scope.achievementsList.push("I'll eat anything - Played as an all eater twenty times");

            }

            //--------level---------------------------
            if (levelUp == 50) {
                $scope.achievementsList.push("level 50 - Dinosaur ruler");
            }
            if (levelUp == 30) {
                $scope.achievementsList.push("level 30 - Cretaceous Expert");
            }
            if (levelUp == 20) {
                $scope.achievementsList.push("level 20 - Out of this world");
            }
            if (levelUp == 10) {
                $scope.achievementsList.push("level 10 - Survivor");
            }
            if (levelUp == 5) {
                $scope.achievementsList.push("level 5 - Clever girl");
            }

            //------------DeathCount-----------------------------
            if (dinoDeathCount == 1) {
                $scope.achievementsList.push("Kill count 1 - it's the thought that counts");
            }
            if (dinoDeathCount == 5) {
                $scope.achievementsList.push("Kill count 5 - So, who's hungry?");
            }
            if (dinoDeathCount == 10) {
                $scope.achievementsList.push("Kill count 10 - Killer");
            }
            if (dinoDeathCount == 50) {
                $scope.achievementsList.push("Kill count 50 - Slaughterhouse");
            }
            if (dinoDeathCount == 100) {
                $scope.achievementsList.push("Kill count 100 - Predator");
            }
            if (dinoDeathCount == 200) {
                $scope.achievementsList.push("Kill count 200 - Well that exalted quickly");
            }


            //-----------------Buffs---------------------------------

            //strength
            //attackPower
            //damageResistance
            //health


            // elements ?
            var randNumb = Math.floor((Math.random() * 5) + 1);
            var roll2 = 0;
            roll2 = dice[Math.floor(Math.random() * 10)];
            

            if(buffIsActive == false){

            if (roll2 <= 5) {

                //  player strong against
                if ((dinoShapePlayer == "sauropod" && dinoShapeOpponent == "ornithomimosaur") || (dinoShapePlayer == "sauropod" && dinoShapeOpponent == "ceratopian")) {
                    // add to strength+1
                    //add to health+5
                    
                    var pre = playerStrengthArray[0];

                    playerStrengthArray.pop();
                    setPlayerstrength = pre + randNumb;
                    playerStrengthArray.push(setPlayerstrength);


                    $scope.Buff = "Str+" + setPlayerstrength;
                    buffIsActive = true;

                    //  player weak against
                } if (dinoShapePlayer == "sauropod" && dinoShapeOpponent == "ankylosaurid") {
                    //debuff
                    var pre = playerStrengthArray[0];

                    playerStrengthArray.pop();
                    setPlayerstrength = pre - randNumb;
                    playerStrengthArray.push(setPlayerstrength);


                    $scope.Buff = "Str-" + setPlayerstrength;
                    buffIsActive = true;

                }
                if (dinoShapePlayer == "ankylosaurid" && dinoShapeOpponent == "sauropod") {
                    //add to damageResistance+4 

                    var pre = playerDamageResistanceArray[0];

                    playerDamageResistanceArray.pop();
                    setPlayerDamageResistance = pre + randNumb;
                    playerDamageResistanceArray.push(setPlayerDamageResistance);


                    $scope.Buff = "Res+" + setPlayerDamageResistance;
                    buffIsActive = true;

                } if ((dinoShapePlayer == "ankylosaurid" && dinoShapeOpponent == "largetheropod") || (dinoShapePlayer == "ankylosaurid" && dinoShapeOpponent == "smalltheropod")) {
                    //debuff
                    var pre = playerDamageResistanceArray[0];

                    playerDamageResistanceArray.pop();
                    setPlayerDamageResistance = pre - randNumb;
                    playerDamageResistanceArray.push(setPlayerDamageResistance);


                    $scope.Buff = "Res-" + setPlayerDamageResistance;
                    buffIsActive = true;

                }
                if (dinoShapePlayer == "ceratopian" && dinoShapeOpponent == "euornithopod") {
                    //add to attackPower+2 
                    var pre = playerAttackPowerArray[0];

                    playerAttackPowerArray.pop();
                    setPlayerAttackPower = pre + randNumb;
                    playerAttackPowerArray.push(setPlayerAttackPower);

                    $scope.Buff = "Att+" + setPlayerAttackPower;
                    buffIsActive = true;

                } if (dinoShapePlayer == "ceratopian" && dinoShapeOpponent == "sauropod") {

                    //debuff
                    var pre = playerAttackPowerArray[0];

                    playerAttackPowerArray.pop();
                    setPlayerAttackPower = pre - randNumb;
                    playerAttackPowerArray.push(setPlayerAttackPower);

                    $scope.Buff = "Att-" - setPlayerAttackPower;
                    buffIsActive = true;

                }
                if ((dinoShapePlayer == "euornithopod" && dinoShapeOpponent == "largetheropod") || (dinoShapePlayer == "euornithopod" && dinoShapeOpponent == "smalltheropod")) {

                    var pre = playerDamageResistanceArray[0];

                    playerDamageResistanceArray.pop();
                    setPlayerDamageResistance = pre + randNumb;
                    playerDamageResistanceArray.push(setPlayerDamageResistance);

                    $scope.Buff = "Res+" + setPlayerDamageResistance;
                    buffIsActive = true;

                } if ((dinoShapePlayer == "euornithopod" && dinoShapeOpponent == "ornithomimosaur") || (dinoShapePlayer == "euornithopod" && dinoShapeOpponent == "ceratopian")) {
                    var pre = playerDamageResistanceArray[0];

                    playerDamageResistanceArray.pop();
                    setPlayerDamageResistance = pre - randNumb;
                    playerDamageResistanceArray.push(setPlayerDamageResistance);

                    $scope.Buff = "Res-" - setPlayerDamageResistance;
                    buffIsActive = true;
                    //debuff

                }
                if (dinoShapePlayer == "ornithomimosaur" && dinoShapeOpponent == "euornithopod") {
                    // add to damageResistance+1

                    var pre = playerDamageResistanceArray[0];

                    playerDamageResistanceArray.pop();
                    setPlayerDamageResistance = pre + randNumb;//randNumb
                    playerDamageResistanceArray.push(setPlayerDamageResistance);

                    $scope.Buff = "Res+" + setPlayerDamageResistance;
                    buffIsActive = true;

                } if (dinoShapePlayer == "ornithomimosaur" && dinoShapeOpponent == "sauropod") {
                    //debuff
                    var pre = playerDamageResistanceArray[0];

                    playerDamageResistanceArray.pop();
                    setPlayerDamageResistance = pre - randNumb;
                    playerDamageResistanceArray.push(setPlayerDamageResistance);

                    $scope.Buff = "Res-" + setPlayerDamageResistance;
                    buffIsActive = true;

                }
                if (dinoShapePlayer == "largetheropod" && dinoShapeOpponent == "ankylosaurid") {
                    // add to strength+4
                    // add to attackPower+3
                    var pre = playerStrengthArray[0];

                    playerStrengthArray.pop();
                    setPlayerstrength = pre + randNumb;
                    playerStrengthArray.push(setPlayerstrength);

                    var pre = playerAttackPowerArray[0];

                    playerAttackPowerArray.pop();
                    setPlayerAttackPower = pre + randNumb;
                    playerAttackPowerArray.push(setPlayerAttackPower);


                    $scope.Buff = "Str+" + setPlayerstrength + "Att+" + setPlayerAttackPower;
                    buffIsActive = true;

                } if (dinoShapePlayer == "largetheropod" && dinoShapeOpponent == "euornithopod") {
                    //debuff
                   
                    var pre = playerStrengthArray[0];

                    playerStrengthArray.pop();
                    setPlayerstrength = pre - randNumb;
                    playerStrengthArray.push(setPlayerstrength);

                    var pre = playerAttackPowerArray[0];

                    playerAttackPowerArray.pop();
                    setPlayerAttackPower = pre - randNumb;
                    playerAttackPowerArray.push(setPlayerAttackPower);


                    $scope.Buff = "Str-" + setPlayerstrength + "Att-" + setPlayerAttackPower;
                    buffIsActive = true;
                }
                if (dinoShapePlayer == "smalltheropod" && dinoShapeOpponent == "ankylosaurid") {
                    // add to attackPower+3

                    var pre = playerAttackPowerArray[0];

                    playerAttackPowerArray.pop();
                    setPlayerAttackPower = pre + randNumb;
                    playerAttackPowerArray.push(setPlayerAttackPower);

                    $scope.Buff = "Att+" + setPlayerAttackPower;

                } if (dinoShapePlayer == "smalltheropod" && dinoShapeOpponent == "euornithopod") {
                    //debuff

                    var pre = playerAttackPowerArray[0];

                    playerAttackPowerArray.pop();
                    setPlayerAttackPower = pre - randNumb;
                    playerAttackPowerArray.push(setPlayerAttackPower);

                    $scope.Buff = "Att-" + setPlayerAttackPower;
                    buffIsActive = true;

                }

            }
            }

            
            

        }

        //------------empty all arrays------------
        function popArrays() {

            playerStrengthArray.pop();
            playerAttackPowerArray.pop();
            playerDamageResistanceArray.pop();

            opponentStrengthArray.pop();
            opponentAttackPowerArray.pop();
            opponentDamageResistanceArray.pop();


            xpMaxArray.pop();


            opponentHealthArray.pop();
            playerHealthArray.pop();

            MaxHPArray.pop();


        }

        //--------------initial Calculations----------------
        function doCalculations() {
            
            //player-----------------------------
            setPlayerstrength = levelUp + 1;
            playerStrengthArray.push(setPlayerstrength);

            setPlayerAttackPower = (levelUp / 2 );
            playerAttackPowerArray.push(setPlayerAttackPower);

            setPlayerDamageResistance = (levelUp / 2);
            playerDamageResistanceArray.push(setPlayerDamageResistance);


            //opponent-----------------------
            setOpponentStrength = levelUp + 1;
            opponentStrengthArray.push(setOpponentStrength);

            setOpponentAttackPower = (levelUp / 2);
            opponentAttackPowerArray.push(setOpponentAttackPower);

            setOpponentDamageResistance = (levelUp / 2);
            opponentDamageResistanceArray.push(setOpponentDamageResistance);

            //------------------------------

            setXpMax = levelUp * 100;
            xpMaxArray.push(setXpMax);


            setPlayerHealth = ((levelUp + 1) * 10);
            playerHealthArray.push(setPlayerHealth);


            setOpponentHealth = ((levelUp + 1) * 10);
            opponentHealthArray.push(setOpponentHealth);

            setMaxHP = (levelUp + 1) * 10;
            MaxHPArray.push(setMaxHP);
        }

    }]);






//------------BattleService----------------------------------------------------
    playerApp.service('battle', battleResultGet);
    var roll = 0;

    function battleResultGet() {

            roll = dice[Math.floor(Math.random() * 10)];

             playerStrength = playerStrengthArray[0];
             playerAttackPower = playerAttackPowerArray[0];
             playerDamageResistance = playerDamageResistanceArray[0];


             opponentStrength = opponentStrengthArray[0];
             opponentAttackPower = opponentAttackPowerArray[0];
             opponentDamageResistance = opponentDamageResistanceArray[0];

        //-----skills-----------------------------

             //$scope.stomp = function() {
             //    opponentHealth = opponentHealth - (powerArray[Math.floor(Math.random() * opponentdamageResistance)] - (playerstrength + powerArray[Math.floor(Math.random() * 10)]));
             //}
             //$scope.scratch = function() {
             //    opponentHealth = opponentHealth - (powerArray[Math.floor(Math.random() * opponentdamageResistance)] - (playerstrength + powerArray[Math.floor(Math.random() * 10)]));
             //}
             //$scope.bite = function() {
             //    opponentHealth = opponentHealth - (powerArray[Math.floor(Math.random() * opponentdamageResistance)] - (playerstrength + powerArray[Math.floor(Math.random() * 10)]));
             //}
             //$scope.heal = function() {
             //    playerHealth = playerHealthArray[0];
             //    $scope.MaxHP = MaxHP;
             //    $scope.percentXpbar = (playerHealth / MaxHP) * 100
             //}
             //console.log("strength: ", strength)
             //console.log("attackPower: ", attackPower)
             //console.log("damageResistance: ", damageResistance)

        
        if (roll <= 5)
        {
            
            // player-----------------------------------------------------------

            playertattackPowerCal = powerArray[Math.floor(Math.random() * 10)];
            playertattackPowerCal = playertattackPowerCal + playerAttackPower;

            
            playerdamageResistanceCal = powerArray[Math.floor(Math.random())] + playerDamageResistance;

            playerDamageResult = (playertattackPowerCal + playerStrength) - playerdamageResistanceCal;

            
            
            
            //-------------------------------Final calculation and return---------------------------------------------
            opponentHealth = opponentHealth - playerDamageResult;
            
            return { opponentHealth, playerDamageResult }

        }

        
        if (roll >= 6) {


            //opponent-----------------------------------------------------

            opponentAttackPowerCal = powerArray[Math.floor(Math.random() * 10)];
            opponentAttackPowerCal = opponentAttackPowerCal + opponentAttackPower;


            opponentdamageResistanceCal = powerArray[Math.floor(Math.random())] + opponentDamageResistance;

            opponentDamageResult = (opponentAttackPowerCal + opponentStrength) - opponentdamageResistanceCal;

            

            //-------------------------------Final calculation and return---------------------------------------------
            playerHealth = playerHealth - opponentDamageResult;
            
            //-----------------------------------------------------


            return { playerHealth, opponentDamageResult }

        }

    }





//-----------CacheController-------------


    //playerApp.controller('CacheController', ['$scope', '$cacheFactory', function ($scope, $cacheFactory) {
    //    $scope.keys = [];
    //    $scope.cache = $cacheFactory('cacheId');
    //    $scope.put = function (key, value) {
    //        if (angular.isUndefined($scope.cache.get(key))) {
    //            $scope.keys.push(key);
    //        }
    //        $scope.cache.put(key, angular.isUndefined(value) ? null : value);
    //    };
    //}]);