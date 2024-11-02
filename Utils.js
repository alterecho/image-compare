  export const getRandomColor = () => {
    let color = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    }

    console.log(`rgb: ${JSON.stringify(color)}`)
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };