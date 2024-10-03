const circles = document.querySelectorAll('.circle');
const shadows = document.querySelectorAll('.shadow');
const wrapper = document.querySelector('.wrapper');

setTimeout(() => {
  circles.forEach(circle => circle.style.display = 'none');
  shadows.forEach(shadow => shadow.style.display = 'none');
  wrapper.style.display = 'none';
  window.location.href = 'home.html';
}, 5000);