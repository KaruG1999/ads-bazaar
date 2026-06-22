import { DashboardHeader } from "@/components/dashboard/business/dashboard-header";
import { ProfileSection } from "@/components/dashboard/shared/profile-section";
import { WalletSettingsSection } from "@/components/dashboard/shared/wallet-settings-section";
import { NotificationPreferences } from "@/components/dashboard/shared/notification-preferences";
import { DangerZoneSection } from "@/components/dashboard/shared/danger-zone-section";
import { businessProfile } from "@/components/dashboard/shared/settings-data";

export default function BusinessSettingsPage() {
  return (
    <>
      <DashboardHeader eyebrow="Account preferences" title="Settings" />

      <div className="flex flex-col gap-8">
        <ProfileSection profile={businessProfile} />
        <WalletSettingsSection />
        <NotificationPreferences role="business" />
        <DangerZoneSection />
      </div>
    </>
  );
}
