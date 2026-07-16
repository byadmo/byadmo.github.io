/* =====================================================
   ADAM MORGAN PORTFOLIO
   HARDWARE LAB INTERACTION ENGINE
===================================================== */



/* =====================================================
   SYSTEM SETTINGS
===================================================== */


const prefersReducedMotion =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;



const isTouchDevice =
"ontouchstart" in window ||
navigator.maxTouchPoints > 0;








/* =====================================================
   DOM REFERENCES
===================================================== */


const cards =
document.querySelectorAll(
".card"
);



const revealCards =
document.querySelectorAll(
".reveal"
);



const hero =
document.querySelector(
".hero"
);



const typingElement =
document.getElementById(
"typing"
);



const projectsButton =
document.getElementById(
"projects-button"
);



const timeline =
document.getElementById(
"module-002"
);



const yearButtons =
document.querySelectorAll(
".year-buttons button"
);



const projectGrid =
document.querySelector(
".project-grid"
);



const cpuField =
document.getElementById(
"cpu-field"
);








/* =====================================================
   CARD REVEAL ANIMATION
===================================================== */


if(
"IntersectionObserver" in window
){



const observer =
new IntersectionObserver(

entries=>{


entries.forEach(

(entry,index)=>{


if(entry.isIntersecting){



setTimeout(()=>{


entry.target.classList.add(
"active"
);



},index*120);



observer.unobserve(
entry.target
);



}



}


);



},


{
threshold:.15
}



);





revealCards.forEach(card=>{


observer.observe(
card
);



});



}

else{


window.addEventListener(
"load",
()=>{


revealCards.forEach(card=>{


card.classList.add(
"active"
);



});


}

);



}








/* =====================================================
   TYPEWRITER SYSTEM
===================================================== */


const typingWords = [


"32-bit pipelined RISC-V cores...",


"synthesizable RTL architectures...",


"FPGA hardware systems...",


"processor microarchitecture...",


"digital logic optimization..."


];





let wordIndex=0;

let charIndex=0;

let deleting=false;








function typeWriter(){



if(!typingElement)
return;




const word =
typingWords[wordIndex];





if(!deleting){



charIndex++;



typingElement.textContent =
word.substring(
0,
charIndex
);





if(charIndex >= word.length){



deleting=true;



setTimeout(
typeWriter,
1500
);



return;



}



}

else{



charIndex--;



typingElement.textContent =
word.substring(
0,
charIndex
);





if(charIndex<=0){



deleting=false;



wordIndex =
(wordIndex+1)
%
typingWords.length;



}



}





setTimeout(

typeWriter,

deleting
?
35
:
70

);



}








if(prefersReducedMotion){



if(typingElement){


typingElement.textContent =
typingWords[0];


}



}

else{


typeWriter();



}

/* =====================================================
   CARD CURSOR LIGHTING
===================================================== */


if(
!isTouchDevice &&
!prefersReducedMotion
){



cards.forEach(card=>{


card.addEventListener(

"mousemove",

event=>{


const rect =
card.getBoundingClientRect();



card.style.setProperty(

"--mouse-x",

`${event.clientX - rect.left}px`

);



card.style.setProperty(

"--mouse-y",

`${event.clientY - rect.top}px`

);



}


);



});



}









/* =====================================================
   HERO 3D MOVEMENT
===================================================== */


if(
hero &&
!prefersReducedMotion
){



hero.addEventListener(

"mousemove",

event=>{


const rect =
hero.getBoundingClientRect();



const x =
(event.clientX - rect.left)
/
rect.width
-
0.5;



const y =
(event.clientY - rect.top)
/
rect.height
-
0.5;





hero.style.transform = `

perspective(1200px)

rotateY(${x*3}deg)

rotateX(${-y*3}deg)

translateY(-3px)

`;



}



);





hero.addEventListener(

"mouseleave",

()=>{


hero.style.transform="";



}



);



}








/* =====================================================
   TERMINAL DOTS
===================================================== */


document
.querySelectorAll(
".terminal-dots span"
)
.forEach(dot=>{



dot.addEventListener(

"mouseenter",

()=>{


dot.style.transform =
"scale(1.35) rotate(15deg)";



}



);





dot.addEventListener(

"mouseleave",

()=>{


dot.style.transform =
"";



}



);



});









/* =====================================================
   CPU PIPELINE SIMULATION
===================================================== */


const cpuStages =
document.querySelectorAll(
".pipeline-node"
);



let cpuIndex=0;



let cpuTimer=null;







function animateCPU(){



if(!cpuStages.length)
return;




cpuStages.forEach(stage=>{



stage.classList.remove(
"cpu-active"
);



});





cpuStages[cpuIndex]
.classList.add(
"cpu-active"
);





cpuIndex =
(cpuIndex+1)
%
cpuStages.length;



}








function startCPU(){



if(
prefersReducedMotion ||
cpuTimer ||
!cpuStages.length
)
return;




cpuTimer =
setInterval(

animateCPU,

900

);



}








function stopCPU(){



if(cpuTimer){



clearInterval(
cpuTimer
);



cpuTimer=null;



}



}





startCPU();









/* =====================================================
   PROJECT DATABASE
===================================================== */


const projects = {


2026:[



{


title:

"32-Bit Pipelined RISC-V CPU Core",


text:

"Designed a custom SystemVerilog processor architecture using a 5-stage pipeline, hazard detection, forwarding logic, and RTL verification."

},



{


title:

"RTL Verification Environment",


text:

"Built simulation workflows using ModelSim, GTKWave, and Icarus Verilog for debugging and waveform analysis."

},



{


title:

"Computer Architecture Research",


text:

"Exploring datapaths, instruction pipelines, control logic, memory systems, and processor optimization."

}



],






2025:[



{


title:

"Digital Systems Development",


text:

"Developed foundations in digital logic, programming, electronics, and hardware design."

},



{


title:

"FPGA Exploration",


text:

"Started working with programmable logic, hardware acceleration concepts, and embedded systems."

},



{


title:

"Engineering Applications",


text:

"Applied mathematics, physics, and programming toward engineering problems."

}



],






2024:[



{


title:

"Programming Foundation",


text:

"Built programming fundamentals and technical problem-solving skills."

},



{


title:

"Engineering Curiosity",


text:

"Explored computer systems, electronics, and modern technology."

}



]



};

/* =====================================================
   PROJECT LOADER
===================================================== */


function loadProjects(year){



if(!projectGrid)
return;




projectGrid.style.opacity="0";





setTimeout(()=>{



projectGrid.innerHTML="";





projects[year].forEach(

(project,index)=>{



const item =
document.createElement(
"div"
);



item.className =
"project-item";



item.style.animationDelay =
`${index*.15}s`;





const title =
document.createElement(
"h4"
);



title.textContent =
project.title;





const text =
document.createElement(
"p"
);



text.textContent =
project.text;





item.append(
title,
text
);





projectGrid.appendChild(
item
);



}

);





projectGrid.style.opacity="1";



},250);



}








/* =====================================================
   ENGINEERING JOURNEY MODULE
===================================================== */


let selectedYear =
localStorage.getItem(
"selectedYear"
)
||
"2026";



let collapseTimer=null;



const COLLAPSE_TIME =
4000;








function cancelCollapse(){



if(collapseTimer){



clearTimeout(
collapseTimer
);



collapseTimer=null;



}



}








function scheduleCollapse(){



cancelCollapse();





collapseTimer =
setTimeout(()=>{



if(!timeline)
return;





timeline.classList.add(
"collapsing"
);





setTimeout(()=>{



timeline.classList.remove(
"expanded"
);



timeline.classList.remove(
"collapsing"
);



},900);



},COLLAPSE_TIME);



}









function activateYear(button){



if(!button)
return;




const year =
button.dataset.year;





selectedYear =
year;



localStorage.setItem(

"selectedYear",

year

);





yearButtons.forEach(btn=>{



btn.classList.remove(
"active"
);



btn.setAttribute(
"aria-selected",
"false"
);



});





button.classList.add(
"active"
);



button.setAttribute(
"aria-selected",
"true"
);






if(timeline){



cancelCollapse();





timeline.classList.add(
"expanded"
);



}






loadProjects(
year
);



}








function restoreYear(){



const saved =
document.querySelector(

`.year-buttons button[data-year="${selectedYear}"]`

);





if(saved){



activateYear(
saved
);



}



}









/* =====================================================
   YEAR BUTTON EVENTS
===================================================== */


yearButtons.forEach(button=>{



button.addEventListener(

"mouseenter",

()=>{


activateYear(
button
);



}



);






button.addEventListener(

"click",

()=>{


activateYear(
button
);



}



);






button.addEventListener(

"focus",

()=>{


activateYear(
button
);



}



);



});









/* =====================================================
   TIMELINE HOVER BEHAVIOR
===================================================== */


if(timeline){



timeline.addEventListener(

"mouseenter",

()=>{



cancelCollapse();





if(
!timeline.classList.contains(
"expanded"
)

){


restoreYear();



}



}



);





timeline.addEventListener(

"mouseleave",

()=>{



scheduleCollapse();



}



);






timeline.addEventListener(

"focusin",

()=>{


cancelCollapse();



}



);





timeline.addEventListener(

"focusout",

event=>{



if(
!timeline.contains(
event.relatedTarget
)

){



scheduleCollapse();



}



}



);



}








restoreYear();








/* =====================================================
   VIEW PROJECT BUTTON
===================================================== */


if(
projectsButton &&
timeline
){



projectsButton.addEventListener(

"click",

event=>{



event.preventDefault();





timeline.scrollIntoView({



behavior:

prefersReducedMotion

?
"auto"

:

"smooth",



block:

"center"



});





setTimeout(()=>{



activateYear(
yearButtons[0]
);



timeline.classList.add(
"project-highlight"
);



setTimeout(()=>{



timeline.classList.remove(
"project-highlight"
);



},5000);



},700);



}



);
}

/* =====================================================
   FPGA / CPU DEBUG SIGNAL FIELD
===================================================== */


const signalSettings = {


desktop:{
count:18,
delay:2500
},


mobile:{
count:8,
delay:4500
}


};



const screenSmall =
window.innerWidth < 700;



const activeSignalSettings =
screenSmall
?
signalSettings.mobile
:
signalSettings.desktop;



let signalInterval=null;





function createSignal(){



if(!cpuField)
return;





const signal =
document.createElement(
"div"
);





signal.className =
"cpu-pulse";





const size =
Math.random()*250+150;



const angle =
Math.random()*360;



const startX =
Math.random()*120-20;



const startY =
Math.random()*120-20;



const distance =
Math.random()*700+400;



const duration =
Math.random()*5+7;







signal.style.width =
`${size}px`;





signal.style.left =
`${startX}%`;





signal.style.top =
`${startY}%`;





signal.style.setProperty(

"--angle",

`${angle}deg`

);





signal.style.setProperty(

"--distance",

`${distance}px`

);





signal.style.animationDuration =
`${duration}s`;





cpuField.appendChild(
signal
);






setTimeout(()=>{



signal.remove();



},(duration+2)*1000);



}









function startSignals(){



if(
prefersReducedMotion ||
signalInterval
)

return;





for(
let i=0;
i<activeSignalSettings.count;
i++
){



setTimeout(

createSignal,

i*250

);



}






signalInterval =
setInterval(

createSignal,

activeSignalSettings.delay

);



}








function stopSignals(){



if(signalInterval){



clearInterval(
signalInterval
);



signalInterval=null;



}



}





startSignals();









/* =====================================================
   BACKGROUND DEBUG CONSOLE EFFECT
===================================================== */


const debugLines = [


"FETCH instruction 0x00400000",


"DECODE opcode RV32I",


"EXECUTE ALU operation",


"MEMORY access check",


"WRITEBACK register update",


"VERIFY waveform output",


"SYNTHESIS COMPLETE"



];







function createDebugPulse(){



const consoleBox =
document.querySelector(
".cpu-console"
);



if(!consoleBox)
return;





const line =
document.createElement(
"div"
);



line.className =
"debug-line";





line.textContent =
"> " +
debugLines[
Math.floor(
Math.random()*debugLines.length
)
];





consoleBox.appendChild(
line
);





setTimeout(()=>{


line.remove();



},5000);



}





if(!prefersReducedMotion){



setInterval(

createDebugPulse,

1800

);



}








/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */


const scrollBar =
document.createElement(
"div"
);



scrollBar.className =
"scroll-progress";



document.body.appendChild(
scrollBar
);





let scrolling=false;








function updateScroll(){



const height =
document.documentElement.scrollHeight
-
window.innerHeight;



const progress =
height>0
?

(window.scrollY/height)*100

:

0;





scrollBar.style.width =
`${progress}%`;





scrolling=false;



}








window.addEventListener(

"scroll",

()=>{



if(!scrolling){



requestAnimationFrame(
updateScroll
);



scrolling=true;



}



},



{
passive:true
}



);

/* =====================================================
   PIPELINE / CPU VISIBILITY CONTROL
===================================================== */


document.addEventListener(

"visibilitychange",

()=>{


if(document.hidden){



stopCPU();

stopSignals();



}

else{



startCPU();



if(!prefersReducedMotion){

startSignals();

}



}



}

);









/* =====================================================
   TOUCH FEEDBACK
===================================================== */


if(isTouchDevice){



cards.forEach(card=>{



card.addEventListener(

"touchstart",

()=>{


card.classList.add(
"touch-active"
);



},

{
passive:true
}

);






card.addEventListener(

"touchend",

()=>{


setTimeout(()=>{


card.classList.remove(
"touch-active"
);



},300);



},

{
passive:true
}

);



});



}









/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */


document.addEventListener(

"keydown",

event=>{



const active =
document.activeElement;



if(

active &&
(
active.tagName==="INPUT" ||
active.tagName==="TEXTAREA"
)

)

return;







if(event.key==="1" && yearButtons[0]){


activateYear(
yearButtons[0]
);



}






if(event.key==="2" && yearButtons[1]){


activateYear(
yearButtons[1]
);



}






if(event.key==="3" && yearButtons[2]){


activateYear(
yearButtons[2]
);



}



}

);









/* =====================================================
   FOOTER YEAR
===================================================== */


const yearElement =
document.getElementById(
"year"
);



if(yearElement){



yearElement.textContent =
new Date().getFullYear();



}









/* =====================================================
   PAGE READY
===================================================== */


window.addEventListener(

"load",

()=>{



document.body.classList.add(
"loaded"
);





console.log(

"ADAM MORGAN PORTFOLIO — CPU LAB ONLINE"

);



}

);
