import test from 'ava'
import Cube from '../cube'

test('rotate cube R', t => {
  const cube = new Cube()

  cube.rotate('RIGHT')

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

  cube.rotate('RIGHT', -90)

  t.deepEqual(
    cube.faces.RIGHT.map(x => x.key),
    [19, 22, 25, 11, 13, 16, 2, 5, 8]
  )

  t.deepEqual(
    cube.faces.FRONT.map(x => x.key),
    [0, 1, 19, 3, 4, 11, 6, 7, 2]
  )
})
