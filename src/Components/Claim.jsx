import { Button, Heading, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineBank } from 'react-icons/ai'
import getClaim from '../middleware/getClaim'

export default function Claim() {
    const [error, setError] = useState()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const toast = useToast()

    const onSubmit = async (data) => {
        if (data?.claim_docs) {
            toast({
                title: ` your documents submitted succesfully `,
                status: 'success',
                position: 'top',
                isClosable: true,
            })
            return getClaim(data.claim_docs)
        }
        return toast({
            title: ` fill your field `,
            status: 'error',
            position: 'top',
            isClosable: true,
        })
    }

    return (
        <div>
            <Heading
                style={{
                    paddingBottom: '2rem',
                    color: 'purple',
                    textTransform: 'capitalize',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <AiOutlineBank
                    style={{ fontSize: '3rem', margin: '-.5rem 1rem 0 0' }}
                />
                Claim Your Insurance
            </Heading>
            <Heading
                as="h3"
                size="lg"
                style={{ textTransform: 'capitalize', paddingTop: '5rem' }}
            >
                Upload your documents
            </Heading>

            <form onSubmit={handleSubmit(onSubmit)} className="profileForm">
                <Input
                    style={{
                        padding: '2rem',
                        fontSize: '1.5rem',
                        margin: '3rem 0 1.5rem 0',
                    }}
                    placeholder="Claim Proof Documents Link"
                    {...register('claim_docs', { required: true })}
                />

                {errors.exampleRequired && <span>This field is required</span>}

                <Button
                    type="submit"
                    style={{
                        padding: '1.5rem 4rem',
                        width: '100%',
                        fontSize: '1.5rem',
                        color: 'white',
                    }}
                    colorScheme="cyan"
                >
                    Submit
                </Button>

                {error && <span>Error: {error}</span>}
            </form>
        </div>
    )
}
