import test from 'ava'
import rotateArray from '../rotate-array'

test('forward movement', t => {
  t.deepEqual(rotateArray([1, 2, 3, 4, 5]), [5, 1, 2, 3, 4])
})

test('backward movement', t => {
  t.deepEqual(rotateArray([1, 2, 3, 4, 5], true), [2, 3, 4, 5, 1])
})
