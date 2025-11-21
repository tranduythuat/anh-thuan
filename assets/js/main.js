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


  async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("🚀 ~ handleFormSubmit ~ data:", data);

    const {
      name: name,
      confirm_nhagai: confirm_nhagai,
      attendance_nhagai: attendance_nhagai,
      confirm_nhatrai: confirm_nhatrai,
      attendance_nhatrai: attendance_nhatrai,
      dietary: dietary,
      dietary_other: dietary_other,
      message: message,
    } = data;
    console.log("🚀 ~ handleFormSubmit 2~ data:", data);

    // Thông báo khi bắt đầu gửi
    Swal.fire({
      title: 'Đang gửi ...',
      text: "Vui lòng chờ trong giây lát",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const url = "https://script.google.com/macros/s/AKfycbz9zSfCIjnyjK6NSmYdP2xrpVqlRF6T-eUsFTc5nhz-YLoovez0QnmiEVyc_aU79OQ0/exec?sheet=confirm";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name,
          confirm_nhagai,
          attendance_nhagai,
          confirm_nhatrai,
          attendance_nhatrai,
          dietary,
          dietary_other,
          message
        }),
      });

      const result = await res.json().catch(() => ({}));
      console.log("Server response:", result);

      form.reset();

      // Thông báo thành công
      Swal.fire({
        title: "Thành công!",
        text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#000",
      });
    } catch (error) {
      console.error("Error:", error);

      // Thông báo lỗi
      Swal.fire({
        title: "Lỗi!",
        text: "OPPS! Đã xảy ra lỗi: " + error.message,
        icon: "error",
        confirmButtonText: "Thử lại",
        confirmButtonColor: "#000",
      });
    }
  }

  const btn = document.getElementById('player-btn');
  btn.addEventListener('click', toggleMusic);

  const form = document.forms["rsvpForm"];
  if (form) {
    form.addEventListener("submit", (e) => handleFormSubmit(e));
  }
});
