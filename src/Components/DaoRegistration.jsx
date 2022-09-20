import { Button, Heading, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import daoReg from '../middleware/daoReg'
import ModalEle from './modal/ModalEle'

export default function DaoRegistration() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <div>
            <Heading>Register for the DAO</Heading>
            <Button
                onClick={() => {
                    daoReg()
                    onOpen()
                }}
            >
                Register
            </Button>
            <ModalEle
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                title="Register For DAO"
                desc="Please Complete the payment for the DAO"
                cancelRef={cancelRef}
            />
        </div>
    )
}
