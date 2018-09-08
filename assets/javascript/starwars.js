const LUKE = 0;
const OBI = 1;
const MAUL = 2;
const SIDI = 3;
const START_POINTS = [140, 120, 180, 150];
const ROWS = ["people", "your", "enemies"];
const NAMES = ["Luke", "Obi", "Maul", "Sidi"];

$(document).ready(function () {
    // the appending numbers are to identify / select the row the item is in
    class Warrior {
        constructor(fullName, startPoints, damage, picture, firstName) {
            this.fullName = fullName;
            this.points = startPoints;
            this.damage = damage; // the damage this fighter causes when defending
            this.picture = picture;
            this.firstName = firstName;
            this.htmlId0 = "#" + firstName + "0";
            this.htmlId1 = "#" + firstName + "1";
            this.htmlId2 = "#" + firstName + "2";
            this.className0 = "." + firstName + "0";
            this.className1 = "." + firstName + "1";
            this.className2 = "." + firstName + "2";
        }
    }

    var warriors = [{}];

    warriors[LUKE] = new Warrior("Luke Skywalker", START_POINTS[LUKE], 5, "./assets/images/Luke.jpg", "Luke");
    warriors[OBI] = new Warrior("Obi-Wan Kenobi", START_POINTS[OBI], 10, "./assets/images/Obi.jpg", "Obi");
    warriors[MAUL] = new Warrior("Darth Maul", START_POINTS[MAUL], 25, "./assets/images/Maul.jpg", "Maul");
    warriors[SIDI] = new Warrior("Darth Sidious", START_POINTS[SIDI], 20, "./assets/images/Sidi.jpg", "Sidi");


    $(document).on("click", ".row0", function (event) {
        moveCharsForFightPrep($(this).attr('name'));
    });
    $(document).on("click", ".row2", function (event) {
        moveCharForFight($(this).attr('name'));
    });
    $(document).on("click", "#attackBtn", function () {
        fight();
    });

    var damage1 = 8;
    var defeated = 0;

    // A jQuery plugin - for demo purposes
    (function ($) {
        $.fn.invisible = function () {
            return this.each(function () {
                $(this).css("visibility", "hidden");
                return this;
            });
        };
        $.fn.visible = function () {
            return this.each(function () {
                $(this).css("visibility", "visible");
                return this;
            });
        };
    }(jQuery));

    $("#fightText1").invisible();

    // jQuery functions to do the same thing
    function invisible(item) {
        item.css("visibility", "hidden");
    }

    function visible(item) {
        item.css("visibility", "visibel");
    }

    invisible($('#fightText2'));

    // initial "display"
    makeRow(0, -1, -1, "white");
    $("#defenders").invisible();            // can't use this before it's declared
    $("#yourChar").hide();
    $("#against").hide();

    // the restart button routine
    $(document).on("click", "#restartBtn", function () {
        $("#pick-char").show();
        $.each(warriors, function (key, value) {
            // Some of these are already gone, but never mind.
            $(warriors[key].className1).remove();
            $(warriors[key].className2).remove();
        });
        $("#fightText1").invisible();
        $("#fightText2").invisible();
        for (var i = 0; i < warriors.length; i++) {
            warriors[i].points = START_POINTS[i];
        }
        $("#restartBtn").remove();
        $("#attackBtn").remove();
        $("#yourChar").hide();
        $("#against").hide();
//        $("#defenders").hide();
        $("#defenders").invisible();
        $("#defenders").html("<span>Pick Someone to Attack</span>");
        makeRow(0, -1, -1, "white"); // put them back to the Pick a Character row
        damage1 = 8;
        defeated = 0;
    });

    function displayRestartButton() {
        var r = $('<input/>').attr({
            type: "button",
            id: "restartBtn",
            value: 'Restart',
            style: "height: 40px",
        });
        $(".appendReset").append(r);
    }

    var fighter1;
    var fighter2;

    function fight() {
        warriors[fighter2].points -= damage1;
        warriors[fighter1].points -= warriors[fighter2].damage;
        $(warriors[fighter1].className1 + ' > .points-caption').text(warriors[fighter1].points);
        $(warriors[fighter2].className1 + ' > .points-caption').text(warriors[fighter2].points);
        if (warriors[fighter1].points >= 0 && warriors[fighter2].points >= 0) { // still fighting
            $("#fightText1").text('You attacked ' + warriors[fighter2].fullName + ' for ' + damage1 + ' damage');
            // $(warriors[fighter1].className1 + ' > .points-caption').text(warriors[fighter1].points);
            $("#fightText2").text(warriors[fighter2].fullName + ' attacked you back for ' + warriors[fighter2].damage + ' damage');
            // $(warriors[fighter2].className1 + ' > .points-caption').text(warriors[fighter2].points);
            damage1 += 8;
            $("#fightText1").visible();
            $("#fightText2").visible();
        } else if (warriors[fighter1].points < 0) {
            // you lose (even if the other guy also has <0 points)
            if (warriors[fighter2].points < 0) {
                $("#fightText1").text('Even though he\'s dead, you are too. :-( Game over.');
            } else {
                $("#fightText1").text('You lose! :-( Game over!!!');
            }
            $("#attackBtn").remove(); // image will move left
            $(warriors[fighter2].className1).css("margin-left", "77px"); // move image right to keep it in position
            $("#fightText2").invisible();
            displayRestartButton();
        } else { // must be the other guy who lost
            defeated++;
            $("#attackBtn").remove();
            $(warriors[fighter2].className1).css("margin-left", "77px"); // as 6 lines above
            $("#fightText2").invisible();
            if (defeated >= 3) {
                $("#fightText1").text('You won!!!! Game over!!!');
                $("#defenders").invisible();
                displayRestartButton();
            } else {
                $(warriors[fighter2].className1).remove();
                $("#fightText1").text('You have defeated ' + warriors[fighter2].fullName + '.');
                $("#defenders").html('<span>Pick Someone Else to Attack</span>');

            }
        }
    }

    // move people out of the Pick a Character row to Your Character and to Pick Someone
    function moveCharsForFightPrep(name) {
        fighter1 = NAMES.indexOf(name);
        $("#yourChar").show();
        $("#against").show();
        $("#pick-char").hide();
        makeRow(1, -1, fighter1, "white"); // make the Your Char row
        $.each(warriors, function (key, value) { // clear out the first row
            $(warriors[key].className0).remove(); // was hide
        });
        makeRow(2, fighter1, -1, "red"); // make the Pick Someone row
        $("#defenders").html('<span>Pick Someone to Attack</span>');
        $("#defenders").visible();
        // $("#defenders").show();
    }

    // move someone from the Pick Someone to Attack row to Fighting Against
    function moveCharForFight(name) {
        fighter2 = NAMES.indexOf(name);
        // put up the attack button
        var r = $('<input/>').attr({
            type: "button",
            id: "attackBtn",
            value: 'Attack!',
            style: "display: flex; margin-top: 100px; margin-left: 20px; height: 40px;",
        });
        $(".picture-your").append(r);
         makeRow(1, -1, fighter2, "black");
        $(warriors[fighter1].htmlId1).css("border-color", "white"); // makeRow makes it black, so undo that
        $(warriors[fighter2].className2).remove(); // remove from the still to attack row
        if (defeated >= 2) { // none left to fight
            $("#defenders").remove();
        } else {
            $("#defenders").html("<span>Still Out There</span>");
            $("#defenders").visible();      // just in case
        }
    }

    // build a row of characters
    // leaveOut = -1 for leave out nobody
    // putIn = -1 for include everybody
    function makeRow(rowNum, leaveOut, putIn, borderColor) {
        var wordColor = borderColor == "black" ? "white" : "black";
        for (var i = 0; i < warriors.length; i++) {
            if (i != leaveOut) {
                if ((putIn < 0) || ((putIn >= 0) && (i === putIn))) {      // construct an image to put in the row
                    var personObj = $("." + ROWS[rowNum]).clone();      // copy the prototype
                    $(personObj).removeClass(ROWS[rowNum]);             // remove its class to avoid confusion
                    $(personObj).addClass(warriors[i].firstName + rowNum);  // now give it a useful class
                    $(personObj).find(".name-caption").text(warriors[i].fullName);
                    $(personObj).find(".name-caption").css("color", wordColor);
                    // for some reason this keeps the tags in the right order, which is important for display correctness
                    $(personObj).find("img").remove();                  // remove the prototype's image
                    $(personObj).append('<img id="' + warriors[i].firstName + '" name="' + warriors[i].firstName + '" class="fighterpic row' +
                        rowNum + '" src=' + warriors[i].picture + '>');
                    $(personObj).find(".points-caption").remove();
                    $(personObj).append('<div class="points-caption" style="color: ' +
                        wordColor + '">' + warriors[i].points + '</div>');
                    $(personObj).show(); // in case prototype was hidden
                    $(personObj).appendTo(".picture-" + ROWS[rowNum]);
                    $('#' + warriors[i].firstName).css("border-color", borderColor);
                }
            }
        };
        $("." + ROWS[rowNum]).hide(); // hide the "prototype"
    };
});