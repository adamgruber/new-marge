export const getRootSuite = () =>
  fetch('/api/suites/root')
    .then(res => res.json())
    .then(data => [data.suite]);

export const getSuites = () =>
  fetch('/api/suites')
    .then(res => res.json())
    .then(data => data.suites);

export const getTests = () =>
  fetch('/api/tests')
    .then(res => res.json())
    .then(data => data.tests);
