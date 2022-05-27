import { handleError } from '@/Services/api'

export default async () => {
  return {
    name: 'User',
    photo: '',
    results: { length: 0, avgRating: 0, avgDistance: 0 },
  }
}
