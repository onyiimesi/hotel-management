export interface CreateBookingRequest {
  name: string
  email: string
  phone: string
  room: string
  check_in: string
  check_out: string
  total_price: number
}

export interface GetAvailableRoomsRequest {
  check_in: string
  check_out: string
}
