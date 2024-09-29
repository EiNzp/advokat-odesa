
// burger menu

const iconMenuButton = document.querySelector('.menu__icon-button');
const menuBody = document.querySelector('.menu__body');

if (iconMenuButton && menuBody) {
  iconMenuButton.addEventListener('click', function (e) {
    document.body.classList.toggle('body_lock')
    iconMenuButton.classList.toggle('menu__icon-button_active');
    menuBody.classList.toggle('menu__body_active');
  })
}

let menuItems = [...document.querySelectorAll('.menu__item')];
for (const i in menuItems) {
  let el = menuItems[i]
  el.addEventListener('click', function (e) {
    if (document.querySelector('.menu__body.menu__body_active')) {
      document.body.classList.toggle('body_lock')
      iconMenuButton.classList.toggle('menu__icon-button_active');
      menuBody.classList.toggle('menu__body_active');
    }
  })
}

// Модальные окна услуг НАЧАЛО

document.addEventListener('DOMContentLoaded', function () {
  const modalBtns = document.querySelectorAll('.services__details-btn');
  const modals = document.querySelectorAll('.services__modal');
  const closeBtns = document.querySelectorAll('.services__close-btn');
  const servicesBtns = document.querySelectorAll('.services__services-btn');

  // Открытие модального окна
  modalBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.classList.add('services__show'); // Добавляем класс show
      document.body.classList.add('body_lock'); // Блокируем скролл страницы
    });
  });

  // Закрытие модального окна (по кнопке)
  closeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const modal = this.closest('.services__modal');
      modal.classList.remove('services__show'); // Убираем класс show
      document.body.classList.remove('body_lock'); // Возвращаем скролл страницы
    });
  });

  // Закрытие модального окна (по кнопке "Інші послуги")
  servicesBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const modal = this.closest('.services__modal');
      modal.classList.remove('services__show'); // Убираем класс show
      document.body.classList.remove('body_lock'); // Возвращаем скролл страницы
    });
  });

  // Закрытие модального окна по клику вне контента
  modals.forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('services__show'); // Убираем класс show
        document.body.classList.remove('body_lock'); // Возвращаем скролл страницы
      }
    });
  });
});




// Модальные окна услуг КОНЕЦ


// слайдер swiper-certificates-slider НАЧАЛО

// const swiper1 = new Swiper('.mySwiperOne');


var swiperOne = new Swiper(".mySwiperOne", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 1,
  // centeredSlides: true, // Центрировать текущий слайд
  navigation: {
    nextEl: ".mySwiperOne__swiper-button-next",
    prevEl: ".mySwiperOne__swiper-button-prev",
  },
  thumbs: {
    swiper: swiperTwo,
  },
});
var swiperTwo = new Swiper(".mySwiperTwo", {
  // loop: true,
  spaceBetween: 10,
  slidesPerView: 2,
  freeMode: true,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
});

swiperOne.thumbs.swiper = swiperTwo;
swiperTwo.on('click', (swiper, e) => {
  const clickedIndex = swiper.clickedIndex; // Получаем индекс кликнутого слайда
  if (clickedIndex !== undefined) {
    swiperOne.slideTo(clickedIndex); // Переключаемся на соответствующий слайд основного слайдера
  }
});



const modal = document.getElementById("certificates__modal-image");
const modalImage = document.getElementById("certificates__modal-content");
const closeModal = document.getElementById("certificates__modal-close");

document.querySelectorAll('.mySwiperOne__slide img').forEach(image => {
  image.addEventListener('click', () => {
    modal.style.display = "flex"; // Показываем модальное окно
    modalImage.src = image.src; // Устанавливаем источник изображения

    document.body.classList.add('body_lock'); // Блокируем скролл страницы
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = "none"; // Скрываем модальное окно

  document.body.classList.remove('body_lock'); // Возвращаем скролл страницы
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = "none"; // Скрываем модальное окно

    document.body.classList.remove('body_lock'); // Возвращаем скролл страницы
  }
});
// слайдер swiper-certificates-slider КОНЕЦ


// открытие формы
// window.onload = function() {
const popupForm = document.querySelector('.popup-form');
const buttonsActivForm = [...document.querySelectorAll('[class*="button-form-activ"]')];
const popupThankyou = document.querySelector('.popup-thankyou');

for (const i in buttonsActivForm) {
  let el = buttonsActivForm[i];

  el.addEventListener('click', function (e) {
    e.preventDefault();
    popupForm.classList.remove("popup-form_disable");
    document.body.classList.add('body_lock');
  })
}

// закрытие формы

const closeButton = document.querySelector('.popup-form__close');
if (closeButton) {
  closeButton.addEventListener('click', function () {
    popupForm.classList.add("popup-form_disable");
    document.body.classList.remove('body_lock')
  });
}

popupForm.addEventListener('click', function (e) {
  if (!e.target.closest('.popup-form__content')) {
    popupForm.classList.add("popup-form_disable");
    document.body.classList.remove('body_lock');
  }
})

// провнрка на нажатие кнопки "Esc" у нее код 27
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    popupForm.classList.add("popup-form_disable");
    document.body.classList.remove('body_lock');
  }
})

// отправка формы

$('.form-popup').on('submit', function (event) {

  event.stopPropagation();
  event.preventDefault();

  let form = this,
    submit = $('.submit', form),
    data = new FormData(),
    files = $('input[type=file]')


  $('.submit', form).val('Отправка...');
  $('input, textarea', form).attr('disabled', '');

  data.append('Имя', $('[name="name"]', form).val());
  data.append('Телефон', $('[name="phone"]', form).val());
  data.append('Описание', $('[name="opisanie"]', form).val());


  files.each(function (key, file) {
    let cont = file.files;
    if (cont) {
      $.each(cont, function (key, value) {
        data.append(key, value);
      });
    }
  });

  $.ajax({
    url: 'ajax.php',
    type: 'POST',
    data: data,
    cache: false,
    dataType: 'json',
    processData: false,
    contentType: false,
    xhr: function () {
      let myXhr = $.ajaxSettings.xhr();

      if (myXhr.upload) {
        myXhr.upload.addEventListener('progress', function (e) {
          if (e.lengthComputable) {
            let percentage = (e.loaded / e.total) * 100;
            percentage = percentage.toFixed(0);
            $('.submit', form)
              .html(percentage + '%');
          }
        }, false);
      }

      return myXhr;
    },
    error: function (jqXHR, textStatus) {
      // Тут выводим ошибку
    },
    complete: function () {
      // Тут можем что-то делать ПОСЛЕ успешной отправки формы
      form.reset()
      $('#name').removeAttr('disabled');
      $('#Phone').removeAttr('disabled');
      $('#Opisanie').removeAttr('disabled');
      $('#formPopupSubmit').removeAttr('disabled');
      popupForm.classList.add("popup-form_disable");
      popupThankyou.classList.remove("popup-thankyou_disable");
    }
  });

  return false;
});

// закрытие popup-thankyou

const closeButtonThankyou = document.querySelector('.popup-thankyou__close');
if (closeButton) {
  closeButtonThankyou.addEventListener('click', function () {
    popupThankyou.classList.add("popup-thankyou_disable");
    document.body.classList.remove('body_lock')
  });
}

popupThankyou.addEventListener('click', function (e) {
  if (!e.target.closest('.popup-thankyou__content')) {
    popupThankyou.classList.add("popup-thankyou_disable");
    document.body.classList.remove('body_lock');
  }
})

// провнрка на нажатие кнопки "Esc" у нее код 27
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    popupThankyou.classList.add("popup-thankyou_disable");
    document.body.classList.remove('body_lock');

    modal.style.display = "none";
  }
})


// конец скрипта отправки формы

// }


// slider Swiper



// const swiper = new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'horizontal',
//   // loop: true,
//   slidesPerView: 2,
//   breakpoints: {
//     320: {
//       slidesPerView: 1,
//       spaceBetween: 10
//     },
//     // when window width is >= 480px
//     480: {
//       slidesPerView: 1,
//       spaceBetween: 10
//     },
//     // when window width is >= 640px
//     640: {
//       slidesPerView: 1.15,
//       spaceBetween: 30
//     },
//     900: {
//       slidesPerView: 2.15,
//       spaceBetween: 30
//     }
//   },
//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',

//     clickable: true,

//     dynamicBullets: true,
//   },

//   grabCursor: true,

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },


// });