// Lander object to be used in the functions
export const landerObj = {
  angle: 0,
  isAlive: true,
};

// Function to rotate the lander
export function stayAlive(inputAngle) {
  landerObj.angle = inputAngle;
}
