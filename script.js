/* =====================================================
   ADAM MORGAN PORTFOLIO
   INTERACTION ENGINE
===================================================== */



/* =====================================================
   CARD LOAD ANIMATION
===================================================== */


const revealCards =
document.querySelectorAll(".reveal");


window.addEventListener("load",()=>{


    revealCards.forEach((card,index)=>{


        setTimeout(()=>{


            card.classList.add("active");


        },index*120);


    });


});







/* =====================================================
   TYPEWRITER
===================================================== */


const typingElement =
document.getElementById("typing");



const typingWords=[

"32-bit pipelined RISC-V cores...",

"synthesizable hardware...",

"optimized RTL architectures..."

];



let wordIndex=0;

let letterIndex=0;

let deleting=false;



function typeWriter(){


if(!typingElement)
return;



let word=
typingWords[wordIndex];



if(!deleting){


typingElement.textContent =
word.substring(
0,
letterIndex++
);



if(letterIndex>word.length){


deleting=true;


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



if(letterIndex<0){


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

deleting ? 45 : 90

);


}



typeWriter();









/* =====================================================
   CARD LIGHT FOLLOW
===================================================== */


const cards =
document.querySelectorAll(".card");



cards.forEach(card=>{


card.addEventListener(
"mousemove",
event=>{


const rect =
card.getBoundingClientRect();



card.style.setProperty(
"--mouse-x",
`${event.clientX-rect.left}px`
);



card.style.setProperty(
"--mouse-y",
`${event.clientY-rect.top}px`
);



});



});









/* =====================================================
   ENGINEERING JOURNEY DATA
===================================================== */


const engineeringData={



2026:{


title:
"Processor Architecture & RTL Design",


description:
"Developing digital systems focused on CPU architecture, hardware description languages, and processor verification.",



projects:[


"32-Bit Pipelined RISC-V CPU Core",

"SystemVerilog RTL implementation",

"5-stage pipeline: IF → ID → EX → MEM → WB",

"Hazard detection and data forwarding logic",

"Waveform verification using GTKWave"


]

},





2025:{


title:
"Digital Systems Development",


description:
"Building engineering fundamentals through programming, hardware design, and digital logic.",



projects:[


"Digital logic design projects",

"FPGA development foundations",

"Embedded programming concepts",

"Circuit analysis and simulation"


]

},





2024:{


title:
"Engineering Foundation",


description:
"Developing the mathematical and technical foundation required for electrical engineering.",



projects:[


"Programming fundamentals",

"Mathematics and physics development",

"Introduction to electronics",

"Problem solving and engineering concepts"


]

}


};








/* =====================================================
   TIMELINE CONTROLS
===================================================== */


const timelineButtons =
document.querySelectorAll(
".year-buttons button"
);



const timelineCard =
document.getElementById(
"timeline-card"
);



const timelineContent =
document.getElementById(
"timeline-content"
);






function loadYear(year){


const data =
engineeringData[year];



timelineCard.classList.add(
"expanded"
);



timelineContent.innerHTML=`

<h3>
${data.title}
</h3>


<p>
${data.description}
</p>


<div id="project-list">

${data.projects.map(project=>`

<div class="project-item">

<h4>${year}</h4>

<p>${project}</p>

</div>

`).join("")}


</div>

`;



}








timelineButtons.forEach(button=>{


button.addEventListener(
"mouseenter",
()=>{


loadYear(
button.dataset.year
);


});





button.addEventListener(
"click",
()=>{


loadYear(
button.dataset.year
);


});



});









/* =====================================================
   VIEW PROJECT BUTTON
===================================================== */


const projectsButton =
document.getElementById(
"projects-button"
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



setTimeout(()=>{


timelineCard.classList.add(
"expanded"
);



timelineCard.classList.add(
"project-active"
);



setTimeout(()=>{


timelineCard.classList.remove(
"project-active"
);



},5000);



},700);



});


}









/* =====================================================
   TERMINAL DOT ANIMATION
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


});



dot.addEventListener(
"mouseleave",
()=>{


dot.style.transform =
"scale(1) rotate(0deg)";


});


});
