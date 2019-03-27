import { Exercise } from '.'

let exercise

beforeEach(async () => {
  exercise = await Exercise.create({ name: 'test', categoryId: 'test', series: 'test', repetitions: 'test', finishTime: 'test', restTime: 'test', gif: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = exercise.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(exercise.id)
    expect(view.name).toBe(exercise.name)
    expect(view.categoryId).toBe(exercise.categoryId)
    expect(view.series).toBe(exercise.series)
    expect(view.repetitions).toBe(exercise.repetitions)
    expect(view.finishTime).toBe(exercise.finishTime)
    expect(view.restTime).toBe(exercise.restTime)
    expect(view.gif).toBe(exercise.gif)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = exercise.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(exercise.id)
    expect(view.name).toBe(exercise.name)
    expect(view.categoryId).toBe(exercise.categoryId)
    expect(view.series).toBe(exercise.series)
    expect(view.repetitions).toBe(exercise.repetitions)
    expect(view.finishTime).toBe(exercise.finishTime)
    expect(view.restTime).toBe(exercise.restTime)
    expect(view.gif).toBe(exercise.gif)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
