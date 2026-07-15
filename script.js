/* =====================================================
   ADAM MORGAN PORTFOLIO
   INTERACTION ENGINE
===================================================== */


/* =====================================================
   CARD REVEAL
===================================================== */


const revealCards = document.querySelectorAll(".reveal");


window.addEventListener("load",()=>{


    revealCards.forEach((card,index)=>{


        setTimeout(()=>{


            card.classList.add("active");


        },index * 120);


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


            deleting=true;


            setTimeout(
                typeWriter,
                1300
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
            (wordIndex+1)
            %
            typingWords.length;


            letterIndex=0;


        }


    }



    setTimeout(

        typeWriter,

        deleting ? 40 : 90

    );


}



typeWriter();










/* =====================================================
   CARD MOUSE LIGHT
===================================================== */


const cards =
document.querySelectorAll(".card");



cards.forEach(card=>{


card.addEventListener(
"mousemove",
(e)=>{


const rect =
card.getBoundingClientRect();



const x =
e.clientX - rect.left;



const y =
e.clientY - rect.top;



card.style.setProperty(
"--mouse-x",
`${x}px`
);



card.style.setProperty(
"--mouse-y",
`${y}px`
);



});



});









/* =====================================================
   ENGINEERING JOURNEY
===================================================== */


const timelineInfo = {


"2026":`

<h3>
Processor Design
</h3>

<p>

Designed a 32-bit pipelined RISC-V processor using SystemVerilog.

<br><br>

Focus:
• Pipeline architecture
• Hazard detection
• Forwarding logic
• RTL verification

</p>

`,


"2025":`

<h3>
Engineering Foundations
</h3>

<p>

Developed foundations in:

<br><br>

• Programming
• Mathematics
• Physics
• Digital logic
• Electronics

</p>

`,


"2024":`

<h3>
Technical Foundation
</h3>

<p>

Explored programming,
problem solving,
and engineering concepts.

</p>

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


if(timelineText){

timelineText.innerHTML =
timelineInfo[year];

}


});





button.addEventListener(
"click",
()=>{


const year =
button.dataset.year;



if(timelineText){

timelineText.innerHTML =
timelineInfo[year];

}


});



});









/* =====================================================
   VIEW PROJECT BUTTON
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
(e)=>{


e.preventDefault();



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



},4500);



});


}









/* =====================================================
   NAV ACTIVE EFFECT
===================================================== */


const navLinks =
document.querySelectorAll(
".nav-links a"
);



navLinks.forEach(link=>{


link.addEventListener(
"mouseenter",
()=>{


link.style.transform =
"translateY(-2px)";


});



link.addEventListener(
"mouseleave",
()=>{


link.style.transform =
"translateY(0)";


});


});









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
"scale(1.25)";


});



dot.addEventListener(
"mouseleave",
()=>{


dot.style.transform =
"scale(1)";


});


});









/* =====================================================
   LIVE HARDWARE STATUS
===================================================== */


const hardwareCard =
document.querySelector(
".live-hardware"
);



if(hardwareCard){


hardwareCard.addEventListener(
"mouseenter",
()=>{


hardwareCard.style.boxShadow =

"0 0 45px rgba(0,240,255,.15)";


});



hardwareCard.addEventListener(
"mouseleave",
()=>{


hardwareCard.style.boxShadow =
"";


});


}
