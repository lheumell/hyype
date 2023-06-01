import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleAuthProvider } from "firebase/auth";

import { useSignInWithProvider } from "../../lib/hooks/useSignInWithProvider";
import EmailPasswordSignInForm from "../../components/EmailPasswordSignIn";
import { HyText } from "../../components/Atoms/HyText";
import Link from "next/link";

const SignIn = () => {
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

  const onSignIn = useCallback(() => {
    return router.push("/events");
  }, [router]);

  useEffect(() => {
    if (signInWithProviderState.success) {
      onSignIn();
    }
  }, [signInWithProviderState.success, onSignIn]);

  return (
    <div className="flex flex-col space-y-8 items-center justify-center mx-auto h-screen w-11/12 lg:w-4/12">
      <div>
        <HyText variant="title" weight="bold">
          Se connecter
        </HyText>
      </div>

      <div className="flex flex-col space-y-8">
        <AuthProviderButton />

        <EmailPasswordSignInForm onSignIn={onSignIn} />
        <Link href="/auth/sign-up">S'inscrire</Link>
      </div>
    </div>
  );
};

export default SignIn;
