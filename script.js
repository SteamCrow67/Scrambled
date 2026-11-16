// Плавное появление секций при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.about, .idea, .gallery, .quote').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    observer.observe(section);
  });
  
  // Класс для анимации появления
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
  
  // Параллакс для постера в hero
  const poster = document.querySelector('.hero__poster');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (poster && scrolled < window.innerHeight) {
      poster.style.transform = `translateY(${scrolled * 0.15}px) rotate(-2deg)`;
    }
  });
  
  // ========== Загрузка мультика ==========
const dropZone  = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const urlInput  = document.getElementById('urlInput');
const player    = document.getElementById('player');

if (dropZone) {
  // Загрузка файла
  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) showFile(e.target.files[0]);
  });

  function showFile(file) {
    const url = URL.createObjectURL(file);
    player.innerHTML = `<video src="${url}" controls autoplay></video>`;
  }

  // Загрузка по ссылке
  window.loadFromUrl = function () {
    const url = urlInput.value.trim();
    if (!url) return alert('Вставь ссылку!');

    // YouTube
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (yt) {
      player.innerHTML = `<iframe height="405"
        src="https://www.youtube.com/embed/${yt[1]}" frameborder="0"
        allowfullscreen></iframe>`;
      return;
    }

    // Обычное видео
    player.innerHTML = `<video src="${url}" controls autoplay></video>`;
  };

  // Drag & Drop
  ['dragenter','dragover'].forEach(ev =>
    dropZone.addEventListener(ev, e => {
      e.preventDefault();
      dropZone.classList.add('drag');
    })
  );
  ['dragleave','drop'].forEach(ev =>
    dropZone.addEventListener(ev, e => {
      e.preventDefault();
      dropZone.classList.remove('drag');
    })
  );
  dropZone.addEventListener('drop', e => {
    const file = e.dataTransfer.files[0];
    if (file) showFile(file);
  });
}
  // Лёгкий tilt-эффект для карточек
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -5;
      const ry = ((x - cx) / cx) * 5;
      card.style.transform = `translateY(-10px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
  
  // Клик по кадрам галереи — лёгкая анимация
  document.querySelectorAll('.gallery__grid img').forEach(img => {
    img.addEventListener('click', () => {
      img.style.transition = 'transform 0.6s';
      img.style.transform = 'scale(1.1) rotate(2deg)';
      setTimeout(() => {
        img.style.transform = '';
      }, 600);
    });
  });
// ========== Интерактив: ассоциации ==========
const moodSection = document.getElementById('mood');
const moodResult = document.getElementById('moodResult');
const moodEmoji = document.getElementById('moodEmoji');
const moodState = document.getElementById('moodState');
const moodText = document.getElementById('moodText');
const moodWords = document.querySelectorAll('.mood-word');

// Тексты для каждого состояния
const stateTexts = {
  'Радость': 'Светлое чувство, которое делает мир ярче. Как в мультфильме — когда привычное вдруг становится волшебным.',
  'Скука': 'Серый день, который тянется бесконечно. Знакомо? Именно из этого состояния и начинается Scramble.',
  'Злость на рутину': 'Момент, когда хочется всё взорвать и начать заново. Именно тогда и происходит настоящее "взбалтывание".'
};

if (moodSection) {
  moodWords.forEach(word => {
    word.addEventListener('click', () => {
      const color = word.dataset.color;
      const emoji = word.dataset.emoji;
      const state = word.dataset.state;

      // Убираем активный класс у всех слов
      moodWords.forEach(w => w.classList.remove('active'));
      // Добавляем активный класс нажатому слову
      word.classList.add('active');

      // Меняем фон секции
      moodSection.style.background = color;

      // Показываем результат
      moodEmoji.textContent = emoji;
      moodState.textContent = state;
      moodText.textContent = stateTexts[state];
      moodResult.classList.add('show');

      // Перезапуск анимации эмодзи
      moodEmoji.style.animation = 'none';
      setTimeout(() => {
        moodEmoji.style.animation = 'pop 0.6s ease';
      }, 10);
    });
  });
}