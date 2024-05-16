import axios from 'axios'

export const getBNBPrice = async (): Promise<number | undefined> => {
  try {
    const url =
      'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd'

    const { data } = await axios.get<{
      bnb: {
        usd: number
      }
    }>(url)

    return data.bnb.usd
  } catch (err) {
    return undefined
  }
}
