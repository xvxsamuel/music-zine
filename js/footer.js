document.addEventListener("DOMContentLoaded", function () {
  const scrollIndicator = document.getElementById("scroll-indicator");

  function updateScrollIndicator() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;

      if (scrollableHeight <= 0) {
          scrollIndicator.style.opacity = "0";
      } else if (scrolled >= scrollableHeight - 5) {
          scrollIndicator.style.opacity = "0";
      } else {
          scrollIndicator.style.opacity = "1";
      }
  }

  requestAnimationFrame(updateScrollIndicator); 
  window.addEventListener("scroll", updateScrollIndicator);
  window.addEventListener("resize", updateScrollIndicator);
  window.addEventListener("load", updateScrollIndicator);
});

let clock = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";
    if (hrs == 0) {
      hrs = 12;
    } else if (hrs >= 12) {
      hrs = hrs - 12;
      period = "PM";
    }
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
  
    let time = `<${hrs}:${mins}:${secs} ${period}>`;
    document.getElementById("clock").innerText = time;
    setTimeout(clock, 1000);
  };
  
  clock();
  