import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';

function App() {
  // flex form
  const [name, setName] = useState<string>('');
  const [fillLevel, setFillLevel] = useState<number>(0);

  interface Flex {
    name: string;
    data: {
      date: Date;
      fillLevel: number;
    }[];
  };

  const [flexes, setFlexes] = useState<Flex[]>([]);
  const [index, setIndex] = useState<number>(0); // selected flex's index

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onFillLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFillLevel(parseInt(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const param = {
      name: name,
      fillLevel: fillLevel
    };

    axios.post("http://127.0.0.1:5000/api/flex", param)
      .then(
        response => {
          axios.get("http://127.0.0.1:5000/api/flex")
            .then(res => {
              setFlexes(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        },
        error => {
        }
      );
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/flex")
      .then(res => {
        setFlexes(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // chart.js data
  const data = {
    labels: flexes.length ? flexes[index].data.map((row) => (
      moment(row.date).format('YYYY/MM/DD HH:mm')
    )) : [], // ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "적재량",
        data: flexes.length ? flexes[index].data.map((row) => (
          row.fillLevel
        )) : [],
        lineTension: 0,
        fill: true,
        backgroundColor: "#d3f9d8",
        borderColor: "#51cf66"
      }
    ]
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-success">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Clean City Network</a>
          <form className="d-flex">
            {
              /*<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />*/
            }
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <form id="flexForm" onSubmit={onSubmit}>
            <label htmlFor="name">Address</label>
            <input type="text" id="name" name="name" value={name} onChange={onNameChange} />
            <label htmlFor="fillLevel">Fill-level</label>
            <input type="number" id="fillLevel" name="fillLevel" value={fillLevel} onChange={onFillLevelChange} />
            <button type="submit" id="submitBtn" className="btn" form="flexForm">Submit</button>
          </form>
        </div>
      </nav>
      <div className="Dashboard container-fluid">
        <div className="row">
          <div className="col-6">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Fill-level</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {
                  flexes ? flexes.map((flex, index) => (
                    <tr key={index} onClick={() => { setIndex(index); setName(flex.name) }}>
                      <td>{flex.name}</td>
                      <td>{flex.data[flex.data.length - 1].fillLevel}%[Bar here]</td>
                      <td><Moment format="ddd, M/D/YY hh:mm A">{flex.data[flex.data.length - 1].date}</Moment></td>
                    </tr>
                  )) : null
                }
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <Line data={data} width={10} height={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
