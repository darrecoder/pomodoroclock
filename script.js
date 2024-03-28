
let breakLength = document.getElementById("breaknum");
let sessionLength = document.getElementById("sessionnum");
let timerName = document.getElementById("timername");
let timerDisplay = document.getElementById("timernum");
let startpausebtn = document.getElementById('start_pause');
let stopresetbtn = document.getElementById('stop_reset');

document.getElementById('start_pause').onclick = startpause;
document.getElementById('stop_reset').onclick = stopreset;
document.getElementById('sessionplus').onclick = sessionincrement;
document.getElementById('sessionminus').onclick = sessiondecrement;
document.getElementById('breakplus').onclick = breakincrement;
document.getElementById('breakminus').onclick = breakdecrement;

let lastrunning = false;
let timerrunning = true;
let sessionnum = 25;
let breaknum = 5;
let sessionnumsec = 60;
let breaknumsec = 60;
let minutes, seconds;
let timercount;
let starttimer, starttwotimer;
let timermode = 1; // 1 = Session, 2 = Break

let audio = new Audio('alarm02.wav');
audio.loop = true;

initial();

function initial() {
    if (timerrunning == true && timermode == 1) {
        timer(5);
    }
    timerName.innerHTML = "Session Time"
    timerDisplay.innerHTML = convertTime(sessionnum * 60);
}

// Timer Display

function convertTime(num) {
    minutes = Math.floor(num / 60);
    seconds = Math.floor(num % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
}

function timercorrection(min, sec) {
    if (min < 10 && sec < 10) {
        return `0${min}:0${sec}`;
    } else if (min < 10 && sec == 60) {
        return `0${min}:00`
    } else if (min < 10) {
        return `0${min}:${sec}`
    } else if (sec == 60) {
        return `${min}:00`
    } else if (sec < 10) {
        return `${min}:0${sec}`
    } else {
        return `${min}:${sec}`
    }
}

function timerengine() {
    timercount--;
    timerDisplay.innerHTML = convertTime(timercount);
    if (timercount == 0 && timermode == 1) {
        audio.play();
        timer(5);
        if (breaknumsec == 60) {
            breaknumsec -= 60;
        }
        timermode = 2;
        timerName.innerHTML = "Break Time"
        timerDisplay.innerHTML = timercorrection(breaknum, breaknumsec);
        timer(2);
    } else if (timercount == 0 && timermode == 2) {
        timer(6);
        stopreset();
    }
}

function timer(numchoice) {
    switch (numchoice) {
        case 1: timerrunning = true; timercount = +sessionnum * 60 + +sessionnumsec; starttimer = setInterval(timerengine, 1000); break;
        case 2: timerrunning = true; timercount = +breaknum * 60 + +breaknumsec; starttwotimer = setInterval(timerengine, 1000); break;
        case 3: timerrunning = true; starttimer = setInterval(timerengine, 1000); break;
        case 4: timerrunning = true; starttwotimer = setInterval(timerengine, 1000); break;
        case 5: clearInterval(starttimer); timerrunning = false; break;
        case 6: clearInterval(starttwotimer); timerrunning = false; break;
        default: return undefined;
    }
};

// Timer Button

function startpause() {
    if (timerrunning == true && timermode == 2) {
        startpausebtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        stopresetbtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i>`;
        timer(6);
        return;
    } else if (timerrunning == false && timermode == 2) {
        startpausebtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        stopresetbtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
        timer(4);
        return;
    } else if (timerrunning == true && timermode == 1) {
        startpausebtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        stopresetbtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i>`;
        timer(5);
        return;
    } else if (timerrunning == false && timermode == 1) {
        if (lastrunning == true) {
            startpausebtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            stopresetbtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
            timer(3);
            return;
        } else {
            if (sessionnumsec == 60) {
                sessionnumsec -= 60;
            }
            timer(1);
            lastrunning = true;
            document.getElementById('sessionplus').disabled = true;
            document.getElementById('sessionminus').disabled = true;
            document.getElementById('breakplus').disabled = true;
            document.getElementById('breakminus').disabled = true;
            document.getElementById("breaknum").disabled = true;
            document.getElementById("sessionnum").disabled = true;
            startpausebtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
            stopresetbtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
            return;
        }
    } else {
        return undefined;
    }
}

function stopreset() {
    if (timerrunning == true && timermode == 2) {
        timer(6);
    } else {
        timer(5);
    }
    lastrunning = false;
    sessionnum = 25;
    breaknum = 5;
    sessionnumsec = 60;
    breaknumsec = 60;
    timermode = 1;
    audio.pause();
    document.getElementById('sessionplus').disabled = false;
    document.getElementById('sessionminus').disabled = false;
    document.getElementById('breakplus').disabled = false;
    document.getElementById('breakminus').disabled = false;
    document.getElementById("breaknum").disabled = false;
    document.getElementById("sessionnum").disabled = false;
    sessionLength.value = sessionnum;
    breakLength.value = breaknum;
    startpausebtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    stopresetbtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i>`;
    timerName.innerHTML = "Session Time"
    timerDisplay.innerHTML = convertTime(sessionnum * 60);
    return;
}

// Length Button and Text Box

// Length Text Box

sessionLength.onchange = function () {
    sessionnum = sessionLength.value;
    if (sessionLength.value < 1) {
        sessionnum = 1;
    }
    if (sessionLength.value > 60) {
        sessionnum = 60;
    }
    sessionLength.value = sessionnum;
    timerDisplay.innerHTML = timercorrection(sessionnum, sessionnumsec);
}

breakLength.onchange = function () {
    breaknum = breakLength.value;
    if (breakLength.value < 1) {
        breaknum = 1;
    }
    if (breakLength.value > 60) {
        breaknum = 60;   
    }
    breakLength.value = breaknum;
}

// Length Button

function sessionincrement() {
    if (sessionnum < 60) {
        sessionnum++;
        sessionLength.value = sessionnum;
        timerDisplay.innerHTML = timercorrection(sessionnum, sessionnumsec);
    }
};

function sessiondecrement() {
    if (sessionnum > 1) {
        sessionnum--;
        sessionLength.value = sessionnum;
        timerDisplay.innerHTML = timercorrection(sessionnum, sessionnumsec);
    }
};



function breakincrement() {
    if (breaknum < 60) {
        breaknum++;
        breakLength.value = breaknum;
    }
};

function breakdecrement() {
    if (breaknum > 1) {
        breaknum--;
        breakLength.value = breaknum;
    }
};
