const cards=document.querySelectorAll(".reveal");

cards.forEach((card,index)=>{

setTimeout(()=>{

card.classList.add("active");

},index*140);

});
