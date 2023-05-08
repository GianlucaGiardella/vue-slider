const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morales',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];
const list = document.querySelector(".list");
const foreground = document.querySelector(".foreground");

images.forEach(game => {
    list.innerHTML += `<img src="${game.image}" class="${images[0] === game ? "active" : ""}">`;
    foreground.innerHTML += `<div class="cover ${images[0] === game ? "active" : ""}">
                                 <img src="${game.image}">
                                 <div>
                                     <h2>${game.title}</h2>
                                     <p>${game.text}</p>
                                 </div>
                             </div>`;
});

const listGames = document.querySelectorAll(".list img");
const foregroundGames = document.querySelectorAll(".foreground .cover");
const onOff = document.querySelector("#on_off");
const reverseMode = document.querySelector("#invert_mode");

let activeGame = 0;
let autoInterval;
let autoFlag = true;
let invertFlag = true;

for (let i = 0; i < images.length; i++) {
    listGames[i].addEventListener("click", () => {
        foregroundGames[activeGame].classList.remove("active");
        listGames[activeGame].classList.remove("active");
        activeGame = i;
        foregroundGames[i].classList.add("active");
        listGames[i].classList.add("active");
    })
}

function goUp() {
    foregroundGames[activeGame].classList.remove("active");
    listGames[activeGame].classList.remove("active");

    activeGame--;
    activeGame < 0 ? activeGame = images.length - 1 : "";

    foregroundGames[activeGame].classList.add("active");
    listGames[activeGame].classList.add("active");
}

function goDown() {
    foregroundGames[activeGame].classList.remove("active");
    listGames[activeGame].classList.remove("active");

    activeGame++
    activeGame > images.length - 1 ? activeGame = 0 : "";

    foregroundGames[activeGame].classList.add("active");
    listGames[activeGame].classList.add("active");
}

function autoMode() {
    clearInterval(autoInterval);
    if (autoFlag) {
        autoInterval = setInterval(goDown, 1000);
        onOff.innerHTML = "Stop";
        return autoFlag = false;
    }
    onOff.innerHTML = "Start";
    return autoFlag = true;
}

function invertMode() {
    onOff.innerHTML = "Stop";
    clearInterval(autoInterval);
    if (invertFlag) {
        autoInterval = setInterval(goUp, 1000);
        reverseMode.innerHTML = "To the bottom";
        return invertFlag = false, autoFlag = false;
    }
    autoInterval = setInterval(goDown, 1000);
    reverseMode.innerHTML = "To the top";
    return invertFlag = true, autoFlag = false;
}