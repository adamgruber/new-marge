import React from 'react';
import { useQuery } from 'react-query';
import './App.css';
import { getRootSuite } from './api';

function TestsAndHooks({ data }) {
  return data.length ? (
    <ul>
      {data.map(entity => (
        <li>{entity.title}</li>
      ))}
    </ul>
  ) : null;
}

function Suites({ suites }) {
  return suites.length
    ? suites.map(suite => (
        <section>
          <h2>{suite.isRoot ? 'root' : suite.title}</h2>
          <Suites suites={suite.suites} />
          <h4>Tests</h4>
          <TestsAndHooks data={suite.tests} />
          <h4>Hooks</h4>
          <TestsAndHooks data={suite.hooks} />
        </section>
      ))
    : null;
}

function App() {
  const { data, isLoading } = useQuery('suites', getRootSuite);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="App">
      <Suites suites={data} />
    </div>
  );
}

export default App;
