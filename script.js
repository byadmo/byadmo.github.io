/* =====================================================
   ADAM MORGAN PORTFOLIO
   PREMIUM INTERACTION ENGINE
   UPDATED FPGA SIGNAL SYSTEM
===================================================== */


/* =====================================================
   GLOBAL ELEMENTS
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
document.querySelectorAll(".year-buttons button");


const projectGrid =
document.querySelector(".project-grid");







/* =====================================================
   CARD REVEAL SYSTEM
===================================================== */


window.addEventListener("load",()=>{


revealCards.forEach((card,index)=>{


setTimeout(()=>{


card.classList.add("active");


},index*120);



});


});









/* =====================================================
   TYPEWRITER SYSTEM
===================================================== */


const typingWords=[


"32-bit pipelined RISC-V cores...",


"synthesizable RTL architectures...",


"FPGA hardware systems...",


"processor microarchitecture...",


"high-performance digital logic..."


];



let wordIndex=0;

let charIndex=0;

let deleting=false;





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





if(charIndex>=current.length){


deleting=true;


setTimeout(
typeWriter,
1600
);


return;


}



}

else{



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

deleting ? 35 : 75

);


}



typeWriter();









/* =====================================================
   CURSOR GLOW SYSTEM
===================================================== */


cards.forEach(card=>{


let mouseX=0;

let mouseY=0;


let currentX=0;

let currentY=0;





function animate(){



currentX +=
(mouseX-currentX)*0.15;



currentY +=
(mouseY-currentY)*0.15;





card.style.setProperty(

"--mouse-x",

`${currentX}px`

);




card.style.setProperty(

"--mouse-y",

`${currentY}px`

);





requestAnimationFrame(
animate
);



}





animate();






card.addEventListener(

"mousemove",

(e)=>{


const rect =
card.getBoundingClientRect();



mouseX =
e.clientX -
rect.left;



mouseY =
e.clientY -
rect.top;



}



);



});









/* =====================================================
   HERO PARALLAX
===================================================== */


if(hero){



hero.addEventListener(

"mousemove",

(e)=>{



const rect =
hero.getBoundingClientRect();




const x =
(e.clientX-rect.left)
/
rect.width
-.5;




const y =
(e.clientY-rect.top)
/
rect.height
-.5;





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
   TERMINAL DOT INTERACTION
===================================================== */


document
.querySelectorAll(".terminal-dots span")
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



});/* =====================================================
   PROJECT DATABASE
===================================================== */


const projects = {


2026:[


{

title:
"32-Bit Pipelined RISC-V CPU Core",

text:
"Designed a custom SystemVerilog processor architecture with a 5-stage pipeline, hazard detection, forwarding logic, and verification."

},



{

title:
"RTL Verification Environment",

text:
"Created simulation workflows using ModelSim, GTKWave, and Icarus Verilog for waveform analysis and debugging."

},



{

title:
"Computer Architecture Research",

text:
"Exploring instruction pipelines, datapaths, control units, memory systems, and processor optimization."

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
"Engineering Applications",

text:
"Applied mathematics, physics, and programming toward engineering problems."

},



{

title:
"Hardware Exploration",

text:
"Started exploring FPGA systems, embedded hardware, and processor design."

}



],







2024:[



{

title:
"Programming Foundation",

text:
"Built programming fundamentals and problem-solving skills through technical projects."

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



projectGrid.innerHTML="";




projects[year].forEach(

(project,index)=>{



const item =
document.createElement("div");



item.className =
"project-item";



item.style.animationDelay =
`${index*.12}s`;




item.innerHTML = `


<h4>

${project.title}

</h4>


<p>

${project.text}

</p>


`;




projectGrid.appendChild(item);



}



);



}









/* =====================================================
   YEAR BUTTON SYSTEM
===================================================== */


function activateYear(button){



const year =
button.dataset.year;





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
   TIMELINE AUTO COLLAPSE
===================================================== */


let collapseTimer;



function resetTimelineTimer(){



clearTimeout(
collapseTimer
);



collapseTimer =
setTimeout(()=>{



if(timeline){



timeline.classList.remove(
"expanded"
);



yearButtons.forEach(btn=>{


btn.classList.remove(
"active"
);


});



}



},4000);



}







yearButtons.forEach(button=>{


button.addEventListener(

"mouseenter",

()=>{


resetTimelineTimer();


}


);



button.addEventListener(

"click",

()=>{


resetTimelineTimer();


}


);



});






if(timeline){


timeline.addEventListener(

"mouseenter",

()=>{


clearTimeout(
collapseTimer
);


}

);




timeline.addEventListener(

"mouseleave",

()=>{


resetTimelineTimer();


}


);


}









/* =====================================================
   VIEW PROJECT BUTTON
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



},7000);



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
   PIPELINE ANIMATION
===================================================== */


const pipelineStages =
document.querySelectorAll(
".pipeline div"
);



let pipelineIndex=0;





if(pipelineStages.length){



setInterval(()=>{



pipelineStages.forEach(stage=>{


stage.style.boxShadow="";

stage.style.color="";


});






pipelineStages[pipelineIndex].style.boxShadow =

"0 0 25px rgba(0,234,255,.5)";





pipelineStages[pipelineIndex].style.color =

"#00ff88";





pipelineIndex++;





if(pipelineIndex>=pipelineStages.length)

pipelineIndex=0;




},1200);



}
/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */


const scrollBar =
document.createElement("div");



scrollBar.style.position="fixed";

scrollBar.style.top="0";

scrollBar.style.left="0";

scrollBar.style.height="3px";

scrollBar.style.width="0%";

scrollBar.style.background =
"linear-gradient(90deg,#00eaff,#00ff88)";

scrollBar.style.zIndex="9999";

document.body.appendChild(scrollBar);






window.addEventListener(

"scroll",

()=>{



const height =
document.documentElement.scrollHeight -
window.innerHeight;



const progress =
(window.scrollY/height)*100;




scrollBar.style.width =
`${progress}%`;



}



);









/* =====================================================
   SYSTEM ONLINE
===================================================== */


window.addEventListener(

"load",

()=>{


document.body.classList.add(
"loaded"
);



console.log(`

================================

ADAM MORGAN PORTFOLIO

SYSTEM ONLINE

ARCHITECTURE:
RISC-V
RTL DESIGN
FPGA SYSTEMS

================================

`);



}

);








/* =====================================================
   RANDOM FPGA SIGNAL FIELD V2
===================================================== */


const cpuField =
document.getElementById(
"cpu-field"
);




function createSignal(){


if(!cpuField)
return;





const pulse =
document.createElement(
"div"
);



pulse.className =
"cpu-pulse";







// random signal length

const randomWidth =
Math.random()*300+150;





// random position

const randomTop =
Math.random()*100;



const randomLeft =
Math.random()*120-20;






// slower controlled movement
// minimum 12s, maximum 25s

const randomDuration =
Math.random()*13+12;





// small delay only
// prevents frozen signals

const randomDelay =
Math.random()*2;







// random angle

const randomRotation =
Math.random()*40-20;







// random brightness

const randomOpacity =
Math.random()*.35+.25;








pulse.style.width =
`${randomWidth}px`;



pulse.style.top =
`${randomTop}%`;



pulse.style.left =
`${randomLeft}%`;



pulse.style.animationDuration =
`${randomDuration}s`;



pulse.style.animationDelay =
`${randomDelay}s`;



pulse.style.opacity =
randomOpacity;



pulse.style.transform =

`

rotate(
${randomRotation}deg
)

`;






cpuField.appendChild(
pulse
);








// remove old signals

setTimeout(()=>{


pulse.remove();



},

(randomDuration+randomDelay)
*
1000

);



}









function startSignalSystem(){



// initial random signals

const initialAmount =
Math.floor(
Math.random()*8
)+8;






for(
let i=0;
i<initialAmount;
i++
){


setTimeout(()=>{


createSignal();



},

Math.random()*4000


);



}







// continuously create signals

setInterval(()=>{



createSignal();



},

Math.random()*2500+2500



);



}







startSignalSystem();









/* =====================================================
   RANDOM SIGNAL BURST EVENTS
===================================================== */


function randomBurst(){



const amount =
Math.floor(
Math.random()*4
)+2;






for(
let i=0;
i<amount;
i++
){



setTimeout(()=>{


createSignal();



},

i*300

);



}


setTimeout(

randomBurst,

Math.random()*15000+15000

);



}





randomBurst();


/* =====================================================
   MOBILE TOUCH OPTIMIZATION
===================================================== */


if(window.innerWidth < 700){



cards.forEach(card=>{



card.addEventListener(

"touchstart",

()=>{


card.classList.add(
"touch-active"
);


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



}

);



});



}









/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */


document.addEventListener(

"keydown",

(e)=>{



if(e.key==="1" && yearButtons[0]){


activateYear(
yearButtons[0]
);


}




if(e.key==="2" && yearButtons[1]){


activateYear(
yearButtons[1]
);


}





if(e.key==="3" && yearButtons[2]){


activateYear(
yearButtons[2]
);


}
   
}

);
