document.addEventListener('DOMContentLoaded', function() {
  // 페이드 인 애니메이션
  if (sessionStorage.getItem('fadeIn')) {
      document.body.style.opacity = '0';
      setTimeout(() => {
          document.body.style.opacity = '1';
      }, 10);
      sessionStorage.removeItem('fadeIn');
  }

  // 커리어 링크 클릭 시 페이드 아웃 애니메이션 적용
  const careerLink = document.getElementById('careerLink');
  if (careerLink) {
      careerLink.addEventListener('click', function(event) {
          event.preventDefault(); // 기본 링크 동작을 막음
          document.body.classList.add('fade-out');
          sessionStorage.setItem('fadeIn', true);
          setTimeout(function() {
              window.location.href = 'career.html';
          }, 1000); // 1초 후 페이지 이동
      });
  }
});
