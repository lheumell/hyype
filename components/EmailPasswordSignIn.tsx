import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "../lib/hooks/useSignInWithEmailAndPassword";
import { HyButton, HyLabelInput } from "..";

function EmailPasswordSignInForm(
  props: React.PropsWithChildren<{
    onSignIn: () => void;
  }>
) {
  const [signIn, state] = useSignInWithEmailAndPassword();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = state.loading;
  const error = state.error;

  useEffect(() => {
    if (state.success) {
      props.onSignIn();
    }
  }, [props, state.success]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      // sign user in
      return signIn(email, password);
    },
    [email, loading, password, signIn]
  );

  return (
    <div className={"flex-col space-y-6"}>
      <HyLabelInput
        label={"email"}
        value={email}
        setValue={setEmail}
        type={"text"}
      />
      <HyLabelInput
        label={"mot de passe"}
        value={password}
        setValue={setPassword}
        type={"password"}
      />

      {error ? <span className="text-red-500">{error.message}</span> : null}

      <HyButton isDisabled={loading} onClick={onSubmit}>
        Se connecter
      </HyButton>
    </div>
  );
}

export default EmailPasswordSignInForm;
