var body           = $('body'),
    birlButton     = $('#bambam > .player'),
    domBirlCounter = $('#birl-counter'),
    domBirlLevel   = $('#birl-level'),
    domBirlTimer   = $('#birl-timer'),
    modal          = $('#modal'),
    nextLevelText  = $('#next-level-text'),
    nextLevelSpan  = $('#next-level-span'),
    innerBar       = $('#bambam .player-bar-inner'),
    audioBirl      = document.getElementById("birl");

var openModal = function(text, level) {
    modal.css('display', 'block');
    nextLevelText.text(text);
    nextLevelSpan.text(level);
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

var disableBambam = function() {
    birlButton.css({
        'pointer-events'  : 'none',
        'background-image': 'url(img/bodybuilder2_peso3.png)'
    });

    innerBar.css('height', '100%');
};

var enableBambam = function() {
    birlButton.css({
        'pointer-events'  : 'auto',
        'background-image': 'url(img/bodybuilder2_peso.png)'
    });
};

// var disableBody = function() {
//     body.css('pointer-events', 'none');
// };

// var enableBody = function() {
//     body.css('pointer-events', 'auto');
// };

var barSize = 0;

var increaseBar = function(percent) {
    if (barSize < 100) {
        barSize += percent;
        checkBar(barSize);
        innerBar.css('height', barSize + '%');
    }
    else
        innerBar.css('height', '100%');
};

var decreaseBar = function(percent) {
    if (barSize > 0) {
        barSize -= percent;
        checkBar(barSize);
        innerBar.css('height', barSize + '%');
    }
};

var clearBar = function() {
    barSize = 0;
    innerBar.css('height', '0');
    innerBar.css('background-color', '#0F0');
};

var checkBar = function(barSize) {
    if (barSize > 40 && barSize <= 80)
        innerBar.css('background-color', '#FF0');
    else if (barSize > 80)
        innerBar.css('background-color', '#F00');
    else
        innerBar.css('background-color', '#0F0');
};
