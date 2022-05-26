import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../redux/data/dataActions'
import { connect } from '../redux/blockchain/blockchainActions'
import Web3 from 'web3'

import { toast } from 'react-toastify'
import mintingImage from '../assets/images/minting.png'

const web3 = new Web3()
const truncate = (input, len) => (input.length > len ? `${input.substring(0, len)}...` : input)

export default function Minting() {
    const dispatch = useDispatch()
    const blockchain = useSelector((state) => state.blockchain)
    const data = useSelector((state) => state.data)

    const [claimingNft, setClaimingNft] = useState(false)

    const [mintAmount, setMintAmount] = useState(1)
    const [canIncrement, setCanIncrement] = useState(true)
    const [canDecrement, setCanDecrement] = useState(false)

    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: '',
        SCAN_LINK: '',
        NETWORK: {
            NAME: '',
            SYMBOL: '',
            ID: 0,
        },
        NFT_NAME: '',
        SYMBOL: '',
        MAX_SUPPLY: 0,
        GAS_LIMIT: 0,
    })

    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1
        if (newMintAmount === 1) {
            setCanDecrement(false)
        }
        if (newMintAmount < 1) {
            newMintAmount = 1
        }
        setMintAmount(newMintAmount)
        setCanIncrement(true)
    }

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1
        if (newMintAmount === 40) {
            setCanIncrement(false)
        }
        if (newMintAmount > 40) {
            newMintAmount = 40
        }
        setMintAmount(newMintAmount)
        setCanDecrement(true)
    }

    const getConfig = async () => {
        const configResponse = await fetch('/config/config.json', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        const config = await configResponse.json()
        SET_CONFIG(config)
    }

    const getData = () => {
        if (blockchain.account !== '' && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account))
        }
    }

    const claimNFTs = () => {
        let cost = data.price
        let gasLimit = CONFIG.GAS_LIMIT
        let totalCostWei = String(cost * mintAmount)

        if (data.paused) {
            toast.info('Minting will open soon.')
        } else {
            console.log('Current Wallet Supply : ', data.currentWalletSupply)
            if (parseInt(mintAmount) + parseInt(data.totalSupply) > parseInt(data.maxSupply)) {
                toast.warning('You have exceeded the max limit of minting.')
            } else {
                if (data.isFreeMintOpen) {
                    return freeMintTokens(gasLimit)
                } else {
                    return mintTokens(gasLimit, totalCostWei)
                }
            }
        }
    }

    const freeMintTokens = (gasLimit) => {
        if (parseInt(data.getMintedFreeTokenByWallet) + mintAmount > parseInt(data.maxFreePerWallet)) {
            toast.warning('Exceeds max free mint per wallet!')
        } else if (parseInt(data.totalSupply) + mintAmount > parseInt(data.maxFreeSupply)) {
            toast.warning('Exceeds max free mint supply!')
        } else {
            toast.info(`Minting your free ${CONFIG.NFT_NAME}...`)
            setClaimingNft(true)
            return blockchain.smartContract.methods
                .freeMint(mintAmount)
                .send({
                    gasLimit: gasLimit,
                    to: CONFIG.CONTRACT_ADDRESS,
                    from: blockchain.account,
                })
                .once('error', () => {
                    toast.error('Sorry, something went wrong please try again later.')
                    setClaimingNft(false)
                })
                .then(() => {
                    toast.success(`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`)
                    setClaimingNft(false)
                    dispatch(fetchData(blockchain.account))
                })
        }
    }

    const mintTokens = (gasLimit, totalCostWei) => {
        if (mintAmount > parseInt(data.maxPerTx)) {
            toast.warning('Exceeds max mint amount per tx!')
        } else if (parseInt(data.totalSupply) + mintAmount > parseInt(data.maxSupply)) {
            toast.warning('Max supply exceeded!')
        } else if (parseInt(data.currentWalletSupply) + mintAmount > 40) {
            toast.warning('Exceeds max mint per wallet!')
        } else {
            toast.info(`Minting your ${CONFIG.NFT_NAME}...`)
            setClaimingNft(true)
            return blockchain.smartContract.methods
                .publicMint(mintAmount)
                .send({
                    gasLimit: gasLimit,
                    to: CONFIG.CONTRACT_ADDRESS,
                    from: blockchain.account,
                    value: totalCostWei,
                })
                .once('error', (err) => {
                    console.log(err)
                    toast.error('Sorry, something went wrong please try again later.')
                    setClaimingNft(false)
                })
                .then((receipt) => {
                    console.log(receipt)
                    toast.success(`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`)
                    setClaimingNft(false)
                    dispatch(fetchData(blockchain.account))
                })
        }
    }

    const isWalletConnected = () => {
        return blockchain.account
    }

    const isContractReady = () => {
        return blockchain.smartContract
    }

    const isLoading = () => {
        return data.loading
    }

    useEffect(() => {
        getConfig()
    }, [])

    useEffect(() => {
        getData()
    }, [blockchain.account])

    return (
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center">
            <div className="mb-36 md:mb-0 mt-4 mb:mt-4">
                <h1 className="font-bold text-3xl md:text-6xl text-center md:text-left">
                    <span>Goblin Kids</span>
                    <span className="text-primary"> Mint</span>
                </h1>
                <div className="w-full bg-semi-dark mt-6 px-6 py-5 rounded-xl font-blue-goblet-regular">
                    <div className="flex justify-between">
                        <span className="text-2xl">Supply</span>
                        <span className="text-lg text-gray-400 font-medium">
                            {isWalletConnected() && isContractReady() && !isLoading() ? data.totalSupply : 'XXX'} / {CONFIG.MAX_SUPPLY}
                        </span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <div className="flex items-center">
                            <span className="text-2xl">Amount</span>
                            <button
                                onClick={() => setMintAmount(40)}
                                className="px-1 text-xs font-semibold bg-primary hover:bg-teal-500 transition-all duration-300 ease-in-out rounded-sm ml-2 text-semi-dark"
                            >
                                Max
                            </button>
                        </div>
                        <span className="space-x-4 flex items-center">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    decrementMintAmount()
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-400 hover:text-primary transition-all duration-300 ease-in-out"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <span className="text-xl">{mintAmount}</span>
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    incrementMintAmount()
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-400 hover:text-primary transition-all duration-300 ease-in-out"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span className="text-2xl">Price</span>
                        <div className="flex items-center">
                            <span className="mr-1">
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 fill-current">
                                    <title />
                                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                                </svg>
                            </span>
                            <span className="text-lg text-gray-400 font-medium">
                                {isWalletConnected() && isContractReady() && !isLoading() ? (
                                    <>{!data.isFreeMintOpen ? web3.utils.fromWei(web3.utils.toBN(data.price), 'ether') * mintAmount + ' ETH' : 'Free'}</>
                                ) : (
                                    'null'
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span className="text-2xl">Contract</span>
                        <div className="flex items-center">
                            <span className="mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <a href={CONFIG.SCAN_LINK} target={'_blank'} className="text-sm text-gray-400" rel="noreferrer">
                                {truncate(CONFIG.CONTRACT_ADDRESS, 7)}
                            </a>
                        </div>
                    </div>
                </div>
                {claimingNft && (
                    <button className="mt-6 bg-primary hover:bg-teal-500 transition-all duration-300 ease-in-out text-semi-dark font-semibold text-2xl w-full py-3 rounded-lg cursor-not-allowed">
                        Claiming NFT . . .
                    </button>
                )}
                {isWalletConnected() && isContractReady() && !isLoading() && !claimingNft ? (
                    <button
                        className="mt-6 bg-primary hover:bg-teal-500 transition-all duration-300 ease-in-out text-semi-dark font-semibold text-2xl w-full py-3 rounded-lg"
                        onClick={(e) => {
                            e.preventDefault()
                            claimNFTs()
                            getData()
                        }}
                    >
                        Mint
                    </button>
                ) : (
                    <>
                        {isLoading() && !claimingNft ? (
                            <button className="mt-6 bg-primary hover:bg-teal-500 transition-all duration-300 ease-in-out text-semi-dark font-semibold text-2xl w-full py-3 rounded-lg cursor-not-allowed">
                                Loading . . .
                            </button>
                        ) : (
                            <>
                                {!claimingNft && (
                                    <button
                                        className="mt-6 bg-primary hover:bg-teal-500 transition-all duration-300 ease-in-out text-semi-dark font-semibold w-full py-3 rounded-lg text-2xl"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            dispatch(connect())
                                            getData()
                                        }}
                                    >
                                        Connect Your Wallet
                                    </button>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
            <img src={mintingImage} alt="Hero_Image" className="rounded-2xl md:w-[52%]" />
        </div>
    )
}
