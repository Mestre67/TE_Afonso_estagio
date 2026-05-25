const faces = document.querySelectorAll(".face");
const counters = document.querySelectorAll(".counter");

faces.forEach((face, index) => {
  let count = 0;
  let blocked = false;

  face.addEventListener("click", () => {

    if (blocked) return;

    count++;
    counters[index].textContent = count;

    blocked = true;
    face.classList.add("blocked");

    setTimeout(() => {
      blocked = false;
      face.classList.remove("blocked");
    }, 2000);

  });
});
