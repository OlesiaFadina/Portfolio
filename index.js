gsap.to('.text',{
    delay:3,
    text:'My name is Olesia. I am a web developer.',
    duration: 4.5,
    ease: 'power1.in',
    repeat:1,
    repeatDelay: 2,
    yoyo:true 
})
particlesJS("particles-js", {
    "particles": {
        "number": {
        "value": 70,
        "density": {
        "enable": true,
        "value_area": 900
        }
    },
    "color": {
        "value": "#ffffff"
    },
    "shape": {
        "type": "circle",
        "stroke": {
        "width": 0,
        "color": "#000000"
        },
        "polygon": {
        "nb_sides": 5
        },
        "image": {
        "src": "img/github.svg",
        "width": 200,
        "height": 200
        }
    },
    "opacity": {
        "value": 0.6,
        "random": false,
        "anim": {
        "enable": false,
        "speed": 2,
        "opacity_min": 0.1,
        "sync": false
        }
    },
    "size": {
        "value": 3,
        "random": true,
        "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
        }
    },
    "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
    },
    "move": {
        "enable": true,
        "speed": 2.5,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
        }
    }
},
    "interactivity": {
        "detect_on": "canvas" ,
        "events": {
        "onhover": {
            "enable": true,
            "mode": "grab"
        },
        "onclick": {
            "enable": true,
            "mode": "push"
        },
        "resize": true
    },
    "modes": {
        "grab": {
            "distance": 50,
            "line_linked": {
            "opacity": 1
            }
        },
        "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 9,
            "speed": 3
        },
        "repulse": {
            "distance": 140,
            "duration": 0.6
        },
        "push": {
            "particles_nb": 4
        },
        "remove": {
            "particles_nb": 3
        }
    }
},
    "retina_detect": true
});
let radius = 240; 
let autoRotate = true;
let rotateSpeed = -60; 
let imgWidth = 140; 
let imgHeight = 205;
setTimeout(init, 300);
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("a");
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
let ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";
function init(delayTime) {
    for (let i = 0; i < aImg.length; i++) {
        aImg[i].style.transform =
        "rotateY(" +
        i * (360 / aImg.length) +
        "deg) translateZ(" +
        radius +
        "px)";
        aImg[i].style.transition = "transform 1s";
        aImg[i].style.transitionDelay =
        delayTime || (aImg.length - i) / 4 + "s";
    }
}
function applyTranform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}
function playSpin(yes) {
    ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
sY,
nX,
nY,
desX = 0,
desY = 0,
tX = 0,
tY = 10;
if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
    )}s infinite linear`;
}
carousel.onpointerdown = function(e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    let sX = e.clientX,
    sY = e.clientY;
    this.onpointermove = function(e) {
        e = e || window.event;
        let nX = e.clientX,
        nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };
    this.onpointerup = function(e) {
        odrag.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
};


