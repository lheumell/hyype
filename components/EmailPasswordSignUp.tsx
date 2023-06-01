import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSignUpWithEmailAndPassword } from "../lib/hooks/useSignUpWithEmailAndPassword";
import { HyButton, HyLabelInput } from "..";

function EmailPasswordSignUpForm(
  props: React.PropsWithChildren<{
    onSignup: () => void;
  }>
) {
  const [signUp, state] = useSignUpWithEmailAndPassword();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = state.loading;
  const error = state.error;

  useEffect(() => {
    if (state.success) {
      props.onSignup();
    }
  }, [props, state.success]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      return signUp(email, password);
    },
    [email, loading, password, signUp]
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
        S'inscrire
      </HyButton>
    </div>
  );
}

export default EmailPasswordSignUpForm;
