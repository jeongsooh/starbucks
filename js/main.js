const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function() {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

/* window는 우리가 보고 있는 그 화면 자체라고 생각하면 된다.
보고 있는 화면에서 scroll이 발생하면 (이벤트가 발생하면) 어떤 핸들러(function)가 동작
하도록 한다. */
/* 그런데, 스크롤 이벤트는 순식간에 너무나 많이 발생하므로 부하를 과중하지
않도록 lodash란 외부 라이브러리에서 제공하는 throttle이란 function을 도입하여
300ms에 한번씩 체크하도록 하여 부하를 경감시키는 루틴이다. */
/* _.throttle(함수, 시간)  */
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // badge 숨기기
    // badgeEl.style.display = 'none';
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });

  } else {
    // badge 보이기
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
    
  }
}, 300));


toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});

/* 요소들이 애니메이션 형태로 반복되도록 ...... */
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1)*.7,    // 0.7, 1.4, 2.1, 2.7 ....
    opacity:1
  });
});

// swipe js 사용하는 코드
// Swiper(CSS 선택자, 옵션)

new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3,  // 한번에 보여지는 슬라이드의 수
  spaceBetween: 10,  // 슬라이드 사이의 여백
  centeredSlides: true,  // 1번 슬라이드가 가운데 보이도록 
  loop: true,
  // autoplay: {
  //   delay: 5000
  // }
  pagination: {
    el: '.promotion .swiper-pagination',  // 페이지 번호 요소 선택자
    clickable: true  // 사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김처리
    promotionEl.classList.add('hide');
  } else {
    // 보임처리
    promotionEl.classList.remove('hide');
  }
});

function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작시간
    {
      y: size,
      repeat: -1,  // 무한 반복
      yoyo: true,  // 애니메이션 한번 실행 후 다시 돌아오는 조건
      ease: Power1.easeInOut,
      delay: random(0, delay)
    }
  );
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,    // 보여짐 여부를 감시할 요소를 지정  
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();   //2021