import React from 'react'

const truncate = (input, len) => (input.length > len ? `${input.substring(0, len)}...` : input)

export default function Minting() {
    return (
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center">
            <div className="mb-36 md:mb-0 mt-4 mb:mt-4">
                <h1 className="font-bold text-3xl md:text-6xl text-center md:text-left">
                    <span>Mint your</span> <br /> <span className="text-primary">Goblin Kids</span>
                </h1>
                <div className="w-full bg-semi-dark mt-6 px-6 py-5 rounded-xl">
                    <div className="flex justify-between">
                        <span>Supply</span>
                        <span className="text-sm text-gray-400 font-medium">XXX / 7777</span>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Amount</span>
                        <span className="space-x-4 flex items-center">
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-400 hover:text-primary transition-all duration-300 ease-in-out"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <span className="text-xl">1</span>
                            <button>
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
                        <span>Price</span>
                        <div className="flex items-center">
                            <span className="mr-1">
                                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 fill-current">
                                    <title />
                                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                                </svg>
                            </span>
                            <span className="text-sm text-gray-400 font-medium">null</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-3">
                        <span>Contract</span>
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
                            <a href="/" className="text-sm text-gray-400">
                                {truncate('0x6f75FFD9f92Ff4dE083e5421c9e8949642420A63', 7)}
                            </a>
                        </div>
                    </div>
                </div>
                <button className="mt-6 bg-primary hover:bg-teal-500 transition-all duration-300 ease-in-out text-semi-dark font-semibold text-xl w-full py-3 rounded-lg">Connect Your Wallet</button>
            </div>
            <img
                src="https://lh3.googleusercontent.com/0TuQ40Ul_R8JuyarGsplYIj_pIomT7iyhP2MZZiiBNX2I0wiq0yQZoNpBtiF96VeioQSikDsrI80BCgpwc-RgGaWko9yctHSU0H05VM=w600"
                alt="Hero_Image"
                className="rounded-2xl"
            />
        </div>
    )
}
