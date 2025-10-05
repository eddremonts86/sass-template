import { SignIn } from '@clerk/nextjs';

/**
 * Sign in page component
 */
export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your account to continue
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-none border-0',
            },
          }}
        />
      </div>
    </div>
  );
}
