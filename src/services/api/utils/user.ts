import { User } from '@/services/state/currentUser/currentUserSlice'
import axios from '../axios'

export const getCurrentUser = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axios.get<User>(`/me`)
    return data
  } catch (err) {
    throw err
  }
}
