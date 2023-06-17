import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { ethPersonalSignRecoverPublicKey } from "@polybase/eth";

export const auth = typeof window !== "undefined" ? new Auth() : null;
const nameSpace =
  "pk/0xa5aea800497707ff1048d31939c127ee0ee575058615e2a9568dc20bdf7db8f4a6d32f65c13df57c6965963103f657004398d033555a894d8ac21fc924871431/Test4";
export const db = new Polybase({
  defaultNamespace: nameSpace,
});

export const signIn = async () => {
  const authState = await auth?.signIn({ force: true });
  return authState;
};

export const signOut = async () => {
  const authState = await auth?.signOut();
  return authState;
};

export async function getPublicKey() {
  const msg = "Login with Chat";
  const sig = await auth?.ethPersonalSign(msg);
  const publicKey = ethPersonalSignRecoverPublicKey(sig!, msg);
  return "0x" + publicKey.slice(4);
}
