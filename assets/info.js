// Utility function for delaying (or causing our program to slow down) an action and letting us see the results of each "round"
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// get the elements from the document
const lander = document.querySelector("#lander");
const testAngle = document.querySelector("#testAngle");
const landerAngle = document.querySelector("#landerAngle");
const testButton = document.querySelector("a");
const timeRemaining = document.querySelector("#time");
const landerStatus = document.querySelector("#status");
const report = document.querySelector(".report");
const wrapper = document.querySelector(".wrapper");
const bg = document.querySelector(".bg");
// get the rocket noise from the file system
const rocketNoise = new Audio("./assets/rocket-engine.mp3");

// Create a list to handle the events of each round
const testResults = [];

// Vibration array
const vibrate = [200, 50, 25, 50, 20, 20, 17, 28, 17, 20, 20, 25, 50, 50, 200];

// Lander object to be used in the functions
const landerObj = {
  angle: 0,
  isAlive: true,
};

// Function to test your algorithm
async function test() {
  // disable testButton
  testButton.classList.add("disabled");
  testButton.innerHTML = "Testing...";
  // Make everything go crazy!
  bg.classList.add("bg-active");
  rocketNoise.play();
  window.navigator.vibrate(vibrate);
  // generate a random angle
  var angle = Math.random() * 180; // Changed this to 180 for more "realistic" animation...
  angle = Math.round(angle * 100) / 100;
  //   set the test angle in the document
  testAngle.innerHTML = `${angle}&deg;`;
  landerAngle.innerHTML = `${angle}&deg`;
  // set the angle of the lander
  landerObj.angle = angle;
  lander.style.transform = `rotate(${landerObj.angle}deg)`;
  //   Call the students' function
  await sleep(100);
  lander.style.transform = `rotate(${stayAlive(angle)}deg)`;
  landerObj.angle = stayAlive(angle);
  landerAngle.innerHTML = `${stayAlive(angle)}&deg`;
  landerObj.angle === 12
    ? (landerStatus.innerHTML = "👍")
    : (landerStatus.innerHTML = "💩");
  testResults.push({
    testAngle: angle,
    landerAngle: landerObj.angle,
  });
  return angle;
}

// Function to start the test and run it for ten rounds
async function beginTest() {
  // Interval for the test
  for (var i = 0; i < 100; i++) {
    test();
    timeRemaining.innerHTML = 100 - (i + 1);
    await sleep(200);
  }
  //   reset everything
  lander.style.transform = `rotate(0deg)`;
  testButton.classList.remove("disabled");
  testButton.innerHTML = `🚀 Run Test`;
  timeRemaining.innerHTML = "";
  testAngle.innerHTML = "";
  landerAngle.innerHTML = "";
  landerStatus.innerHTML = "";
  bg.classList.remove("bg-active");
  rocketNoise.pause();
  report.scrollIntoView({ behavior: "smooth" });
  report.style.opacity = 1;
  testResults.map((result, i) => {
    let instance = document.createElement("div");
    instance.classList.add("instance");
    instance.innerHTML = `
    <h3>Round ${i + 1}</h3>
    <p>Test: ${result.testAngle}&deg;</p>
    <p>After adjustment: ${result.landerAngle}&deg;</p>
    `;
    wrapper.appendChild(instance);
  });
}

// DO YOUR WORK BELOW

// Function to rotate the lander
function stayAlive(angle) {
  let newAngle = angle + (12 - angle);
  if (angle === 12) {
    let newAngle = angle;
  } else {
    let newAngle = angle + (12 - angle);
  }
  return newAngle;
}


// let x = angle;
// let y = 12 - angle;
// return x + y;
