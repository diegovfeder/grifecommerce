// At it's simplest, the access control returns a yes or a no value depending on the user's session access level.
import { ListAccessArgs } from './types/wesbosTypes';

export function isSignedIn({ session }: ListAccessArgs) {
	return !!session;
}
