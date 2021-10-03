const hamburgerButton = document.querySelector(".hamburgerButton");
const navbar = document.querySelector(".navBar");
const createBreedOptions = document.getElementById("breedOptions");
const breedTemplate = document.getElementById("breedTemplate");
const tempImage = document.getElementById("tempimage");
hamburgerButton.addEventListener("click", function () {
  navbar.classList.toggle("navBar-hidden");
});

const section1 = document.getElementsByClassName("section1");
let currSlide = 0;
const backgroundArray = [
  "background.png",
  "background3.png",
  "background2.png",
];

const slideChangeTime = 5000;
function backgroundSlider() {
  document.getElementById(
    "section1"
  ).style.backgroundImage = `url(${backgroundArray[currSlide]})`;
  currSlide++;
  if (currSlide == backgroundArray.length) {
    currSlide = 0;
  }
  setTimeout(backgroundSlider, slideChangeTime);
}
backgroundSlider();

const breedAPI = async function () {
  let i = 0;
  const response = await fetch("https://dog.ceo/api/breeds/list/all");

  const data = await response.json();
  console.log(data);
  console.log(data.message);
  // const names = data.map(
  //   (ele) => ele.message.message
  //   // console.log(ele)
  // );
  // const id = data.map(
  //   (ele) => ele.image.id

  //   // console.log(ele.image.id);
  //   // breedTemplate.innerHTML = `Id number${ele.image.id}`;
  // );

  // console.log(names);
  breedList(data.message);
};

breedAPI();

const breedList = function (list) {
  createBreedOptions.innerHTML = `<select class="selectFont" onchange="renderingContent(this.value)" >
  <option>Choose Breed Name</option>
${Object.keys(list)
  .map(function (breed) {
    return `<option > ${breed}</option>`;
  })
  .join("")}

 </select>`;
};

const renderingContent = async function (breed) {
  // alert(breed);
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await response.json();
  // console.log(data);
  insertingImage(data.message);
};

const insertingImage = function (image) {
  breedTemplate.innerHTML = `
   <div class='breedImage' style ="background-image: url('${image[0]}')"></div>
   <div class='breedImage' style ="background-image: url('${image[1]}')"></div>
   <div class='breedImage' style ="background-image: url('${image[2]}')"></div>
   <div class='breedImage' style ="background-image: url('${image[3]}')"></div>
   <div class='breedImage' style ="background-image: url('${image[4]}')"></div>
   <div class='breedImage' style ="background-image: url('${image[5]}')"></div>
   
  `;
};
//dogsFactApi
const time = 7000;
const dogFactAPI = async function () {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  console.log(data.slip.advice);
  renderingFunFact(data.slip.advice);
};
dogFactAPI();
setInterval(dogFactAPI, time);
const facts = document.getElementById("randomFact");
const renderingFunFact = function (fact) {
  facts.innerHTML = `
  <div class="random">${fact}</div>
  
  
`;
  return;
};

//temporary adoption image
const interimImage = async function () {
  const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
  const data = await response.json();
  // console.log(data.message);
  // const image = data.message;

  renderingTempImage(data.message);
};
interimImage();
const renderingTempImage = function (image) {
  tempImage.innerHTML = `
  <div class="randomImage" style="background-image: url('${image}')"></div>
 
        
  `;
};

//changing background when 10% os the section is visible
const section = document.querySelectorAll(".section");

const addingBackground = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.add("sectionBackground");
};

const observerOptions = {
  root: null,
  threshold: 0.5,
};
const sectionObserver = new IntersectionObserver(
  addingBackground,
  observerOptions
);
section.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.remove("sectionBackground");
});
