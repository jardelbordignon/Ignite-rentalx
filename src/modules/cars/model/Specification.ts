import Default from '../../shared/model/Default'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

class Specification extends Default {
  name: string
  description: string
}

export { Specification, ICreateSpecificationDTO }