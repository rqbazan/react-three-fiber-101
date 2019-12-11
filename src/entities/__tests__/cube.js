import test from 'ava'
import Cube from '../cube'

test('rotate cube R', t => {
  const cube = new Cube()

  cube.rotate('RIGHT', Cube.angles.CLOCKWISE)

  t.deepEqual(
    cube.faces.RIGHT.map(x => x.key),
    [8, 5, 2, 16, 13, 11, 25, 22, 19]
  )

  t.deepEqual(
    cube.faces.FRONT.map(x => x.key),
    [0, 1, 8, 3, 4, 16, 6, 7, 25]
  )
})

test("rotate cube R'", t => {
  const cube = new Cube()

  cube.rotate('RIGHT', Cube.angles.ANTICLOCKWISE)

  t.deepEqual(
    cube.faces.RIGHT.map(x => x.key),
    [19, 22, 25, 11, 13, 16, 2, 5, 8]
  )

  t.deepEqual(
    cube.faces.FRONT.map(x => x.key),
    [0, 1, 19, 3, 4, 11, 6, 7, 2]
  )
})

test('rotate cube L', t => {
  const cube = new Cube()

  cube.rotate('LEFT', Cube.angles.CLOCKWISE)

  t.deepEqual(
    cube.faces.LEFT.map(x => x.key),
    [23, 20, 17, 14, 12, 9, 6, 3, 0]
  )

  t.deepEqual(
    cube.faces.FRONT.map(x => x.key),
    [17, 1, 2, 9, 4, 5, 0, 7, 8]
  )
})

test("rotate cube L'", t => {
  const cube = new Cube()

  cube.rotate('LEFT', Cube.angles.ANTICLOCKWISE)

  t.deepEqual(
    cube.faces.LEFT.map(x => x.key),
    [0, 3, 6, 9, 12, 14, 17, 20, 23]
  )

  t.deepEqual(
    cube.faces.FRONT.map(x => x.key),
    [6, 1, 2, 14, 4, 5, 23, 7, 8]
  )
})
