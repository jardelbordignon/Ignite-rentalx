import Category from '../entities/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriesRepository {
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO }
