const videoPopup = document.getElementById("videoPopup");
const closeButton = document.getElementById("closeButton");
const videoIframes = document.querySelectorAll(".videoIframe");
let player;
let popupSwiper;
const vimeoAccessToken = "ec0ea8913b8a2430ebcca19d596634a8";

closeButton.addEventListener("click", closeVideoPopup);
document.addEventListener("keydown", handleKeyPress);

const mainSwiper = new Swiper(".main-swiper", {
  slidesPerView: 4,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".main-pagination",
    clickable: true,
  },
  on: {
    click: function () {
      const videoId = this.slides[this.activeIndex].dataset.videoId;
      openVideoPopup(videoId);
    },
  },
});

function openVideoPopup(videoId) {
  if (player) {
    player.unload();
  }

  player = new Vimeo.Player(videoIframes[mainSwiper.activeIndex], {
    id: parseInt(videoId),
    accessToken: vimeoAccessToken,
    autoplay: true,
  });

  videoPopup.style.display = "flex";

  initPopupSwiper(videoId);
}

function closeVideoPopup() {
  videoPopup.style.display = "none";
  if (player) {
    player.unload();
  }
  if (popupSwiper) {
    popupSwiper.destroy();
    popupSwiper = null;
  }
}

function handleKeyPress(event) {
  if (event.key === "Escape") {
    closeVideoPopup();
  }
}

function initPopupSwiper() {
  popupSwiper = new Swiper("#popupSwiper", {
    slidesPerView: 1,
    pagination: {
      el: ".popup-pagination",
      clickable: true,
    },
  });

  popupSwiper.on("slideChange", function () {
    const currentVideoId =
      popupSwiper.slides[popupSwiper.activeIndex].dataset.videoId;

    if (player) {
      player.unload();
    }

    player = new Vimeo.Player(videoIframes[popupSwiper.activeIndex], {
      id: parseInt(currentVideoId),
      autoplay: true,
      loop: false,
    });
  });
}

mainSwiper.on("click", function () {
  const videoId = mainSwiper.slides[mainSwiper.clickedIndex].dataset.videoId;

  openVideoPopup(videoId);
});

function openVideoPopup(videoId) {
  if (player) {
    player.unload();
  }

  player = new Vimeo.Player(videoIframes[mainSwiper.activeIndex], {
    id: parseInt(videoId),
    accessToken: vimeoAccessToken,
    autoplay: true,
  });

  videoPopup.style.display = "flex";

  initPopupSwiper(videoId);
}

mainSwiper.on("click", function () {
  const videoId = mainSwiper.slides[mainSwiper.clickedIndex].dataset.videoId;

  openVideoPopup(videoId);
});
// });
//
