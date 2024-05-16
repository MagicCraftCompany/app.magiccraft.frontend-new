import axios from '../axios'

export const getMCRTPrice = async (): Promise<number | undefined> => {
  try {
    const { data } = await axios.get<{ price: number }>(`/mcrt-price`)
    return data.price
  } catch (err) {
    return undefined
  }
}
