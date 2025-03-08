document.addEventListener("DOMContentLoaded", function () {
    const concerts = document.querySelectorAll(".concerts li");
    const concertImg = document.querySelector(".concert-img");

    const imgElement = document.createElement("img");
    concertImg.appendChild(imgElement);

    concerts.forEach(li => {
        li.addEventListener("mouseover", function () {
            const imgSrc = li.getAttribute("data-img");
            if (imgSrc) {
                imgElement.src = imgSrc;
                imgElement.classList.add("visible");
            }
        });

        li.addEventListener("mouseleave", function () {
            imgElement.classList.remove("visible");
        });
    });
});