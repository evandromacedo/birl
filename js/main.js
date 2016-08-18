jQuery(document).ready(function($) {

    // Birl's constants
    const birlLimit        = 100,
          birlPercentUp    = 2,
          birlMaxLevel     = 5,
          birlLevelTimer   = 20,
          birlDownOne      = 0,
          birlDownTwo      = 0.3,
          birlDownThree    = 0.5,
          birlDownFour     = 0.7,
          birlDownBoss     = 1;

    // Audio and DOM references
    var   audioShow        = document.getElementById("show"),
          audioBirl        = document.getElementById("birl"),
          audioBodybuilder = document.getElementById("bodybuilder"),
          audioNegativa    = document.getElementById("negativa"),
          audioVaiDarNao   = document.getElementById("vaiDarNao"),
          audioMonstro     = document.getElementById("monstro"),
          birlButton       = $('#bambam > .player'),
          nextLevelButton  = $('#next-level-button');

    // Initial modal dialogs
    openInstructionModal('Instruções:', 'Clique o mais rápido que puder para buscar o 13 no trapézio descendente antes que o tempo acabe. A cada level a dificuldade aumenta.');
    openModal();

    // Boss Object
    var Leo = function() {
        var self = this;

        self.monstroCounter = 0;

        // Start the boss
        self.monstroStart = function() {
            // Clear previous intervals
            clearInterval(self.frangoInterval);
            clearInterval(self.monstroInterval);

            // Set new ones
            self.frangoInterval = setInterval(function() { self.decrementMonstro(birlDownBoss) }, 100);
            self.monstroInterval = setInterval(function() { self.incrementMonstro() }, 100);
        };

        // Increment boss' bar
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

        // Decrement boss' bar
        self.decrementMonstro = function(percent) {
            if (self.monstroCounter > 0) {
                self.monstroCounter -= percent;
                decreaseLeoBar(percent);
            }
        };

        // Finish when the boss get 100%
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
                openModal('Mutante VS Monstro', 'Boss');
            }, 3000);
        };

    };

    // Bambam Object
    var HoraDoShow = function() {
        var self = this;

        self.birlLevel   = 1;
        self.birlCounter = 0;
        self.birlTimer   = birlLevelTimer;

        // Start a new level
        self.startBirl = function (restartBirlLevel) {
            if (restartBirlLevel)
                self.birlLevel = 1;

            enableBambam();
            self.birlCounter = 0;
            self.birlTimer   = birlLevelTimer;
            setCounterText(self.birlCounter);
            setLevelText(self.birlLevel);

            // Verify current level
            switch (self.birlLevel) {
                case 1:
                    clearInterval(self.birlInterval);
                    setTimerText(self.birlTimer);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    self.birlInterval = setInterval(function() { self.decrementBirl(birlDownOne) }, 100);
                    break;

                case 2:
                    self.birlInterval = setInterval(function() { self.decrementBirl(birlDownThree) }, 100);
                    self.birlCountdown = setInterval(self.countdown, 1000);
                    break;

                case 3:
                    self.leo = new Leo();
                    self.leo.monstroStart();
                    self.birlInterval ? clearInterval(self.birlInterval) : null;
                    self.birlInterval = setInterval(function() { self.decrementBirl(birlDownBoss) }, 100);
                    // self.birlCountdown = setInterval(self.countdown, 1000);
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

        // Increment Birl's bar
        self.incrementBirl = function () {
            self.birlCounter += birlPercentUp;
            setCounterText(self.birlCounter);

            if (self.birlCounter <= birlLimit) {
                increaseBar(birlPercentUp);
            }
        };

        // Decrement Birl's bar
        self.decrementBirl = function (percent) {
            if (self.birlCounter > 0) {
                self.birlCounter -= percent;
                setCounterText(self.birlCounter);
                decreaseBar(percent);
            }
        };

        // Level countdown
        self.countdown = function() {
            self.birlTimer--;
            setTimerText(self.birlTimer);

            // When comes to 0, play again modal is shown
            if (self.birlTimer == 0) {
                clearInterval(self.birlCountdown);
                self.playAgain();
                return;
            }

            // Play audio on 5 seconds left
            if (self.birlTimer == 5) {
                setTimerRed();
                audioVaiDarNao.play();
            }
        };

        // Clear level and open modal to start again
        self.playAgain = function() {
            clearBar();
            setTimerBlack();
            openModal('Perdeu. Mas um monstro nunca desiste', self.birlLevel);
            clearInterval(self.birlInterval);
        };

        // Restart level (not done in layout yet)
        self.restartBirl = function () {
            self.birlCounter = 0;
            self.birlLevel   = 1;
            setCounterText(self.birlCounter);
            setLevelText(self.birlLevel);
            clearInterval(self.birlInterval);
            audioShow.play();
            clearBar();
        };

        // Finish level, clear everything, and open modal to start next level
        self.finishLevel = function() {
            clearTimeout(toggleImageTimeout);
            disableBambam();
            birlTimeIsOver = true;
            clearInterval(self.birlCountdown);
            clearInterval(self.birlInterval);

            // If win boss' level, clear everything and return image
            if (self.birlLevel == 3) {
                clearInterval(self.leo.frangoInterval);
                clearInterval(self.leo.monstroInterval);
                leoLose();
            }

            // Increment Level
            self.birlLevel++;

            setTimeout(function() {

                // Check the level and change scenario according
                switch (self.birlLevel) {
                    case 2:
                        changeScenario('praia');
                        openModal('Ta saindo da jaula o monstro', 2);
                        break;

                    // Start Boss
                    case 3:
                        changeScenario('palco');
                        self.boss();
                        break;

                    // Finish the game
                    case 4:
                        self.theEnd();
                        return;
                        break;

                    // case 3:
                    //     changeScenario('academia');
                    //     openModal('Aqui faz verão o ano inteiro', 3);
                    //     break;

                    // case 4:
                    //     changeScenario('praia');
                    //     openModal('Ajuda o maluco que ta doente', 4);
                    //     break;

                    // case 5:
                    //     changeScenario('palco');
                    //     self.boss();
                    //     break;
                }

                clearBar();
                // enableBambam();
                self.birlTimer = birlLevelTimer;
                setTimerText(self.birlTimer);
            }, 3000);
        };

        // Play next level if exist
        self.playNextLevel = function () {
            if (self.birlLevel <= birlMaxLevel)
                self.startBirl();
        };

        // Play the whole boss' audio and animation
        self.boss = function() {
            self.audioBoss = new Audio('audio/bondedamaromba.mp3');
            self.audioBoss.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
            self.audioBoss.play();

            showBoss();

            setTimeout(function() {
                openInstructionModal('Boss!', 'Leo Stronda ficou puto e chamou Bambam para um desafio. O primeiro que atingir o 13 no trapézio descendente, ganha. O perdedor leva o título de frango do ano.');
                openModal('Mutante VS Monstro', 'Boss');
            }, 6500);
        };

        // Animations when the game is over
        self.theEnd = function() {
            self.audioBoss.pause();

            bgAudio = new Audio('audio/index.ogg');
            bgAudio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
            bgAudio.play();

            openModal('É 37 ANOS PORRA!', 'WHOOOOOOOOOO');
        };

    }, bambam = new HoraDoShow(); // Create a new player

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
});

$(window).blur(function() {
    $('title').text('BORA CARALHO, CÊ QUER VER ESSA PORRA V');
});
