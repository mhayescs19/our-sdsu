import { auth, currentUser } from "@clerk/nextjs/server";

export async function getClerkUserId() {
  const { userId } = await auth();

  return userId;
}

export async function getClerkFullName() {
  const user = await currentUser();

  if (!user) {
    throw new Error("user is not signed in");
  }

  return user!.fullName;
}
