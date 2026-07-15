/* =====================================================
   ADAM MORGAN PORTFOLIO
   INTERACTION ENGINE
===================================================== */


/* =====================================================
   CARD LOAD ANIMATION
===================================================== */


const revealCards = document.querySelectorAll(".reveal");


window.addEventListener("load", () => {


    revealCards.forEach((card, index) => {


        setTimeout(() => {


            card.classList.add("active");


        }, index * 120);


    });


});







/* =====================================================
   TYPEWRITER
===================================================== */


const typingElement =
document.getElementById("typing");



const typingWords = [

    "32-bit pipelined RISC-V cores...",

    "synthesizable hardware...",

    "optimized RTL architectures..."

];



let wordIndex = 0;

let letterIndex = 0;

let deleting = false;



function typeWriter(){


    if(!typingElement)
        return;



    const word =
    typingWords[wordIndex];



    if(!deleting){


        typingElement.textContent =
        word.substring(
            0,
            letterIndex++
        );



        if(letterIndex > word.length){


            deleting = true;



            setTimeout(
                typeWriter,
                1400
            );


            return;


        }


    }

    else{


        typingElement.textContent =
        word.substring(
            0,
            letterIndex--
        );



        if(letterIndex < 0){


            deleting = false;


            wordIndex =
            (wordIndex + 1)
            %
            typingWords.length;



            letterIndex = 0;


        }


    }




    setTimeout(

        typeWriter,

        deleting ? 45 : 90

    );


}



typeWriter();









/* =====================================================
   CARD MOUSE LIGHT EFFECT
===================================================== */


const cards =
document.querySelectorAll(".card");



cards.forEach(card=>{


    card.addEventListener(
        "mousemove",
        event=>{


            const rect =
            card.getBoundingClientRect();



            const x =
            event.clientX - rect.left;



            const y =
            event.clientY - rect.top;



            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );



            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );


        }

    );


});








/* =====================================================
   ENGINEERING TIMELINE
===================================================== */


const timelineInfo = {


    "2026":

    `
    Processor architecture,
    SystemVerilog RTL development,
    CPU pipeline design,
    and advanced digital systems.
    `,


    "2025":

    `
    Engineering fundamentals,
    programming,
    mathematics,
    physics,
    and electronics development.
    `,


    "2024":

    `
    Building foundations in
    programming,
    problem solving,
    and engineering concepts.
    `


};





const timelineButtons =
document.querySelectorAll(
    ".year-buttons button"
);



const timelineText =
document.getElementById(
    "timeline-content"
);





timelineButtons.forEach(button=>{


    button.addEventListener(
        "mouseenter",
        ()=>{


            const year =
            button.dataset.year;



            timelineText.textContent =
            timelineInfo[year];


        }

    );



    button.addEventListener(
        "click",
        ()=>{


            const year =
            button.dataset.year;



            timelineText.textContent =
            timelineInfo[year];


        }

    );


});








/* =====================================================
   VIEW PROJECTS BUTTON
===================================================== */


const projectsButton =
document.getElementById(
    "projects-button"
);



const timelineCard =
document.getElementById(
    "timeline-card"
);





if(projectsButton && timelineCard){


    projectsButton.addEventListener(
        "click",
        event=>{


            event.preventDefault();



            timelineCard.scrollIntoView({

                behavior:"smooth",

                block:"center"

            });





            timelineCard.classList.add(
                "project-active"
            );






            setTimeout(()=>{


                timelineCard.classList.remove(
                    "project-active"
                );


            },7000);



        }

    );


}








/* =====================================================
   TERMINAL DOT EFFECT
===================================================== */


const terminalDots =
document.querySelectorAll(
    ".terminal-dots span"
);



terminalDots.forEach(dot=>{


    dot.addEventListener(
        "mouseenter",
        ()=>{


            dot.style.transform =
            "scale(1.3) rotate(15deg)";


        }

    );



    dot.addEventListener(
        "mouseleave",
        ()=>{


            dot.style.transform =
            "scale(1) rotate(0deg)";


        }

    );


});
