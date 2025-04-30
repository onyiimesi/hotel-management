export interface BookingResponse {
  id: number
  name: string
  email: string
  phone: string
  room: string
  check_in: string
  check_out: string
  total_price: number
  created_at: string
}

export interface IRoom {
  id: number
  name: string
  description: string
  price: string
  image: string
  guests: number
  units: number
  quantity: number
  bed_type: string
  images: string[]
}

export interface RoomResponse {
  id: number
  name: string
  description: string
  price: string
  image: string
}
