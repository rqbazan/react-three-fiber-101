import Cube from '../cube'

it('rotate cube R', () => {
  const cube = new Cube()
  cube.rotate('R')

  const R = [8, 5, 2, 17, 14, 11, 26, 23, 20]
  const F = [0, 1, 8, 3, 4, 17, 6, 7, 26]

  expect(cube.faces.R.map(x => x.key)).toEqual(R)
  expect(cube.faces.F.map(x => x.key)).toEqual(F)
})

it("rotate cube R'", () => {
  const cube = new Cube()
  cube.rotate('R', true)

  const R = [20, 23, 26, 11, 14, 17, 2, 5, 8]
  const F = [0, 1, 20, 3, 4, 11, 6, 7, 2]

  expect(cube.faces.R.map(x => x.key)).toEqual(R)
  expect(cube.faces.F.map(x => x.key)).toEqual(F)
})

it('rotate cube L', () => {
  const cube = new Cube()
  cube.rotate('L')

  const L = [24, 21, 18, 15, 12, 9, 6, 3, 0]
  const F = [18, 1, 2, 9, 4, 5, 0, 7, 8]

  expect(cube.faces.L.map(x => x.key)).toEqual(L)
  expect(cube.faces.F.map(x => x.key)).toEqual(F)
})

it("rotate cube L'", () => {
  const cube = new Cube()
  cube.rotate('L', true)

  const L = [0, 3, 6, 9, 12, 15, 18, 21, 24]
  const F = [6, 1, 2, 15, 4, 5, 24, 7, 8]

  expect(cube.faces.L.map(x => x.key)).toEqual(L)
  expect(cube.faces.F.map(x => x.key)).toEqual(F)
})
