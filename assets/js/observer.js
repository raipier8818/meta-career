document.addEventListener('DOMContentLoaded', async function () {
  await fetch("./assets/data/data.json").then(async res => {
    const data = await res.json();
    const career = data.career;
    console.log(career);

    // add career data to the page

    // add ul in nav
    const nav = document.querySelector('nav.nav');
    const ul = document.createElement('ul');
    const main = document.querySelector('main');

    // create li and a for each career
    // create div in main for each career
    career.forEach((career, index) => {
      const li = document.createElement('li');

      const a = document.createElement('a');
      a.href = `#${index}`;

      const span = document.createElement('span');
      span.innerText = `${career.title} ${career.subtitle}`;

      const circle = document.createElement('div');
      circle.classList.add('circle');

      ul.appendChild(li);
      li.appendChild(a);
      a.appendChild(span);
      a.appendChild(circle);

      const event = document.createElement('div');
      event.id = index;
      event.classList.add('event');
      event.setAttribute("data-img-src", career.img);

      const left = document.createElement('div');
      left.classList.add('left');

      const right = document.createElement('div');
      right.classList.add('right');

      const careerDiv = document.createElement('div');
      careerDiv.classList.add('career');

      const title = document.createElement('div');
      title.classList.add('title');
      title.innerText = career.title;

      const subtitle = document.createElement('h3');
      subtitle.innerText = career.subtitle;

      const content = document.createElement('p');
      content.innerText = career.content;

      careerDiv.appendChild(title);
      careerDiv.appendChild(subtitle);
      careerDiv.appendChild(content);

      right.appendChild(careerDiv);

      event.appendChild(left);
      event.appendChild(right);

      main.appendChild(event);
    });

    nav.appendChild(ul);

  });

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        adjustOpacity();
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  const targets = document.querySelectorAll('.event');
  targets.forEach(target => {
    observer.observe(target);
  });

  const adjustOpacity = () => {
    const allEvents = Array.from(document.querySelectorAll('.event'));
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    let closestEvent = null;
    let minDistance = Infinity;

    allEvents.forEach(event => {
      const eventRect = event.getBoundingClientRect();
      const eventCenter = eventRect.top + eventRect.height / 2;
      const distanceFromCenter = Math.abs(viewportCenter - eventCenter);

      if (distanceFromCenter < minDistance) {
        closestEvent = event;
        minDistance = distanceFromCenter;
      }

      if (distanceFromCenter < eventRect.height / 2) {
        event.classList.add('visible');
        event.classList.remove('near-visible', 'far-visible', 'hidden');
      } else if (distanceFromCenter < eventRect.height * 1.5) {
        event.classList.add('near-visible');
        event.classList.remove('visible', 'far-visible', 'hidden');
      } else if (distanceFromCenter < eventRect.height * 2.5) {
        event.classList.add('far-visible');
        event.classList.remove('visible', 'near-visible', 'hidden');
      } else {
        event.classList.add('hidden');
        event.classList.remove('visible', 'near-visible', 'far-visible');
      }
    });
    const gallary = document.querySelector('.gallery img'); // imgContainer 내의 이미지 선택

    if (closestEvent) {
      const monthId = closestEvent.getAttribute('id');
      const imgSrc = closestEvent.dataset.imgSrc; // data-img-src 속성에서 이미지 경로 가져오기
      gallary.src = imgSrc; // 이미지 소스 변경

      document.querySelectorAll('nav.nav a').forEach(anchor => {
        anchor.classList.remove('active');
        if (anchor.getAttribute('href').substring(1) === monthId) {
          anchor.classList.add('active');
        }
      });
    }
  };

  // Initial call to set opacity on load
  adjustOpacity();

  // Adjust opacity on scroll
  window.addEventListener('scroll', adjustOpacity);

  // Smooth scrolling
  document.querySelectorAll('nav.nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      const headerOffset = document.querySelector('header').offsetHeight; // Adjust this value to match the height of your header or any other offset
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset - targetElement.offsetHeight / 2;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Position nav next to main
  const nav = document.querySelector('nav.nav');
  const main = document.querySelector('main');
  const positionNav = () => {
    const mainRect = main.getBoundingClientRect();
    nav.style.left = `${mainRect.right + 20}px`; // 20px gap between main and nav
  };

  positionNav();
  window.addEventListener('resize', positionNav);

  setTimeout(() => {
    document.querySelector('body').classList.add('fade-in');
  }, 100); // Small delay to ensure initial styles are applied
});

