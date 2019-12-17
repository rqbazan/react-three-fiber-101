import test from 'ava'
import Cube from '../cube'

test('rotate cube R', t => {
  const cube = new Cube()

  cube.rotate('R')

  t.deepEqual(
    cube.faces.R.map(x => x.key),
    [8, 5, 2, 17, 14, 11, 26, 23, 20]
  )

  t.deepEqual(
    cube.faces.F.map(x => x.key),
    [0, 1, 8, 3, 4, 17, 6, 7, 26]
  )
})

test("rotate cube R'", t => {
  const cube = new Cube()

  cube.rotate('R', true)

  t.deepEqual(
    cube.faces.R.map(x => x.key),
    [20, 23, 26, 11, 14, 17, 2, 5, 8]
  )

  t.deepEqual(
    cube.faces.F.map(x => x.key),
    [0, 1, 20, 3, 4, 11, 6, 7, 2]
  )
})

test('rotate cube L', t => {
  const cube = new Cube()

  cube.rotate('L')

  t.deepEqual(
    cube.faces.L.map(x => x.key),
    [24, 21, 18, 15, 12, 9, 6, 3, 0]
  )

  t.deepEqual(
    cube.faces.F.map(x => x.key),
    [18, 1, 2, 9, 4, 5, 0, 7, 8]
  )
})

test("rotate cube L'", t => {
  const cube = new Cube()

  cube.rotate('L', true)

  t.deepEqual(
    cube.faces.L.map(x => x.key),
    [0, 3, 6, 9, 12, 15, 18, 21, 24]
  )

  t.deepEqual(
    cube.faces.F.map(x => x.key),
    [6, 1, 2, 15, 4, 5, 24, 7, 8]
  )
})
