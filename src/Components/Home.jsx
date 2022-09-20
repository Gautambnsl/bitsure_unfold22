import { Heading } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { setAddress } from '../slice'
import ConnectToWallet from './ConnectToWallet'
import './home.css'

export default function Home() {
    const userAddress = useSelector(setAddress)
    return (
        <div>
            <ConnectToWallet />
            <div className="home_box">
                <Heading
                    className="heading"
                    style={{
                        fontSize: '5rem',
                        color: '#fff',
                        marginBottom: '5rem',
                    }}
                >
                    Welcome Here !!!
                </Heading>
                <span className="titleText">Wallet Address:</span>
                <span className="headingText">
                    {userAddress?.payload?.walletAddress}
                </span>
            </div>{' '}
        </div>
    )
}
