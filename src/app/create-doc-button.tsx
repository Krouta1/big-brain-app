'use client'
import React, { ReactEventHandler, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import UploadDocumentForm from './upload-document-form'
import { Button } from '@/components/ui/button'

const CreateDocumentButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger asChild>
                    <Button variant={'default'}>Create Document</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload a document</DialogTitle>
                        <DialogDescription>
                            Upload a team document to share with your team and
                            search for it later.
                        </DialogDescription>
                    </DialogHeader>
                    <UploadDocumentForm
                        onUploadSuccess={() => {
                            setIsOpen(false)
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateDocumentButton
