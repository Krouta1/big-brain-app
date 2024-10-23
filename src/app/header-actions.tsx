'use client'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'

const HeaderActions = () => {
    return (
        <>
            <Unauthenticated>
                <SignInButton />
            </Unauthenticated>
            <Authenticated>
                <UserButton />
            </Authenticated>
            <AuthLoading>
                <div>Loading...</div>
            </AuthLoading>
        </>
    )
}

export default HeaderActions
