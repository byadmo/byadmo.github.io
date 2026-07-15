/* =====================================================
   ADAM MORGAN PORTFOLIO
   APPLE x TERMINAL ENGINEERING SYSTEM
===================================================== */


:root {


    --bg:#0a0a0c;

    --card:#121214;

    --border:#202023;


    --white:#ffffff;

    --muted:#8e8e93;


    --cyan:#00f0ff;

    --green:#00ff66;


    --radius:26px;


    --transition:
    all .4s cubic-bezier(
        .95,
        .05,
        .795,
        .035
    );

}





* {

    margin:0;

    padding:0;

    box-sizing:border-box;

}




html {

    scroll-behavior:smooth;

}





body {


    background:

    var(--bg);


    color:

    var(--white);


    font-family:

    "JetBrains Mono",
    monospace;


    padding:

    40px;


    overflow-x:hidden;


    line-height:1.6;


}






/* =========================
   BACKGROUND TEXTURE
========================= */


.noise {


    position:fixed;


    inset:0;


    pointer-events:none;


    opacity:.03;


    background-image:

    radial-gradient(
        white 1px,
        transparent 1px
    );


    background-size:

    15px 15px;


}







/* =========================
   BENTO GRID
========================= */


.grid {


    max-width:1600px;


    margin:auto;


    display:grid;


    grid-template-columns:

    repeat(12,1fr);


    gap:22px;


}








/* =========================
   CARD SYSTEM
========================= */


.card {


    background:

    var(--card);


    border:

    1px solid var(--border);


    border-radius:

    var(--radius);


    padding:

    34px;


    position:relative;


    overflow:hidden;


    opacity:0;


    transform:

    translateY(30px);


    transition:

    var(--transition);


    --x:50%;

    --y:50%;


}





.card.active {


    opacity:1;


    transform:

    translateY(0);


}





.card:hover {


    transform:

    translateY(-6px);


    border-color:

    var(--cyan);


    box-shadow:


    0 20px 60px

    rgba(0,240,255,.08);


}





.card::before {


    content:"";


    position:absolute;


    width:300px;


    height:300px;


    left:var(--x);


    top:var(--y);


    transform:

    translate(-50%,-50%);



    background:

    radial-gradient(

        circle,

        rgba(0,240,255,.15),

        transparent 70%

    );


    opacity:0;


    transition:.3s;


    pointer-events:none;


}





.card:hover::before {


    opacity:1;


}







/* =========================
   TYPOGRAPHY
========================= */


h1 {


    font-size:

    clamp(3rem,6vw,5.5rem);


    line-height:1.05;


    letter-spacing:-3px;


    margin-bottom:35px;


}





h2 {


    font-size:30px;


    margin-bottom:25px;


}





h3 {


    font-size:18px;


    margin-bottom:15px;


}




p {


    color:var(--muted);


}





.label {


    color:var(--green);


    font-size:12px;


    letter-spacing:2px;


    margin-bottom:25px;


    display:block;


}









/* =========================
   TERMINAL DOTS
========================= */


.terminal {


    display:flex;


    gap:10px;


    margin-bottom:25px;


}



.terminal span {


    width:14px;


    height:14px;


    border-radius:50%;


}





.red {


    background:#ff5f57;

}



.yellow {


    background:#febc2e;

}



.green {


    background:#28c840;

}








/* =========================
   GRID POSITIONS
========================= */


.hero {


    grid-column:

    span 8;


    grid-row:

    span 2;


    min-height:650px;


}




.focus {


    grid-column:

    span 4;


    min-height:310px;


}





.hardware {


    grid-column:

    span 8;


    grid-row:

    span 2;


    min-height:650px;


}





.journey {


    grid-column:

    span 4;


    min-height:350px;


}





.stack {


    grid-column:

    span 4;


    min-height:350px;


}





.entrepreneurship {


    grid-column:

    span 4;


    min-height:350px;


}





.connect {


    grid-column:

    span 12;


    min-height:220px;


}








/* =========================
   HERO
========================= */


.typing {


    font-size:20px;


    margin-bottom:30px;


}



#typing {


    color:var(--green);


}




.cursor {


    display:inline-block;


    width:10px;


    height:22px;


    background:var(--green);


    animation:

    blink 1s infinite;


}





@keyframes blink {


    50% {

        opacity:0;

    }


}







.buttons {


    display:flex;


    gap:15px;


    margin-top:40px;


    flex-wrap:wrap;


}





.buttons a {


    padding:

    14px 24px;


    background:#18181b;


    border:

    1px solid var(--border);


    border-radius:14px;


    color:white;


    text-decoration:none;


    transition:var(--transition);


}





.buttons a:hover {


    color:var(--green);


    border-color:var(--green);


}









/* =========================
   PROFILE
========================= */


.info {


    display:flex;


    flex-direction:column;


    gap:22px;


}





.info div {


    padding-bottom:15px;


    border-bottom:

    1px solid var(--border);


}





.info span {


    display:block;


    font-size:12px;


    color:var(--muted);


}









/* =========================
   CPU PROJECT
========================= */


.pipeline {


    display:flex;


    gap:12px;


    margin:30px 0;


}



.pipeline span {


    padding:

    14px 18px;


    background:#18181b;


    border:

    1px solid var(--border);


    border-radius:12px;


}





pre {


    background:#080808;


    color:var(--green);


    padding:25px;


    border-radius:15px;


    overflow:auto;


    margin-bottom:25px;


}





.hardware li {


    color:var(--muted);


    margin-bottom:15px;


}








/* =========================
   JOURNEY
========================= */


.years {


    display:flex;


    gap:10px;


    margin-bottom:25px;


}





.years button {


    padding:

    12px 18px;


    background:#18181b;


    color:white;


    border:

    1px solid var(--border);


    border-radius:12px;


    cursor:pointer;


    font-family:inherit;


}





.years button:hover {


    color:var(--green);


    border-color:var(--green);


}





#timeline {


    min-height:120px;


}








/* =========================
   TAGS
========================= */


.tags {


    display:flex;


    flex-wrap:wrap;


    gap:10px;


    margin-bottom:25px;


}





.tags span {


    padding:

    8px 14px;


    background:#18181b;


    border:

    1px solid var(--border);


    border-radius:999px;


    font-size:13px;


}








/* =========================
   CONNECT
========================= */


.connect a {


    display:inline-block;


    margin-right:40px;


    color:white;


    text-decoration:none;


    font-size:18px;


}





.connect a:hover {


    color:var(--green);


}








/* =========================
   RESPONSIVE
========================= */


@media(max-width:1100px){


    body {

        padding:24px;

    }



    .grid {


        grid-template-columns:

        repeat(6,1fr);


    }



    .hero,
    .hardware {


        grid-column:

        span 6;


    }



    .focus,
    .journey,
    .stack,
    .entrepreneurship {


        grid-column:

        span 3;


    }


}





@media(max-width:700px){


    body {

        padding:16px;

    }



    .grid {


        display:flex;


        flex-direction:column;


    }



    .card {


        min-height:auto;


        padding:24px;


    }



    h1 {


        font-size:2.7rem;


    }



    .buttons {


        flex-direction:column;


    }


}
