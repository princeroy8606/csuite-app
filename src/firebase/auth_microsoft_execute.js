import axios from "axios";
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { googlePopup } from "./auth_google_popup";

const auth = getAuth();
const provider = new OAuthProvider("microsoft.com");

export const signinMicrosoft = async () => {
  let res = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = OAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // const idToken = credential.idToken;
      return { result, credential };
    })
    .catch(async (error) => {
      if (error?.code === "auth/account-exists-with-different-credential") {
        toast.warning("You have registered through another provider");
        console.log({ ...error });
        // if (
        //   error.customData?._tokenResponse?.verifiedProvider[0] === "google.com"
        // ) {
        //   return (res = await googlePopup());
        // }
      }
      return error;
    });
  await axios.post("https://c-suite-server.onrender.com/user/new", {
    name: res?.result?.user?.displayName,
    email: res?.result?.user?.email,
    authId: res?.result?.user?.uid,
  });
  return res;
};
