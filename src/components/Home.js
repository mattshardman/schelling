import React, { useState, useEffect } from "react";
import uuid from "uuid";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Area = styled.div`
  width: 500px;
  max-width: 100%;
  height: 500px;
  position: relative;
  border: 1px #484848 solid;
`;

const Person = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border: 1px solid #484848;
  border-radius: 50%;
  transition: background 1s;
`;

const Btn = styled.button`
  width: 200px;
  height: 35px;
  background: #fff;
  border: 1px solid #484848;
  color: #484848;
  margin-top: 20px;
  cursor: pointer;
`;

const rand = (max, min) => Math.floor(Math.random() * (max - min) + min);

const peeps = 2500;

function Home() {
  const [swapCycles, setSwapCycles] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [people, setPeople] = useState();

  const createDataSet = () => {
    const arr = Array.from(new Array(peeps));
    const initArr = arr.map((each, i) => {
      const x = rand(990, 0) / 10;
      const y = rand(990, 0) / 10;
      if (i % 2 === 0) {
        return { id: uuid(), x, y, color: "#DB4437" };
      }

      return { id: uuid(), x, y, color: "#fff" };
    });

    setPeople(initArr);
  };

  const shuffle = () => {
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
        setSwaps(state => state + 1);
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
    console.log(finish - start);
    setSwapCycles(state => state + 1);
    console.log(count)
    setPeople(changePeople);
  };

  useEffect(() => {
    createDataSet();
  }, []);

  if (!people) {
    return null;
  }

  return (
    <Container>
      <p style={{ color: "#484848", textAlign: 'center' }}>
        <strong>Cycles:</strong> {swapCycles}
      <br />
        <strong>Number of swaps:</strong> {swaps}
      </p>
      <Area>
        {people.map((person, index) => (
          <Person
            key={person.id}
            {...person}
            style={{
              top: `${person.y}%`,
              left: `${person.x}%`,
              background: person.color
            }}
          ></Person>
        ))}
      </Area>
      <Btn onClick={shuffle}>SHUFFLE</Btn>
    </Container>
  );
}

export default Home;
