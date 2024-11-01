import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// const secretKey = "secret";
// const key = new TextEncoder().encode(secretKey);

// export async function decrypt(input: string): Promise<any> {
//   const { payload } = await jwtVerify(input, key, {
//     algorithms: ["HS256"],
//   });
//   return payload;
// }

// export async function getSession() {
//   const session = (await cookies()).get("session")?.value;
//   if (!session) return null;
//   return await decrypt(session);
// }
