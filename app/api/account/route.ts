import { getClerkFullName, getClerkUserId } from "@/config/clerk";
import { supabaseClerkServerClient } from "@/config/supabase";
import { NextResponse } from "next/server";
/**
 *
 * @param request list of product uuids
 */
async function createAccount(request: Request) {
  const body = await request.json();

  const { accountDetails } = body; // expect body as a special JSON object with name because NextRequest contains a bunch of
  console.log("Inside");
  console.log(accountDetails);

  let classYear = "";

  switch (accountDetails.classYear) {
    case "Fr":
      classYear = "freshman";
      break;
    case "So":
      classYear = "sophmore";
      break;
    case "Jr":
      classYear = "junior";
      break;
    case "Sr":
      classYear = "senior";
      break;
    case "Fac":
      classYear = "faculty";
      break;
  }

  const clerkId = await getClerkUserId();
  console.log("clerk");
  console.log(clerkId);
  const userFullName = await getClerkFullName();
  console.log("full username");
  console.log(userFullName);

  const { data, error } = await supabaseClerkServerClient
    .from("profile")
    .insert({
      class_year: classYear,
      is_onboarded: true,
      user_id: clerkId!,
      full_name: userFullName!,
      role: accountDetails.role,
    });

  if (error) throw error;

  const response = {
    success: "Supabase account created.",
  };

  return NextResponse.json(response);
}

export const POST = createAccount;
