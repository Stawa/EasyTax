import { getSession } from "~/auth/cookie.server";
import { firestoreService } from "~/auth/firebase.server";
import { UserProfile } from "~/types/user";

interface UserResponse {
  user: UserProfile;
  error?: string;
}

export async function getUser(request: Request): Promise<UserResponse> {
  const session = await getSession(request);
  const userId = session.get("userId");

  if (!userId) {
    return { user: {} as UserProfile, error: "User not found" };
  }

  return getUserById(userId);
}

export async function getUserById(userId: string): Promise<UserResponse> {
  const user = await firestoreService.getDocument("users", userId);

  if (!user) {
    return { user: {} as UserProfile, error: "User not found" };
  }

  return { user: user as UserProfile };
}
