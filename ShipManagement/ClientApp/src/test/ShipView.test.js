
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import ShipView from './../components/ShipView';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ 
        id: '40ddf2f3-83a9-4dc9-9b32-581e83fa9ec6',
        name: 'Titanic',
        length: 120,
        width: 100,
        code: 'RRRI-3422-G6'
    }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test("renders ShipView", async () => {
  const match = { params : { id : '40ddf2f3-83a9-4dc9-9b32-581e83fa9ec6' } };
  
  render(<ShipView match={match}/>);

  const name = screen.getByTestId("name");

  console.log({name})
  expect(name).toBeInTheDocument();
});