$(document).ready(function () {

    class Warrior {
        constructor(name, startPoints, picture, firstName) {
            this.name = name;
            this.startPoints = startPoints;
            this.picture = picture;
            this.htmlId1 = "#" + firstName + "1";
            this.htmlId2 = "#" + firstName + "2";
            this.className1 = "." + firstName + "1";
            this.className2 = "." + firstName + "2";
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

    warriors[Luke] = new Warrior("Luke Skywalker", 120, "assets/images/Luke.jpg", "Luke");
    warriors[Obi] = new Warrior("Obi-Wan Kenobi", 140, "assets/images/Obi.jpg", "Obi");
    warriors[Maul] = new Warrior("Darth Maul", 100, "assets/images/Maul.jpg", "Maul");
    warriors[Sidi] = new Warrior("Darth Sidious", 80, "assets/images/Sidi.jpg", "Sidi");

    $.each (warriors, function(key, value) {
        $(warriors[key].className2).hide();
    });

    $(warriors[Luke].htmlId1).click(function () {
        MoveToYourChar (Luke);
    });
    $(warriors[Obi].htmlId1).click(function () {
        MoveToYourChar (Luke);
    });
    $(warriors[Maul].htmlId1).click(function () {
        MoveToYourChar (Luke);
    });
    $(warriors[Side].htmlId1).click(function () {
        MoveToYourChar (Luke);
    });

    function MoveToYourChar (id) {
        $(warriors[id].className1).hide();
        $(warriors[id].className2).show();
    }
});