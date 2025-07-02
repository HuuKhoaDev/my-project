const menuToggle = document.querySelector(".navbar_toggle");
const navbarDropdown = document.querySelector(".navbar_dropdown");
const navbarHome = document.querySelector(".navbar_home");

document.addEventListener("DOMContentLoaded", function () {
  menuToggle.addEventListener("click", function () {
    navbarDropdown.classList.toggle("show");
    navbarHome.classList.toggle("show");
  });
});

const radios = document.querySelectorAll('input[name="payment"]');
const methods = document.querySelectorAll(".payment-method");

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    methods.forEach((method) => method.classList.remove("active"));
    radio.closest(".payment-method").classList.add("active");
  });
});

const images = document.querySelectorAll(".carousel__image");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function showSlide(index) {
  images.forEach((img, i) => {
    img.classList.toggle("hidden", i !== index);
    dots[i].classList.toggle("active", i === index);
  });
  currentIndex = index;
}

document
  .querySelector(".carousel__arrow.right")
  .addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % images.length;
    showSlide(nextIndex);
  });

document
  .querySelector(".carousel__arrow.left")
  .addEventListener("click", () => {
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(prevIndex);
  });

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
  });
});
