<div id="bubbles">
    <div class="bubble-orange x1"></div>
    <div class="bubble-blue x2"></div>
    <div class="bubble-orange x3"></div>
    <div class="bubble-blue x4"></div>
    <div class="bubble-orange x5"></div>
    <div class="bubble-blue x6"></div>
    <div class="bubble-orange x7"></div>
    <div class="bubble-blue x8"></div>
    <div class="bubble-orange x9"></div>
    <div class="bubble-blue x10"></div>
</div>

<style>
#bubbles { 
    height: 100%;
    padding: 200px 0;
}
.bubble-orange {
    width: 70px;
    height: 70px;
    background: var(--logo-orange);
    border-radius: 200px;
    position: relative;
}
.bubble-blue {
    width: 70px;
    height: 70px;
    background: var(--logo-blue);
    border-radius: 200px;
    position: relative;
}

.x1 {
    left: 50vw;
    transform: scale(0.9);
    opacity: 0.22;
    animation: moveclouds 15s linear infinite, sideWays 4s ease-in-out infinite alternate;
}
.x2 {
    left: 25vw;
    transform: scale(0.6);
    opacity: 0.5;
    animation: moveclouds 25s linear infinite, sideWays 5s ease-in-out infinite alternate;
}
.x3 {
    left: 30vw;
    transform: scale(0.95);
    opacity: 0.31;
    animation: moveclouds 20s linear infinite, sideWays 4s ease-in-out infinite alternate;
}
.x4 {
    left: 90vw;
    transform: scale(0.75);
    opacity: 0.39;
    animation: moveclouds 18s linear infinite, sideWays 7s ease-in-out infinite alternate;
}
.x5 {
    left: 10vw;
    transform: scale(0.8);
    opacity: 0.38; 
    animation: moveclouds 12s linear infinite, sideWays 4s ease-in-out infinite alternate;
}
.x6 {
    left: 75vw;
    transform: scale(1.1);
    opacity: 0.32; 
    animation: moveclouds 14s linear infinite, sideWays 6s ease-in-out infinite alternate;
}
.x7 {
    left: 5vw;
    transform: scale(0.65);
    opacity: 0.48; 
    animation: moveclouds 16s linear infinite, sideWays 4s ease-in-out infinite alternate;
}
.x8 {
    left: 15vw;
    transform: scale(1.05);
    opacity: 0.28; 
    animation: moveclouds 28s linear infinite, sideWays 5s ease-in-out infinite alternate;
}
.x9 {
    left: 86vw;
    transform: scale(0.52);
    opacity: 0.54; 
    animation: moveclouds 16s linear infinite, sideWays 6s ease-in-out infinite alternate;
}
.x10 {
    left: 42vw;
    transform: scale(0.87);
    opacity: 0.53; 
    animation: moveclouds 24s linear infinite, sideWays 3s ease-in-out infinite alternate;
}
.x1:hover,.x2:hover,.x3:hover,.x4:hover,.x5:hover,.x6:hover,.x7:hover,.x8:hover,.x9:hover,.x10:hover{
    opacity: 0;
}

@keyframes moveclouds {     
    0% { 
        top: 50px;
    }
    100% { 
        top: -900px;
    }
}

@keyframes sideWays {
    0% {
        margin-left:0px;
    }
    100% {
        margin-left:75px;
    }
}
</style>