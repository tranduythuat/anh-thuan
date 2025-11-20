// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  gsapFlipIn(".animate-flip");
  gsapFadeIn(".fade-in");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
  gsapFadeUp(".fade-up");
  gsapFadeDown(".fade-down");
  gsapRotateBottomLeft(".rotate-bl");
  gsapRotateBottomRight(".rotate-br");
  gsapFlipVerticalLeft(".flip-vertical-left");
  gsapRollInLeft(".roll-in-left");
  gsap_rotate_bl__float(".rotate-bl--float");

  // Tạo timeline
  const tl = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".box",
      start: "top 90%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  // Thêm các animation theo thứ tự
  tl.from(".red", { x: -100, opacity: 0 })        // box đỏ bay xuống
    .from(".blue", { x: -100, opacity: 0 }, "-=0.3")       // box xanh bay từ trái
    .from(".green", { x: -100, opacity: 0 }, "-=0.3");    // box xanh lá phóng to dần

  async function toggleMusic(e) {
    console.log('togle')
    const audio = document.getElementById('audio');
    const iconSvg = document.getElementById('iconSvg');
    if (!audio.src) {
        alert('Chưa có nhạc, vui lòng thêm src cho audio.');
        return;
    }
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    audio.addEventListener('play', () => {
        iconSvg.classList.add('spin');
    });
    audio.addEventListener('pause', () => {
        iconSvg.classList.remove('spin');
    });
  }
  const btn = document.getElementById('player-btn');
  btn.addEventListener('click', toggleMusic);
});
