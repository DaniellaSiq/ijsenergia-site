const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => menu.classList.toggle('open'));
}

const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
const dotsContainer = document.getElementById('sliderDots');
const prevButton = document.getElementById('prevSlide');
const nextButton = document.getElementById('nextSlide');
let currentSlide = 0;
let autoPlay;

function renderDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot ${index === currentSlide ? 'active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlider();
      restartAutoplay();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
  dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}

function goToSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  updateSlider();
}

function startAutoplay() {
  autoPlay = setInterval(() => goToSlide(1), 4200);
}

function restartAutoplay() {
  clearInterval(autoPlay);
  startAutoplay();
}

prevButton?.addEventListener('click', () => {
  goToSlide(-1);
  restartAutoplay();
});

nextButton?.addEventListener('click', () => {
  goToSlide(1);
  restartAutoplay();
});

renderDots();
updateSlider();
startAutoplay();

const budgetForm = document.getElementById('budgetForm');
if (budgetForm) {
  budgetForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const tipo = document.getElementById('tipo').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const texto = `Olá! Gostaria de solicitar um orçamento com a I.J.S Soluções Energéticas.%0A%0A` +
      `Nome: ${nome}%0A` +
      `Telefone: ${telefone}%0A` +
      `Cidade/Região: ${cidade}%0A` +
      `Tipo de projeto: ${tipo}%0A` +
      `Mensagem: ${mensagem || 'Não informado'}`;

    window.open(`https://wa.me/5566992185889?text=${texto}`, '_blank');
  });
}
