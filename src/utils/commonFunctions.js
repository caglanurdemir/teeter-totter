export const shapePosition = () => {
  return Math.floor(Math.random() * 5) + 1;
};

export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
