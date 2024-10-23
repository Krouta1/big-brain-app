'use client'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Authenticated, Unauthenticated } from 'convex/react'

import { ModeToggle } from '@/components/mode-toggle'
import Image from 'next/image'

const Header = () => {
    return (
        <div className="sticky top-0 flex h-20 items-center bg-slate-900 p-2 md:p-0">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4 text-2xl">
                    <Image
                        src="/logo.png"
                        alt="BigBrain"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    BigBrain
                </div>
                <div>
                    <Unauthenticated>
                        <SignInButton />
                    </Unauthenticated>
                    <Authenticated>
                        <div className="flex gap-4">
                            <ModeToggle />
                            <UserButton />
                        </div>
                    </Authenticated>
                </div>
            </div>
        </div>
    )
}

export default Header
