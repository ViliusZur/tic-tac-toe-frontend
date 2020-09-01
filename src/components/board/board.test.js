import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
  fetch.resetMocks();
});

test('Board renders without crashing', () => { 
  fetch.mockResponseOnce(JSON.stringify({ 
    log: [],
    squares: Array(9).fill(null),
    winner: false,
  }))
  const div = document.createElement('div');
  ReactDOM.render(<Board></Board>, div);
});

test('Renders the status correctly', () => {
  fetch.mockResponseOnce(JSON.stringify({ 
    log: [],
    squares: Array(9).fill(null),
    winner: false,
  }))
  const {getByTestId} = render(<Board></Board>);
  expect(getByTestId('status')).toHaveTextContent('Next player: X');
});

test.each([0, 1, 2, 3, 4, 5, 6, 7, 8])('Renders empty square correctly', async (i) => {
  fetch.mockResponseOnce(JSON.stringify({ 
    log: [],
    squares: Array(9).fill(null),
    winner: false,
  }));
  const {getByTestId} = await render(<Board></Board>);
  expect(getByTestId('square' + i)).toHaveTextContent('');
});

test('Renders New Game button', async () => {
  fetch.mockResponseOnce(JSON.stringify({ 
    log: [],
    squares: Array(9).fill(null),
    winner: false,
  }));
  const {getByTestId} = await render(<Board></Board>);
  expect(getByTestId('newGame')).toBeInTheDocument();
})

test('Renders Clear Logs button', async () => {
  fetch.mockResponseOnce(JSON.stringify({ 
    log: [],
    squares: Array(9).fill(null),
    winner: false,
  }));
  const {getByTestId} = await render(<Board></Board>);
  expect(getByTestId('newSession')).toBeInTheDocument();
})
