import { useEffect, useRef, useState } from 'react';

function randomColor(currentColor) {
  const COLOR_LIST = ['red', 'green', 'yellow'];
  // random 0 --> 2
  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while(currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * 3);
  }
  console.log(COLOR_LIST[newIndex]);
  return COLOR_LIST[newIndex];
}


function useMagicColor(props) {
  const [color, setColor] = useState('transparent');
  const colorRef = useRef('transparent');

  // Change color every 1 seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      // console.log('change color:', colorRef.current);
      const newColor = randomColor(colorRef.current);
      setColor(newColor);

      colorRef.current = newColor;
    }, 1000);

    return () => {
      clearInterval(colorInterval);
    }
  }, []);
  
  return color;
}

export default useMagicColor;