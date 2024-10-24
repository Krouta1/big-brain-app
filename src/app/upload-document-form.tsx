'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { Loader2 } from 'lucide-react'
import LoadingButton from '@/components/loading-button'

const uploadDocFormSchema = z.object({
    title: z.string().min(2).max(250),
    file: z.instanceof(File),
})

const UploadDocumentForm = ({
    onUploadSuccess,
}: {
    onUploadSuccess: () => void
}) => {
    const form = useForm<z.infer<typeof uploadDocFormSchema>>({
        resolver: zodResolver(uploadDocFormSchema),
        defaultValues: {
            title: '',
        },
    })

    // Create a document function
    const createDocument = useMutation(api.documents.createDocument)
    const generateUploadUrl = useMutation(api.documents.generateUploadUrl)

    // on submit call createDocument function with provided values
    async function onSubmit(values: z.infer<typeof uploadDocFormSchema>) {
        //get url to upload file
        const url = await generateUploadUrl()

        //upload file to th db (s3 bucket)
        const result = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': values.file.type },
            body: values.file,
        })

        //get storage id from the response, it is in Convex docs
        const { storageId } = await result.json()
        await createDocument({
            title: values.title,
            fileId: storageId,
        })

        //call onUploadSuccess function to close the modal
        onUploadSuccess()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="random document"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your document name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    {...fieldProps}
                                    type="file"
                                    accept=".txt,.md,.mdx,.doc,.docx,.xml"
                                    onChange={(event) => {
                                        onChange(event.target.files?.[0] as any)
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your document name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton
                    isLoading={form.formState.isSubmitting}
                    type="submit"
                    loadingText="Uploading..."
                >
                    Upload
                </LoadingButton>
            </form>
        </Form>
    )
}

export default UploadDocumentForm
