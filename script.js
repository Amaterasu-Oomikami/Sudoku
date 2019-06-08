function setup() {
    frameRate(30);
    init();
}

let play, setting, help, back;
let restart, menu, timer;
let english, vietnamese;
let lang = 'English';
let started = false, end = true;

let config = {
    'English': {
        'play': 'Play',
        'settings': 'Settings',
        'help': 'Help',
        'back': 'Back',
        'difficulty': 'Difficulty',
        'language': 'Language',
        'difficulties': 'Difficulties',
        'languages': 'Languages',
        'easy': 'Easy',
        'medium': 'Medium',
        'hard': 'Hard',
        'howtoplay': 'How to play',
        'instructions': 'The classic Sudoku game involves a grid of 81 squares. The grid is divided into nine blocks, each containing nine squares.\nThe rules of the game are simple: each of the nine blocks has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box.\nThe difficulty lies in that each vertical nine-square column, or horizontal nine-square line across, within the larger square, must also contain the numbers 1-9, without repetition or omission.\nEvery puzzle has just one correct solution.',
        'restart': 'Restart',
        'timer': 'Timer',
        'finished': 'Finished!',
        'time': 'Time: '
    },
    'Vietnamese': {
        'play': 'Bắt đầu chơi',
        'settings': 'Tùy chọn',
        'help': 'Trợ giúp',
        'back': 'Quay lại',
        'difficulty': 'Độ khó',
        'language': 'Ngôn ngữ',
        'difficulties': 'Độ khó',
        'languages': 'Ngôn ngữ',
        'easy': 'Dễ',
        'medium': 'Trung bình',
        'hard': 'Khó',
        'howtoplay': 'Cách chơi',
        'instructions': 'Trò chơi Sudoku cổ điển bao gồm một lưới gồm 81 ô vuông. Lưới được chia thành chín khối, mỗi khối chứa chín ô vuông.\nQuy tắc của trò chơi rất đơn giản: mỗi khối trong chín khối phải chứa tất cả các số 1-9 trong các ô vuông của nó. Mỗi số chỉ có thể xuất hiện một lần trong một hàng, cột hoặc ô, không thừa, không thiếu.\nMỗi câu đố chỉ có một lời giải đúng.',
        'restart': 'Chơi lại',
        'timer': 'Thời gian',
        'finished': 'Hoàn thành!',
        'time': 'Thời gian: '
    }
}

function init() {
    createCanvas(540, 540);
    started = false;
    if (back) back.hide();
    if (difficulty) difficulty.hide();
    if (language) language.hide();
    if (restart) restart.hide();
    if (menu) menu.hide();
    if (timer) timer.hide();
    if (english) english.hide();
    if (vietnamese) vietnamese.hide();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(100);
    textFont('Calibri');
    text('Sudoku', 270, 180);
    play = createDiv(config[lang]['play']);
    play.position(270, 260);
    play.style('margin', '0');
    play.style('position', 'absolute');
    play.style('left', '50%');
    play.style('-ms-transform', 'translateX(-50%)');
    play.style('transform', 'translateX(-50%)');
    play.style('font-size', '35px');
    play.style('font-family', 'Calibri');
    play.mouseOver(() => {
        play.style('text-shadow', '0 0 10px gray');
    });
    play.mouseOut(() => {
        play.style('text-shadow', 'none');
    });
    play.mousePressed(start);
    setting = createDiv(config[lang]['settings']);
    setting.position(270, 320);
    setting.style('margin', '0');
    setting.style('position', 'absolute');
    setting.style('left', '50%');
    setting.style('-ms-transform', 'translateX(-50%)');
    setting.style('transform', 'translateX(-50%)');
    setting.style('font-size', '35px');
    setting.style('font-family', 'Calibri');
    setting.mouseOver(() => {
        setting.style('text-shadow', '0 0 10px gray');
    });
    setting.mouseOut(() => {
        setting.style('text-shadow', 'none');
    });
    setting.mousePressed(showsettings);
    help = createDiv(config[lang]['help']);
    help.position(270, 380);
    help.style('margin', '0');
    help.style('position', 'absolute');
    help.style('left', '50%');
    help.style('-ms-transform', 'translateX(-50%)');
    help.style('transform', 'translateX(-50%)');
    help.style('font-size', '35px');
    help.style('font-family', 'Calibri');
    help.mouseOver(() => {
        help.style('text-shadow', '0 0 10px gray');
    });
    help.mouseOut(() => {
        help.style('text-shadow', 'none');
    });
    help.mousePressed(howtoplay);
    back = createDiv(config[lang]['back']);
    back.position(70, 500);
    back.style('font-size', '25px');
    back.style('font-family', 'Calibri');
    back.mouseOver(() => {
        back.style('text-shadow', '0 0 10px gray');
    });
    back.mouseOut(() => {
        back.style('text-shadow', 'none');
    });
    back.mousePressed(init);
    back.hide();
}

let difficulty, language;
let easy, medium, hard;

function showsettings() {
    background(255, 255, 255);
    play.hide();
    setting.hide();
    help.hide();
    back.show();
    if (easy) easy.hide();
    if (medium) medium.hide();
    if (hard) hard.hide();
    textSize(100);
    text('Sudoku', 270, 180);
    textSize(55);
    textFont('Calibri');
    text(config[lang]['settings'], 270, 280);
    difficulty = createDiv(config[lang]['difficulty']);
    difficulty.position(270, 340);
    difficulty.style('margin', '0');
    difficulty.style('position', 'absolute');
    difficulty.style('left', '50%');
    difficulty.style('-ms-transform', 'translateX(-50%)');
    difficulty.style('transform', 'translateX(-50%)');
    difficulty.style('font-size', '35px');
    difficulty.style('font-family', 'Calibri');
    difficulty.mouseOver(() => {
        difficulty.style('text-shadow', '0 0 10px gray');
    });
    difficulty.mouseOut(() => {
        difficulty.style('text-shadow', 'none');
    });
    difficulty.mousePressed(showdifficulties);
    language = createDiv(config[lang]['language']);
    language.position(270, 400);
    language.style('margin', '0');
    language.style('position', 'absolute');
    language.style('left', '50%');
    language.style('-ms-transform', 'translateX(-50%)');
    language.style('transform', 'translateX(-50%)');
    language.style('font-size', '35px');
    language.style('font-family', 'Calibri');
    language.mouseOver(() => {
        language.style('text-shadow', '0 0 10px gray');
    });
    language.mouseOut(() => {
        language.style('text-shadow', 'none');
    });
    language.mousePressed(showlanguages);
}

let attempts = 4;

function showdifficulties() {
    background(255, 255, 255);
    difficulty.hide();
    language.hide();
    textSize(100);
    text('Sudoku', 270, 180);
    textSize(55);
    textFont('Calibri');
    text(config[lang]['difficulties'], 270, 280);
    easy = createDiv(config[lang]['easy']);
    easy.position(270, 340);
    easy.style('margin', '0');
    easy.style('position', 'absolute');
    easy.style('left', '50%');
    easy.style('-ms-transform', 'translateX(-50%)');
    easy.style('transform', 'translateX(-50%)');
    easy.style('font-size', '35px');
    easy.style('font-family', 'Calibri');
    easy.mouseOver(() => {
        easy.style('text-shadow', '0 0 10px gray');
    });
    easy.mouseOut(() => {
        easy.style('text-shadow', 'none');
    });
    easy.mousePressed(() => {
        attempts = 1;
        showsettings();
    });
    medium = createDiv(config[lang]['medium']);
    medium.position(270, 400);
    medium.style('margin', '0');
    medium.style('position', 'absolute');
    medium.style('left', '50%');
    medium.style('-ms-transform', 'translateX(-50%)');
    medium.style('transform', 'translateX(-50%)');
    medium.style('font-size', '35px');
    medium.style('font-family', 'Calibri');
    medium.mouseOver(() => {
        medium.style('text-shadow', '0 0 10px gray');
    });
    medium.mouseOut(() => {
        medium.style('text-shadow', 'none');
    });
    medium.mousePressed(() => {
        attempts = 4;
        showsettings();
    });
    hard = createDiv(config[lang]['hard']);
    hard.position(270, 460);
    hard.style('margin', '0');
    hard.style('position', 'absolute');
    hard.style('left', '50%');
    hard.style('-ms-transform', 'translateX(-50%)');
    hard.style('transform', 'translateX(-50%)');
    hard.style('font-size', '35px');
    hard.style('font-family', 'Calibri');
    hard.mouseOver(() => {
        hard.style('text-shadow', '0 0 10px gray');
    });
    hard.mouseOut(() => {
        hard.style('text-shadow', 'none');
    });
    hard.mousePressed(() => {
        attempts = 7;
        showsettings();
    });
}

function showlanguages() {
    background(255, 255, 255);
    difficulty.hide();
    language.hide();
    textSize(100);
    text('Sudoku', 270, 180);
    textSize(55);
    textFont('Calibri');
    text(config[lang]['languages'], 270, 280);
    english = createDiv('English');
    english.position(270, 340);
    english.style('margin', '0');
    english.style('position', 'absolute');
    english.style('left', '50%');
    english.style('-ms-transform', 'translateX(-50%)');
    english.style('transform', 'translateX(-50%)');
    english.style('font-size', '35px');
    english.style('font-family', 'Calibri');
    english.mouseOver(() => {
        english.style('text-shadow', '0 0 10px gray');
    });
    english.mouseOut(() => {
        english.style('text-shadow', 'none');
    });
    english.mousePressed(() => {
        lang = 'English';
        init();
    });
    vietnamese = createDiv('Tiếng Việt');
    vietnamese.position(270, 400);
    vietnamese.style('margin', '0');
    vietnamese.style('position', 'absolute');
    vietnamese.style('left', '50%');
    vietnamese.style('-ms-transform', 'translateX(-50%)');
    vietnamese.style('transform', 'translateX(-50%)');
    vietnamese.style('font-size', '35px');
    vietnamese.style('font-family', 'Calibri');
    vietnamese.mouseOver(() => {
        vietnamese.style('text-shadow', '0 0 10px gray');
    });
    vietnamese.mouseOut(() => {
        vietnamese.style('text-shadow', 'none');
    });
    vietnamese.mousePressed(() => {
        lang = 'Vietnamese';
        init();
    });
}

function howtoplay() {
    background(255, 255, 255);
    play.hide();
    setting.hide();
    help.hide();
    textSize(100);
    text('Sudoku', 270, 180);
    textSize(55);
    textFont('Calibri');
    text(config[lang]['howtoplay'], 270, 260);
    textAlign(LEFT, BASELINE);
    textSize(16);
    text(config[lang]['instructions'], 60, 300, 440, 500);
    back.show();
}

let counter = 0;
let sudoku, interval;

function start() {
    counter = 0;
    sudoku = new Sudoku(60);
    sudoku.generateGrid(attempts);
    if (play) play.hide();
    if (help) help.hide();
    if (setting) setting.hide();
    if (back) back.hide();
    if (!started) restart = createDiv(config[lang]['restart']);
    restart.position(570, 450);
    restart.style('font-size', '20px');
    restart.style('font-family', 'Calibri');
    restart.mouseOver(() => {
        restart.style('text-shadow', '0 0 10px gray');
    });
    restart.mouseOut(() => {
        restart.style('text-shadow', 'none');
    });
    restart.mousePressed(start);
    if (!started) menu = createDiv(config[lang]['back']);
    menu.position(570, 500);
    menu.style('font-size', '20px');
    menu.style('font-family', 'Calibri');
    menu.mouseOver(() => {
        menu.style('text-shadow', '0 0 10px gray');
    });
    menu.mouseOut(() => {
        menu.style('text-shadow', 'none');
    });
    menu.mousePressed(init);
    if (!started) timer = createDiv('');
    timer.position(593, 70);
    timer.style('font-size', '20px');
    timer.style('font-family', 'Calibri');
    if (interval) clearInterval(interval);
    timeIt();
    interval = setInterval(timeIt, 1000);
    started = true; end = false;
}

function draw() {
    if (started) {
        if (play) play.hide();
        if (setting) setting.hide();
        if (help) help.hide();
        if (back) back.hide();
        createCanvas(690, 540);
        background(250, 250, 250);
        fill(0);
        textSize(25);
        textAlign(CENTER, CENTER);
        text(config[lang]['timer'], 625, 50);
        sudoku.drawGrid();
        if (sudoku.checkGrid()) {
            end = true;
            clearInterval(interval);
            fill('rgba(255, 255, 255, 0.9)');
            rect(0, 0, 540, 540);
            fill(0);
            textSize(50);
            text(config[lang]['finished'], 270, 240);
            text(config[lang]['time'] + timer.html(), 270, 300);
        }
    }
}

let seconds, minutes, hours;

function timeIt() {
    counter++;
    seconds = counter % 60;
    minutes = floor(counter / 60);
    hours = floor(counter / 3600);
    timer.html(nf(hours, 2) + ':' + nf(minutes, 2) + ':' + nf(seconds, 2));
}

function mousePressed() {
    if (!end) {
        let x = mouseX;
        let y = mouseY;
        let cell = sudoku.getCellAt(x, y);
        if (cell !== undefined) {
            if (cell === sudoku.selectedCell) {
                sudoku.setCellValue(cell, ((sudoku.selectedCell.number + 1) % 10));
            } else {
                sudoku.setSelectedCell(cell);
            }
        }
    }
}

function keyPressed() {
    if (!end) {
        if (keyCode === UP_ARROW) {
            sudoku.moveSelection(0)
        } else if (keyCode === RIGHT_ARROW) {
            sudoku.moveSelection(1);
        } else if (keyCode === DOWN_ARROW) {
            sudoku.moveSelection(2);
        } else if (keyCode === LEFT_ARROW) {
            sudoku.moveSelection(3);
        } else if (keyCode === 96 || keyCode === 48 || keyCode === BACKSPACE || keyCode === DELETE || keyCode === RETURN || keyCode === ESCAPE) {
            sudoku.setCellValue(sudoku.selectedCell, 0);
        } else if (49 <= keyCode && keyCode <= 57) {
            sudoku.setCellValue(sudoku.selectedCell, keyCode - 48);
        } else if (97 <= keyCode && keyCode <= 105) {
            sudoku.setCellValue(sudoku.selectedCell, keyCode - 96);
        } else if (keyCode === 72) {
            sudoku.setShowPossiblities(!sudoku.showPossiblities);
        }
    }
}