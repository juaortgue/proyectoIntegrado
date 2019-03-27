import { Training } from '.'

let training

beforeEach(async () => {
  training = await Training.create({ name: 'test', description: 'test', target: 'test', time: 'test', picture: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = training.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(training.id)
    expect(view.name).toBe(training.name)
    expect(view.description).toBe(training.description)
    expect(view.target).toBe(training.target)
    expect(view.time).toBe(training.time)
    expect(view.picture).toBe(training.picture)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = training.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(training.id)
    expect(view.name).toBe(training.name)
    expect(view.description).toBe(training.description)
    expect(view.target).toBe(training.target)
    expect(view.time).toBe(training.time)
    expect(view.picture).toBe(training.picture)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
