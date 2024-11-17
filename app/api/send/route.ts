import { EmailTemplate } from "../../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name, otp } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Duos Eats <noreply@duoseats.com>",
      to: [email],
      subject: "Verify your email address",
      react: EmailTemplate({ firstName: name.split(" ")[0], otp }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
