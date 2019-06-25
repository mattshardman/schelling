import React, { useState, useEffect } from "react";
import uuid from "uuid";
import styled from "styled-components";

import * as utils from "../utils";

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

const nP = 1500;

function Home() {
  const [swapCycles, setSwapCycles] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [people, setPeople] = useState();

  const shuffle = () => {
      const [p, count] = utils.shuffle(people, nP);
      setSwapCycles(state => state + 1);
      setSwaps(state => state + count);
      setPeople(p);
  }

  useEffect(() => {
    const ds = utils.createDataSet(nP);
    setPeople(ds);
  }, []);

  if (!people) {
    return null;
  }

  return (
    <Container>
      <p style={{ color: "#484848", textAlign: "center" }}>
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
