type IncidentParams = {
  area: string
  route: string
  message: string
  details?: Record<string, unknown>
  error?: unknown
}

function createIncidentId(): string {
  const suffix = Math.random().toString(36).slice(2, 8)
  return `oq-${Date.now()}-${suffix}`
}

export async function reportIncident(params: IncidentParams): Promise<string> {
  const incidentId = createIncidentId()
  const payload = {
    incidentId,
    area: params.area,
    route: params.route,
    message: params.message,
    details: params.details || {},
    error:
      params.error instanceof Error
        ? { name: params.error.name, message: params.error.message, stack: params.error.stack }
        : params.error,
    timestamp: new Date().toISOString(),
  }

  console.error(`[openquest:incident:${incidentId}]`, payload)

  const webhookUrl = process.env.OPENQUEST_ALERT_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch (webhookError) {
      console.error(`[openquest:incident:${incidentId}] failed to notify alert webhook`, webhookError)
    }
  }

  return incidentId
}

