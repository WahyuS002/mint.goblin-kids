import React, { useEffect } from 'react'
import { fetchData } from '../redux/data/dataActions'
import { useDispatch, useSelector } from 'react-redux'

import { AnimatePresence, motion } from 'framer-motion'

export default function Alert() {
    const dispatch = useDispatch()
    const blockchain = useSelector((state) => state.blockchain)
    const data = useSelector((state) => state.data)

    const getData = () => {
        if (blockchain.account !== '' && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account))
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
        getData()
    }, [blockchain.account])

    return (
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
            <>
                {isWalletConnected() && isContractReady() && !isLoading() ? (
                    <motion.div
                        className="flex justify-center"
                        initial={{ y: 100 }}
                        animate={{ y: [100, 110, 100] }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 25,
                        }}
                        exit={{
                            opacity: 0,
                            y: 100,
                            transition: {
                                duration: 0.15,
                                ease: 'easeOut',
                            },
                        }}
                    >
                        <div className="absolute bottom-4">
                            <div className="px-8 md:px-12 py-4 bg-semi-dark border border-gray-600 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-gray-200">
                                        <span>Public Mint</span>
                                        <span className="mx-2 text-gray-400">|</span>
                                        <span>Max 100 per wallet</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </>
        </AnimatePresence>
    )
}
