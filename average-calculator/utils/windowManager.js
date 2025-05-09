const windowSize = 10;
let window = [];

export const getWindow = () => [...window];

export const updateWindow = (newNumbers) => {
  newNumbers.forEach((num) => {
    if (!window.includes(num)) {
      if (window.length >= windowSize) {
        window.shift(); // remove oldest
      }
      window.push(num);
    }
  });
  return [...window];
};
