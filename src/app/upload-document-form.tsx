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

    // on submit call createDocument function with provided values
    async function onSubmit(values: z.infer<typeof uploadDocFormSchema>) {
        await createDocument(values)
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
