import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleAuthProvider } from "firebase/auth";

import { useSignInWithProvider } from "../../lib/hooks/useSignInWithProvider";
import EmailPasswordSignUpForm from "../../components/EmailPasswordSignUp";
import Link from "next/link";

const SignUp = () => {
  const [signInWithProvider, signInWithProviderState] = useSignInWithProvider();

  const router = useRouter();

  const AuthProviderButton = () => {
    return (
      <button
        className="rounded-lg p-2 font-bold bg-red-400 text-white"
        onClick={() => {
          signInWithProvider(new GoogleAuthProvider());
        }}
      >
        Login with Google
      </button>
    );
  };

  const onSignup = useCallback(async () => {
    router.push("/events");
  }, [router]);

  useEffect(() => {
    if (signInWithProviderState.success) {
      onSignup();
    }
  }, [signInWithProviderState.success, onSignup]);

  return (
    <div className="flex flex-col space-y-8 items-center justify-center mx-auto h-screen w-11/12 lg:w-4/12">
      <div>
        <h1 className="Hero">S'inscrire</h1>
      </div>

      <div className="flex flex-col space-y-8">
        <AuthProviderButton />

        <EmailPasswordSignUpForm onSignup={onSignup} />
        <Link href="/auth/sign-in">Se connecter</Link>
      </div>
    </div>
  );
};

export default SignUp;
