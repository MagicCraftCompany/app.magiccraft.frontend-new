/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { getMulticallAddress } from '@/lib/addressHelpers'
import { getWeb3 } from '@/lib/web3'
import MultiCallAbi from '@/abi/MultiCall.json'

// interface Call {
//   address: string // Address of the contract
//   name: string // Function name on the contract (exemple: balanceOf)
//   params?: any[] // Function params
// }

const multicall = async (abi: any, calls: any) => {
  const web3 = getWeb3()
  const multi = new web3.eth.Contract(
    MultiCallAbi.abi as unknown as AbiItem,
    getMulticallAddress()
  )
  const itf = new Interface(abi)

  const calldata = calls.map((call: any) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ])
  // const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.methods.aggregate(calldata).call()
  const res = returnData.map((call: any, i: any) =>
    itf.decodeFunctionResult(calls[i].name, call)
  )

  return res
}

export default multicall
