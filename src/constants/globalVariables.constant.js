import React from 'react'

const tokenoptions = [
    { value: 'ETH', label: 'ETH' },
    { value: 'USDT', label: 'USDT' }
]

const blockchainOptions = [
    { value: 'Rinkeby', label: (<div>Rinkeby</div>)},
]

const networks = (id) => {
    if(id === '1' ) {
       return  `https://etherscan.io/tx`
    }
    else if(id === '2'){
      return  'https://kovan.etherscan.io/tx'
    }
    else if(id === '4') {
        return  'https://rinkeby.etherscan.io/tx'
    }
    else if(id === '5') {
        return  'https://goerli.etherscan.io/tx' 
    }
}

export const GlobalVariables = {
    tokenoptions,
    blockchainOptions,
    networks
}
