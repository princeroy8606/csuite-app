import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const googlePopup = async () => {
  const res = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log({ user, token });
      return { user, token };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ errorCode, errorMessage, email, credential });
      return { errorCode, errorMessage, email, credential };
    });
  await axios.post("https://c-suite-server.onrender.com/user/new", {
    name: res?.user?.displayName,
    email: res?.user?.email,
    authId: res?.user?.uid,
  });
  return res;
};
