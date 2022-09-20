import { Button, Heading, Input, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import getClaimsIds from '../middleware/getClaimsIds'
import { useForm } from 'react-hook-form'
import voting from '../middleware/voting'
import ModalEle from './modal/ModalEle'

export default function ApproveClaim() {
    const [claimIds, setClaimIds] = useState()
    const [error, setError] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        voting(data.approved_id)
    }

    async function getInsuranceClaimIds() {
        onOpen()
        const ids = await getClaimsIds()
        console.log(ids[0]._hex)

        setClaimIds(ids[0]._hex, 16)
    }

    return (
        <div>
            <Button onClick={() => getInsuranceClaimIds()}>
                View Claim Requests
            </Button>
            {claimIds && <Heading>{parseInt(claimIds, 16)}</Heading>}

            {claimIds && (
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="profileForm"
                    >
                        <Input
                            placeholder="Chain Id to Approve"
                            {...register('approved_id', { required: true })}
                        />

                        <Heading>
                            Submit your vote for the given Claim ID
                        </Heading>

                        {errors.exampleRequired && (
                            <span>This field is required</span>
                        )}

                        <Button type="submit" colorScheme="cyan">
                            Submit
                        </Button>

                        {error && <span>Error: {error}</span>}
                    </form>
                </div>
            )}
            <ModalEle
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                title="View Claim Requests"
                desc="Feature Coming Soon"
                cancelRef={cancelRef}
            />
            {/* <Heading>{claimIds}</Heading> */}
        </div>
    )
}
