jQuery(document).ready(function($) {

    const birlLimit        = 100,
          birlPercentUp    = 2,
          birlMaxLevel     = 5,
          birlLevelTimer   = 20,
          birlDownOne      = 0,
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

    // openInstructionModal('Instruções:', 'Clique o mais rápido que puder para buscar o 13 no trapézio descendente antes que o tempo acabe. A cada level a dificuldade aumenta.');
    // openModal();

    var Leo = function() {
        var self = this;

        self.monstroCounter = 0;

        self.monstroStart = function() {
            clearInterval(self.frangoInterval);
            clearInterval(self.monstroInterval);
            self.frangoInterval = setInterval(function() { self.decrementMonstro(birlDownBoss) }, 100);
            self.monstroInterval = setInterval(function() { self.incrementMonstro() }, 100);
        };

        self.finish = function() {
            clearTimeout(toggleLeoImageTimeout);
            leoTimeIsOver = true;
            disableLeo();
            bambamLose();
            clearInterval(self.frangoInterval);
            clearInterval(self.monstroInterval);

            setTimeout(function() {
                clearBar();
                clearLeoBar();
                enableLeo();
                openModal('Mudante VS Monstro', 'Boss');
            }, 3000);
        };

        self.incrementMonstro = function() {
            toggleLeoImage();
            self.monstroCounter += birlPercentUp;

            if (self.monstroCounter <= birlLimit) {
                increaseLeoBar(birlPercentUp);
            }

            if (self.monstroCounter >= birlLimit) {
                self.finish();
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
                    self.birlInterval ? clearInterval(self.birlInterval) : null;
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

        self.theEnd = function() {
            self.audioBoss.pause();

            bgAudio = new Audio('audio/index.ogg');
            bgAudio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
            bgAudio.play();

            openModal('É 37 ANOS PORRA!', 'WHOOOOOOOOOO');
        }


        self.finishLevel = function() {
            clearTimeout(toggleImageTimeout);
            disableBambam();
            birlTimeIsOver = true;
            clearInterval(self.birlCountdown);
            clearInterval(self.birlInterval);

            if (self.birlLevel == 2) {
                clearInterval(self.leo.frangoInterval);
                clearInterval(self.leo.monstroInterval);
                leoLose();
            }

            self.birlLevel++;

            setTimeout(function() {

                switch (self.birlLevel) {
                    case 2:
                        changeScenario('palco');
                        self.boss();
                        // changeScenario('praia');
                        // openModal('Ta saindo da jaula o monstro', 2);
                        break;

                    case 3:
                        self.theEnd();
                        return;
                        break;

                    // case 3:
                    //     changeScenario('academia');
                    //     openModal('Aqui faz verão o ano inteiro', 3);
                    //     break;

                    case 4:
                        changeScenario('praia');
                        openModal('Ajuda o maluco que ta doente', 4);
                        break;

                    case 5:
                        changeScenario('palco');
                        self.boss();
                        // openModal('Ta saindo da jaula o monstro!', 5);
                        break;
                }

                clearBar();
                // enableBambam();
                self.birlTimer = birlLevelTimer;
                setTimerText(self.birlTimer);
            }, 3000);
        };

        self.boss = function() {
            self.audioBoss = new Audio('audio/bondedamaromba.mp3');
            self.audioBoss.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
            self.audioBoss.play();

            setTimeout(function() {
                audioMonstro.play();
                $('#leo').fadeIn(1500).css('display', 'inline');
            }, 3000);

            setTimeout(function() {
                openInstructionModal('Boss!', 'Leo Stronda ficou puto e chamou Bambam para um desafio. O primeiro que atingir o 13 no trapézio descendente, ganha. O perdedor leva o título de frango do ano.');
                openModal('Mutante VS Monstro', 'Boss');
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
        // console.log('asd');
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
  $("#bambam .player").css('width', $('#bambam .player-img').width());
  $("#leo .player").css('width', $('#leo .player-img').width());
});

$(window).on('load', function() {
    $('.loading').fadeOut(400);
    document.getElementById('show').play();
});

$(window).focus(function() {
    $('title').text('Hora do Show, porra!');
    console.log('teste');
});

$(window).blur(function() {
    $('title').text('BORA CARALHO, CÊ QUER VER ESSA PORRA V');
});
