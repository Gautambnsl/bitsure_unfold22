import { Button, Heading, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import doRenue from '../middleware/doRenue'
import ModalEle from './modal/ModalEle'

export default function Renew() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <div>
            <Heading>Renew Your Insurance</Heading>
            <Button
                onClick={() => {
                    doRenue()
                    onOpen()
                }}
            >
                Renew your insurance
            </Button>
            <ModalEle
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                title="Renew Your Insurance"
                desc="Renew your insurance for future "
                cancelRef={cancelRef}
            />
        </div>
    )
}
