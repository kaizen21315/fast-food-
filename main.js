
const strip = document.querySelector('.strip');
const nav = document.querySelector('nav');
const menu = document.querySelector('header .menu');
const cart = document.getElementById('cart');

const menuOverlay = document.querySelector('.menu-overlay');
const menuToggle = document.querySelector('.menu-toggle');
const cancelIcon = document.querySelector('.menu .cancel-icon');
const menuCloser = document.querySelector('.menu-closer button');
const menuLinks = document.querySelectorAll('.menu .nav-links a');


let lastScroll = window.scrollY;

function updateHeaderPosition(currentScroll) {
    const stripHeight = strip.offsetHeight;
    const navHeight = nav.offsetHeight;
    const atTop = currentScroll <= 0;

    if (atTop) {
        strip.style.transform = 'translateY(0)';
        nav.style.transform = `translateY(${stripHeight}px)`;

    } else if (currentScroll > lastScroll && currentScroll > stripHeight) {
        strip.style.transform = 'translateY(-100%)';
        nav.style.transform = `translateY(-${navHeight}px)`;

    } else if (currentScroll < lastScroll) {
        strip.style.transform = 'translateY(-100%)';
        nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
}

// set correct position immediately on load, before any scroll happens
updateHeaderPosition(window.scrollY);

window.addEventListener('scroll', () => {
    updateHeaderPosition(window.scrollY);
});

function openMenu() {
    menu.classList.add('active');
    menuOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    cancelIcon.focus();
    document.body.style.overflow = 'hidden';

}

function closeMenu() {
    menu.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
    document.body.style.overflow = '';

}

menuOverlay.addEventListener('click', closeMenu);


menuToggle.addEventListener('click', (e) => {
    openMenu();
});

cancelIcon.addEventListener('click', closeMenu);
menuCloser.addEventListener('click', closeMenu);


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
        closeMenu();
    }
});

menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});


const zoneBtns = document.querySelectorAll('.zone-btn')
const overlay = document.querySelector('.overlay')

function closeAll() {
    zoneBtns.forEach(btn => {
        const panel = document.getElementById(btn.getAttribute("aria-controls"))
        panel.classList.add("hidden")
        btn.setAttribute("aria-expanded", "false")
        btn.closest(".zone-group").classList.remove("active-zone")
    })
    overlay.classList.remove("active")
}

zoneBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const targetPanel = document.getElementById(btn.getAttribute("aria-controls"))
        const isExpanded = btn.getAttribute("aria-expanded") === "true"

        closeAll()

        if (!isExpanded) {
            targetPanel.classList.remove("hidden")
            btn.setAttribute("aria-expanded", "true")
            btn.closest(".zone-group").classList.add("active-zone")
            overlay.classList.add("active")
        }
    })
})

// click on the dark overlay closes everything
overlay.addEventListener("click", closeAll)

// click anywhere else outside a zone-group also closes it
document.addEventListener("click", (e) => {
    if (!e.target.closest(".zone-group")) {
        closeAll()
    }
})

document.querySelector('.year').textContent = new Date().getFullYear();
