import { DashboardHeader } from "@/components/dashboard/creator/dashboard-header";
import { ProfileSection } from "@/components/dashboard/shared/profile-section";
import { WalletSettingsSection } from "@/components/dashboard/shared/wallet-settings-section";
import { NotificationPreferences } from "@/components/dashboard/shared/notification-preferences";
import { DangerZoneSection } from "@/components/dashboard/shared/danger-zone-section";
import { creatorProfile } from "@/components/dashboard/shared/settings-data";

export default function CreatorSettingsPage() {
  return (
    <>
      <DashboardHeader eyebrow="Account preferences" title="Settings" />

      <div className="flex flex-col gap-8">
        <ProfileSection profile={creatorProfile} />
        <WalletSettingsSection />
        <NotificationPreferences role="creator" />
        <DangerZoneSection />
      </div>
    </>
  );
}
