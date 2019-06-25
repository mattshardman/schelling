import uuid from "uuid";

export const createDataSet = p => {
    const arr = Array.from(new Array(p));
    const initArr = arr.map((each, i) => {
      const x = rand(990, 0) / 10;
      const y = rand(990, 0) / 10;
      if (i % 2 === 0) {
        return { id: uuid(), x, y, color: "#DB4437" };
      }
  
      return { id: uuid(), x, y, color: "#fff" };
    });
  
    return initArr;
  };
  
  const rand = (max, min) => Math.floor(Math.random() * (max - min) + min);
  
  const calcDist = (p, p2) => {
    const xDist = Math.sqrt((p.x - p2.x) ** 2);
    const yDist = Math.sqrt((p.y - p2.y) ** 2);
    const dist = xDist + yDist;
    return dist;
  };
  
  const sortFunction = (a, b) => {
    if (a.dist > b.dist) {
      return 1;
    }
    if (b.dist > a.dist) {
      return -1;
    }
    return 0;
  };
  
  const calcNumSame = (arr, { color }) => {
    const numSame = arr
      .sort(sortFunction)
      .slice(0, 10)
      .filter(each => each.color === color).length;
  
    return numSame;
  };

export const shuffle = (people, nP) => {
    const s = Date.now();
    let count = 0;
    const p = new Array(...people);

    for (let i = 0; i < p.length; i++) {
      const distArr = [];
      for (let j = 0; j < p.length; j++) {
        const dist = calcDist(p[i], p[j]);
        distArr.push({ dist, color: p[j].color });
      }

      const num = calcNumSame(distArr, p[i]);

      if (num < 5) {
        count = count + 1;
        const temp = p[i];
        const randI = rand(nP, 0);

        if (temp.color !== p[randI].color) {
          p[i].color = p[randI].color;
          p[randI].color = temp.color;
        }
      }
    }

    const f = Date.now();
    console.log((f - s) / 1000);
    
    return [p, count];
  };