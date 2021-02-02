import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // flex form
  const [name, setName] = useState<string>('');
  const [fillLevel, setFillLevel] = useState<number>(0);

  interface Flex {
    name: string;
    data: {
      date: Date;
      fillLevel: Number;
    }[];
  };

  const [flexes, setFlexes] = useState<Flex[]>([]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onFillLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFillLevel(parseInt(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/flex")
      .then(res => {
        setFlexes(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <div className="App">
      <form id="flexForm" onSubmit={onSubmit}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" name="name" value={name} onChange={onNameChange} />
        <label htmlFor="fillLevel">적재량</label>
        <input type="number" id="fillLevel" name="fillLevel" value={fillLevel} onChange={onFillLevelChange} />
        <button type="submit" id="submitBtn" form="flexForm">제출</button>
      </form>
      <div className="Dashboard">
        {
          flexes ? flexes.map((flex, index) => (
            <div key={index}>
              <p>{flex.name}</p>
              {flex.data ? flex.data.map((item, index) => (
                <p key={index}>일자: {item.date} 적재량: {item.fillLevel}</p>
              )) : null}
            </div>
          )) : null
        }
      </div>
    </div>
  );
}

export default App;
