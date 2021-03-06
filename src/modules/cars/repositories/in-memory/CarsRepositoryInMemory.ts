import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository, ISaveCarDTO } from '../ICarsRepository'

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []

  async save(carData: ISaveCarDTO): Promise<Car> {
    const car = new Car()
    Object.assign(car, {
      ...carData,
      available: true,
      create_at: new Date(),
      update_at: new Date(),
    })
    this.cars.push(car)

    return car
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id)
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async findAllAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const filteredCars = this.cars
      .filter((car) => car.available)
      .filter((car) => {
        if (category_id || brand || name) {
          if (
            (category_id && car.category_id === category_id) ||
            (brand && car.brand === brand) ||
            (name && car.name === name)
          ) {
            return car
          }
          return null
        }
        return car
      })

    return filteredCars
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex((car) => car.id === id)

    this.cars[index].available = available
  }
}
