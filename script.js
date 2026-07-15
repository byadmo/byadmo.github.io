/* =====================================================
   ADAM MORGAN PORTFOLIO
   INTERACTION ENGINE
===================================================== */



/* =====================================================
   CARD REVEAL
===================================================== */


const revealCards =
document.querySelectorAll(".reveal");



window.addEventListener("load",()=>{


    revealCards.forEach((card,index)=>{


        setTimeout(()=>{


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

"synthesizable RTL architectures...",

"FPGA hardware systems..."

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


            deleting=false;



            wordIndex =
            (wordIndex + 1)
            %
            typingWords.length;



            letterIndex=0;


        }


    }



    setTimeout(

        typeWriter,

        deleting ? 45 : 90

    );


}



typeWriter();









/* =====================================================
   CURSOR LIGHT OVERLAY
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
   ENGINEERING JOURNEY
===================================================== */


const timeline =
document.getElementById(
"timeline-card"
);



const timelineContent =
document.getElementById(
"timeline-content"
);



const yearButtons =
document.querySelectorAll(
".year-buttons button"
);





const timelineData = {



"2026":`

<h3>
2026 — Processor Architecture
</h3>


<p>

<b>
32-Bit Pipelined RISC-V CPU Core
</b>


<br><br>


Designed a custom processor architecture using SystemVerilog RTL.


<br><br>


Projects:

<br>

• 5-stage instruction pipeline

<br>

• Hazard detection unit

<br>

• Data forwarding logic

<br>

• RTL simulation and verification


<br><br>


Focus:

Computer Architecture + Digital Systems


</p>

`,






"2025":`

<h3>
2025 — Engineering Development
</h3>


<p>


Projects:

<br>


• Digital systems projects

<br>

• Programming applications

<br>

• Mathematics and physics modelling

<br>

• Electronics fundamentals


<br><br>


Focus:

Building engineering foundations.


</p>

`,






"2024":`

<h3>
2024 — Technical Foundation
</h3>


<p>


Projects:

<br>


• Programming fundamentals

<br>

• Problem solving

<br>

• Engineering concepts

<br>

• Technical exploration


<br><br>


Focus:

Developing engineering thinking.


</p>

`


};









yearButtons.forEach(button=>{


    button.addEventListener(
        "mouseenter",
        ()=>{


            const year =
            button.dataset.year;



            timeline.classList.add(
                "expanded"
            );



            timelineContent.innerHTML =
            timelineData[year];



        }

    );





    button.addEventListener(
        "mouseleave",
        ()=>{


            setTimeout(()=>{


                if(!timeline.matches(":hover")){


                    timeline.classList.remove(
                        "expanded"
                    );


                }


            },250);



        }

    );


});





timeline.addEventListener(
"mouseleave",
()=>{


timeline.classList.remove(
"expanded"
);


});









/* =====================================================
   VIEW PROJECTS BUTTON
===================================================== */


const projectsButton =
document.getElementById(
"projects-button"
);



if(projectsButton && timeline){


projectsButton.addEventListener(
"click",
(event)=>{


event.preventDefault();



timeline.scrollIntoView({

behavior:"smooth",

block:"center"

});





setTimeout(()=>{


timeline.classList.add(
"project-active"
);



setTimeout(()=>{


timeline.classList.remove(
"project-active"
);



},5000);



},800);



});


}









/* =====================================================
   TERMINAL DOT EFFECT
===================================================== */


const dots =
document.querySelectorAll(
".terminal-dots span"
);



dots.forEach(dot=>{


dot.addEventListener(
"mouseenter",
()=>{


dot.style.transform =
"scale(1.25) rotate(10deg)";


});




dot.addEventListener(
"mouseleave",
()=>{


dot.style.transform =
"scale(1) rotate(0deg)";


});


});
