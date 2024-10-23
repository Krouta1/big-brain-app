import { ButtonHTMLAttributes } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const LoadingButton = ({
    isLoading,
    type,
    children,
    loadingText,
}: {
    isLoading: boolean
    type: ButtonHTMLAttributes<HTMLButtonElement>['type']
    children: React.ReactNode
    loadingText?: string
}) => {
    return (
        <Button
            type={type}
            disabled={isLoading}
            className="flex items-center gap-2"
        >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {isLoading ? loadingText : children}
        </Button>
    )
}

export default LoadingButton
