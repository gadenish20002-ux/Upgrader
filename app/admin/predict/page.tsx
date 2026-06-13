import { AdminGate } from "@/components/admin/admin-gate"
import { PredictPageClient } from "@/components/admin/predict-page-client"

export default function PredictPage() {
  return (
    <AdminGate>
      <PredictPageClient />
    </AdminGate>
  )
}
