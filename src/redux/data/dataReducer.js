const initialState = {
    loading: false,
    error: false,
    errorMsg: '',

    maxSupply: 0,
    price: 0,
    maxFreeSupply: 0,
    maxFreePerWallet: 0,
    maxPerTx: 0,

    isFreeMintOpen: false,
    paused: false,

    totalSupply: 0,
    currentWalletSupply: 0,
    getMintedFreeTokenByWallet: 0,
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: '',
            }
        case 'CHECK_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: false,
                errorMsg: '',

                maxSupply: action.payload.maxSupply,
                price: action.payload.price,
                maxFreeSupply: action.payload.maxFreeSupply,
                maxFreePerWallet: action.payload.maxFreePerWallet,
                maxPerTx: action.payload.maxPerTx,

                isFreeMintOpen: action.payload.isFreeMintOpen,
                paused: action.payload.paused,

                totalSupply: action.payload.totalSupply,
                currentWalletSupply: action.payload.currentWalletSupply,
                getMintedFreeTokenByWallet: action.payload.getMintedFreeTokenByWallet,
            }
        case 'CHECK_DATA_FAILED':
            return {
                ...initialState,
                loading: false,
                error: true,
                errorMsg: action.payload,
            }
        default:
            return state
    }
}

export default dataReducer
