// assets/js/observer.js
document.addEventListener('DOMContentLoaded', function () {
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

    if (closestEvent) {
      const monthId = closestEvent.getAttribute('id');
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
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset - targetElement.offsetHeight / 2;

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
    document.querySelector('main').classList.add('fade-in');
    document.querySelector('.empty').classList.add('fade-in');
  }, 100); // Small delay to ensure initial styles are applied
});
