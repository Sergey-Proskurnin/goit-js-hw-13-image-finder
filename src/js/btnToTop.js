document.addEventListener('DOMContentLoaded', () => {

    let toTopBtn = document.querySelector('.to-up');

    window.onscroll = function () {
        if (window.pageYOffset > 580) {
            toTopBtn.style.display = 'block'
            toTopBtn.style.visibility = 'visible'
            toTopBtn.style.opacity = 1
        } else {
            toTopBtn.style.display = 'none'
            // toTopBtn.style.visibility = 'visible'
        }
    }

    // плавный скролл наверх 
    toTopBtn.addEventListener('click', function () {
        window.scrollBy({
            top: -document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
});