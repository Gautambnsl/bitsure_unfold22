import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../slice'
import { NFTStorage, File } from 'nft.storage'
import { Input, Button, Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import './home.css'
import bitsureRgzInsurance from '../middleware/bitsureRgzContract'
import getData from '../middleware/getData'

const client = new NFTStorage({
    token: process.env.REACT_APP_NFT_STORE_API_KEY,
})

async function sendDataToIPFS(attributes) {
    const metadata = await client.store({
        attributes,
        name: 'Bits',
        description: 'Bitsure NFT',
        image: new File([], 'pinpie.jpg', { type: 'image/jpg' }),
    })

    console.log(metadata.url)

    return metadata.url
}

export default function Profile() {
    const [error, setError] = useState()
    const [input, setInput] = useState({})
    const toast = useToast()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data, 'data')
        if (data?.name && data?.age && data?.h_address && data?.gd_link) {
            toast({
                title: `${data.name} !!, your form submitted succesfully `,
                status: 'success',
                position: 'top',
                isClosable: true,
            })
            setInput({ ...data })
        }
        const IPFSData = await sendDataToIPFS([data])
        dispatch(setUserDetails(data))

        let staticNFTURI =
            'https://gateway.pinata.cloud/ipfs/QmeCAKM9mkdabruyRWDFCqXW9WiLzb8fdgSGxkDLHDBHbT'

        try {
            bitsureRgzInsurance(
                data.name,
                data.age,
                data.h_address,
                data.gd_link,
                staticNFTURI
            )
        } catch (error) {
            setError(error)
        }

        console.log(error)

        getDataFromAddress()
    }

    getDataFromAddress()

    async function getDataFromAddress() {
        const userDataFromWalletAddress = await getData()

        console.log(userDataFromWalletAddress)
    }

    const dispatch = useDispatch()

    const storeData = useSelector(setUserDetails)

    // const userDataFromWalletAddress = getData()

    // console.log(userDataFromWalletAddress);

    return (
        <div className="profile_box">
            <Heading style={{ padding: '1rem 0 3rem 0', color: 'white' }}>
                Registration Form
            </Heading>
            {storeData.payload.userDetails ? (
                <div className="profileDetails">
                    <Heading as="h3" size="lg">
                        Name: {storeData.payload.userDetails.name}
                    </Heading>
                    <Heading as="h3" size="lg">
                        Age: {storeData.payload.userDetails.age}
                    </Heading>
                    <Heading as="h3" size="lg">
                        Home Address: {storeData.payload.userDetails.h_address}
                    </Heading>
                    <Heading as="h3" size="lg">
                        Documents Link: {storeData.payload.userDetails.gd_link}
                    </Heading>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="profileForm">
                    <Input
                        style={{
                            backgroundColor: 'white',
                            fontSize: '1.5rem',
                            padding: '1.5rem 2rem',
                            marginBottom: '2rem',
                        }}
                        placeholder="Full Name"
                        {...register('name', { required: true })}
                    />
                    <Input
                        style={{
                            backgroundColor: 'white',
                            fontSize: '1.5rem',
                            padding: '1.5rem 2rem',
                            marginBottom: '2rem',
                        }}
                        placeholder="Age"
                        {...register('age', { required: true })}
                    />
                    <Input
                        style={{
                            backgroundColor: 'white',
                            fontSize: '1.5rem',
                            padding: '1.5rem 2rem',
                            marginBottom: '2rem',
                        }}
                        placeholder="Home Address"
                        {...register('h_address', { required: true })}
                    />
                    <Input
                        style={{
                            backgroundColor: 'white',
                            fontSize: '1.5rem',
                            padding: '1.5rem 2rem',
                            marginBottom: '2rem',
                        }}
                        placeholder="Google Drive Link"
                        {...register('gd_link', { required: true })}
                    />

                    {errors.exampleRequired && (
                        <span>This field is required</span>
                    )}

                    <Button
                        type="submit"
                        style={{
                            padding: '2rem 4rem',
                            fontSize: '1.5rem',
                        }}
                        colorScheme="gray"
                    >
                        Submit
                    </Button>

                    {error && <span>Error: {error}</span>}
                </form>
            )}
        </div>
    )
}
