jQuery(document).ready(function($) {

    const birlLimit        = 100,
          birlPercentUp    = 2,
          birlMaxLevel     = 5,
          birlLevelTimer   = 20,
          birlDownOne      = 0.1,
          birlDownTwo      = 0.3,
          birlDownThree    = 0.5,
          birlDownFour     = 0.7,
          birlDownBoss     = 1;


    var   audioShow        = document.getElementById("show"),
          audioBirl        = document.getElementById("birl"),
          audioBodybuilder = document.getElementById("bodybuilder"),
          audioNegativa    = document.getElementById("negativa"),
          audioVaiDarNao   = document.getElementById("vaiDarNao"),
          audioMonstro     = document.getElementById("monstro"),
          birlButton       = $('#bambam > .player'),
          nextLevelButton  = $('#next-level-button');

    openModal();

    var Leo = function() {
        var self = this;

        self.monstroCounter = 0;

        self.monstroStart = function() {
            clearInterval(self.frangoInterval);
            clearInterval(self.monstroInterval);
            self.frangoInterval = setInterval(function() { self.decrementMonstro(birlDownBoss) }, 100);
            self.monstroInterval = setInterval(function() { self.incrementMonstro(5) }, 100);
        };

        self.finish = function() {
            disableLeo();
            clearInterval(self.monstroInterval);

            setTimeout(function() {
                clearLeoBar();
                enableLeo();
                openModal('Teste', 'Level Boss');
            }, 3000);
        };

        self.incrementMonstro = function() {
            toggleLeoImage();
            self.monstroCounter += birlPercentUp;

            if (self.monstroCounter <= birlLimit) {
                increaseLeoBar(birlPercentUp);
            }
        };

        self.decrementMonstro = function(percent) {
            if (self.monstroCounter > 0) {
                self.monstroCounter -= percent;
                decreaseLeoBar(percent);
            }
        };
    };

    var HoraDoShow = function() {
        var self = this;

        self.birlLevel   = 1;
        self.birlCounter = 0;
        self.birlTimer   = birlLevelTimer;

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

        self.startBirl = function (restartBirlLevel) {
            if (restartBirlLevel)
                self.birlLevel = 1;

            enableBambam();
            self.birlCounter = 0;
            self.birlTimer   = birlLevelTimer;
            setCounterText(self.birlCounter);
            setLevelText(self.birlLevel);

            switch (self.birlLevel) {
                case 1:
                    clearInterval(self.birlInterval);
                    setTimerText(self.birlTimer);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    self.birlInterval = setInterval(function() { self.decrementBirl(birlDownOne) }, 100);
                    break;

                case 2:
                    self.leo = new Leo();
                    self.leo.monstroStart();
                    self.birlInterval = setInterval(function() { self.decrementBirl(birlDownBoss) }, 100);
                    // self.birlCountdown = setInterval(self.countdown, 1000);
                    break;

                case 3:
                    self.birlInterval = setInterval(function() { self.decrementBirl(birlDownThree) }, 100);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    break;

                case 4:
                    self.birlInterval = setInterval(function() { self.decrementBirl(birlDownFour) }, 100);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    break;

                case 5:
                    self.leo = new Boss();
                    leo.monstroStart();
                    break;
            }
        };


        self.finishLevel = function() {
            clearTimeout(toggleImageTimeout);
            disableBambam();
            birlTimeIsOver = true;
            clearInterval(self.birlCountdown);
            clearInterval(self.birlInterval);
            self.birlLevel++;

            setTimeout(function() {

                clearBar();
                // enableBambam();
                self.birlTimer = birlLevelTimer;
                setTimerText(self.birlTimer);

                switch (self.birlLevel) {
                    case 2:
                        changeScenario('palco');
                        self.boss();
                        // changeScenario('praia');
                        // openModal('Ta saindo da jaula o monstro!', 2);
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
                        changeScenario('palco');
                        self.boss();
                        // openModal('Ta saindo da jaula o monstro!', 5);
                        break;
                }

            }, 3000);
        };

        self.boss = function() {
            audioBoss = new Audio('audio/bondedamaromba.mp3');
            audioBoss.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
            audioBoss.play();

            setTimeout(function() {
                audioMonstro.play();
                $('#leo').fadeIn(1500).css('display', 'inline');
            }, 3000);

            setTimeout(function() {
                openModal('Teste', 'Boss');
            }, 6500);
        };

        self.incrementBirl = function () {
            self.birlCounter += birlPercentUp;
            setCounterText(self.birlCounter);

            if (self.birlCounter <= birlLimit) {
                increaseBar(birlPercentUp);
            }
        };

        self.decrementBirl = function (percent) {
            if (self.birlCounter > 0) {
                self.birlCounter -= percent;
                setCounterText(self.birlCounter);
                decreaseBar(percent);
            }
        };

        self.playNextLevel = function () {
            if (self.birlLevel <= birlMaxLevel)
                self.startBirl();
        };

        self.playAgain = function() {
            clearBar();
            setTimerBlack();
            openModal('Perdeu. Mas um monstro nunca desiste', self.birlLevel);
            clearInterval(self.birlInterval);
        };

        self.restartBirl = function () {
            self.birlCounter = 0;
            self.birlLevel   = 1;
            setCounterText(self.birlCounter);
            setLevelText(self.birlLevel);
            clearInterval(self.birlInterval);
            audioShow.play();
            clearBar();
        };
    }, bambam = new HoraDoShow();

    $('#birlInit').on('click', function() {
        console.log('asd');
        // bambam.restartBirl();
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

        toggleImage();
    });

});

$(window).on('resize', function() {
  $("#bambam").css('width', $('#bambam > .player-img').width());
});

$(window).on('load', function() {
    $('.loading').fadeOut(400);
    document.getElementById('show').play();
});
