import api from '../config'

export async function makePayment(data: {
  email: string
  name: string
  phone: string
  amount: number
  room_id: number | string
  room_name: string
  guests: number
  check_in: string
  check_out: string
}) {
  const response = await api.post('/paystack/initialize', data)
  return response.data
}

export async function verifyPayment(reference: string) {
  const response = await api.post('/paystack/verify', { reference })
  return response.data
}
