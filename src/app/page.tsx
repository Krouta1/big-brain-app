'use client';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Authenticated, Unauthenticated, useQuery } from 'convex/react';

export default function Home() {
  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
    </main>
  );
}
