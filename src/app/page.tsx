'use client';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const createDocument = useMutation(api.documents.createDocument);

  const documents = useQuery(api.documents.getDocuments);

  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <button
          onClick={() => {
            createDocument({ title: 'Hello, world!' });
          }}
        >
          Click me
        </button>
        {documents?.map((document) => (
          <div key={document._id}>{document.title}</div>
        ))}
      </Authenticated>
    </main>
  );
}
