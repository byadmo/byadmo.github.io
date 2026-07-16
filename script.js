/* =====================================================
   ADAM MORGAN PORTFOLIO
   HARDWARE INTERACTION ENGINE
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
document.getElementById("module-002");


const projectsButton =
document.getElementById("projects-button");


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

}
);



},

{

threshold:.15

}

);



revealCards.forEach(
(card)=>{


revealObserver.observe(
card
);


}

);



}
else {



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
}
);



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


"high-performance digital logic..."


];



let wordIndex = 0;

let charIndex = 0;

let deleting = false;





function typeWriter(){


if(!typingElement)
return;



const current =
typingWords[wordIndex];



if(!deleting){


charIndex++;



typingElement.textContent =
current.substring(
0,
charIndex
);



if(
charIndex >= current.length
){



deleting = true;



setTimeout(
typeWriter,
1500
);



return;


}


}
else {



charIndex--;



typingElement.textContent =
current.substring(
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

deleting ? 35 : 70

);


}





if(prefersReducedMotion){



if(typingElement){



typingElement.textContent =
typingWords[0];


}


}
else {


typeWriter();

}




/* =====================================================
   CARD CURSOR GLOW
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
translateY(-4px)
`;


}

);



hero.addEventListener(
"mouseleave",
()=>{


hero.style.transform = "";


}

);


}




/* =====================================================
   TERMINAL BUTTON EFFECT
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

"scale(1) rotate(0deg)";


}

);


});




/* =====================================================
   CPU DEBUG VISUALIZATION
===================================================== */


const cpuConsole =
document.querySelector(
".cpu-console"
);



function createCPUNode(){


if(!cpuConsole)
return;



const node =
document.createElement(
"span"
);


node.className =
"cpu-node";



node.style.left =
`${Math.random()*90}%`;



node.style.top =
`${Math.random()*80}%`;



node.style.animationDelay =
`${Math.random()*2}s`;



cpuConsole.appendChild(
node
);



setTimeout(
()=>{


node.remove();


},

4000

);


}





function startCPUAnimation(){


if(
!cpuConsole ||
prefersReducedMotion
)
return



setInterval(

createCPUNode,

700

);


}



startCPUAnimation();




/* =====================================================
   PIPELINE PROCESSOR ANIMATION
===================================================== */


const pipelineStages =
document.querySelectorAll(
".pipeline-node"
);


let pipelineIndex = 0;

let pipelineInterval = null;





function stepPipeline(){



if(!pipelineStages.length)
return;



pipelineStages.forEach(stage=>{


stage.style.boxShadow =
"";


stage.style.color =
"";


});



const active =
pipelineStages[pipelineIndex];



active.style.boxShadow =

"0 0 25px rgba(0,234,255,.5)";



active.style.color =
"#00ff88";



pipelineIndex =

(pipelineIndex+1)
%
pipelineStages.length;


}





function startPipeline(){



if(
!pipelineStages.length ||
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
   ENGINEERING JOURNEY DATA
===================================================== */


const journeyProjects = {


"2026":[


{

title:

"32-Bit Pipelined RISC-V CPU Core",


description:

"Designing a custom RV32I processor architecture using SystemVerilog with pipeline stages, hazard detection, forwarding logic, and RTL verification."

},


{

title:

"FPGA Hardware Development",


description:

"Building synthesizable digital systems and testing hardware implementations on FPGA platforms."

},


{

title:

"Processor Verification Environment",


description:

"Creating simulation workflows using ModelSim, GTKWave, and automated RTL testing."

}


],



"2025":[


{

title:

"Digital Systems Development",


description:

"Developed foundations in digital logic design, Boolean systems, hardware description languages, and computer architecture."

},


{

title:

"Embedded Hardware Projects",


description:

"Created hardware-focused projects involving microcontrollers, sensors, and low-level programming."

}


],



"2024":[


{

title:

"Engineering Foundations",


description:

"Started developing programming, mathematics, physics, and engineering fundamentals."

},


{

title:

"First Hardware Experiments",


description:

"Explored electronics, circuits, and early digital design concepts."

}


]



};




/* =====================================================
   TIMELINE ELEMENTS
===================================================== */


const timelineHint =
document.querySelector(
".timeline-hint"
);


let collapseTimer = null;





function renderProjects(year){



if(!projectGrid)
return;



projectGrid.innerHTML = "";



const projects =
journeyProjects[year];



projects.forEach(
(project,index)=>{


const card =
document.createElement(
"div"
);


card.className =
"project-item";


card.style.animationDelay =

`${index*120}ms`;


card.innerHTML =

`

<h4>
${project.title}
</h4>

<p>
${project.description}
</p>

`;


projectGrid.appendChild(
card
);


});


}





/* =====================================================
   TIMELINE EXPAND SYSTEM
===================================================== */



function expandTimeline(){



if(!timeline)
return;



timeline.classList.remove(
"collapsing"
);


timeline.classList.add(
"expanded"
);



if(timelineHint){


timelineHint.textContent =

"Select another year to explore projects.";


}


}





function collapseTimeline(){



if(!timeline)
return;


timeline.classList.add(
"collapsing"
);


timeline.classList.remove(
"expanded"
);



if(timelineHint){


timelineHint.textContent =

"Hover a year to explore projects.";


}


}





function resetCollapseTimer(){



clearTimeout(
collapseTimer
);



collapseTimer =
setTimeout(

()=>{


collapseTimeline();


},

4000

);


}





/* =====================================================
   YEAR BUTTON EVENTS
===================================================== */


yearButtons.forEach(
(button)=>{



const year =
button.dataset.year;



button.addEventListener(
"mouseenter",
()=>{


renderProjects(
year
);


yearButtons.forEach(
(btn)=>{

btn.classList.remove(
"active"
);

});


button.classList.add(
"active"
);


expandTimeline();


resetCollapseTimer();


}

);


button.addEventListener(
"click",
()=>{


renderProjects(
year
);


yearButtons.forEach(
(btn)=>{


btn.classList.remove(
"active"
);


});


button.classList.add(
"active"
);


expandTimeline();


resetCollapseTimer();


}

);


});




/* =====================================================
   FPGA SIGNAL GENERATOR
   RANDOM HARDWARE TRACE MOVEMENT
===================================================== */


function createSignal(){


if(
!cpuField ||
prefersReducedMotion
)
return;



const signal =
document.createElement(
"div"
);


signal.className =
"cpu-pulse";



const directions = [


{
angle:0,
distance:"120vw"
},


{
angle:180,
distance:"-120vw"
},


{
angle:90,
distance:"120vh"
},


{
angle:-90,
distance:"-120vh"
},


{
angle:45,
distance:"120vw"
},


{
angle:-45,
distance:"120vw"
},


{
angle:135,
distance:"-120vw"
},


{
angle:-135,
distance:"-120vw"
}



];




const direction =

directions[
Math.floor(
Math.random()
*
directions.length
)
];



signal.style.setProperty(

"--angle",

`${direction.angle}deg`

);


signal.style.setProperty(

"--distance",

direction.distance

);



signal.style.top =

`${Math.random()*100}%`;



signal.style.left =

`${Math.random()*100}%`;



signal.style.width =

`${40 + Math.random()*240}px`;



signal.style.animationDuration =

`${2.5 + Math.random()*3.5}s`;



cpuField.appendChild(
signal
);



setTimeout(
()=>{


signal.remove();


},

7000

);


}





function startSignals(){



if(
prefersReducedMotion
)
return;



// Variable spawn interval for organic feel (120-280ms)
function scheduleNext(){


const delay = 120 + Math.random() * 160;


setTimeout(()=>{


createSignal();


scheduleNext();


}, delay);


}



scheduleNext();


}


startSignals();




/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */


const progress =
document.querySelector(
".scroll-progress"
);





function updateScroll(){



if(!progress)
return;



const height =

document.documentElement.scrollHeight
-
window.innerHeight;



const percent =

(
window.scrollY /
height
)
*
100;


progress.style.width =

`${percent}%`;


}



window.addEventListener(

"scroll",

updateScroll,

{
passive:true
}

);




/* =====================================================
   TOUCH INTERACTION SUPPORT
===================================================== */


if(isTouchDevice){



cards.forEach(
(card)=>{


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


setTimeout(
()=>{


card.classList.remove(
"touch-active"
);


},

150

);


}

);


});


}




/* =====================================================
   PROJECT BUTTON
===================================================== */


if(projectsButton){



projectsButton.addEventListener(
"click",
()=>{


if(timeline){



timeline.classList.add(
"project-active"
);


setTimeout(
()=>{


timeline.classList.remove(
"project-active"
);


},

2000

);


}


}

);


}




/* =====================================================
   PAGE LOAD STATE
===================================================== */


window.addEventListener(
"load",
()=>{


document.body.classList.add(
"loaded"
);


cards.forEach(
(card,index)=>{


setTimeout(
()=>{


card.classList.add(
"active"
);


},

index*120

);


});


});




/* =====================================================
   CLEANUP WHEN TAB HIDDEN
===================================================== */


document.addEventListener(
"visibilitychange",
()=>{


if(document.hidden){


stopPipeline();


}
else {


startPipeline();


}


});


}




/* =====================================================
   ACCESSIBILITY ENHANCEMENTS
===================================================== */


document
.querySelectorAll("a, button")
.forEach(element=>{


element.addEventListener(
"keydown",
(event)=>{


if(
event.key === "Enter" ||
event.key === " "
){


element.click();


}


}

);


});




/* =====================================================
   RESIZE HANDLING
===================================================== */


let resizeTimer;


window.addEventListener(
"resize",
()=>{


clearTimeout(
resizeTimer
);


resizeTimer =
setTimeout(
()=>{


cards.forEach(card=>{


card.style.removeProperty(
"transform"
);


});


},

250

);


});




/* =====================================================
   REMOVE HOVER BEHAVIOR ON MOBILE
===================================================== */


if(isTouchDevice){



document
.documentElement
.classList.add(
"touch-device"
);


}




/* =====================================================
   INITIAL PROJECT STATE
===================================================== */


if(projectGrid){



projectGrid.innerHTML =

`

<p class="timeline-hint">

Hover a year to explore projects.

</p>

`;


}




/* =====================================================
   DEFAULT YEAR
===================================================== */


const defaultYearButton =

document.querySelector(
".year-buttons button[data-year='2026']"
);



if(defaultYearButton){



defaultYearButton.classList.add(
"active"
);


}




/* =====================================================
   FINAL ENGINE STARTUP CHECK
===================================================== */


function portfolioReady(){



console.log(

"%cADAM MORGAN PORTFOLIO ONLINE",

"color:#00ff88;font-size:16px;font-weight:bold"

);



console.log(

"%cSYSTEM: FPGA VISUALIZATION ACTIVE",

"color:#00eaff"

);



console.log(

"%cARCHITECTURE: DIGITAL SYSTEMS // COMPUTER ARCHITECTURE",

"color:#9297a3"

);


}



portfolioReady();
