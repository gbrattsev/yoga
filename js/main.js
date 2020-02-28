'use strict';

window.addEventListener('DOMContentLoaded', function() {

  // TABS

  let tabHeader = document.querySelector('.info-header'),
      tab = document.querySelectorAll('.info-header-tab'),
      tabContent = document.querySelectorAll('.info-tabcontent'),
      tabMore = document.querySelectorAll('.description-btn');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }    
  }

  tabHeader.addEventListener('click', function(event) {
    
    let target = event.target;

    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  for (let i = 0; i < tabMore.length; i++) {
    tabMore[i].addEventListener('click', function() {
      popup.style.display = 'block';
    });
  }


  // TIMER

  let deadline = '2020-03-01';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor(t / 1000 / 60 / 60);
    // let days = Math.floor(t / 1000 / 60 / 60 / 24);
    
    if (t <= 0) {
      return {
        'total' : 0,
      // 'days' : days,
      'hours' : 0,
      'minutes' : 0,
      'seconds' : 0,
      }
    } else {
      return {
        'total' : t,
        // 'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds,
      }
    }    
  }

  function addZero(num) {
    if (num <= 9) {
      return '0' + num;
    } else return num;
  }

  function setClock(id, endtime) {
    let timer = document.querySelector(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);

      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('#timer', deadline);

  // MODAL

  let moreBtn = document.querySelector('.more'),
      closeBtn = document.querySelector('.popup-close'),
      popup = document.querySelector('.overlay');
  
  moreBtn.addEventListener('click', function() {
    popup.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
    moreBtn.classList.remove('more-splash');
    document.body.style.overflow = 'inherit';
  });

  // FORM

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! В ближайшее время мы с Вами свяжемся!',
    failure: 'Что-то пошло не так((( Попробуйте немного позже...',
  };

  let form = document.querySelectorAll('form'),
      statusMessage = document.createElement('div');

  statusMessage.classList.add('status');

  for (let i = 0; i < form.length; i++) {

    let input = form[i].querySelectorAll('input');

    form[i].addEventListener('submit', function(event) {
      event.preventDefault();
      form[i].appendChild(statusMessage);
      
      let formData = new FormData(form[i]);

      let obj = {};
  
      formData.forEach(function(value, key) {
        obj[key] = value;
      });
  
      let json = JSON.stringify(obj);

      function postData(data) {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          //request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // JSON

          request.onreadystatechange = function() {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4 && request.status == 200) {
              resolve();
            } else {
              reject();
            }
          }

          request.send(data);
        });
      }
      
      function clearInput() {
        for (let i=0; i < input.length; i++) {
          input[i].value = '';
        }
      }

      postData(json)
          .then(() => statusMessage.textContent = message.loading)
          .then(() => statusMessage.textContent = message.success)
          .catch(() => statusMessage.textContent = message.failure)
          .then(clearInput)
  
    });
  }

  // SLIDER

  let slideIndex = 1,
      slides = document.querySelectorAll('.slider-item'),
      prev = document.querySelector('.prev'),
      next = document.querySelector('.next');

});