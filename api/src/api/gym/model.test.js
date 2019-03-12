import { Gym } from '.'

let gym

beforeEach(async () => {
  gym = await Gym.create({ name: 'test', address: 'test', province: 'test', city: 'test', zipcode: 'test', position: 'test', price: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = gym.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(gym.id)
    expect(view.name).toBe(gym.name)
    expect(view.address).toBe(gym.address)
    expect(view.province).toBe(gym.province)
    expect(view.city).toBe(gym.city)
    expect(view.zipcode).toBe(gym.zipcode)
    expect(view.position).toBe(gym.position)
    expect(view.price).toBe(gym.price)
    expect(view.description).toBe(gym.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = gym.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(gym.id)
    expect(view.name).toBe(gym.name)
    expect(view.address).toBe(gym.address)
    expect(view.province).toBe(gym.province)
    expect(view.city).toBe(gym.city)
    expect(view.zipcode).toBe(gym.zipcode)
    expect(view.position).toBe(gym.position)
    expect(view.price).toBe(gym.price)
    expect(view.description).toBe(gym.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
