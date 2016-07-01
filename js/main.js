jQuery(document).ready(function($) {

    const birlLimit           = 10,
          birlMaxLevel        = 5,
          intervalLevelUm     = null,
          intervalLevelDois   = 3500,
          intervalLevelTres   = 2500,
          intervalLevelQuatro = 2200,
          intervalLevelBoss   = 1970, // ESSE TA DIFÍCIL PRA CARAI
          timerLevelUm        = 30,
          timerLevelDois      = 25,
          timerLevelTres      = 20,
          timerLevelQuatro    = 15,
          timerLevelBoss      = null;

    var   audioShow           = document.getElementById("show"),
          audioBirl           = document.getElementById("birl"),
          audioBodybuilder    = document.getElementById("bodybuilder"),
          audioNegativa       = document.getElementById("negativa"),
          audioVaiDarNao      = document.getElementById("vaiDarNao"),
          birlButton          = $('#birlButton'),
          nextLevelButton     = $('#nextLevelButton');

    openModal();

    var HoraDoShow = function () {
        var self = this;

        self.birlLevel   = 1;
        self.birlCounter = 0;
        self.birlTimer   = 20;

        /****************** Timer ********************/
        self.countdown = function() {
            self.birlTimer--;
            setTimerText(self.birlTimer);

            if (self.birlTimer == 0) {
                clearInterval(self.birlCountdown);
                self.playAgain();
                return;
            }

            if (self.birlTimer == 5) {
                setTimerRed();
                audioVaiDarNao.play();
            }
        }
        /*********************************************/

        self.startBirl = function (restartBirlLevel) {
            if (restartBirlLevel)
                self.birlLevel = 1;

            self.birlCounter = 0;
            self.birlTimer   = 20;
            setCounterText(self.birlCounter);
            setLevelText(self.birlLevel);

            switch (self.birlLevel) {
                case 1:
                    clearInterval(self.birlInterval);
                    setTimerText(self.birlTimer);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    break;

                case 2:
                    self.birlInterval = setInterval(self.decrementBirl, intervalLevelDois);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    break;

                case 3:
                    self.birlInterval = setInterval(self.decrementBirl, intervalLevelTres);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    break;

                case 4:
                    self.birlInterval = setInterval(self.decrementBirl, intervalLevelQuatro);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    break;

                case 5:
                    self.birlInterval = setInterval(self.decrementBirl, intervalLevelBoss);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    break;
            }
        };

        self.incrementBirl = function () {
            self.birlCounter++;
            setCounterText(self.birlCounter);

            if (self.birlCounter <= birlLimit) {
                audioBirl.play();
                addBar();
            }
        };

        self.decrementBirl = function () {
            if (self.birlCounter > 0) {
                self.birlCounter--;
                audioNegativa.play();
                setCounterText(self.birlCounter);
                rmvBar();
            }
        };

        self.playNextLevel = function () {
            if (self.birlLevel <= birlMaxLevel)
                self.startBirl();
        };

        self.playAgain = function() {
            clrBar();
            setTimerBlack();
            openModal('Perdeu. Mas um monstro nunca desiste', self.birlLevel);
            clearInterval(self.birlInterval);
        }

        self.finishLevel = function() {
            disableBambam();
            clearInterval(self.birlCountdown);
            clearInterval(self.birlInterval);
            self.birlLevel++;

            setTimeout(function() {

                clrBar();
                enableBambam();
                self.birlTimer = 20;
                setTimerText(self.birlTimer);

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
            setCounterText(self.birlCounter);
            setLevelText(self.birlLevel);
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

        closeModal();
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

});

// Fazer Spinner com isso mais tarde
$(window).on('load', function() {
    console.log('loaded');
});
