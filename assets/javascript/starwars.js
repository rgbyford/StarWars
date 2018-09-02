$(document).ready(function () {

    class Warrior {
        constructor(name, startPoints, picture, firstName) {
            this.name = name;
            this.startPoints = startPoints;
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
        render(str) {
            console.log(str + this.name);
        }
        render2(str) {
            console.log(str + str);
        }

    }

    var Luke = 0;
    var Obi = 1;
    var Maul = 2;
    var Sidi = 3;

    let warriors = [{}];

    warriors[Luke] = new Warrior("Luke Skywalker", 120, "./assets/images/Luke.jpg", "Luke");
    warriors[Obi] = new Warrior("Obi-Wan Kenobi", 140, "./assets/images/Obi.jpg", "Obi");
    warriors[Maul] = new Warrior("Darth Maul", 100, "./assets/images/Maul.jpg", "Maul");
    warriors[Sidi] = new Warrior("Darth Sidious", 80, "./assets/images/Sidi.jpg", "Sidi");
    var rows = ["people", "your", "enemies"];

    makeRow(0, -1, -1, "white");

    $.each(warriors, function (key, value) {
        $(warriors[key].className1).hide();
        $(warriors[key].className2).hide();
    });

    $(warriors[Luke].htmlId0).click(function () {
        moveCharsForFightPrep(Luke);
    });
    $(warriors[Obi].htmlId0).click(function () {
        moveCharsForFightPrep(Obi);
    });
    $(warriors[Maul].htmlId0).click(function () {
        moveCharsForFightPrep(Maul);
    });
    $(warriors[Maul].htmlId2).click(function () {
        moveCharsForFightPrep(Maul);
    });
    $(warriors[Sidi].htmlId0).click(function () {
        moveCharsForFightPrep(Sidi);
    });
    $(document).on("click", "img#Luke2", function () {
        moveCharForFight(Luke); // placeholder
    });
    $(document).on("click", "img#Obi2", function () {
        moveCharForFight(Obi); // placeholder
    });
    $(document).on("click", "img#Maul2", function () {
        moveCharForFight(Maul); // placeholder
    });
    $(document).on("click", "img#Sidi2", function () {
        moveCharForFight(Sidi); // placeholder
    });


    function moveCharsForFightPrep(id) {
        //        $(warriors[id].className0).hide();
        makeRow(1, -1, id, "white"); // make the Your Char row
        makeRow(2, id, -1, "red"); // and the Enemies row
        $.each(warriors, function (key, value) {
            $(warriors[key].className0).hide();
            //if (key != id) {
            //      warriors[key].setRedBorder ();
            //  }
        });

    }

    function moveCharForFight(id) {
        makeRow(1, -1, id, "black");
        //        warriors[id].setRedBorder ();
        $(warriors[id].className2).hide();
    }

    function makeRow(rowNum, leaveOut, putIn, borderColor) {
        var wordColor = borderColor == "black" ? "white" : "black";
        for (var i = 0; i < warriors.length; i++) {
            if (i != leaveOut) {
                if ((putIn < 0) || ((putIn >= 0) && i === putIn)) {
                    var personObj = $("." + rows[rowNum]).clone();
                    $(personObj).removeClass(rows[rowNum]);
                    $(personObj).addClass(warriors[i].firstName + rowNum);
                    $(personObj).find(".name-caption").text(warriors[i].name);
                    $(personObj).find(".name-caption").css("color", wordColor);
                    $(personObj).find("img").remove();
                    $(personObj).append('<img class="fighterpic" id=' +
                        warriors[i].firstName + rowNum + ' src=' + warriors[i].picture + '>');
                    $(personObj).find(".points-caption").remove();
                    $(personObj).append('<div class="points-caption" style="color: ' +
                        wordColor + '">' + warriors[i].startPoints + '</div>');
                    $(personObj).show(); // in case prototype was hidden
                    $(personObj).appendTo(".picture-" + rows[rowNum]);
                    warriors[i].setBorder(rowNum, borderColor);
                }
            }
        };
        $("." + rows[rowNum]).hide(); // hide the "prototype"

    };



});