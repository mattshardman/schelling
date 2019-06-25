const cors = require("cors");
const app = require("express")();
const { json } = require("micro");

app.use(cors());

const peeps = 2000;

const rand = (max, min) => Math.floor(Math.random() * (max - min) + min);

const shuffle = (people) => {
  let count = 0;
  const start = Date.now();
  const changePeople = new Array(...people);
  for (let i = 0; i < changePeople.length; i++) {
    const distArr = [];
    for (let j = 0; j < changePeople.length; j++) {
      count = count + 1;
      const xDist = Math.sqrt((changePeople[i].x - changePeople[j].x) ** 2);
      const yDist = Math.sqrt((changePeople[i].y - changePeople[j].y) ** 2);
      const dist = xDist + yDist;
      distArr.push({ dist, color: changePeople[j].color });
    }

    distArr.sort((a, b) => {
      if (a.dist > b.dist) {
        return 1;
      }
      if (b.dist > a.dist) {
        return -1;
      }
      return 0;
    });

    const col = changePeople[i].color;
    const nearest10 = distArr.slice(0, 10);
    const numSame = nearest10.filter(each => each.color === col).length;

    if (numSame < 5) {
      const tempOld = changePeople[i];
      const index = rand(peeps, 0);
      const tempNew = changePeople[index];

      if (tempOld.color !== tempNew.color) {
        changePeople[i].color = tempNew.color;
        changePeople[index].color = tempOld.color;
      }
    }
  }
  const finish = Date.now();
  console.log((finish - start) /1000)
  return changePeople
};

app.post("*", async (req, res) => {
  try {
    const body = await json(req);
    const shuffled = shuffle(body);
    res.status(200).json(shuffled);
  } catch (err) {
    console.log(err)
    res.status(500).send("error");
  }
   
});

module.exports = app;
