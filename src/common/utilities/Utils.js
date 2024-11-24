  export const getRandomColor = () => {
    let color = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    }

    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };

  export const makeBorderStyle = (color = 'green', width = 1) => {
    const style = {
      borderColor: color,
      borderWidth: width 
    }
    return style
  }