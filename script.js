/* =====================================================
   ADAM MORGAN PORTFOLIO
   PREMIUM INTERACTION ENGINE
   PART 1 / 3
===================================================== */



/* =====================================================
   GLOBAL ELEMENTS
===================================================== */

const cards = document.querySelectorAll(".card");
const revealCards = document.querySelectorAll(".reveal");

const hero = document.querySelector(".hero");

const typingElement =
document.getElementById("typing");

const timeline =
document.getElementById("timeline-card");

const projectsButton =
document.getElementById("projects-button");

const yearButtons =
document.querySelectorAll(".year-buttons button");

const projectGrid =
document.querySelector(".project-grid");





/* =====================================================
   EASING
===================================================== */

const ease = {

    lerp(a,b,t){

        return a+(b-a)*t;

    }

};





/* =====================================================
   REVEAL ANIMATION
===================================================== */

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

observer.unobserve(entry.target);

}

});

},

{

threshold:.12

}

);



revealCards.forEach(card=>{

observer.observe(card);

});








/* =====================================================
   TYPEWRITER
===================================================== */

const typingWords=[

"32-bit pipelined RISC-V cores...",

"synthesizable RTL architectures...",

"FPGA hardware systems...",

"processor microarchitecture...",

"high-performance digital logic..."

];

let word=0;
let char=0;
let deleting=false;

function typeWriter(){

if(!typingElement) return;

const current=
typingWords[word];

if(!deleting){

char++;

typingElement.textContent=
current.substring(0,char);

if(char===current.length){

deleting=true;

setTimeout(typeWriter,1800);

return;

}

}

else{

char--;

typingElement.textContent=
current.substring(0,char);

if(char===0){

deleting=false;

word=(word+1)%typingWords.length;

}

}

setTimeout(

typeWriter,

deleting ? 32 : 70

);

}

typeWriter();








/* =====================================================
   CURSOR GLOW
===================================================== */

cards.forEach(card=>{

let x=0;
let y=0;

let tx=0;
let ty=0;

let frame;

card.addEventListener("mousemove",(e)=>{

const rect=
card.getBoundingClientRect();

tx=e.clientX-rect.left;
ty=e.clientY-rect.top;

if(!frame){

animate();

}

});

function animate(){

x=ease.lerp(x,tx,.18);
y=ease.lerp(y,ty,.18);

card.style.setProperty(

"--mouse-x",

`${x}px`

);

card.style.setProperty(

"--mouse-y",

`${y}px`

);

if(

Math.abs(x-tx)>0.3 ||

Math.abs(y-ty)>0.3

){

frame=requestAnimationFrame(animate);

}

else{

frame=null;

}

}

});









/* =====================================================
   HERO PARALLAX
===================================================== */

if(hero){

hero.addEventListener(

"mousemove",

(e)=>{

const rect=

hero.getBoundingClientRect();

const x=

(e.clientX-rect.left)/rect.width-.5;

const y=

(e.clientY-rect.top)/rect.height-.5;

hero.style.transform=

`

perspective(1200px)

rotateY(${x*3}deg)

rotateX(${-y*3}deg)

translateY(-2px)

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

.querySelectorAll(".terminal-dots span")

.forEach(dot=>{

dot.addEventListener("mouseenter",()=>{

dot.style.transform=

"scale(1.35) rotate(15deg)";

});

dot.addEventListener("mouseleave",()=>{

dot.style.transform=

"scale(1) rotate(0deg)";

});

});
/* =====================================================
   PROJECT DATABASE
===================================================== */


const projects = {


    "2026":[


        {

        title:
        "32-Bit Pipelined RISC-V CPU Core",

        text:
        "Designed a custom processor architecture using SystemVerilog RTL featuring a 5-stage pipeline, hazard detection, forwarding logic, and hardware verification."

        },


        {

        title:
        "RTL Verification Environment",

        text:
        "Created simulation workflows using ModelSim, GTKWave, and Icarus Verilog to analyze waveforms and debug processor behaviour."

        },


        {

        title:
        "Computer Architecture Research",

        text:
        "Exploring instruction pipelines, datapaths, control units, memory systems, and efficient processor implementation."

        }


    ],





    "2025":[


        {

        title:
        "Digital Systems Development",

        text:
        "Developed foundations in digital logic, programming, electronics, and hardware design principles."

        },


        {

        title:
        "Engineering Applications",

        text:
        "Applied mathematics, physics, and programming concepts to solve engineering problems."

        },


        {

        title:
        "Hardware Exploration",

        text:
        "Started developing deeper interest in FPGA systems, embedded hardware, and processor design."

        }


    ],





    "2024":[


        {

        title:
        "Programming Foundation",

        text:
        "Built fundamental programming and problem-solving skills through technical projects and exploration."

        },


        {

        title:
        "Engineering Curiosity",

        text:
        "Explored technology, computer systems, and the fundamentals behind modern electronics."

        }


    ]

};









/* =====================================================
   TIMELINE PROJECT LOADER
===================================================== */


let currentYear=null;



function loadProjects(year){


if(!projectGrid)
return;



projectGrid.innerHTML="";



projects[year].forEach(

(project,index)=>{


const card=

document.createElement("div");



card.className=

"project-item";



card.style.animationDelay=

`${index*0.12}s`;



card.innerHTML=

`

<h4>

${project.title}

</h4>


<p>

${project.text}

</p>

`;



projectGrid.appendChild(card);


});


}









/* =====================================================
   YEAR BUTTON SYSTEM
===================================================== */


function activateYear(button){


const year=

button.dataset.year;



currentYear=year;



yearButtons.forEach(btn=>{

btn.classList.remove(
"active"
);

});



button.classList.add(
"active"
);



if(timeline){

timeline.classList.add(
"expanded"
);

}



loadProjects(year);


}






yearButtons.forEach(button=>{


button.addEventListener(

"mouseenter",

()=>{


activateYear(button);


}

);




button.addEventListener(

"click",

()=>{


activateYear(button);


}

);


});









/* =====================================================
   TIMELINE COLLAPSE
===================================================== */


if(timeline){


timeline.addEventListener(

"mouseleave",

()=>{


if(window.innerWidth < 700){

return;

}


timeline.classList.remove(
"expanded"
);



}

);


}









/* =====================================================
   VIEW PROJECTS ANIMATION
===================================================== */


let animationTimeout;



function playTimelineGlow(){


if(!timeline)
return;



clearTimeout(animationTimeout);



timeline.classList.remove(
"project-active"
);



// restart animation

void timeline.offsetWidth;



timeline.classList.add(
"project-active"
);



animationTimeout=

setTimeout(()=>{


timeline.classList.remove(
"project-active"
);


},7500);


}







if(projectsButton && timeline){



projectsButton.addEventListener(

"click",

(e)=>{


e.preventDefault();




timeline.scrollIntoView({

behavior:"smooth",

block:"center"

});





setTimeout(()=>{


playTimelineGlow();


},900);



}

);

}









/* =====================================================
   BUTTON RIPPLE EFFECT
===================================================== */


document

.querySelectorAll(".buttons a")

.forEach(button=>{


button.addEventListener(

"click",

()=>{


button.style.transform=

"scale(.96)";



setTimeout(()=>{


button.style.transform="";

},150);


}

);


});
/* =====================================================
   CPU PIPELINE ANIMATION
===================================================== */


const pipelineStages =
document.querySelectorAll(
".pipeline div"
);



let pipelineIndex=0;



function animatePipeline(){


if(!pipelineStages.length)
return;



pipelineStages.forEach(stage=>{


stage.style.transition=

"all .6s cubic-bezier(.22,1,.36,1)";



stage.style.boxShadow="";

stage.style.color="";



});



pipelineStages[pipelineIndex].style.boxShadow=

`

0 0 25px rgba(
0,
234,
255,
.45
)

`;



pipelineStages[pipelineIndex].style.color=

"#00ff88";



pipelineIndex=

(pipelineIndex+1)
%
pipelineStages.length;



}



if(pipelineStages.length){


setInterval(

animatePipeline,

1200

);


}









/* =====================================================
   CARD IDLE FLOAT
===================================================== */


cards.forEach((card,index)=>{


card.style.animationDelay=

`${index*80}ms`;



});









/* =====================================================
   SMOOTH LINK INTERACTIONS
===================================================== */


document

.querySelectorAll("a")

.forEach(link=>{


link.addEventListener(

"mouseenter",

()=>{


link.style.transition=

".35s ease";


}

);


});









/* =====================================================
   CUSTOM SCROLL PROGRESS
===================================================== */


const scrollBar=

document.createElement("div");



scrollBar.style.position=

"fixed";



scrollBar.style.top=

"0";



scrollBar.style.left=

"0";



scrollBar.style.height=

"2px";



scrollBar.style.width=

"0%";



scrollBar.style.background=

"linear-gradient(90deg,#00eaff,#00ff88)";



scrollBar.style.zIndex=

"9999";



document.body.appendChild(
scrollBar
);






window.addEventListener(

"scroll",

()=>{


const height=

document.documentElement.scrollHeight
-
window.innerHeight;



const progress=

(window.scrollY/height)*100;



scrollBar.style.width=

`${progress}%`;



}

);









/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */


document.addEventListener(

"keydown",

(e)=>{


// press 1,2,3 to switch years

if(
e.key==="1" &&
yearButtons[0]
){

activateYear(
yearButtons[0]
);

}



if(
e.key==="2" &&
yearButtons[1]
){

activateYear(
yearButtons[1]
);

}



if(
e.key==="3" &&
yearButtons[2]
){

activateYear(
yearButtons[2]
);

}



}

);









/* =====================================================
   PAGE BOOT SEQUENCE
===================================================== */


window.addEventListener(

"load",

()=>{


document.body.classList.add(
"loaded"
);



console.log(

`

================================

ADAM MORGAN PORTFOLIO

SYSTEM ONLINE

ENGINEERING PROFILE:
Electrical Engineering

FOCUS:
CPU Architecture
RTL Design
FPGA Systems

================================

`

);


});
