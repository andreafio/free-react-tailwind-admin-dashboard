import PageMeta from "../../components/common/PageMeta";
import OnboardingSteps from "../../components/onboarding/OnboardingSteps";

export default function Onboarding() {
  return (
    <>
      <PageMeta
        title="Complete Your Profile | SportApp"
        description="Complete your profile setup to get started with SportApp"
      />
      <OnboardingSteps />
    </>
  );
}
