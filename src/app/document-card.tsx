import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Doc } from '../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'

const DocumentCard = ({ document }: { document: Doc<'documents'> }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{document.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <Button variant={'secondary'}>View</Button>
            </CardFooter>
        </Card>
    )
}

export default DocumentCard
