var body            = $('body'),
    birlButton      = $('#bambam'),
    domBirlCounter  = $('#birl-counter'),
    domBirlLevel    = $('#birl-level'),
    domBirlTimer    = $('#birl-timer'),
    modal           = $('#modal'),
    nextLevelText   = $('#next-level-text'),
    nextLevelSpan   = $('#next-level-span');

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
    }
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - -
    O background-image vai mudar pra position
- - - - - - - - - - - - - - - - - - - - - - - - - - */

var toggleBirlClick = function() {
    birlButton.css({
        'pointer-events'  : 'none',
        'background-image': 'url(img/bodybuilder2_peso2.png)'
    });

    setTimeout(function() {

        birlButton.css({
            'pointer-events'  : 'auto',
            'background-image': 'url(img/bodybuilder2_peso.png)'
        });

    }, 1000);
};

var disableBambam = function() {
    birlButton.css({
        'pointer-events'  : 'none',
        'background-image': 'url(img/bodybuilder2_peso3.png)'
    });
};

var enableBambam = function() {
    birlButton.css({
        'pointer-events'  : 'auto',
        'background-image': 'url(img/bodybuilder2_peso.png)'
    });
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - */


/* - - - - - - - - - - - - - - - - - - - - - - - - - -
    Gambiarra véa de Zé que depois eu ajeito
- - - - - - - - - - - - - - - - - - - - - - - - - - */

var size = 0;
$("#barra-inner").css('height', size);

function addBar(){
    size += 10;

    if (size > 40 && size <= 80){$("#barra-inner").css('background-color', '#FF0'); }
    else if (size > 80){ $("#barra-inner").css('background-color', '#F00'); }
    else{  $("#barra-inner").css('background-color', '#0F0'); }

    $("#barra-inner").css('height', size+'%');
}
function rmvBar(){
    size -= 10;


    if (size > 260 && size <= 400){$("#barra-inner").css('background-color', '#FF0'); }
    else if (size > 400){ $("#barra-inner").css('background-color', '#F00'); }
    else{  $("#barra-inner").css('background-color', '#0F0'); }

    $("#barra-inner").css('height', size+'%');
}
function clrBar(){
    size = 0;
    $("#barra-inner").css('height', size+'%');
    $("#barra-inner").css('background-color', '#0F0');
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - */