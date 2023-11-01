import { useAuth0 } from "@auth0/auth0-react";

export default function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <p className="nav--element" onClick={handleSignUp}>
      Sign Up
    </p>
  );
}
