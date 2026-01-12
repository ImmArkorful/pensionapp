import { SummaryCards } from '../components/dashboard/SummaryCards'
import { ContributionTrend } from '../components/dashboard/ContributionTrend'
import { AutoDebitCard } from '../components/dashboard/AutoDebitCard'
import { NotificationsPanel } from '../components/dashboard/NotificationsPanel'
import { ReminderSettings } from '../components/dashboard/ReminderSettings'
import { StatementPreview } from '../components/dashboard/StatementPreview'
import { NextOfKinCard } from '../components/dashboard/NextOfKinCard'
import { ReferralBanner } from '../components/dashboard/ReferralBanner'
import { AppShell } from '../components/layout/AppShell'

export const DashboardPage = () => {
  return (
    <AppShell>
      <SummaryCards />

      <div className="grid two-columns">
        <ContributionTrend />
        <AutoDebitCard />
      </div>

      <div className="grid three-columns">
        <NotificationsPanel />
        <ReminderSettings />
        <NextOfKinCard />
      </div>

      <StatementPreview />
      <ReferralBanner />
    </AppShell>
  )
}
