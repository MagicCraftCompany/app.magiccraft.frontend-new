import { ethers } from 'ethers'

interface Nft {
  contractAddress: string
  tokenID: number
  seller: string
  duration: number
  endingPrice: number
  isMCRT: boolean
  startAt: number
  startingPrice: number
  createdAt: string
  name: string
  description: string
  image: string
  attributes: {
    trait_type: string
    value: string
  }[]
}

export function returnRarity(selectedNft: Nft) {
  const rarity = selectedNft.attributes.find(
    (it) => it.trait_type === 'rarity'
  )?.value

  return rarity
}

export function returnClass(selectedNft: Nft) {
  let classType = ''
  console.log(selectedNft)
  if (selectedNft.name.includes('Arcana')) {
    classType = 'Arcana'
  } else if (selectedNft.name.includes('Knight')) {
    classType = 'Knight'
  } else if (
    selectedNft.contractAddress === '0xafc9f628220eb9efc313ded8d131253f633f6be9'
  ) {
    return undefined
  } else {
    classType = 'Hunter'
  }
  return classType
}

export function getThumbnailImage(url: string) {
  const prevLinks = [
    'QmTPtJSxd3YWXNKfYLYkVVUe4nazk3yxhp2XQfgARzcs7y',
    'QmX1dhoSQqq9eMyzzFBSAYgQ5119Ap8h7VC2evppGs93W9',
    'QmNdDumUU4KDSScPkohP4fH2T5YwxNJTbQf4Cy8D3TcP59',
  ]
  const newLinks = [
    'QmVHWN3nP2vpMjT2w1s3fRRvHPEGtGHXoTQbkYEXZHsZBq',
    'QmbYXYGUYbWPALxh66MUbrUH7FC7eUqa8rXeVMQMDbGrga',
    'QmX8UUL4vE3NzRaXMivCoyL9TR6PR2A9GpvcVw9UdXB3Yb',
  ]

  let response
  prevLinks.forEach((it, idx) => {
    if (url.includes(it)) {
      response = url.replace(it, newLinks[idx])
    }
  })

  return response || url
}

export function getNameBgColor(name: string) {
  if (name.includes('Knight')) return '#C41E3A'
  if (name.includes('Hunter')) return '#AAD372'
  return '#3FC7EB'
}

export function getRarityBgColor(rarity: string) {
  if (rarity === 'Rare') return '#0070DD'
  if (rarity === 'Epic') return '#A335EE'
  if (rarity === 'Legendary') return '#FF8000'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCurrentPrice(inventoryData: any) {
  const today = new Date()
  const data = { ...inventoryData }

  if (
    !data ||
    !data.startingPrice ||
    !data.endingPrice ||
    !data.duration ||
    !data.startAt
  )
    return 0

  data.startingPrice = Number(data.startingPrice).toLocaleString('fullwide', {
    useGrouping: false,
  })

  data.endingPrice = Number(data.endingPrice).toLocaleString('fullwide', {
    useGrouping: false,
  })
  if (!data.isMCRT) {
    const bnbAmt = ethers.utils.formatEther(
      ethers.BigNumber.from(`${data.startingPrice}`).add(
        ethers.BigNumber.from(
          Math.min(
            data.duration,
            Math.ceil(today.getTime() / 1000.0 - data.startAt)
          )
        )
          .mul(
            ethers.BigNumber.from(`${data.endingPrice}`).sub(
              ethers.BigNumber.from(`${data.startingPrice}`)
            )
          )
          .div(ethers.BigNumber.from(data.duration))
      )
    )

    return Number(bnbAmt)
  } else {
    const mcrtAmt = ethers.utils.formatUnits(
      ethers.BigNumber.from(`${data.startingPrice}`).add(
        ethers.BigNumber.from(
          Math.min(
            data.duration,
            Math.ceil(today.getTime() / 1000.0 - data.startAt)
          )
        )
          .mul(
            ethers.BigNumber.from(`${data.endingPrice}`).sub(
              ethers.BigNumber.from(`${data.startingPrice}`)
            )
          )
          .div(ethers.BigNumber.from(data.duration))
      ),
      9
    )

    return Number(mcrtAmt)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function nFormatter(num: any, digits: any) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}
