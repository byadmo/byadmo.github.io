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



const bentoGrid =
document.querySelector(".bento-grid");



const cursorLight =
document.querySelector(".cursor-light");



const revealCards =
document.querySelectorAll(".reveal");



const hero =
document.querySelector(".hero");



const hardwareCard =
document.querySelector(".hardware");



const prostheticCard =
document.querySelector(".prosthetic");



const typingElement =
document.getElementById("typing");



const timeline =
document.getElementById("module-003");



const projectsButton =
document.getElementById("projects-button");



const projectCards =
document.querySelectorAll(".project-card");



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


"32-Bit Pipelined RISC-V Processor"



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
cursorLight &&
!isTouchDevice &&
!prefersReducedMotion
){


let cursorFrame = null;


let cursorX = window.innerWidth / 2;


let cursorY = window.innerHeight / 2;


document.addEventListener(
"mousemove",
(event)=>{


cursorX =
event.clientX;


cursorY =
event.clientY;


document.body.classList.add(
"cursor-active"
);


if(cursorFrame)
return;


cursorFrame =
requestAnimationFrame(()=>{


cursorLight.style.transform =
`translate3d(${cursorX - 260}px, ${cursorY - 260}px, 0)`;


cursorFrame =
null;


});


},
{
passive:true
}
);


document.addEventListener(
"mouseleave",
()=>{


document.body.classList.remove(
"cursor-active"
);


}
);


document.addEventListener(
"mouseenter",
()=>{


document.body.classList.add(
"cursor-active"
);


}
);


}


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
 "";


hero.style.setProperty(
"--tilt-y",
`${x*3}deg`
);


hero.style.setProperty(
"--tilt-x",
`${-y*3}deg`
);


hero.style.setProperty(
"--lift",
"-4px"
);



}

);





hero.addEventListener(
"mouseleave",
()=>{


hero.style.removeProperty(
"--tilt-y"
);


hero.style.removeProperty(
"--tilt-x"
);


hero.style.removeProperty(
"--lift"
);


}

);



}








/* =====================================================
   FLUID BENTO MOTION
===================================================== */


function getBentoRects(){


return Array.from(cards).map(card=>({

card,

rect:card.getBoundingClientRect()

}));


}



let cachedBentoMetrics = [];



let pressureFrame = null;



let pendingPressure = null;



function refreshBentoMetrics(){


cachedBentoMetrics =
Array.from(cards).map(card=>{


const rect =
card.getBoundingClientRect();


return {

card,

centerX:rect.left + rect.width / 2,

centerY:rect.top + rect.height / 2

};


});


}



function animateBentoLayout(mutator){


if(prefersReducedMotion){


mutator();


return;


}


const first =
getBentoRects();


mutator();


requestAnimationFrame(()=>{


first.forEach(({card,rect})=>{


const next =
card.getBoundingClientRect();


const dx =
rect.left - next.left;


const dy =
rect.top - next.top;


const scaleY =
next.height > 0 ?
rect.height / next.height :
1;


if(
Math.abs(dx) < 1 &&
Math.abs(dy) < 1 &&
Math.abs(scaleY - 1) < .02
)
return;


card.style.transition =
"none";


card.style.setProperty(
"--layout-x",
`${dx}px`
);


card.style.setProperty(
"--layout-y",
`${dy}px`
);


card.style.setProperty(
"--layout-scale-y",
scaleY
);


card.offsetHeight;


});


requestAnimationFrame(()=>{


cards.forEach(card=>{


card.style.removeProperty(
"transition"
);


card.style.removeProperty(
"--layout-x"
);


card.style.removeProperty(
"--layout-y"
);


card.style.removeProperty(
"--layout-scale-y"
);


});


refreshBentoMetrics();


});


});


}



const expandableCollapseTimers =
new WeakMap();



const expandableSizeCache =
new WeakMap();



function getExpandableProjectCards(){


return [
hardwareCard,
prostheticCard
].filter(Boolean);


}



function measureExpandedCardHeight(card,detailsSelector){


const cardRect =
card.getBoundingClientRect();


if(cardRect.width <= 0)
return 0;


const clone =
card.cloneNode(true);


clone.classList.add(
"is-expanded"
);


clone.classList.remove(
"is-collapsing"
);


clone.style.position =
"absolute";


clone.style.visibility =
"hidden";


clone.style.pointerEvents =
"none";


clone.style.left =
"-9999px";


clone.style.top =
"0";


clone.style.width =
`${cardRect.width}px`;


clone.style.height =
"auto";


clone.style.gridRow =
"auto";


clone.style.opacity =
"1";


clone.style.transform =
"none";


clone.style.transition =
"none";


const cloneDetails =
clone.querySelector(detailsSelector);


if(cloneDetails){


cloneDetails.style.maxHeight =
"none";


cloneDetails.style.opacity =
"1";


cloneDetails.style.transform =
"none";


}


document.body.appendChild(clone);


const expandedHeight =
clone.scrollHeight;


clone.remove();


return expandedHeight;


}



function updateExpandableCardSize(card,detailsSelector){


if(
!bentoGrid ||
!card
)
return;


const details =
card.querySelector(detailsSelector);


if(!details)
return;


const cardRect =
card.getBoundingClientRect();


const cache =
expandableSizeCache.get(card);


const cacheKey =
`${Math.round(cardRect.width)}:${details.scrollHeight}`;


if(
cache &&
cache.key === cacheKey
){


card.style.setProperty(
"--details-height",
`${cache.detailsHeight}px`
);


card.style.setProperty(
"--expanded-rows",
cache.expandedRows
);


return;


}


card.style.setProperty(
"--details-height",
`${details.scrollHeight + 2}px`
);


const gridStyle =
getComputedStyle(bentoGrid);


const rowHeight =
parseFloat(gridStyle.gridAutoRows);


const rowGap =
parseFloat(gridStyle.rowGap || gridStyle.gap) || 0;


if(
!Number.isFinite(rowHeight) ||
rowHeight <= 0
)
return;


const expandedHeight =
measureExpandedCardHeight(
card,
detailsSelector
);


if(expandedHeight <= 0)
return;


const expandedRows =
Math.ceil(
(expandedHeight + rowGap) / (rowHeight + rowGap)
) + 1;


card.style.setProperty(
"--expanded-rows",
expandedRows
);


expandableSizeCache.set(
card,
{
key:cacheKey,
detailsHeight:details.scrollHeight + 2,
expandedRows
}
);


}



function expandProjectCard(card,detailsSelector){


const expandableCards =
getExpandableProjectCards();


expandableCards.forEach(expandableCard=>{


const activeTimer =
expandableCollapseTimers.get(expandableCard);


if(activeTimer){


clearTimeout(activeTimer);


expandableCollapseTimers.delete(expandableCard);


}


});


updateExpandableCardSize(
card,
detailsSelector
);


const shouldAnimate =
!card.classList.contains("is-expanded") ||
card.classList.contains("is-collapsing") ||
expandableCards.some(expandableCard=>
expandableCard !== card &&
(
expandableCard.classList.contains("is-expanded") ||
expandableCard.classList.contains("is-collapsing")
)
);


if(!shouldAnimate)
return;


animateBentoLayout(()=>{


expandableCards.forEach(expandableCard=>{


if(expandableCard === card)
return;


expandableCard.classList.remove(
"is-expanded",
"is-collapsing"
);


});


card.classList.remove(
"is-collapsing"
);


card.classList.add(
"is-expanded"
);


});


}



function collapseProjectCard(card){


if(
!card.classList.contains("is-expanded") &&
!card.classList.contains("is-collapsing")
)
return;


const activeTimer =
expandableCollapseTimers.get(card);


if(activeTimer)
clearTimeout(activeTimer);


const collapseTimer =
setTimeout(()=>{


animateBentoLayout(()=>{


card.classList.remove(
"is-expanded",
"is-collapsing"
);


});


expandableCollapseTimers.delete(card);


},55);


expandableCollapseTimers.set(
card,
collapseTimer
);


}



function toggleProjectCard(card,detailsSelector){


if(
card.classList.contains("is-expanded") ||
card.classList.contains("is-collapsing")
){


collapseProjectCard(card);


return;


}


expandProjectCard(
card,
detailsSelector
);


}



function resetBentoPressure(){


if(pressureFrame){


cancelAnimationFrame(pressureFrame);


pressureFrame = null;


}


pendingPressure = null;


cards.forEach(card=>{


card.style.removeProperty(
"--push-x"
);


card.style.removeProperty(
"--push-y"
);


card.style.removeProperty(
"--card-scale"
);


card.style.removeProperty(
"--lift"
);


});


}



function applyBentoPressureFromMetrics(source,intensity = 1){


if(
prefersReducedMotion ||
window.innerWidth <= 900
)
return;


if(!cachedBentoMetrics.length)
refreshBentoMetrics();


const sourceMetric =
cachedBentoMetrics.find(metric=>metric.card === source);


if(!sourceMetric)
return;


const sourceX =
sourceMetric.centerX;


const sourceY =
sourceMetric.centerY;


cachedBentoMetrics.forEach(({card,centerX,centerY})=>{


if(card === source){


card.style.setProperty(
"--card-scale",
"1.012"
);


card.style.setProperty(
"--lift",
"-10px"
);


return;


}


const dx =
centerX - sourceX;


const dy =
centerY - sourceY;


const distance =
Math.max(1,Math.hypot(dx,dy));


const radius =
560;


if(distance > radius){


card.style.removeProperty(
"--push-x"
);


card.style.removeProperty(
"--push-y"
);


return;


}


const force =
Math.pow(1 - distance / radius,1.8) * 22 * intensity;


card.style.setProperty(
"--push-x",
`${(dx / distance) * force}px`
);


card.style.setProperty(
"--push-y",
`${(dy / distance) * force}px`
);


});


}



function scheduleBentoPressure(source,intensity = 1){


pendingPressure = {
source,
intensity
};


if(pressureFrame)
return;


pressureFrame =
requestAnimationFrame(()=>{


pressureFrame = null;


if(!pendingPressure)
return;


const {
source:pendingSource,
intensity:pendingIntensity
} = pendingPressure;


pendingPressure = null;


applyBentoPressureFromMetrics(
pendingSource,
pendingIntensity
);


});


}



if(
bentoGrid &&
!prefersReducedMotion
){


cards.forEach(card=>{


card.addEventListener(
"pointerenter",
()=>{


refreshBentoMetrics();


scheduleBentoPressure(card);


}
);


card.addEventListener(
"pointermove",
()=>scheduleBentoPressure(card,.85)
);


card.addEventListener(
"pointerleave",
resetBentoPressure
);


card.addEventListener(
"touchstart",
()=>{


refreshBentoMetrics();


scheduleBentoPressure(card,1.15);


},
{
passive:true
}
);


});


bentoGrid.addEventListener(
"mouseleave",
resetBentoPressure
);


}


if(hardwareCard){


const expandHardware =
()=>{


expandProjectCard(
hardwareCard,
".hardware-details"
);


};


const collapseHardware =
()=>{


collapseProjectCard(hardwareCard);


};


hardwareCard.addEventListener(
"pointerenter",
expandHardware
);


hardwareCard.addEventListener(
"pointerleave",
collapseHardware
);


hardwareCard.addEventListener(
"touchstart",
()=>{


toggleProjectCard(
hardwareCard,
".hardware-details"
);


},
{
passive:true
}
);


}



if(prostheticCard){


const expandProsthetic =
()=>{


expandProjectCard(
prostheticCard,
".prosthetic-details"
);


};


const collapseProsthetic =
()=>{


collapseProjectCard(prostheticCard);


};


prostheticCard.addEventListener(
"pointerenter",
expandProsthetic
);


prostheticCard.addEventListener(
"pointerleave",
collapseProsthetic
);


prostheticCard.addEventListener(
"focusin",
expandProsthetic
);


prostheticCard.addEventListener(
"focusout",
collapseProsthetic
);


prostheticCard.addEventListener(
"touchstart",
()=>{


toggleProjectCard(
prostheticCard,
".prosthetic-details"
);


},
{
passive:true
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



const nodeDuration =
3.8 + Math.random() * 3.4;


node.style.setProperty(
"--node-x",
`${8 + Math.random()*84}%`
);


node.style.setProperty(
"--node-y",
`${10 + Math.random()*78}%`
);


node.style.setProperty(
"--node-size",
`${7 + Math.random()*12}px`
);


node.style.setProperty(
"--node-duration",
`${nodeDuration}s`
);


node.style.setProperty(
"--node-drift-x",
`${-50 + Math.random()*100}px`
);


node.style.setProperty(
"--node-drift-y",
`${-34 + Math.random()*68}px`
);


node.style.setProperty(
"--trace-angle",
`${Math.random()*360}deg`
);


node.style.setProperty(
"--trace-length",
`${70 + Math.random()*170}px`
);


node.style.animationDelay =
`${Math.random()*.7}s`;





cpuConsole.appendChild(
node
);





setTimeout(
()=>{


node.remove();


},

(nodeDuration + 1) * 1000

);



}







function startCPUAnimation(){


if(
!cpuConsole ||
prefersReducedMotion
)
return;




setInterval(
()=>{


createCPUNode();


if(Math.random() > .56){


createCPUNode();


}


},

320

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

"Pipelined RISC-V CPU",


description:

"Building a pipelined RISC-V CPU and expanding into FPGA development."

},



{

title:

"RTL Verification",


description:

"Testing datapaths, control logic, hazards, and forwarding behavior through simulation and waveform analysis."

},



{

title:

"FPGA Implementation",


description:

"Preparing the processor design for synthesis, timing checks, and hardware deployment on FPGA."

},



{

title:

"Computer Architecture Focus",


description:

"Studying pipeline hazards, branch behavior, memory systems, and the design tradeoffs behind efficient processors."

}


],





"2025":[


{

title:

"Digital Logic Design",


description:

"Designed ALUs, control logic, and hardware modules."

},



{

title:

"Verilog + SystemVerilog",


description:

"Built a stronger foundation in hardware description languages, simulation workflows, and synthesizable design."

},



{

title:

"Hardware Modules",


description:

"Practiced breaking larger systems into smaller reusable blocks with clear inputs, outputs, and timing behavior."

},



{

title:

"Embedded Systems",


description:

"Explored microcontroller-based projects involving sensors, actuators, low-level programming, and physical hardware."

}


],





"2024":[


{

title:

"Digital Logic Foundations",


description:

"Started learning digital logic and Verilog."

},



{

title:

"Engineering Fundamentals",


description:

"Built fundamentals in circuits, programming, physics, mathematics, and problem-solving."

},



{

title:

"First Hardware Experiments",


description:

"Started exploring how software connects to physical systems through electronics and digital design."

},



{

title:

"First Principles Mindset",


description:

"Began focusing on understanding systems from the ground up instead of treating technology as a black box."

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



function updateTimelineSize(){


if(
!timeline ||
!bentoGrid
)
return;


const gridStyle =
getComputedStyle(bentoGrid);


const rowHeight =
parseFloat(gridStyle.gridAutoRows);


const rowGap =
parseFloat(gridStyle.rowGap || gridStyle.gap) || 0;


const neededHeight =
timeline.scrollHeight + 28;


timeline.style.setProperty(
"--timeline-expanded-height",
`${neededHeight}px`
);


if(
!Number.isFinite(rowHeight) ||
rowHeight <= 0
)
return;


const expandedRows =
Math.ceil(
(neededHeight + rowGap) / (rowHeight + rowGap)
) + 1;


timeline.style.setProperty(
"--timeline-expanded-rows",
expandedRows
);


}



function expandTimeline(){



if(!timeline)
return;


clearTimeout(
collapseTimer
);


updateTimelineSize();




animateBentoLayout(()=>{


timeline.classList.remove(
"collapsing"
);



timeline.classList.add(
"expanded"
);


});






if(timelineHint){


timelineHint.textContent =

"Select another year to see the progression.";


}



}







function collapseTimeline(){



if(!timeline)
return;





animateBentoLayout(()=>{


timeline.classList.add(
"collapsing"
);



timeline.classList.remove(
"expanded"
);


});





if(timelineHint){


timelineHint.textContent =

"Select a year to see the progression.";


}



}









function resetCollapseTimer(){



clearTimeout(
collapseTimer
);








}









if(timeline){


timeline.addEventListener(
"pointerenter",
()=>{


clearTimeout(
collapseTimer
);


}
);


timeline.addEventListener(
"pointerleave",
()=>{


clearTimeout(
collapseTimer
);


collapseTimeline();


}
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

`${Math.random()*360}deg`

);





signal.style.setProperty(

"--distance",

`${70 + Math.random()*95}vw`

);






signal.style.top =

`${Math.random()*100}%`;





signal.style.left =

`${Math.random()*100}%`;





signal.style.width =

`${90 + Math.random()*380}px`;


signal.style.setProperty(
"--pulse-height",
`${1 + Math.random()*3}px`
);


signal.style.setProperty(
"--pulse-opacity",
`${.48 + Math.random()*.42}`
);


signal.style.setProperty(
"--pulse-blur",
`${Math.random()*1.8}px`
);






signal.style.animationDuration =

`${6 + Math.random()*9}s`;






cpuField.appendChild(
signal
);






setTimeout(
()=>{


signal.remove();



},

17000

);



}









function startSignals(){



if(
prefersReducedMotion
)
return;






const spawnBurst =
()=>{


const burstCount =
Math.random() > .68
? 2 + Math.floor(Math.random()*3)
: 1;


for(
let i = 0;
i < burstCount;
i++
){


setTimeout(
createSignal,
i * (55 + Math.random()*120)
);


}


setTimeout(
spawnBurst,
180 + Math.random()*620
);


};


spawnBurst();



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


if(height <= 0){


progress.style.width =
"0%";


return;


}





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







updateScroll();


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


resetBentoPressure();



},

150

);



}

);



});


updateTimelineSize();



}









/* =====================================================
   PROJECT BUTTON
===================================================== */


if(projectsButton){



projectsButton.addEventListener(
"click",
()=>{


projectsButton.classList.add(
"project-button-active"
);


projectCards.forEach(card=>{


card.classList.remove(
"project-attention"
);


card.offsetHeight;


card.classList.add(
"project-attention"
);


});


setTimeout(
()=>{


projectsButton.classList.remove(
"project-button-active"
);


projectCards.forEach(card=>{


card.classList.remove(
"project-attention"
);


});


},

2400

);




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


[
"--push-x",
"--push-y",
"--layout-x",
"--layout-y",
"--layout-scale-y",
"--card-scale",
"--lift",
"--tilt-x",
"--tilt-y"
].forEach(property=>{


card.style.removeProperty(
property
);


});


});


getExpandableProjectCards().forEach(card=>{


expandableSizeCache.delete(card);


});


refreshBentoMetrics();



updateExpandableCardSize(
hardwareCard,
".hardware-details"
);


updateExpandableCardSize(
prostheticCard,
".prosthetic-details"
);


updateTimelineSize();



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

Select a year to see the progression.

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


renderProjects(
"2026"
);



}









/* =====================================================
   FINAL ENGINE STARTUP CHECK
===================================================== */


function portfolioReady(){



console.log(

"%cAdam Morgan portfolio ready.",

"color:#00ff88;font-size:16px;font-weight:bold"

);



console.log(

"%cFocus: processor architecture, RTL design, FPGA development, and digital systems.",

"color:#00eaff"

);



console.log(

"%cDesigned and built by Adam Morgan.",

"color:#9297a3"

);



}






portfolioReady();
