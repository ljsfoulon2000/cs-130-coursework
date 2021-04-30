const defaultTheme = () => {
   //alert('switch to default theme');
   document.querySelector("div").className = "default";
};

const oceanTheme = () => {
   //alert('switch to ocean theme');
   document.querySelector("div").className = "ocean";
};

const desertTheme = () => {
   //alert('switch to desert theme');
   document.querySelector("div").className = "desert";
};


document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;

