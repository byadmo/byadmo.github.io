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
   SILICON DIE BACKGROUND ENGINE
===================================================== */

function createSiliconDieField(){
if(
!cpuField ||
typeof HTMLCanvasElement === "undefined" ||
!(cpuField instanceof HTMLCanvasElement)
)
return null;

const canvas = cpuField;
const ctx = canvas.getContext("2d",{ alpha:true });

if(!ctx)
return null;

const state = {
width:0,
height:0,
dpr:1,
traces:[],
nodes:[],
clusters:[],
pulses:[],
buses:[],
floaters:[],
projectRoute:null,
cursor:{ x:-1000,y:-1000,active:false },
activityBoost:1,
nextPulse:0,
nextRipple:0,
nextBus:0,
ripple:null,
lastTime:0,
frame:null
};

const animateSiliconBackground =
true;

const clamp = (value,min,max)=>Math.max(min,Math.min(max,value));
const rand = (min,max)=>min + Math.random() * (max - min);
const choose = (items)=>items[Math.floor(Math.random() * items.length)];
const snap = (value,grid)=>Math.round(value / grid) * grid + .5;
const channel = (value,grid)=>snap(value,grid) + choose([-6,-3,0,4,7]);
const segmentLength = (a,b)=>Math.hypot(b.x - a.x,b.y - a.y);

function buildTrace(points,options = {}){
const segments = [];
let length = 0;

for(let i = 1; i < points.length; i++){
const start = points[i - 1];
const end = points[i];
const segment = {
start,
end,
length:segmentLength(start,end),
offset:length
};

if(segment.length > 4){
segments.push(segment);
length += segment.length;
}
}

return {
points,
segments,
length,
alpha:options.alpha || rand(.018,.04),
bus:Boolean(options.bus),
temporary:Boolean(options.temporary),
activeUntil:0,
seed:Math.random() * 1000
};
}

function pointOnTrace(trace,distance){
let remaining = clamp(distance,0,trace.length);

for(const segment of trace.segments){
if(remaining <= segment.length){
const ratio = segment.length === 0 ? 0 : remaining / segment.length;

return {
x:segment.start.x + (segment.end.x - segment.start.x) * ratio,
y:segment.start.y + (segment.end.y - segment.start.y) * ratio,
angle:Math.atan2(segment.end.y - segment.start.y,segment.end.x - segment.start.x)
};
}

remaining -= segment.length;
}

const last = trace.points[trace.points.length - 1];

return {
x:last.x,
y:last.y,
angle:0
};
}

function distanceToTrace(trace,x,y){
let best = Infinity;

for(const segment of trace.segments){
const dx = segment.end.x - segment.start.x;
const dy = segment.end.y - segment.start.y;
const lengthSq = dx * dx + dy * dy;
const t = lengthSq === 0
? 0
: clamp(((x - segment.start.x) * dx + (y - segment.start.y) * dy) / lengthSq,0,1);
const px = segment.start.x + dx * t;
const py = segment.start.y + dy * t;
best = Math.min(best,Math.hypot(x - px,y - py));
}

return best;
}

function generateRoute(){
const grid = choose(
state.width < 700
? [27,31,37]
: [29,34,41,47]
);
let x = channel(rand(-80,state.width + 80),grid);
let y = channel(rand(-80,state.height + 80),grid);
let horizontal = Math.random() > .42;
const points = [{ x,y }];
const turns = 2 + Math.floor(Math.random() * 4);

for(let i = 0; i < turns; i++){
const step = channel(rand(90,460),grid) * (Math.random() > .5 ? 1 : -1);

if(horizontal){
x = clamp(x + step,-120,state.width + 120);
}
else {
y = clamp(y + step,-120,state.height + 120);
}

points.push({ x,y });

if(Math.random() > .24)
horizontal = !horizontal;
}

return buildTrace(points);
}

function rebuildField(){
state.width = window.innerWidth;
state.height = window.innerHeight;
state.dpr = Math.min(window.devicePixelRatio || 1,2);
canvas.width = Math.floor(state.width * state.dpr);
canvas.height = Math.floor(state.height * state.dpr);
canvas.style.width = `${state.width}px`;
canvas.style.height = `${state.height}px`;
ctx.setTransform(state.dpr,0,0,state.dpr,0,0);

const mobile = state.width < 700;
const traceCount = mobile ? 38 : 156;
const busCount = mobile ? 3 : 10;

state.traces = Array.from({ length:traceCount },generateRoute);
state.buses = Array.from({ length:busCount },()=>{
const y = snap(rand(70,state.height - 70),mobile ? 40 : 48);
const startX = snap(rand(-120,80),48);
const endX = snap(rand(state.width * .68,state.width + 160),48);

return buildTrace(
[
{ x:startX,y },
{ x:snap(rand(state.width * .28,state.width * .55),48),y },
{ x:endX,y }
],
{
bus:true,
alpha:.035
}
);
});

state.traces.push(...state.buses);

const nodeMap = new Map();

state.traces.forEach(trace=>{
trace.points.forEach(point=>{
if(
Math.random() < .58 &&
point.x > -20 &&
point.x < state.width + 20 &&
point.y > -20 &&
point.y < state.height + 20
){
const key = `${Math.round(point.x / 6)}:${Math.round(point.y / 6)}`;

if(!nodeMap.has(key)){
nodeMap.set(key,{
x:point.x,
y:point.y,
size:rand(1.4,2.3),
switch:0
});
}
}
});
});

state.nodes = Array.from(nodeMap.values()).slice(0,mobile ? 34 : 72);
state.clusters = Array.from({ length:mobile ? 4 : 12 },()=>({
x:rand(40,Math.max(80,state.width - 180)),
y:rand(40,Math.max(80,state.height - 150)),
cols:5 + Math.floor(Math.random() * 5),
rows:2 + Math.floor(Math.random() * 3),
cell:mobile ? 8 : 9,
seed:Math.floor(Math.random() * 120)
}));

state.floaters = Array.from({ length:mobile ? 12 : 34 },()=>createFloatingElement(mobile));

drawField(performance.now());
}

function createFloatingElement(mobile){
const size = mobile ? rand(42,118) : rand(70,210);
const horizontal = Math.random() > .35;
const direction = Math.random() > .5 ? 1 : -1;

return {
x:rand(-state.width * .2,state.width * 1.2),
y:rand(-state.height * .2,state.height * 1.2),
w:horizontal ? size : size * rand(.28,.46),
h:horizontal ? size * rand(.24,.42) : size,
vx:(horizontal ? rand(46,128) : rand(22,64)) * direction,
vy:(horizontal ? rand(-26,26) : rand(36,92)) * (Math.random() > .5 ? 1 : -1),
kind:choose(["bus","logic","route"]),
phase:rand(0,Math.PI * 2),
alpha:mobile ? rand(.09,.18) : rand(.13,.3)
};
}

function drawTrace(trace,alpha){
if(trace.segments.length === 0)
return;

ctx.beginPath();
ctx.moveTo(trace.points[0].x,trace.points[0].y);

for(let i = 1; i < trace.points.length; i++){
ctx.lineTo(trace.points[i].x,trace.points[i].y);
}

ctx.lineWidth = trace.bus ? 1.25 : 1;
ctx.strokeStyle = `rgba(215,245,255,${alpha})`;
ctx.stroke();
}

function drawClusters(time){
state.clusters.forEach(cluster=>{
let active = -1;
const width = cluster.cols * cluster.cell;
const height = cluster.rows * cluster.cell;

for(const pulse of state.pulses){
const point = pointOnTrace(pulse.trace,pulse.distance);

if(
point.x > cluster.x - 24 &&
point.x < cluster.x + width + 24 &&
point.y > cluster.y - 24 &&
point.y < cluster.y + height + 24
){
active = Math.floor((time / 90 + cluster.seed) % (cluster.cols * cluster.rows));
break;
}
}

for(let row = 0; row < cluster.rows; row++){
for(let col = 0; col < cluster.cols; col++){
const index = row * cluster.cols + col;
const x = cluster.x + col * cluster.cell;
const y = cluster.y + row * cluster.cell;
ctx.fillStyle = index === active ? "rgba(0,234,255,.22)" : "rgba(255,255,255,.018)";
ctx.strokeStyle = index === active ? "rgba(0,234,255,.52)" : "rgba(255,255,255,.03)";
ctx.lineWidth = 1;
ctx.fillRect(x,y,cluster.cell - 3,cluster.cell - 3);
ctx.strokeRect(x + .5,y + .5,cluster.cell - 4,cluster.cell - 4);
}
}
});
}

function drawNodes(){
state.nodes.forEach(node=>{
let active = 0;

for(const pulse of state.pulses){
const point = pointOnTrace(pulse.trace,pulse.distance);
const distance = Math.hypot(point.x - node.x,point.y - node.y);

if(distance < 18){
active = Math.max(active,1 - distance / 18);
}
}

node.switch = Math.max(node.switch * .88,active);

ctx.beginPath();
ctx.arc(node.x,node.y,node.size + node.switch * 1.15,0,Math.PI * 2);
ctx.fillStyle = `rgba(0,234,255,${.08 + node.switch * .82})`;
ctx.shadowBlur = node.switch > .08 ? 12 : 0;
ctx.shadowColor = "rgba(0,234,255,.75)";
ctx.fill();
ctx.shadowBlur = 0;
});
}

function drawPulse(pulse){
const point = pointOnTrace(pulse.trace,pulse.distance);
const tail = pointOnTrace(pulse.trace,Math.max(0,pulse.distance - 34));
ctx.beginPath();
ctx.moveTo(tail.x,tail.y);
ctx.lineTo(point.x,point.y);
ctx.lineWidth = pulse.size;
ctx.lineCap = "round";
ctx.strokeStyle = pulse.accent ? "rgba(0,255,136,.62)" : "rgba(0,234,255,.72)";
ctx.shadowBlur = 18;
ctx.shadowColor = pulse.accent ? "rgba(0,255,136,.72)" : "rgba(0,234,255,.86)";
ctx.stroke();
ctx.shadowBlur = 0;
}

function updateFloaters(delta){
state.floaters.forEach(floater=>{
floater.x += floater.vx * delta * state.activityBoost;
floater.y += floater.vy * delta * state.activityBoost;

const margin = 260;

if(floater.x > state.width + margin)
floater.x = -margin - floater.w;

if(floater.x + floater.w < -margin)
floater.x = state.width + margin;

if(floater.y > state.height + margin)
floater.y = -margin - floater.h;

if(floater.y + floater.h < -margin)
floater.y = state.height + margin;
});
}

function drawFloatingElement(floater,time){
const pulse = .5 + Math.sin(time * .0015 + floater.phase) * .5;
const alpha = floater.alpha + pulse * .025;
const x = floater.x;
const y = floater.y;
const w = floater.w;
const h = floater.h;

ctx.save();
ctx.translate(x,y);
ctx.globalAlpha = 1;
ctx.strokeStyle = `rgba(0,234,255,${alpha})`;
ctx.fillStyle = `rgba(0,234,255,${alpha * .16})`;
ctx.lineWidth = 1;

if(floater.kind === "logic"){
const cell = Math.max(7,Math.min(13,w / 8));
const cols = Math.max(3,Math.floor(w / cell));
const rows = Math.max(2,Math.floor(h / cell));

for(let row = 0; row < rows; row++){
for(let col = 0; col < cols; col++){
const lit = (row * cols + col + Math.floor(time / 180 + floater.phase * 3)) % 17 === 0;
ctx.fillStyle = lit ? "rgba(0,255,136,.18)" : `rgba(255,255,255,${alpha * .08})`;
ctx.strokeStyle = lit ? "rgba(0,255,136,.36)" : `rgba(215,245,255,${alpha * .75})`;
ctx.fillRect(col * cell,row * cell,cell - 3,cell - 3);
ctx.strokeRect(col * cell + .5,row * cell + .5,cell - 4,cell - 4);
}
}
}
else if(floater.kind === "bus"){
const lanes = Math.max(3,Math.floor(h / 9));

for(let lane = 0; lane < lanes; lane++){
const yy = 5 + lane * 9;
ctx.beginPath();
ctx.moveTo(0,yy);
ctx.lineTo(w,yy);
ctx.strokeStyle = `rgba(215,245,255,${alpha * .72})`;
ctx.stroke();

const dotX = (time * (.025 + lane * .002) + lane * 31 + floater.phase * 12) % (w + 40) - 20;
ctx.beginPath();
ctx.arc(dotX,yy,2.2,0,Math.PI * 2);
ctx.fillStyle = "rgba(0,234,255,.62)";
ctx.shadowBlur = 10;
ctx.shadowColor = "rgba(0,234,255,.72)";
ctx.fill();
ctx.shadowBlur = 0;
}
}
else {
const midX = w * .5;
const midY = h * .5;
ctx.beginPath();
ctx.moveTo(0,midY);
ctx.lineTo(midX,midY);
ctx.lineTo(midX,h);
ctx.moveTo(midX,midY);
ctx.lineTo(w,midY);
ctx.moveTo(w * .72,midY);
ctx.lineTo(w * .72,0);
ctx.strokeStyle = `rgba(215,245,255,${alpha})`;
ctx.stroke();

[
[midX,midY],
[w * .72,midY],
[w * .72,0],
[midX,h]
].forEach(([nodeX,nodeY])=>{
ctx.beginPath();
ctx.arc(nodeX,nodeY,2.1 + pulse * .9,0,Math.PI * 2);
ctx.fillStyle = "rgba(0,234,255,.45)";
ctx.fill();
});
}

ctx.restore();
}

function drawFloaters(time){
state.floaters.forEach(floater=>{
drawFloatingElement(floater,time);
});
}

function drawField(time){
ctx.clearRect(0,0,state.width,state.height);
drawClusters(time);
drawFloaters(time);

state.traces.forEach(trace=>{
let alpha = trace.alpha;

if(
state.cursor.active &&
distanceToTrace(trace,state.cursor.x,state.cursor.y) < 120
){
alpha += .004;
}

if(state.ripple){
const progress = (time - state.ripple.started) / state.ripple.duration;
const waveX = progress * (state.width + 260) - 130;
const midpoint = trace.points[Math.floor(trace.points.length / 2)];
const distance = Math.abs(midpoint.x - waveX);

if(distance < 80){
alpha += .026 * (1 - distance / 80);
}
}

if(trace.activeUntil && trace.activeUntil > time){
alpha += .13;
}

drawTrace(trace,alpha);
});

if(state.projectRoute){
const age = time - state.projectRoute.started;

if(age < 2600){
drawTrace(state.projectRoute.trace,.16 * (1 - age / 2600));
}
else {
state.projectRoute = null;
}
}

state.pulses.forEach(drawPulse);
drawNodes();
}

function findNearbyTrace(point){
let best = null;
let bestDistance = Infinity;

state.traces.forEach(trace=>{
const distance = distanceToTrace(trace,point.x,point.y);

if(distance < bestDistance){
bestDistance = distance;
best = trace;
}
});

return bestDistance < 34 ? best : null;
}

function addPulse(trace,options = {}){
if(!trace || trace.length < 40)
return;

state.pulses.push({
trace,
distance:options.start || 0,
speed:options.speed || rand(500,900),
size:options.size || rand(7,11),
accent:Boolean(options.accent),
pauseUntil:0,
branchAt:rand(trace.length * .3,trace.length * .82),
branched:false,
arrived:options.arrived || null
});
}

function spawnPulse(time){
const maxPulses = state.width < 700 ? 16 : 34;

if(state.pulses.length < maxPulses){
addPulse(choose(state.traces),{
accent:Math.random() > .92
});
}

state.nextPulse = time + rand(280,1000) / state.activityBoost;
}

function triggerRipple(time){
state.ripple = {
started:time,
duration:1400
};
state.nextRipple = time + rand(10000,20000);
}

function triggerBus(time){
const bus = choose(state.buses);

if(bus){
bus.activeUntil = time + 320;
addPulse(bus,{
speed:920,
size:8,
accent:true
});
}

state.nextBus = time + rand(2200,5600);
}

function updatePulses(time,delta){
state.pulses = state.pulses.filter(pulse=>{
if(pulse.pauseUntil && time < pulse.pauseUntil)
return true;

if(Math.random() < .002){
pulse.pauseUntil = time + rand(120,420);
return true;
}

const variation = .82 + Math.sin(time * .002 + pulse.trace.seed) * .24;
pulse.distance += pulse.speed * variation * state.activityBoost * delta;

if(!pulse.branched && pulse.distance > pulse.branchAt){
pulse.branched = true;

if(Math.random() < .1){
const branch = findNearbyTrace(pointOnTrace(pulse.trace,pulse.distance));

if(branch && branch !== pulse.trace){
addPulse(branch,{
speed:pulse.speed * rand(.76,1.12),
size:Math.max(5,pulse.size - 1),
accent:pulse.accent
});
}
}
}

if(pulse.distance >= pulse.trace.length){
if(pulse.arrived)
pulse.arrived();

return false;
}

return true;
});
}

function animate(time){
const delta = state.lastTime ? Math.min((time - state.lastTime) / 1000,.04) : 0;
state.lastTime = time;

if(time > state.nextPulse)
spawnPulse(time);

if(time > state.nextRipple)
triggerRipple(time);

if(state.ripple && time - state.ripple.started > state.ripple.duration)
state.ripple = null;

if(time > state.nextBus)
triggerBus(time);

updatePulses(time,delta);
updateFloaters(delta);
drawField(time);

if(animateSiliconBackground){
state.frame = requestAnimationFrame(animate);
}
}

function triggerProjectPulse(){
if(
!projectsButton ||
!timeline
)
return;

const buttonRect = projectsButton.getBoundingClientRect();
const targetRect = timeline.getBoundingClientRect();
const start = {
x:buttonRect.left + buttonRect.width / 2,
y:buttonRect.top + buttonRect.height / 2
};
const end = {
x:targetRect.left + Math.min(targetRect.width * .5,260),
y:targetRect.top + Math.min(targetRect.height * .45,190)
};
const midY = snap(start.y + (end.y - start.y) * .46,34);
const route = buildTrace(
[
start,
{ x:start.x,y:midY },
{ x:snap(end.x,34),y:midY },
end
],
{
temporary:true,
alpha:.08
}
);

state.projectRoute = {
trace:route,
started:performance.now()
};

addPulse(route,{
speed:880,
size:9,
accent:true,
arrived:()=>{
if(timeline){
timeline.classList.add("project-active");

setTimeout(()=>{
timeline.classList.remove("project-active");
},1200);
}
}
});
}

function handleResize(){
rebuildField();

if(animateSiliconBackground){
const now = performance.now();
state.nextPulse = now + 200;
state.nextRipple = now + rand(3000,6000);
state.nextBus = now + rand(2500,6000);
}
}

window.addEventListener("resize",handleResize,{ passive:true });

document.addEventListener("pointermove",(event)=>{
state.cursor.x = event.clientX;
state.cursor.y = event.clientY;
state.cursor.active = true;
},{ passive:true });

document.addEventListener("pointerleave",()=>{
state.cursor.active = false;
});

projectCards.forEach(card=>{
card.addEventListener("pointerenter",()=>{
state.activityBoost = 1.55;
});

card.addEventListener("pointerleave",()=>{
state.activityBoost = 1;
});
});

handleResize();
animate(performance.now());

return {
triggerProjectPulse,
setActivityBoost(value){
state.activityBoost = value;
}
};
}


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

`${direction.angle + ((Math.random() - .5) * 18)}deg`

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

`${180 + Math.random()*620}px`;


signal.style.setProperty(
"--pulse-height",
`${2 + Math.random()*5}px`
);


signal.style.setProperty(
"--pulse-opacity",
`${.68 + Math.random()*.32}`
);


signal.style.setProperty(
"--pulse-blur",
`${Math.random()*2.4}px`
);






signal.style.animationDuration =

`${3.6 + Math.random()*5.2}s`;






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
Math.random() > .52
? 4 + Math.floor(Math.random()*5)
: 2 + Math.floor(Math.random()*3);


for(
let i = 0;
i < burstCount;
i++
){


setTimeout(
createSignal,
i * (32 + Math.random()*82)
);


}


setTimeout(
spawnBurst,
120 + Math.random()*280
);


};


spawnBurst();



}




const siliconDieField =
createSiliconDieField();









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


if(
siliconDieField &&
typeof siliconDieField.triggerProjectPulse === "function"
){


siliconDieField.triggerProjectPulse();


}


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
