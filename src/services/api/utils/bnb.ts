import axios from 'axios'

export const getBNBPrice = async (): Promise<number | undefined> => {
  try {
    const url =
      'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd'

    const { data } = await axios.get<{
      binancecoin: {
        usd: number
      }
    }>(url)

    console.log(data.binancecoin.usd)

    return data.binancecoin.usd
  } catch (err) {
    return 0
  }
}
