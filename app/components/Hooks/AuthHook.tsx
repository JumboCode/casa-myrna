import { useAuth, useClerk } from "@clerk/nextjs";

const authHook = ({}) => {
    return null;
}

const signOutAction = () => {}

const AuthHookModule = {
    authHook,
    signOutAction
};

export default AuthHookModule;