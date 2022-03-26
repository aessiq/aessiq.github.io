import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


describe('Calculator renders', () => {
  const allButtons = ['C', '√', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '00', '0', ',', '='];

  for (let i = 0; i < 5; i++) {
    const i = Math.ceil(Math.random() * allButtons.length) - 1;
    it(`Button ${allButtons[i]} is present on the screen`, () => {
      render(<App />);
      expect(screen.getByText(allButtons[i])).toBeInTheDocument();
    });
  }
});

describe('Keyboard input works', () => {
  it('User input equals display input', () => {
    render(<App />);
    let buttons = [];
    for (let i = 0; i < 10; i++) {
      buttons.push(Math.floor(Math.random() * 10));
    }
    buttons.forEach(item => {
      fireEvent.keyUp(document, { key: `${item}` });
    })
    expect(screen.getAllByText(buttons.join(''))).toBeDefined();
  });

  it('Keyboard inputs calculates correctly', () => {
    render(<App />);
    const firstNumber = String(Math.round(Math.random() * 1000));
    const secondNumber = String(Math.round(Math.random() * 1000));
    const operations = ['+', '-', '*', '/'];

    firstNumber.split('').map(item => {
      fireEvent.keyUp(document, { key: item });
    });

    const sign = operations[Math.ceil(Math.random() * operations.length) - 1];
    fireEvent.keyUp(document, { key: sign });

    secondNumber.split('').map(item => {
      fireEvent.keyUp(document, { key: item });
    });

    fireEvent.keyUp(document, { key: '=' });

    const result = eval(firstNumber + sign + secondNumber);

    expect(screen.getByText(result)).toHaveTextContent(result);
  });
})

describe('Mouse input works', () => {
  it('User input equals display input', () => {
    render(<App />);
    let buttons = [];
    for (let i = 0; i < 10; i++) {
      buttons.push(Math.floor(Math.random() * 10));
    }
    buttons.forEach(item => {
      fireEvent.click(screen.getByText(item));
    });
    expect(screen.getAllByText(buttons.join(''))).toBeDefined();
  });

  it('Mouse inputs calculates correctly', () => {
    render(<App />);
    const firstNumber = String(Math.round(Math.random() * 1000));
    const secondNumber = String(Math.round(Math.random() * 1000));
    const operations = ['+', '-', '*', '/'];

    firstNumber.split('').map(item => {
      // кликаем на последний элемент со значением цифры - нужно, чтобы тест не падал, если будет несколько полей с данной цифрой
      fireEvent.click(screen.getAllByText(item).slice(-1)[0]);
    });

    const sign = operations[Math.ceil(Math.random() * operations.length) - 1];
    fireEvent.click(screen.getByText(sign));

    secondNumber.split('').map(item => {
      fireEvent.click(screen.getAllByText(item).slice(-1)[0]);
    });

    fireEvent.click(screen.getByText('='));

    const result = eval(firstNumber + sign + secondNumber);

    expect(screen.getByText(result)).toHaveTextContent(result);
  });
});


