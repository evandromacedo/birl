jQuery(document).ready(function($) {

    const birlLimit           = 5,
          birlMaxLevel        = 5,
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
          domBirlLevel        = $("#birlLevel"),
          modal               = $('#modal'),
          nextLevelButton     = $('#nextLevelButton'),
          nextLevelText       = $('#nextLevelText'),
          nextLevelSpan       = $('#nextLevelSpan');

    // audioShow.play();

    var openModal = function(text, level) {
        modal.css('display', 'block');
        nextLevelText.text(text);
        nextLevelSpan.text(level);
    };

    openModal();

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

        self.playNextLevel = function () {
            if (self.birlLevel <= birlMaxLevel)
                self.startBirl();
        };

        self.finishLevel = function() {
            disableBambam();
            clearInterval(self.birlInterval);
            self.birlLevel++;

            setTimeout(function() {
                clrBar();
                enableBambam();

                switch (self.birlLevel) {
                    case 2:
                        changeScenario('praia');
                        openModal('Ta saindo da jaula o monstro!', 2);
                        break;

                    case 3:
                        changeScenario('academia');
                        openModal('Ta saindo da jaula o monstro!', 3);
                        break;

                    case 4:
                        changeScenario('praia');
                        openModal('Ta saindo da jaula o monstro!', 4);
                        break;

                    case 5:
                        changeScenario('academia');
                        openModal('Ta saindo da jaula o monstro!', 5);
                        break;
                }
            }, 3000);
        }

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

    $('#birlInit').on('click', function() {
        bambam.restartBirl();
    });

    nextLevelButton.on('click', function() {
        if (bambam.birlLevel == 1)
            bambam.startBirl();
        else
            bambam.playNextLevel();

        modal.css('display', 'none');
    });

    birlButton.on('click', function() {
        if (bambam.birlLevel > birlMaxLevel)
            return;

        if (bambam.birlCounter < birlLimit)
            bambam.incrementBirl();

        if (bambam.birlCounter >= birlLimit) {
            bambam.finishLevel();
            audioBodybuilder.play();
            return;
        }

        toggleBirlClick();
    });

    var changeScenario = function(scenario) {
        switch (scenario) {
            case 'academia':
                body.css("background", "url('../img/cenarios/cenario_academia.jpg') repeat-x center bottom");
                body.css("background-color", "#B4F8F9");
                break;

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

    var disableBambam = function() {
        birlButton.css("pointer-events", "none");
        birlButton.css("background", "url(img/bodybuilder2_peso3.png) no-repeat 100% 100%");
        birlButton.css("background-position", "center");
    };

    var enableBambam = function() {
        birlButton.css("background", "url(img/bodybuilder2_peso.png) no-repeat 100% 100%");
        birlButton.css("background-position", "center");
        birlButton.css("pointer-events", "auto");
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