import api from '../config'

export async function getVendor(slug: string) {
  const response = await api.get(`/hotels/vendor/${slug}`)
  return response.data
}
