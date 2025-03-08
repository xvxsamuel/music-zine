document.addEventListener("DOMContentLoaded", function() {
    const index = [
        { id: 1, name: "about", url: "about" },
        { id: 2, name: "albums", url: "albums" },
        { id: 3, name: "concerts", url: "concerts" },
    ];
    const selector = document.querySelector(".selector");
    const vinyl = document.querySelector(".vinyl img");
    const numberOfItems = index.length;
   
    let radius;
    let centerX;
    let centerY;
    let scrollAmount = 0;
    const angleIncrement = Math.PI / 12;
    const startAngle = Math.PI;
    const maxAngle = (numberOfItems - 1) * angleIncrement;
    const maxScroll = maxAngle / 0.0005;
   
    selector.style.opacity = "0";
   
    function isMobile() {
        return window.innerWidth <= 768;
    }
   
    function init() {
        if (isMobile()) {
            return;
        }
        
        const vinylRect = vinyl.getBoundingClientRect();
        radius = vinylRect.width;
        centerX = window.innerWidth;
        centerY = window.innerHeight / 2;
        selector.innerHTML = '';
        for (let i = 0; i < numberOfItems; i++) {
            const item = document.createElement("div");
            item.className = "item";
            const p = document.createElement("p");
            p.textContent = index[i].name;
            item.appendChild(p);
            selector.appendChild(item);
            item.addEventListener("click", function() {
                window.location.href = index[i].url;
            });
            item.addEventListener("mouseenter", function() {
                p.style.color = "white";
                p.style.backgroundColor = "black";
                p.style.cursor = "cell";
            });
            item.addEventListener("mouseleave", function() {
                p.style.color = "black";
                p.style.backgroundColor = "white";
                p.style.cursor = "crosshair";
            });
        }
       
        setTimeout(function() {
            updatePosition();
            setTimeout(function() {
                gsap.to(selector, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }, 50);
        }, 100);
    }
   
    function updatePosition() {
        if (isMobile()) {
            return;
        }
        
        const scrollFactor = (scrollAmount / maxScroll) * maxAngle;
       
        document.querySelectorAll(".item").forEach(function(item, index) {
            const baseAngle = startAngle - index * angleIncrement;
            const angle = baseAngle + scrollFactor;
           
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
           
            const textWidth = item.querySelector("p").offsetWidth || 100;
           
            gsap.to(item, {
                duration: 0.05,
                x: (x - textWidth) + "px",
                y: (y - item.offsetHeight / 2) + "px",
                ease: "power2.out",
            });
        });
    }
   
    function initializeWhenReady() {
        if (vinyl.complete) {
            setTimeout(init, 200);
        } else {
            vinyl.onload = function() {
                setTimeout(init, 200);
            };
        }
    }
    
    window.addEventListener('load', initializeWhenReady);
   
    window.addEventListener('wheel', function(event) {
        if (isMobile()) {
            return;
        }
        
        event.preventDefault();
        scrollAmount = Math.max(0, Math.min(maxScroll, scrollAmount + (event.deltaY * -0.5)));
        updatePosition();
    }, { passive: false });
   
    let resizeTimer;
    window.addEventListener("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (!isMobile() && selector.innerHTML === '') {
                init();
            } else if (!isMobile()) {
                const vinylRect = vinyl.getBoundingClientRect();
                radius = vinylRect.width;
                centerX = window.innerWidth;
                centerY = window.innerHeight / 2;
                updatePosition();
            }
        }, 50);
    });
});