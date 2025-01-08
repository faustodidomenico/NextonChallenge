const myEval = require("../src/calculator.js");

test('10 * (2+5) * 10 ', () => {
  expect(myEval("10 * (2+5) * 10 ")).toBe(700);
});

test('2.5+3.5', () => {
  expect(myEval(" 2.5 +3.5 ")).toBe(6);
});

test('25.56', () => {
  expect(myEval("25.56")).toBe(25.56);
});

test('(((25.56)))', () => {
  expect(myEval("(((25.56)))")).toBe(25.56);
});

test('11 / 2', () => {
  expect(myEval("11 / 2")).toBe(5.5);
});

test('(5)-4', () => {
  expect(myEval("(5)-4")).toBe(1);
});

test('(10*11)', () => {
  expect(myEval("(10*11)")).toBe(110);
});

test(' (( (((8))) )) +1 ', () => {
  expect(myEval(" (( (((8))) )) +1 ")).toBe(9);
});

test(' (( (((8+1))) )) ', () => {
  expect(myEval(" (( (((8+1))) )) ")).toBe(9);
});

test('5+5+5+5+5+5', () => {
  expect(myEval("5+5+5+5+5+5")).toBe(30);
});

test('(((5))+2)-3', () => {
  expect(myEval("(((5))+2)-3")).toBe(4);
});

test('10 + 5 * 2', () => {
  expect(myEval("10 + 5 * 2")).toBe(20);
});

test('5 * 2 + 10', () => {
  expect(myEval("5 * 2 + 10")).toBe(20);
});

test('(((5+1))+2)-3*2', () => {
  expect(myEval("(((5+1))+2)-3*2")).toBe(2);
});

test('10 * (1+2) * 3 / (5+15)', () => {
  expect(myEval("10 * (1+2) * 3 / (5+15)")).toBe(4.5);
});

test('10 * (5 * (2* (1+1))', () => {
  expect(myEval("10 * (5 * (2* (1+1)))")).toBe(200);
});
