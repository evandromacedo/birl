var body            = $('body'),
    birlButton      = $('#birlButton'),
    domBirlCounter  = $('#birlCounter'),
    domBirlLevel    = $('#birlLevel'),
    domBirlTimer    = $('#birlTimer'),
    modal           = $('#modal'),
    nextLevelText   = $('#nextLevelText'),
    nextLevelSpan   = $('#nextLevelSpan');

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

var toggleBirlClick = function() {
    birlButton.css({
        'pointer-events': 'none',
        // 'background'    : 'url(img/bodybuilder2_peso2.png) no-repeat 100% 100%'
    });
    $('#teste').attr('src', 'img/bodybuilder2_peso2.png');
    // $('#teste').css('pointer-events', 'none');

    setTimeout(function() {

        birlButton.css({
            'pointer-events': 'auto',
            // 'background'    : 'url(img/bodybuilder2_peso.png) no-repeat 100% 100%'
        });
        $('#teste').attr('src', 'img/bodybuilder2_peso.png');
        // $('#teste').css('pointer-events', 'auto');

    }, 1000);
};

var disableBambam = function() {
    birlButton.css({
        'pointer-events': 'none',
        'background'    : 'url(img/bodybuilder2_peso3.png) no-repeat 100% 100%'
    });
};

var enableBambam = function() {
    birlButton.css({
        'pointer-events': 'auto',
        'background'    : 'url(img/bodybuilder2_peso.png) no-repeat 100% 100%'
    });
};


/* -----------------------------------------------
    Gambiarra véa de Zé que depois eu ajeito
-------------------------------------------------- */

var size = 0;
$("#barra").css('height', size);

function addBar(){
    size += 10;

    if (size > 40 && size <= 80){$("#barra").css('background-color', '#FF0'); }
    else if (size > 80){ $("#barra").css('background-color', '#F00'); }
    else{  $("#barra").css('background-color', '#0F0'); }

    $("#barra").css('height', size+'%');
}
function rmvBar(){
    size -= 10;


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