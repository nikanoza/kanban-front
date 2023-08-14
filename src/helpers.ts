export const generateColors = () => {
  const letters = "0123456789ABCDEF";
  const colors = [];

  for (let index = 0; index < 100; index++) {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    colors.push(color);
  }

  return colors;
};
