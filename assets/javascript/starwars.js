$(document).ready(function () {

    // these are really consts
    var Luke = 0;
    var Obi = 1;
    var Maul = 2;
    var Sidi = 3;
    var startPoints = [140, 120, 180, 150];
    var rows = ["people", "your", "enemies"];
    var names = ["Luke", "Obi", "Maul", "Sidi"];

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
        setBorder(row, borderColor) {
            $(this["htmlId" + row]).css("border-color", borderColor);
        }
    }

    var warriors = [{}];

    warriors[Luke] = new Warrior("Luke Skywalker", startPoints[Luke], 5, "./assets/images/Luke.jpg", "Luke");
    warriors[Obi] = new Warrior("Obi-Wan Kenobi", startPoints[Obi], 10, "./assets/images/Obi.jpg", "Obi");
    warriors[Maul] = new Warrior("Darth Maul", startPoints[Maul], 25, "./assets/images/Maul.jpg", "Maul");
    warriors[Sidi] = new Warrior("Darth Sidious", startPoints[Sidi], 20, "./assets/images/Sidi.jpg", "Sidi");


    // initial "display"
    makeRow(0, -1, -1, "white");
    $("#defenders").hide();
    $("#yourChar").hide();
    $("#against").hide();

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
            warriors[i].points = startPoints[i];
        }
        $("#restartBtn").remove();
        $("#attackBtn").remove();
        $("#yourChar").hide();
        $("#against").hide();
        $("#defenders").hide();
        $("#defenders").html("<span>Pick Someone to Attack</span>");
        makeRow(0, -1, -1, "white"); // put them back to Pick a Character
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
        if (warriors[fighter1].points >= 0 && warriors[fighter2].points >= 0) { // still fighting
            $("#fightText1").text('You attacked ' + warriors[fighter2].fullName + ' for ' + damage1 + ' damage');
            $(warriors[fighter1].className1 + ' > .points-caption').text(warriors[fighter1].points);
            $("#fightText2").text(warriors[fighter2].fullName + ' attacked you back for ' + warriors[fighter2].damage + ' damage');
            $(warriors[fighter2].className1 + ' > .points-caption').text(warriors[fighter2].points);
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
            // adjust the points captions
            $(warriors[fighter1].className1 + ' > .points-caption').text(warriors[fighter1].points);
            $(warriors[fighter2].className1 + ' > .points-caption').text(warriors[fighter2].points);
            $("#attackBtn").remove(); // image will move left
            $(warriors[fighter2].className1).css("margin-left", "80px"); // move image right to line up with text
            $("#fightText2").invisible();
            $("#defenders").invisible();
            displayRestartButton();
        } else { // must be the other guy who lost
            defeated++;
            $("#attackBtn").remove();
            $(warriors[fighter2].className1).css("margin-left", "70px"); // move image right to line up with text
            // show reduced points even if you just won
            $(warriors[fighter1].className1 + ' > .points-caption').text(warriors[fighter1].points);
            $(warriors[fighter2].className1 + ' > .points-caption').text(warriors[fighter2].points);
            if (defeated >= 3) {
                $("#fightText1").text('You won!!!! Game over!!!');
                $("#fightText2").invisible();
                $("#defenders").invisible();
                displayRestartButton();
            } else {
                $(warriors[fighter2].className1).remove();
                $("#fightText1").text('You have defeated ' + warriors[fighter2].fullName + '.');
                $("#fightText2").invisible();
                $("#defenders").html('<span>Pick Someone Else to Attack</span>');

            }
        }
    }

    // move people out of the Pick a Character row to Your Character and to Pick Someone
    function moveCharsForFightPrep(name) {
        fighter1 = names.indexOf(name);
        $("#yourChar").show();
        $("#against").show();
        $("#pick-char").hide();
        makeRow(1, -1, id, "white"); // make the Your Char row
        $.each(warriors, function (key, value) { // clear out the first row
            $(warriors[key].className0).remove(); // was hide
        });
        makeRow(2, fighter1, -1, "red"); // make the Pick Someone row
        $("#defenders").html('<span>Pick Someone to Attack</span>');
        $("#defenders").visible();
        $("#defenders").show();
    }

    // move someone from the Pick Someone to Attack row to Fighting Against
    function moveCharForFight(name) {
        fighter2 = names.indexOf(name);
        // put up the attack button
        var r = $('<input/>').attr({
            type: "button",
            id: "attackBtn",
            value: 'Attack!',
            style: "display: flex; margin-top: 100px; margin-left: 20px; height: 40px;",
        });
        $(".picture-your").append(r);
        //        $("#fightText2").html('&nbsp;'); // make room for the win/lose text
        //        $("#fightText1").html('&nbsp;');
        makeRow(1, -1, fighter2, "black");
        $(warriors[fighter1].htmlId1).css("border-color", "white"); // makeRow makes it black
        // doesn't work
        $(warriors[fighter2].className2).remove(); // remove from the still to attack row
        if (defeated >= 2) { // none left to fight
            $("#defenders").remove();
        } else {
            $("#defenders").html("<span>Still Out There</span>");
        }
    }

    // build a row of characters
    // leaveOut = -1 for leave out nobody
    // putIn = -1 for include everybody
    function makeRow(rowNum, leaveOut, putIn, borderColor) {
        var wordColor = borderColor == "black" ? "white" : "black";
        for (var i = 0; i < warriors.length; i++) {
            if (i != leaveOut) {
                if ((putIn < 0) || ((putIn >= 0) && i === putIn)) {
                    var personObj = $("." + rows[rowNum]).clone();
                    $(personObj).removeClass(rows[rowNum]);
                    $(personObj).addClass(warriors[i].firstName + rowNum);
                    $(personObj).find(".name-caption").text(warriors[i].fullName);
                    $(personObj).find(".name-caption").css("color", wordColor);
                    $(personObj).find("img").remove();
                    //                    $(personObj).append('<img name="' + warriors[i].firstName + '" class="fighterpic" id=' +
                    //                        warriors[i].firstName + rowNum + ' src=' + warriors[i].picture + '>');
                    $(personObj).append('<img id="' + warriors[i].firstName + '" name="' + warriors[i].firstName + '" class="fighterpic row' +
                        rowNum + '" src=' + warriors[i].picture + '>');
                    $(personObj).find(".points-caption").remove();
                    $(personObj).append('<div class="points-caption" style="color: ' +
                        wordColor + '">' + warriors[i].points + '</div>');
                    $(personObj).show(); // in case prototype was hidden
                    $(personObj).appendTo(".picture-" + rows[rowNum]);
                    //                                        warriors[i].setBorder(rowNum, borderColor);
                    console.log ('#' + warriors[i].firstName);
                    $('#' + warriors[i].firstName).css("border-color", borderColor);
                }
            }
        };
//        $('.row' + rowNum).css("border-color", borderColor);
        $("." + rows[rowNum]).hide(); // hide the "prototype"
    };
});