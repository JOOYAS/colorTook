const root = document.querySelector(":root");
const hueSlider = document.querySelector(".hue");
const saturationSlider = document.querySelector(".saturation");
const lightnessSlider = document.querySelector(".lightness");
const transparencySlider = document.querySelector(".transparency");
const bgOrTextChooser = document.getElementsByName("bgOrTextSelector");
const bgColorValueText = document.getElementById("bg-color-value");
const textColorValueText = document.getElementById("text-color-value");
const bgCopyBtn = document.getElementById("bg-copy-btn");
const textCopyBtn = document.getElementById("text-copy-btn");

// just setting some default values & these will changes on input range/slider value change
let currentColorFor = "--bg-color";
let hue = 160;
let saturation = 100;
let lightness = 50;
let transparency = 1;
bgColorValueText.value = "hsla(160, 100%, 50%, 1)"; //setting default values
textColorValueText.value = "hsla(0, 0%, 100%, 1);";

//selecting the color to be changed is for bg or text
bgOrTextChooser.forEach((radio) => {
    radio.addEventListener("change", (e) => {
        if (e.target.value === "bg") {
            console.log("Choosed to edit Bg color");
            currentColorFor = "--bg-color";
        }
        if (e.target.value === "text") {
            console.log("Choosed to edit Bg color");
            currentColorFor = "--text-color";
        }
    });
});

//the hsla value is getting created with this function, and it returns that value
const color = () =>
    `hsla(${hue}, ${saturation}%, ${lightness}%, ${transparency})`;

//setting hue color
const hueColor = () => {
    let currentHue = `hsl(${hue}, 100%, 50%)`;
    root.style.setProperty("--hue", currentHue);
};

//each slider change done seperately
// maybe can make them a single function ,if updated code
hueSlider.addEventListener("input", () => {
    hue = hueSlider.value;
    // console.log("hue = ", hue);
    hueColor();
    root.style.setProperty(currentColorFor, color());
    root.style.setProperty("--secondary-color", `hsl(${hue}, 100%, 90%)`);
});

saturationSlider.addEventListener("input", () => {
    saturation = saturationSlider.value;
    // console.log("saturation = ", saturation);
    root.style.setProperty(currentColorFor, color());
});

lightnessSlider.addEventListener("input", () => {
    lightness = lightnessSlider.value;
    // console.log("lightness = ", lightness);
    root.style.setProperty(currentColorFor, color());
});

transparencySlider.addEventListener("input", () => {
    transparency = transparencySlider.value;
    // console.log("transparency = ", transparency);
    root.style.setProperty(currentColorFor, color());
});

//dynamically changing the color values to copy button according to the color change
//mutationObserver works like useeffect in react
const observer = new MutationObserver(() => {
    console.log("works");
    bgColorValueText.value =
        getComputedStyle(root).getPropertyValue("--bg-color");

    textColorValueText.value =
        getComputedStyle(root).getPropertyValue("--text-color");
});

observer.observe(root, {
    attributes: true, //similar to dependency array
    attributeFilter: ["style"],
});

//copies to clipboard on click of copy button
bgCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(bgColorValueText.value);
    bgCopyBtn.innerText = "\u2713";
    setTimeout(() => {
        bgCopyBtn.innerText = "\u29C9";
    }, 2000);
});

textCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(textColorValueText.value);
    textCopyBtn.innerText = "\u2713";
    setTimeout(() => {
        textCopyBtn.innerText = "\u29C9";
    }, 2000);
});

//things that needs to be done

//use some library
//to convert hsla => rgba
//& if hsl/rgb/hex selected remove the a from hsla with its value and convert
//& grayout or hide the transparency slider

//currently hsla is the only color value this page can create
