const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    // "See",
    // "You",
    // "Soon.",
    // "Have",
    // "a",
    // "Great",
    // "day!",
    // ":)",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();


// Hamburger Menu Logic:
let Hamburgerbutton = document.querySelector(".hamburgerIcon");
let sideMenuButton = document.querySelector(".sideMenu");
let sideMenuCrossBtns = document.querySelectorAll(".crossClass");


Hamburgerbutton.addEventListener("click",()=>{
    sideMenuButton.style.visibility = "visible";

    // Login for remove side bar:
    sideMenuCrossBtns.forEach((elem,index)=>{
        elem.addEventListener("click",()=>{
                 sideMenuButton.style.visibility = "hidden";
             })
    })
})

// Skills Btn Hover Effects:
let SkillsBtns = document.querySelectorAll(".hoverBtn");
let skillsLists = document.querySelector(".skillsLists");
let educationSection = document.querySelector(".educationSection");


for(let i=0;i<2;i++){
    SkillsBtns[i].addEventListener("click",()=>{
        if(i==0){
            if(SkillsBtns[i+1].style.color === "white"){
                SkillsBtns[i+1].style.color = "#c9c9c9";
                educationSection.style.display = "none";
            }
            SkillsBtns[i].style.color = "white";
            skillsLists.style.display = "flex";
        }
        else{
            if(SkillsBtns[i-1].style.color === "white"){
                SkillsBtns[i-1].style.color = "#c9c9c9";
                skillsLists.style.display = "none";
            }
            SkillsBtns[i].style.color = "white";
            educationSection.style.display = "flex";
        }
    })
}


// Submit Button Logic:
// localStorage.clear();
let dataArr = JSON.parse(localStorage.getItem("dataArr")) || new Array();
let inputFields = document.querySelectorAll(".inputField");
let submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click",()=>{
    let email="",subject="",message="";

    inputFields.forEach((elem,ind)=>{
        console.log(elem.value);

        if(ind==0) email=elem.value;
        else if(ind==1) subject=elem.value;
        else message=elem.value;

        elem.value = " ";
    })
    dataArr.push({email,subject,message});
    localStorage.setItem("dataArr",JSON.stringify(dataArr));
    console.log(dataArr);
})