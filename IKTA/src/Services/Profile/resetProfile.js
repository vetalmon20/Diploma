import { handleError } from '@/Services/api'

export default async () => {
  console.log('resetted')
  return {
    name: 'User',
    city: 'Kyiv',
    photo: '',
    results: { length: 0, avgRating: 0, avgDistance: 0 },
  }
}
