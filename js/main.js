let nextdom = document.getElementById('next');
let prevdom = document.getElementById('prev');
let carouseldom = document.querySelector('.carousel');
let listitemdom = document.querySelector('.carousel .list');
let thumbnaildom = document.querySelector('.carousel .thumbnail');

nextdom.onclick = function () {
    showSlider('next');
};

prevdom.onclick = function () {
    showSlider('prev');
};

let timerunning = 3000;
let runtimeout;

function showSlider(type) {
    let itemslider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        listitemdom.appendChild(itemslider[0]); // نقل العنصر الأول إلى الأخير
        thumbnaildom.appendChild(itemThumbnail[0]);
        carouseldom.classList.add('next');
    } else if (type === 'prev') {
        listitemdom.prepend(itemslider[itemslider.length - 1]); // نقل العنصر الأخير إلى الأول
        thumbnaildom.prepend(itemThumbnail[itemThumbnail.length - 1]);
        carouseldom.classList.add('prev');
    }

    clearTimeout(runtimeout);
    runtimeout = setTimeout(() => {
        carouseldom.classList.remove('next');
        carouseldom.classList.remove('prev');
    }, timerunning);
}







document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const itemsPerPage = 25; // عدد الأفلام في كل صفحة
    const movieList = document.querySelectorAll(".list-movies .movie");
    const totalPages = Math.ceil(movieList.length / itemsPerPage);
    const pageNumbersContainer = document.querySelector(".page-numbers");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function showPage(page) {
        movieList.forEach((movie, index) => {
            movie.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? "block" : "none";
        });

        document.querySelectorAll(".page-numbers button").forEach(btn => {
            btn.classList.remove("active");
            if (parseInt(btn.textContent) === page) {
                btn.classList.add("active");
            }
        });

        prevButton.disabled = (page === 1);
        nextButton.disabled = (page === totalPages);
    }

    function createPagination() {
        pageNumbersContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            let btn = document.createElement("button");
            btn.textContent = i;
            btn.addEventListener("click", function () {
                currentPage = i;
                showPage(currentPage);
            });

            if (i === currentPage) {
                btn.classList.add("active");
            }

            pageNumbersContainer.appendChild(btn);
        }
    }

    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    createPagination();
    showPage(currentPage);
});
