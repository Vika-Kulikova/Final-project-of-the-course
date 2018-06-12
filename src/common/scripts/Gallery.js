class Gallery {


  constructor(cssSelector) {
    this.slider = document.querySelector(cssSelector);
    this.listSlides = this.slider.querySelector('.gallery-slides');
    this.slides = this.slider.querySelectorAll('.gallery-slide');

    // this.controlNext = this.slider.querySelector('.control-next');
    // this.controlPrev = this.slider.querySelector('.control-prev');
    this.controlNext = null;
    this.controlPrev = null;

    this.init();
  }


  init() {
    this.renderControls();
    this.handleEvents();
  }

  handleEvents() {
    let positionSlide = 0;
    let width = 370;
    let count = 1;

    this.controlPrev.addEventListener('click', () => {
      positionSlide = Math.min(positionSlide + width * count, 0);
      this.listSlides.style.marginLeft = positionSlide + 'px';
    });

    this.controlNext.addEventListener('click', () => {
      positionSlide = Math.max(positionSlide - width * count, -width * (this.slides.length - count));
      if (positionSlide < -width * 4) {
        positionSlide = -width * 4;
      }
      this.listSlides.style.marginLeft = positionSlide + 'px';
    });
  }

  renderControls() {
    const controlsWrapper = document.createElement('div');
    controlsWrapper.classList.add('gallery-control-buttons');

    this.controlPrev = document.createElement('button');
    this.controlPrev.textContent = 'prev';
    this.controlPrev.classList.add('control-prev', 'control');

    this.controlNext = document.createElement('button');
    this.controlNext.textContent = 'Next';
    this.controlNext.classList.add('control-next', 'control');


    controlsWrapper.appendChild(this.controlPrev);
    controlsWrapper.appendChild(this.controlNext);


    this.slider.appendChild(controlsWrapper);
  } //добавляем кнопки

}

export { Gallery };