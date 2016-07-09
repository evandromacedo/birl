var body               = $('body'),
    birlButton         = $('#bambam > .player'),
    leoButton          = $('#leo > .player'),
    domBirlCounter     = $('#birl-counter'),
    domBirlLevel       = $('#birl-level'),
    domBirlTimer       = $('#birl-timer'),
    modal              = $('#modal'),
    modalInstruction   = $('#modal-instruction'),
    instructionHeading = $('#modal-instruction-heading'),
    instructionText    = $('#modal-instruction-text'),
    instructionButton  = $('#modal-instruction-button'),
    nextLevelText      = $('#next-level-text'),
    nextLevelSpan      = $('#next-level-span'),
    innerBar           = $('#bambam .player-bar-inner'),
    innerLeoBar        = $('#leo .player-bar-inner'),
    audioBirl          = document.getElementById("birl");

var openModal = function(text, level) {
    modal.css('display', 'block');
    nextLevelText.text(text);
    nextLevelSpan.text(level);
};

var openInstructionModal = function(heading, text) {
    modalInstruction.css('display', 'block');
    instructionHeading.text(heading);
    instructionText.text(text);
};

var closeInstructionModal = function() {
    modalInstruction.fadeOut(200);
};

var closeModal = function() {
    modal.css('display', 'none');
};

var setTimerRed = function() {
    domBirlTimer.css('color', 'red');
};

var setTimerBlack = function() {
    domBirlTimer.css('color', 'black');
};

var setCounterText = function(string) {
    domBirlCounter.text(string);
};

var setLevelText = function(string) {
    domBirlLevel.text(string);
};

var setTimerText = function(string) {
    domBirlTimer.text(string);
};

var changeScenario = function(scenario) {
    switch (scenario) {
        case 'academia':
            body.css({
                'background': 'url(img/cenarios/cenario_academia.jpg) repeat-x center bottom',
                'backgorund-color': '#B4F8F9'
            });
            break;

        case 'praia':
            body.css({
                'background': 'url(img/cenarios/cenario_praia.jpg) repeat-x center bottom',
                'backgorund-color': '#FFF'
            });
            break;

        case 'palco':
            birlButton.css({
                'pointer-events'  : 'none',
                'background-image': 'url(img/bodybuilder2_peso.png)'
            });

            body.css({
                '-webkit-transition': 'all 3s',
                'transition': 'all 3s'
            });

            body.css({
                'background': 'url(img/cenarios/stageb.jpg) no-repeat center bottom',
                'background-color': '#000'
            });

            setInterval(function() {
                body.css({
                    '-webkit-transition': 'none',
                    'transition': 'none'
                });
            }, 3000);


            break;
    }
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
    O background-image vai mudar pra position
- - - - - - - - - - - - - - - - - - - - - - - - - - */

birlTimeIsOver = true;
toggleImageTimeout = null;

var toggleImage = function() {
    birlButton.css({
        'background-image': 'url(img/bodybuilder2_peso2.png)'
    });

    if (birlTimeIsOver) {
        audioBirl.play();
        birlTimeIsOver = false;

        toggleImageTimeout = setTimeout(function() {

            birlButton.css({
                'background-image': 'url(img/bodybuilder2_peso.png)'
            });

            birlTimeIsOver = true;

        }, 1000);
    }
};

leoTimeIsOver = true;
toggleLeoImageTimeout = null;

var toggleLeoImage = function() {
    leoButton.css({
        'background-image': 'url(img/leo_2.png)'
    });

    if (leoTimeIsOver) {
        // document.getElementById('birl2').play();
        leoTimeIsOver = false;

        toggleLeoImageTimeout = setTimeout(function() {

            leoButton.css({
                'background-image': 'url(img/leo_1.png)'
            });

            leoTimeIsOver = true;

        }, 1100);
    }
};

var disableBambam = function() {
    birlButton.css({
        'pointer-events'  : 'none',
        'background-image': 'url(img/bodybuilder2_peso3.png)'
    });

    innerBar.css('height', '100%');
};

var disableLeo = function() {
    leoButton.css({
        'background-image': 'url(img/leo_2.png)'
    });

    innerLeoBar.css('height', '100%');
};

var enableBambam = function() {
    birlButton.css({
        'pointer-events'  : 'auto',
        'background-image': 'url(img/bodybuilder2_peso.png)'
    });
};

var enableLeo = function() {
    leoButton.css({
        'background-image': 'url(img/leo_1.png)'
    });
};

var bambamLose = function() {
    birlButton.css({
        'pointer-events'  : 'none',
        'background-image': 'url(img/bodybuilder2_peso.png)'
    });

    clearBar();
}

var leoLose = function() {
    leoButton.css({
        'background-image': 'url(img/leo_2.png)'
    });

    clearLeoBar();
}

// var disableBody = function() {
//     body.css('pointer-events', 'none');
// };

// var enableBody = function() {
//     body.css('pointer-events', 'auto');
// };

var barSize    = 0,
    leoBarSize = 0;

var increaseBar = function(percent) {
    if (barSize < 100) {
        barSize += percent;
        checkBar(barSize);
        innerBar.css('height', barSize + '%');
    }
    else
        innerBar.css('height', '100%');
};

var increaseLeoBar = function(percent) {
    if (leoBarSize < 100) {
        leoBarSize += percent;
        checkLeoBar(leoBarSize);
        innerLeoBar.css('height', leoBarSize + '%');
    }
    else
        innerLeoBar.css('height', '100%');
};

var decreaseBar = function(percent) {
    if (barSize > 0) {
        barSize -= percent;
        checkBar(barSize);
        innerBar.css('height', barSize + '%');
    }
};

var decreaseLeoBar = function(percent) {
    if (leoBarSize > 0) {
        leoBarSize -= percent;
        checkBar(leoBarSize);
        innerLeoBar.css('height', leoBarSize + '%');
    }
};

var clearBar = function() {
    barSize = 0;
    innerBar.css('height', '0');
    innerBar.css('background-color', '#0F0');
};

var clearLeoBar = function() {
    leoBarSize = 0;
    innerLeoBar.css('height', '0');
    innerLeoBar.css('background-color', '#0F0');
};

var checkBar = function(barSize) {
    if (barSize > 40 && barSize <= 80)
        innerBar.css('background-color', '#FF0');
    else if (barSize > 80)
        innerBar.css('background-color', '#F00');
    else
        innerBar.css('background-color', '#0F0');
};

var checkLeoBar = function(barSize) {
    if (barSize > 40 && barSize <= 80)
        innerLeoBar.css('background-color', '#FF0');
    else if (barSize > 80)
        innerLeoBar.css('background-color', '#F00');
    else
        innerLeoBar.css('background-color', '#0F0');
};

instructionButton.on('click', function() {
    closeInstructionModal();
});

