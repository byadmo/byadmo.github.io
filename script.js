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
document.querySelectorAll(".card");


const revealCards =
document.querySelectorAll(".reveal");


const hero =
document.querySelector(".hero");


const typingElement =
document.getElementById("typing");


const timeline =
document.getElementById("timeline-card");


const projectsButton =
document.getElementById("projects-button");


const yearButtons =
document.querySelectorAll(
".year-buttons button"
);


const projectGrid =
document.querySelector(".project-grid");


const cpuField =
document.getElementById("cpu-field");






/* =====================================================
   CARD REVEAL SYSTEM
===================================================== */


if(
"IntersectionObserver" in window
){


const revealObserver =
new IntersectionObserver(

(entries)=>{


entries.forEach(
(entry,index)=>{


if(entry.isIntersecting){


setTimeout(()=>{


entry.target.classList.add(
"active"
);


},index*100);



revealObserver.unobserve(
entry.target
);


}



});


},


{
threshold:.15
}


);



revealCards.forEach(card=>{


revealObserver.observe(
card
);


});



}

else{


window.addEventListener(
"load",
()=>{


revealCards.forEach(
(card,index)=>{


setTimeout(()=>{


card.classList.add(
"active"
);


},index*120);


});


});


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



let wordIndex = 0;

let charIndex = 0;

let deleting = false;





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



if(
charIndex >= word.length
){


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



if(
charIndex <=0
){


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
40
:
75

);


}




if(prefersReducedMotion){


if(typingElement){

typingElement.textContent =
typingWords[0]
.replace("...","");

}


}

else{


typeWriter();


}

/* =====================================================
   CARD CURSOR LIGHT TRACKING
===================================================== */


if(
!isTouchDevice &&
!prefersReducedMotion
){


cards.forEach(card=>{


card.addEventListener(
"mousemove",
(event)=>{


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

(event)=>{


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



hero.style.transform =

`
perspective(1200px)
rotateY(${x*3}deg)
rotateX(${-y*3}deg)
translateY(-5px)
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
   TERMINAL DOT INTERACTION
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
   PROJECT DATABASE
===================================================== */


const projects = {


2026:[


{


title:
"32-Bit Pipelined RISC-V CPU Core",


text:
"Designed a custom SystemVerilog processor architecture featuring instruction fetch, decode, execute, memory, write-back stages, hazard detection, and forwarding logic."

},


{


title:
"RTL Verification Environment",


text:
"Created simulation workflows using ModelSim, GTKWave, and Icarus Verilog for waveform analysis and hardware debugging."

},


{


title:
"Computer Architecture Research",


text:
"Exploring processor pipelines, datapaths, control units, memory hierarchy, and performance optimization."

}


],



2025:[


{


title:
"Digital Systems Development",


text:
"Built foundations in digital logic, programming, electronics, and hardware design concepts."

},


{


title:
"FPGA Hardware Exploration",


text:
"Started developing FPGA knowledge through programmable logic, hardware description languages, and embedded systems."

},


{


title:
"Engineering Applications",


text:
"Applied mathematics, physics, and programming toward technical engineering problems."

}


],



2024:[


{


title:
"Programming Foundation",


text:
"Developed programming fundamentals and structured problem-solving skills."

},


{


title:
"Engineering Curiosity",


text:
"Explored computer systems, electronics, and the technologies behind modern devices."

}


]


};








/* =====================================================
   LOAD PROJECTS
===================================================== */


function loadProjects(year){


if(!projectGrid)
return;



projectGrid.style.opacity="0";



setTimeout(()=>{


projectGrid.innerHTML="";



projects[year].forEach(

(project,index)=>{


const card =
document.createElement(
"div"
);



card.className =
"project-item";



card.style.animationDelay =
`${index*.12}s`;



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



card.append(
title,
text
);



projectGrid.appendChild(
card
);



}

);



projectGrid.style.opacity="1";


},150);



}

/* =====================================================
   ENGINEERING JOURNEY SYSTEM
===================================================== */


const TIMELINE_COLLAPSE_DELAY = 3500;


let timelineTimer = null;



let selectedYear =
localStorage.getItem(
"selectedYear"
)
||
"2026";







function cancelTimelineCollapse(){


if(timelineTimer){


clearTimeout(
timelineTimer
);


timelineTimer=null;


}


}








function collapseTimeline(){


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



if(projectGrid){


projectGrid.innerHTML =
`
<p>
Hover over a year to explore projects.
</p>
`;


}



},700);



}








function scheduleTimelineCollapse(){


cancelTimelineCollapse();



timelineTimer =
setTimeout(()=>{


collapseTimeline();



},TIMELINE_COLLAPSE_DELAY);



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


cancelTimelineCollapse();



timeline.classList.add(
"expanded"
);



}



loadProjects(
year
);



}









function restoreSelectedYear(){


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
   TIMELINE HOVER CONTROL
===================================================== */


if(timeline){



timeline.addEventListener(

"mouseenter",

()=>{


cancelTimelineCollapse();



if(
!timeline.classList.contains(
"expanded"
)

){


restoreSelectedYear();



}


}

);





timeline.addEventListener(

"mouseleave",

()=>{


scheduleTimelineCollapse();



}

);





timeline.addEventListener(

"focusin",

()=>{


cancelTimelineCollapse();



}

);





timeline.addEventListener(

"focusout",

(event)=>{


if(
!timeline.contains(
event.relatedTarget
)

){


scheduleTimelineCollapse();



}


}

);



}








restoreSelectedYear();









/* =====================================================
   VIEW PROJECTS BUTTON
===================================================== */


function playTimelineGlow(){


if(!timeline)
return;



timeline.classList.remove(
"project-active"
);



void timeline.offsetWidth;



timeline.classList.add(
"project-active"
);



setTimeout(()=>{


timeline.classList.remove(
"project-active"
);



},5000);



}








if(
projectsButton &&
timeline
){



projectsButton.addEventListener(

"click",

(event)=>{


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



playTimelineGlow();



},700);



}

);



}









/* =====================================================
   PROCESSOR PIPELINE ANIMATION
===================================================== */


const pipelineStages =
document.querySelectorAll(
".pipeline div"
);



let pipelineIndex=0;



let pipelineInterval=null;







function stepPipeline(){


if(!pipelineStages.length)
return;



pipelineStages.forEach(stage=>{


stage.style.boxShadow="";

stage.style.color="";


});





const active =
pipelineStages[pipelineIndex];



active.style.boxShadow =
"0 0 25px rgba(0,234,255,.5)";



active.style.color =
"#00ff88";





pipelineIndex =
(
pipelineIndex+1
)
%
pipelineStages.length;



}







function startPipeline(){


if(
!pipelineStages.length ||
pipelineInterval ||
prefersReducedMotion
)
return;



pipelineInterval =
setInterval(
stepPipeline,
1200
);



}





function stopPipeline(){


if(pipelineInterval){


clearInterval(
pipelineInterval
);



pipelineInterval=null;


}


}



startPipeline();

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





let scrollTicking=false;





function updateScrollProgress(){


const height =
document.documentElement.scrollHeight
-
window.innerHeight;



const progress =
height > 0
?
(window.scrollY / height) * 100
:
0;



scrollBar.style.width =
`${progress}%`;



scrollTicking=false;



}






window.addEventListener(

"scroll",

()=>{


if(!scrollTicking){


requestAnimationFrame(
updateScrollProgress
);



scrollTicking=true;



}


},


{
passive:true
}


);









/* =====================================================
   FPGA SIGNAL VISUALIZATION ENGINE
===================================================== */


const smallScreen =
window.innerWidth < 700;





const signalSettings = {


initial:

smallScreen
?
8
:
20,



spawnDelay:

smallScreen
?
5000
:
3000,



burstMin:

smallScreen
?
1
:
2,



burstMax:

smallScreen
?
3
:
6



};






let signalInterval=null;

let burstTimeout=null;








const directions = [


0,

45,

90,

135,

180,

225,

270,

315


];









function createSignal(initial=false){


if(!cpuField)
return;



const pulse =
document.createElement(
"div"
);



pulse.className =
"cpu-pulse";





const length =
Math.random()*250+150;



const angle =
directions[
Math.floor(
Math.random()*directions.length
)
];



const distance =
Math.random()*700+500;



const duration =
Math.random()*6+8;





const startX =
Math.random()*120-20;



const startY =
Math.random()*120-20;





pulse.style.width =
`${length}px`;



pulse.style.left =
`${startX}%`;



pulse.style.top =
`${startY}%`;



pulse.style.opacity =
Math.random()*.4+.2;



pulse.style.setProperty(

"--angle",

`${angle}deg`

);



pulse.style.setProperty(

"--distance",

`${distance}px`

);



pulse.style.animationDuration =
`${duration}s`;





if(initial){


pulse.style.animationDelay =
`${Math.random()*3}s`;



}



cpuField.appendChild(
pulse
);





setTimeout(()=>{


pulse.remove();



},
(duration+3)*1000
);



}








function randomBurst(){


const amount =
Math.floor(

Math.random()
*
(
signalSettings.burstMax
-
signalSettings.burstMin
+
1

)

)
+
signalSettings.burstMin;





for(
let i=0;
i<amount;
i++
){


setTimeout(()=>{


createSignal();



},i*250);



}






burstTimeout =
setTimeout(

randomBurst,

Math.random()*10000+10000

);



}








function startSignalSystem(){


if(
!cpuField ||
prefersReducedMotion
)
return;



for(
let i=0;
i<signalSettings.initial;
i++
){


createSignal(true);



}





signalInterval =
setInterval(

createSignal,

signalSettings.spawnDelay

);



randomBurst();



}








function stopSignalSystem(){


clearInterval(
signalInterval
);



clearTimeout(
burstTimeout
);



signalInterval=null;



}




if(!prefersReducedMotion){


startSignalSystem();



}









/* =====================================================
   PAUSE WHEN TAB HIDDEN
===================================================== */


document.addEventListener(

"visibilitychange",

()=>{


if(document.hidden){


stopPipeline();


stopSignalSystem();



}

else{


startPipeline();


if(!prefersReducedMotion){


startSignalSystem();



}



}



}

);

/* =====================================================
   PAGE INITIALIZATION
===================================================== */


window.addEventListener(

"load",

()=>{


document.body.classList.add(
"loaded"
);



console.log(

"ADAM MORGAN PORTFOLIO — SYSTEM ONLINE"

);



}

);








/* =====================================================
   TOUCH DEVICE FEEDBACK
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

(event)=>{



const active =
document.activeElement?.tagName;



if(
active === "INPUT" ||
active === "TEXTAREA"
){

return;

}





if(
event.key === "1" &&
yearButtons[0]
){


activateYear(
yearButtons[0]
);



}





if(
event.key === "2" &&
yearButtons[1]
){


activateYear(
yearButtons[1]
);



}





if(
event.key === "3" &&
yearButtons[2]
){


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
   INITIAL HARDWARE STATE
===================================================== */


if(yearButtons.length){


restoreSelectedYear();



}








/* =====================================================
   CLEANUP ON PAGE EXIT
===================================================== */


window.addEventListener(

"beforeunload",

()=>{


stopPipeline();


stopSignalSystem();



}

);
