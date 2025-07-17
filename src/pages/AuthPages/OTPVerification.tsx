import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import OTPVerificationForm from "../../components/auth/OTPVerificationForm";

export default function OTPVerification() {
  return (
    <>
      <PageMeta
        title="Verify Your Email | SportApp"
        description="Verify your email address to continue with SportApp registration"
      />
      <AuthLayout>
        <OTPVerificationForm />
      </AuthLayout>
    </>
  );
}
