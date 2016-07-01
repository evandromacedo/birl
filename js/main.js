jQuery(document).ready(function($) {

    const birlLimit           = 2,
          birlMaxLevel        = 3,
          intervalLevelUm     = null,
          intervalLevelDois   = 4000,
          intervalLevelTres   = 3200,
          intervalLevelQuatro = 2500,
          intervalLevelBoss   = 1800;

    var   audioShow           = document.getElementById("show"),
          audioBirl           = document.getElementById("birl"),
          audioBodybuilder    = document.getElementById("bodybuilder"),
          audioNegativa       = document.getElementById("negativa"),
          body                = $("body"),
          birlButton          = $("#birlButton"),
          domBirlCounter      = $("#birlCounter"),
          domBirlLevel        = $("#birlLevel");

    // audioShow.play();

    var HoraDoShow = function () {
        var self = this;

        self.birlLevel   = 1;
        self.birlCounter = 0;

        self.startBirl = function (restartBirlLevel) {
            if (restartBirlLevel)
                self.birlLevel = 1;

            self.birlCounter = 0;
            domBirlCounter.text(self.birlCounter);
            domBirlLevel.text(self.birlLevel);

            switch (self.birlLevel) {
                case 1:
                    clearInterval(self.birlInterval);
                    break;

                case 2:
                    changeScenario('praia');
                    self.birlInterval = setInterval(self.decrementBirl, intervalLevelDois);
                    break;

                case 3:
                    self.birlInterval = setInterval(self.decrementBirl, intervalLevelTres);
                    break;

                case 4:
                    self.birlInterval = setInterval(self.decrementBirl, intervalLevelQuatro);
                    break;

                case 5:
                    self.birlInterval = setInterval(self.decrementBirl, intervalLevelBoss);
                    break;
            }
        };

        self.incrementBirl = function () {
            self.birlCounter++;
            domBirlCounter.text(self.birlCounter);

            if (self.birlCounter <= birlLimit) {
                audioBirl.play();
                addBar();
            }
        };

        self.decrementBirl = function () {
            if (self.birlCounter > 0) {
                self.birlCounter--;
                audioNegativa.play();
                domBirlCounter.text(self.birlCounter);
                rmvBar();
            }
        };

        self.incrementBirlLevel = function (playBodybuilder) {
            clearInterval(self.birlInterval);

            if (playBodybuilder)
                audioBodybuilder.play();

            if (self.birlLevel < birlMaxLevel) {
                self.birlLevel++;
                nextLevelAnimation();
            }
        };

        self.restartBirl = function () {
            self.birlCounter = 0;
            self.birlLevel   = 1;
            domBirlCounter.text(self.birlCounter);
            domBirlLevel.text(self.birlLevel);
            clearInterval(self.birlInterval);
            audioShow.play();
            clrBar();
        };
    }, bambam = new HoraDoShow();

    bambam.startBirl();

    $('#birlInit').on('click', function() {
        bambam.restartBirl();
    });

    birlButton.on('click', function() {
        if (bambam.birlLevel > birlMaxLevel)
            return;

        if (bambam.birlCounter < birlLimit)
            bambam.incrementBirl();

        if (bambam.birlCounter >= birlLimit) {
            bambam.incrementBirlLevel(true);
            return
        }

        toggleBirlClick();

    });

    var changeScenario = function(scenario) {
        switch (scenario) {
            case 'praia':
                body.css("background", "url('../img/cenarios/cenario_praia.jpg') repeat-x center bottom");
                body.css("background-color", "#FFF");
                break;
        }
    };

    var toggleBirlClick = function() {
        birlButton.css("pointer-events", "none");
        birlButton.css("background", "url(img/bodybuilder2_peso2.png) no-repeat 100% 100%");
        birlButton.css("background-position", "center");

        setTimeout(function() {
            birlButton.css("background", "url(img/bodybuilder2_peso.png) no-repeat 100% 100%");
            birlButton.css("background-position", "center");
            birlButton.css("pointer-events", "auto");
        }, 1000);
    };

    var nextLevelAnimation = function() {
        birlButton.css("pointer-events", "none");
        birlButton.css("background", "url(img/bodybuilder2_peso3.png) no-repeat 100% 100%");
        birlButton.css("background-position", "center");
        setTimeout(function() {
            clrBar();
            birlButton.css("background", "url(img/bodybuilder2_peso.png) no-repeat 100% 100%");
            birlButton.css("background-position", "center");
            birlButton.css("pointer-events", "auto");
            bambam.startBirl();
        }, 3000);
    };


    /* -----------------------------------------------
        Gambiarra véa de Zé que depois eu ajeito
    -------------------------------------------------- */

    var size = 0;
    $("#barra").css('height', size);

    function addBar(){
        size += 20;

        if (size > 40 && size <= 80){$("#barra").css('background-color', '#FF0'); }
        else if (size > 80){ $("#barra").css('background-color', '#F00'); }
        else{  $("#barra").css('background-color', '#0F0'); }

        $("#barra").css('height', size+'%');
    }
    function rmvBar(){
        size -= 20;


        if (size > 260 && size <= 400){$("#barra").css('background-color', '#FF0'); }
        else if (size > 400){ $("#barra").css('background-color', '#F00'); }
        else{  $("#barra").css('background-color', '#0F0'); }

        $("#barra").css('height', size+'%');
    }
    function clrBar(){
        size = 0;
        $("#barra").css('height', size+'%');
        $("#barra").css('background-color', '#0F0');
    }

});