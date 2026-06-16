import { PredictPageClient } from "@/components/admin/predict-page-client"

// Predict popup scoped to the player's own key account. The global AccountGate
// (key login) already protects this route, and the store resolves the player's
// key here (non-admin path), so no extra admin password is required.
export default function CabinetPredictPage() {
  return <PredictPageClient />
}
