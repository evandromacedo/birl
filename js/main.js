jQuery(document).ready(function($) {

    const birlLimit        = 10,
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
          birlButton       = $('#bambam > .player'),
          nextLevelButton  = $('#next-level-button');

    openModal();

    var HoraDoShow = function () {
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
                    self.birlInterval = setInterval(function() { self.decrementBirl(birlDownTwo) }, 100);
                    self.birlCountdown = setInterval(self.countdown, 1000);
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
                    // setTimeout(function() {
                    //     // enableBambam();
                    //     disableBody();
                    //     audioBoss = new Audio('audio/bondedamaromba.mp3');
                    //     audioBoss.addEventListener('ended', function() {
                    //         this.currentTime = 0;
                    //         this.play();
                    //     }, false);
                    //     audioBoss.play();
                    // }, 3000);
                    break;
            }
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
        }

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
                        self.boss();
                        // changeScenario('palco');
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
                        // changeScenario('academia');
                        // openModal('Ta saindo da jaula o monstro!', 5);
                        self.boss();
                        break;
                }

            }, 3000);
        };

        self.boss = function() {
            // disableBambam();
            changeScenario('palco');

            audioBoss = new Audio('audio/bondedamaromba.mp3');
            audioBoss.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
            audioBoss.play();

            setTimeout(function() {
                document.getElementById('monstro').play();
                $('#leo').fadeIn(1500).css('display', 'inline');
            }, 3000);

            setTimeout(function() {
                document.getElementById('monstro').play();
            }, 5000);

            setTimeout(function() {
                openModal('Teste', 'Boss');
            }, 6500);
        }

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
