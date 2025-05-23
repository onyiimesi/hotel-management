import api from '../config'

export async function getAvailableRooms(checkIn: string, checkOut: string) {
  const response = await api.get('/rooms/available', {
    params: { check_in: checkIn, check_out: checkOut },
  })
  return response.data
}

export async function getRoomDetail(id: string) {
  const response = await api.get(`/room-detail/${id}`)
  return response.data
}
