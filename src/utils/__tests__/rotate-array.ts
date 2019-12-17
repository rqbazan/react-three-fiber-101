import rotateArray from '../rotate-array'

it('rotates with forward movement', () => {
  expect(rotateArray([1, 2, 3, 4, 5])).toEqual([5, 1, 2, 3, 4])
})

it('rotates with backward movement', () => {
  expect(rotateArray([1, 2, 3, 4, 5], true)).toEqual([2, 3, 4, 5, 1])
})
