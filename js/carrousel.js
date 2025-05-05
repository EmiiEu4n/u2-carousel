function autoplayCarousel() {
  const carouselEl = document.getElementById("carousel");
  const slideContainerEl = carouselEl.querySelector("#slide-container");
  const slideEl = carouselEl.querySelector(".slide");
  let slideWidth = slideEl.offsetWidth;

  let autoplay;  // Se declara aquí para poder reiniciar el setInterval
  
  // Función para iniciar el autoplay
  const startAutoplay = () => {
    autoplay = setInterval(() => navigate("forward"), 3500);
  };

  // Detener el autoplay
  const stopAutoplay = () => {
    clearInterval(autoplay);
  };

  // Iniciar el autoplay por primera vez
  startAutoplay();

  // Reiniciar el autoplay cuando haya interacción
  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  // Añadir eventos de interacción
  document
    .querySelector("#back-button")
    .addEventListener("click", () => {
      navigate("backward");
      resetAutoplay();
    });

  document
    .querySelector("#forward-button")
    .addEventListener("click", () => {
      navigate("forward");
      resetAutoplay();
    });

  document.querySelectorAll(".slide-indicator").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      navigate(index);
      resetAutoplay();
    });
    dot.addEventListener("mouseenter", () => stopAutoplay()); // Detener el autoplay al pasar el mouse
    dot.addEventListener("mouseleave", () => startAutoplay()); // Reiniciar el autoplay al quitar el mouse
  });

  // Añadir manejadores de teclado
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      stopAutoplay();
      navigate("backward");
      startAutoplay();
    } else if (e.code === "ArrowRight") {
      stopAutoplay();
      navigate("forward");
      startAutoplay();
    }
  });

  // Añadir manejador de cambio de tamaño
  window.addEventListener("resize", () => {
    slideWidth = slideEl.offsetWidth;
  });

  // Slide transition
  const getNewScrollPosition = (arg) => {
    const gap = 0;
    const maxScrollLeft = slideContainerEl.scrollWidth - slideContainerEl.clientWidth;
    let newPosition = slideContainerEl.scrollLeft;

    if (arg === "forward") {
      newPosition += slideWidth + gap;
      if (newPosition > maxScrollLeft) {
        newPosition = 0;
      }
    } else if (arg === "backward") {
      newPosition -= slideWidth + gap;
      if (newPosition < 0) {
        newPosition = maxScrollLeft;
      }
    } else if (typeof arg === "number") {
      newPosition = arg * (slideWidth + gap);
      newPosition = Math.max(0, Math.min(newPosition, maxScrollLeft));
    }

    return newPosition;
  };

  const navigate = (arg) => {
    slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  };

  // Slide indicators
  // const slideObserver = new IntersectionObserver(
  //   (entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const slideIndex = entry.target.dataset.slideindex;
  //         console.log(slideIndex);
  //         carouselEl
  //           .querySelector(".slide-indicator.active")
  //           .classList.remove("active");
  //         carouselEl
  //           .querySelectorAll(".slide-indicator")
  //           [slideIndex].classList.add("active");
  //       }
  //     });
  //   },
  //   { root: slideContainerEl, threshold: 0.1 }
  // );

  // document.querySelectorAll(".slide").forEach((slide) => {
  //   slideObserver.observe(slide);

  // });

  // Pause autoplay on hover over carousel
  slideContainerEl.addEventListener("mouseenter", () => {
    stopAutoplay();
  });

  // Restart autoplay after mouse leaves carousel
  slideContainerEl.addEventListener("mouseleave", () => {
    startAutoplay();
  });
}

autoplayCarousel();
