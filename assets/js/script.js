const track = document.querySelector('.carousel_slides');
const slides = document.querySelectorAll('.single_slide');
const nextBtn = document.querySelector('.btn_next')
const prevBtn = document.querySelector('.btn_prev')
const carouselNav = document.querySelector('.carousel_dots');

// Create indicator's button for nav
const createDot = (currentSlide) => {
    const btn = document.createElement('div');
    btn.classList.add('dot');
    if(currentSlide) btn.classList.add(currentSlide);
    return btn;
}

const updateIndicators = (currentIndicator, targetIndicator) => {
    if(!targetIndicator) return
    currentIndicator.classList.remove('current_slide');
    targetIndicator.classList.add('current_slide');
}

// Get width of slide
let slideWidth = slides[0].getBoundingClientRect().width;
const getCurrentSlide = () => {
    return track.querySelector('.current_slide');
}

// Poisition slides
const setSlidesPosition = (slide, index) => {
    // position slide
    slide.style.left = `${slideWidth * index}px`
    if(index === 0) {
        // adding indicator
        carouselNav.appendChild(createDot("current_slide"));
        slide.classList.add('current_slide')
        return
    }
    // adding indicator
    carouselNav.appendChild(createDot());
}

// Customize slides
slides.forEach(setSlidesPosition);

// move slide handler
const moveSlideHandler = (targetSibling, currentSlide) => {
    let amountMove = targetSibling.style.left;
    track.style.left = "-"+amountMove;
    currentSlide.classList.remove('current_slide');
    targetSibling.classList.add('current_slide');
}

nextBtn.addEventListener('click', () => {
    const currentSlide = getCurrentSlide();
    let nextSibling = currentSlide.nextElementSibling;
    const currentIndicator = carouselNav.querySelector('.current_slide')
    let nextIndicator = currentIndicator.nextElementSibling;
    if(!nextSibling) {
        nextSibling = slides[0]
        nextIndicator = carouselNav.firstElementChild
    }
    moveSlideHandler(nextSibling, currentSlide);
    updateIndicators(currentIndicator, nextIndicator)
});

prevBtn.addEventListener('click', () => {
    const currentSlide = getCurrentSlide();
    let prevSibling = currentSlide.previousElementSibling;
    const currentIndicator = carouselNav.querySelector('.current_slide')
    let prevIndicator = currentIndicator.previousElementSibling;
    if(!prevSibling) {
        prevSibling = slides[slides.length - 1];
        prevIndicator = carouselNav.lastElementChild
    }
    moveSlideHandler(prevSibling, currentSlide);
    updateIndicators(currentIndicator, prevIndicator);
});

carouselNav.addEventListener('click', e => {
    if(!e.target.classList.contains('dot')) return
    const indicators = Array.from(carouselNav.children);
    let targetIndex = indicators.findIndex(indicator => indicator === e.target);
    if(targetIndex > -1 && indicators[targetIndex].classList.contains('current_slide')) return;
    
    const currentIndicator = carouselNav.querySelector('.current_slide');
    
    const currentSlide = getCurrentSlide();
    const targetSlide = slides[targetIndex];

    moveSlideHandler(targetSlide, currentSlide)
    updateIndicators(currentIndicator, indicators[targetIndex]);
})

setInterval(()=> nextBtn.click(), 2000);



  track.addEventListener("touchmove", (e) => {
    let touch = e.targetTouches[0];
    const px = touch.pageX;
    const midpoint = Math.floor(screen.width / 2);
    if (px > midpoint) {
        nextBtn.click();
    } else {
        prevBtn.click();
    }
  });