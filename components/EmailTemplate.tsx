import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  otp: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  otp,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <h2 style={{ color: "#f97316" }}>Welcome to Duos Eats!</h2>
    <p>Hello {firstName},</p>
    <p>
      Thank you for signing up. Please use the following verification code to
      complete your registration:
    </p>
    <div
      style={{
        background: "#fff4e6",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "20px",
        marginBottom: "20px",
        textAlign: "center" as const,
      }}
    >
      <span
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          letterSpacing: "8px",
          color: "#f97316",
        }}
      >
        {otp}
      </span>
    </div>
    <p>This code will expire in 10 minutes.</p>
    <p>If you didn&apos;t request this code, please ignore this email.</p>
  </div>
);
