import { AdminGate } from "@/components/admin/admin-gate"
import { PredictPageClient2 } from "@/components/admin/predict-page-client-2"

export default function PredictPage2() {
  return (
    <AdminGate>
      <PredictPageClient2 />
    </AdminGate>
  )
}
