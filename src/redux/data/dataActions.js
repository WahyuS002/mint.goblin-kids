// log
import store from '../store'
import { toast } from 'react-toastify'

const fetchDataRequest = () => {
    return {
        type: 'CHECK_DATA_REQUEST',
    }
}

const fetchDataSuccess = (payload) => {
    return {
        type: 'CHECK_DATA_SUCCESS',
        payload: payload,
    }
}

const fetchDataFailed = (payload) => {
    return {
        type: 'CHECK_DATA_FAILED',
        payload: payload,
    }
}

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(fetchDataRequest())
        try {
            let maxSupply = await store.getState().blockchain.smartContract.methods.maxSupply().call()
            let price = await store.getState().blockchain.smartContract.methods.price().call()
            let maxFreeSupply = await store.getState().blockchain.smartContract.methods.maxFreeSupply().call()
            let maxFreePerWallet = await store.getState().blockchain.smartContract.methods.maxFreePerWallet().call()
            let maxPerTx = await store.getState().blockchain.smartContract.methods.maxPerTx().call()

            let isFreeMintOpen = await store.getState().blockchain.smartContract.methods.isFreeMintOpen().call()
            let paused = await store.getState().blockchain.smartContract.methods.paused().call()

            let totalSupply = await store.getState().blockchain.smartContract.methods.totalSupply().call()

            let currentWallet = await store.getState().blockchain.account
            let walletOfOwner = await store.getState().blockchain.smartContract.methods.walletOfOwner(currentWallet).call()
            let currentWalletSupply = walletOfOwner.length
            let getMintedFreeTokenByWallet = await store.getState().blockchain.smartContract.methods.getMintedFreeTokenByWallet(currentWallet).call()

            dispatch(
                fetchDataSuccess({
                    maxSupply,
                    price,
                    maxFreeSupply,
                    maxFreePerWallet,
                    maxPerTx,

                    isFreeMintOpen,
                    paused,

                    totalSupply,
                    currentWalletSupply,
                    getMintedFreeTokenByWallet,
                })
            )
        } catch (err) {
            console.log(err)
            dispatch(fetchDataFailed('Could not load data from contract.'))
            toast.error('Could not load data from contract.')
        }
    }
}
