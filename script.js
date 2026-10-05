/* =========================================================
   ROMANTIC HEART TREE
   FOR NANDU ❤️
========================================================= */


/* =========================================================
   CANVAS
========================================================= */

const canvas =
    document.getElementById("heartCanvas");

const ctx =
    canvas.getContext("2d");



let particles = [];

let burstParticles = [];

let startTime =
    performance.now();



/* =========================================================
   RESIZE CANVAS
========================================================= */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



/* =========================================================
   HEART EQUATION
========================================================= */

function heartPoint(t, scale) {

    const x =
        16 *
        Math.pow(
            Math.sin(t),
            3
        );


    const y =
        13 *
        Math.cos(t)

        -
        5 *
        Math.cos(2 * t)

        -
        2 *
        Math.cos(3 * t)

        -
        Math.cos(4 * t);


    return {

        x: x * scale,

        y: -y * scale

    };

}



/* =========================================================
   COLORS
========================================================= */

const colors = [

    "#ff2f78",

    "#ff4387",

    "#ff5c99",

    "#ff78ab",

    "#ff94bd",

    "#ffb5d0",

    "#ffd6e5",

    "#ffffff"

];



/* =========================================================
   PARTICLE CLASS
========================================================= */

class Particle {


    constructor() {


        /*
           Random heart location
        */

        this.t =
            Math.random() *
            Math.PI * 2;


        /*
           Distance from heart center

           Smaller = inside

           Bigger = outer edge
        */

        this.scale =
            8 +
            Math.random() * 9;


        /*
           Starting position
        */

        this.startX =
            (Math.random() - .5) *
            700;


        this.startY =
            (Math.random() - .5) *
            600;


        /*
           Size
        */

        this.size =
            Math.random() *
            2.6 + 1;


        /*
           Brightness
        */

        this.alpha =
            Math.random() *
            .6 + .4;


        /*
           Floating
        */

        this.floatSpeed =
            Math.random() *
            .001 +
            .0003;


        this.phase =
            Math.random() *
            Math.PI * 2;


        /*
           Color
        */

        this.color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        /*
           Slight variation
        */

        this.offsetX =
            (Math.random() - .5) *
            8;


        this.offsetY =
            (Math.random() - .5) *
            8;

    }



    update(time) {


        const rect =
            canvas.getBoundingClientRect();


        /*
           Heart center
        */

        const centerX =
            rect.width / 2;


        const centerY =
            rect.height * .38;


        /*
           Formation progress

           starts after 0.5 sec
        */

        let progress =
            (
                time -
                startTime -
                500
            ) / 2800;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        /*
           Smooth easing
        */

        const ease =
            1 -
            Math.pow(
                1 - progress,
                4
            );


        /*
           Target heart position
        */

        const target =
            heartPoint(
                this.t,
                this.scale
            );


        const targetX =
            centerX +
            target.x +
            this.offsetX;


        const targetY =
            centerY +
            target.y +
            this.offsetY;


        /*
           Move particles
        */

        this.x =
            this.startX +
            (
                targetX -
                this.startX
            ) *
            ease;


        this.y =
            this.startY +
            (
                targetY -
                this.startY
            ) *
            ease;


        /*
           After formation,
           subtle floating
        */

        if(progress >= 1) {

            this.x +=

                Math.sin(
                    time *
                    this.floatSpeed +
                    this.phase
                ) * 2.5;


            this.y +=

                Math.cos(
                    time *
                    this.floatSpeed *
                    1.4 +
                    this.phase
                ) * 2.5;

        }

    }



    draw() {


        ctx.save();


        ctx.globalAlpha =
            this.alpha;


        ctx.fillStyle =
            this.color;


        /*
           Glow
        */

        ctx.shadowBlur =
            10;


        ctx.shadowColor =
            this.color;


        ctx.beginPath();


        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI * 2

        );


        ctx.fill();


        ctx.restore();

    }

}



/* =========================================================
   CREATE DENSE PARTICLES
========================================================= */

for(
    let i = 0;
    i < 850;
    i++
) {

    particles.push(
        new Particle()
    );

}



/* =========================================================
   FLOATING MINI HEART
========================================================= */

class MiniHeart {


    constructor() {


        this.angle =
            Math.random() *
            Math.PI *
            2;


        this.distance =
            160 +
            Math.random() *
            140;


        this.size =
            Math.random() *
            4 + 2;


        this.speed =
            Math.random() *
            .0007 +
            .0003;


        this.alpha =
            Math.random() *
            .45 + .15;

    }



    draw(time) {


        const rect =
            canvas.getBoundingClientRect();


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height * .38;


        this.angle +=
            this.speed;


        const x =
            centerX +
            Math.cos(
                this.angle
            ) *
            this.distance;


        const y =
            centerY +
            Math.sin(
                this.angle
            ) *
            this.distance *
            .65;


        ctx.save();


        ctx.globalAlpha =
            this.alpha;


        ctx.fillStyle =
            "#ff5798";


        ctx.shadowBlur =
            15;


        ctx.shadowColor =
            "#ff3f82";


        drawHeart(
            x,
            y,
            this.size
        );


        ctx.restore();

    }

}



let miniHearts = [];


for(
    let i = 0;
    i < 45;
    i++
) {

    miniHearts.push(
        new MiniHeart()
    );

}



/* =========================================================
   DRAW SMALL HEART
========================================================= */

function drawHeart(
    x,
    y,
    size
) {


    ctx.beginPath();


    ctx.moveTo(
        x,
        y + size * .3
    );


    ctx.bezierCurveTo(

        x - size,

        y - size * .5,

        x - size * 1.4,

        y + size * .7,

        x,

        y + size * 1.4

    );


    ctx.bezierCurveTo(

        x + size * 1.4,

        y + size * .7,

        x + size,

        y - size * .5,

        x,

        y + size * .3

    );


    ctx.fill();

}



/* =========================================================
   BURST PARTICLE
========================================================= */

class Burst {


    constructor(
        x,
        y
    ) {


        this.x =
            x;


        this.y =
            y;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            4 + 1;


        this.vx =
            Math.cos(angle) *
            speed;


        this.vy =
            Math.sin(angle) *
            speed;


        this.life =
            1;


        this.size =
            Math.random() *
            5 + 2;

    }



    update() {


        this.x +=
            this.vx;


        this.y +=
            this.vy;


        this.vy +=
            .02;


        this.life -=
            .02;

    }



    draw() {


        ctx.save();


        ctx.globalAlpha =
            this.life;


        ctx.fillStyle =
            "#ff5b9a";


        ctx.shadowBlur =
            15;


        ctx.shadowColor =
            "#ff2f78";


        drawHeart(
            this.x,
            this.y,
            this.size
        );


        ctx.restore();

    }

}



/* =========================================================
   ANIMATION LOOP
========================================================= */

function animate(time) {


    const rect =
        canvas.getBoundingClientRect();


    ctx.clearRect(

        0,

        0,

        rect.width,

        rect.height

    );


    /*
       Main particles
    */

    particles.forEach(
        particle => {

            particle.update(
                time
            );

            particle.draw();

        }
    );



    /*
       Mini floating hearts
    */

    if(
        time -
        startTime >
        3000
    ) {

        miniHearts.forEach(
            heart => {

                heart.draw(
                    time
                );

            }
        );

    }



    /*
       Burst particles
    */

    burstParticles =
        burstParticles.filter(
            particle => {

                particle.update();

                particle.draw();

                return (
                    particle.life > 0
                );

            }
        );


    requestAnimationFrame(
        animate
    );

}


requestAnimationFrame(
    animate
);



/* =========================================================
   TYPEWRITER MESSAGE
========================================================= */

const message =

`Some people come into our lives
and quietly make everything
a little more beautiful.

You are one of those people.

With you, even ordinary moments
feel a little more special.
I don't need a perfect world...
I just need you in mine. ❤️
I love you nandu sotta buggala dana..`;



const typingElement =
    document.getElementById(
        "typingText"
    );


let textIndex = 0;



function typeText() {


    if(
        textIndex <
        message.length
    ) {


        const character =
            message[
                textIndex
            ];


        if(
            character === "\n"
        ) {

            typingElement.innerHTML +=
                "<br>";

        }
        else {

            typingElement.innerHTML +=
                character;

        }


        textIndex++;


        setTimeout(
            typeText,
            42
        );

    }

    else {

        /*
           Show final love message
        */

        setTimeout(
            showLove,
            700
        );

    }

}



/* =========================================================
   LOVE REVEAL
========================================================= */

function showLove() {


    const love =
        document.getElementById(
            "loveReveal"
        );


    const signature =
        document.querySelector(
            ".signature"
        );


    const finalHeart =
        document.getElementById(
            "finalHeart"
        );


    love.classList.add(
        "show"
    );


    signature.classList.add(
        "show"
    );


    finalHeart.classList.add(
        "show"
    );

}



/* =========================================================
   START TEXT
========================================================= */

setTimeout(
    typeText,
    4200
);



/* =========================================================
   CANVAS CLICK
========================================================= */

canvas.addEventListener(
    "click",
    function(event) {


        const rect =
            canvas.getBoundingClientRect();


        const x =
            event.clientX -
            rect.left;


        const y =
            event.clientY -
            rect.top;


        /*
           Create heart explosion
        */

        for(
            let i = 0;
            i < 45;
            i++
        ) {

            burstParticles.push(

                new Burst(
                    x,
                    y
                )

            );

        }

    }
);



/* =========================================================
   MUSIC
========================================================= */

const musicButton =
    document.getElementById(
        "musicBtn"
    );


/*
   Put music.mp3 in same folder.
*/

const music =
    new Audio(
        "music.mp3"
    );


music.loop =
    true;


music.volume =
    .45;


let musicPlaying =
    false;



musicButton.addEventListener(
    "click",
    function() {


        if(
            musicPlaying === false
        ) {


            music.play()
                .then(() => {

                    musicPlaying =
                        true;


                    musicButton.innerHTML =
                        "❚❚";

                })
                .catch(() => {

                    alert(
                        "Please keep music.mp3 inside the project folder."
                    );

                });

        }

        else {


            music.pause();


            musicPlaying =
                false;


            musicButton.innerHTML =
                "♫";

        }

    }
);



/* =========================================================
   FIRST CLICK HINT DISAPPEAR
========================================================= */

canvas.addEventListener(
    "click",
    function() {

        const hint =
            document.getElementById(
                "clickMessage"
            );


        hint.style.opacity =
            "0";

    }
);