const ACTIVE_SLIDE_CSS_CLASS = 'slide_active';
const ACTIVE_PAGER_ITEM_CSS_CLASS = 'slider-pager-item_active';

class Slider {
  constructor(cssSelector) {
    this.slider = document.querySelector(cssSelector);
    this.slides = Array.from(this.slider.querySelectorAll('.slide'));
    this.controlNext = null;
    this.controlPrev = null;
    this.activeSlideIndex = 0;
    this.init();
  }

  init() {
    this.wrappContent();
    this.renderControls();
    this.renderPager();
    this.handleEvents();
    this.switchSlide();
  }

  wrappContent() {
    const wrapperSlides = document.createElement('div');

    wrapperSlides.classList.add('slider-wrapper');

    this.slides.forEach((slideElement) => {
      wrapperSlides.append(slideElement);
    });

    this.slider.innerHTML = '';
    this.slider.appendChild(wrapperSlides);
  }

  renderControls() {
    const controlsWrapper = document.createElement('div');
    controlsWrapper.classList.add('slider-control-buttons');

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


  enableSlide() {
    const slide = this.slides[this.activeSlideIndex];
    if (slide === undefined) {
      throw new Error('Active slide index should be from 0 to slide length');
    }
    slide.classList.add(ACTIVE_SLIDE_CSS_CLASS);
  }

  disableSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(ACTIVE_SLIDE_CSS_CLASS);
    });
  }

  switchImage() {
    this.disableSlides();
    this.enableSlide();
  }

  switchPager() {
    const currentPagerItem = this.pagerItems[this.activeSlideIndex];

    this.pagerItems.forEach((item) => {
      item.classList.remove(ACTIVE_PAGER_ITEM_CSS_CLASS);
    });

    currentPagerItem.classList.add(ACTIVE_PAGER_ITEM_CSS_CLASS);
  }

  increaseSlideIndex() {
    if (this.activeSlideIndex + 1 < this.slides.length) {
      this.activeSlideIndex++;
    } else {
      this.activeSlideIndex = 0;
    }
  }

  decreaseSlideIndex() {
    if (this.activeSlideIndex - 1 >= 0) {
      this.activeSlideIndex--;
    } else {
      this.activeSlideIndex = this.slides.length - 1;
    }
  }

  switchSlide() {
    this.switchImage();
    this.switchPager();
  }

  handleEvents() {
    this.controlNext.addEventListener('click', () => {
      this.increaseSlideIndex();
      this.switchSlide();
    });
    this.controlPrev.addEventListener('click', () => {
      this.decreaseSlideIndex();
      this.switchSlide();
    });
  }

  renderPager() {
    this.pagerItems = [];
    const pagerWrapper = document.createElement('ul');
    pagerWrapper.classList.add('slider-pager', 'pager');

    this.slides.forEach((slide, i) => {
      const pagerItem = document.createElement('li');
      pagerItem.classList.add('slider-pager-item');

      if (this.activeSlideIndex === i) {
        pagerItem.classList.add(ACTIVE_PAGER_ITEM_CSS_CLASS);
      }

      pagerItem.addEventListener('click', () => {
        this.activeSlideIndex = i;
        this.switchSlide();
      });

      this.pagerItems.push(pagerItem);
      pagerWrapper.appendChild(pagerItem);
    });

    this.slider.appendChild(pagerWrapper);
  } //добавляем кружочки пейджера

}

export { Slider };