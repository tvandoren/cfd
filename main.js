const ONE_DAYS_IN_MS = 1 * 24 * 60 * 60 * 1000;
const RATING_MAX = 5;
const RATING_MIN = 1;

function displayRandomDefect() {
  const defect = defects[Math.floor(Math.random() * defects.length)];
  const rating = Math.max(RATING_MIN, Math.min(RATING_MAX, defect.rating));
  const fakeEntryTime = new Date(Date.now() - Math.random() * ONE_DAYS_IN_MS);
  const container = document.getElementById("defect-container");

  container.innerHTML = `
      <h2>Recently Found Defect</h2>
      <p class="rating">Frustration Level: <span>${"🔥".repeat(
        rating
      )}</span><span style="color: grey; filter: grayscale(100%);">${"🔥".repeat(
    RATING_MAX - rating
  )}</span></p>
      <p><strong>Submitted:</strong> ${fakeEntryTime.toLocaleString()}</p>
      <p><strong>Product:</strong> ${defect.product}</p>
      <p><strong>Expected Behavior:</strong> ${defect.expected}</p>
      <p><strong>Actual Behavior:</strong> ${defect.actual}</p>
      <p><strong>Customer Quote:</strong> "${defect.quote}"</p>
  `;
}

function showForm() {
  document.getElementById("form-modal").classList.remove("hidden");
}

function hideAndResetForm() {
  document.getElementById("form-modal").classList.add("hidden");
  document.getElementById("defectForm").reset();
}

const ASTLEY_CHORUS = [
  { message: "Never gonna give you up" },
  { message: "Never gonna let you down" },
  { message: "Never gonna run around and desert you", time: 3000 },
  { message: "Never gonna make you cry" },
  { message: "Never gonna say goodbye" },
  { message: "Never gonna tell a lie and hurt you", time: 3000 },
];

const LOADING_MESSAGES = [
  "Analyzing defect severity",
  "Checking duplicate reports",
  "Validating customer frustration levels",
  "Preparing enhancement request",
  ASTLEY_CHORUS[0].message,
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const text = document.getElementById("loading-text");
const modal = document.getElementById("loading");
const spinner = document.getElementById("spinner");
const astley = document.getElementById("astley");
const contribute = document.getElementById("contribute");

async function handleFormSubmit(event) {
  event.preventDefault();

  hideAndResetForm();
  modal.classList.remove("hidden");

  for (message of LOADING_MESSAGES) {
    // random delay between 1 and 5 seconds for each state
    text.textContent = `${message}...`;
    await delay(message === ASTLEY_CHORUS[0].message ? 2000 : 1000 + Math.random() * 4000);
  }

  spinner.classList.add("hidden");
  astley.classList.remove("hidden");
  contribute.classList.remove("hidden");

  for ({ message, time } of [ASTLEY_CHORUS.slice(1), ASTLEY_CHORUS].flat()) {
    text.textContent = message;
    await delay(time ?? 2000);
  }

  modal.classList.add("hidden");
  spinner.classList.remove("hidden");
  astley.classList.add("hidden");
  contribute.classList.add("hidden");
  displayRandomDefect();
}

document.addEventListener("DOMContentLoaded", () => {
  displayRandomDefect();
  document.getElementById("defectForm")?.addEventListener("submit", handleFormSubmit);
});
