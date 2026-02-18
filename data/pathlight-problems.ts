/**
 * Pathlight Ventures Request for Startups
 * Source: https://pathlight.vc/rfs
 *
 * Pathlight is a seed-stage VC investing in B2B software,
 * focusing on companies that serve SMBs and mid-market enterprises.
 */

export interface PathlightProblem {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[]
  publishedDate: string
  originalUrl: string
}

export const pathlightAuthor = {
  id: "pathlight-vc",
  username: "Pathlight Ventures",
  avatarUrl: "",
  isPathlight: true,
}

export const pathlightProblems: PathlightProblem[] = [
  {
    id: "pathlight-smb-results-automation",
    title: "Automate Results Delivery for SMB Service Providers",
    elevatorPitch: "Build software that helps SMB service providers (agencies, consultants, accountants) automatically deliver and communicate results to their clients.",
    fullDescription: "SMB service providers spend enormous time manually preparing and delivering results to clients—reporting, updates, deliverables. Most lack the resources to build custom client portals or automation. The opportunity is building vertical SaaS that automates the 'last mile' of service delivery: generating reports, sending updates, tracking approvals, and proving value to clients. This increases retention and allows service providers to scale without proportionally scaling headcount.",
    category: "Future of Work",
    industryTags: ["B2B SaaS", "SMB", "Automation"],
    publishedDate: "2025-01-01",
    originalUrl: "https://pathlight.vc/rfs",
  },
  {
    id: "pathlight-smb-security-msp",
    title: "Enable SMB Security Through Managed Service Providers",
    elevatorPitch: "Build security tools designed for MSPs to deploy and manage across their SMB client portfolios.",
    fullDescription: "SMBs face growing cybersecurity threats but lack dedicated security teams. Managed Service Providers (MSPs) are increasingly expected to provide security services, but current enterprise tools don't fit the MSP model. The opportunity is building security products designed for MSP deployment: multi-tenant architecture, portfolio-wide visibility, simplified management, and pricing models that work for MSP margins. This is the distribution channel for bringing enterprise-grade security to SMBs.",
    category: "AI & Infrastructure",
    industryTags: ["Security", "MSP", "SMB"],
    publishedDate: "2025-01-01",
    originalUrl: "https://pathlight.vc/rfs",
  },
  {
    id: "pathlight-physical-observability",
    title: "Build Observability for the Physical World",
    elevatorPitch: "Create monitoring and observability platforms for physical operations—facilities, supply chains, equipment—matching what we have for software systems.",
    fullDescription: "Software has sophisticated observability: logging, metrics, tracing, alerting. Physical operations—warehouses, manufacturing, logistics—lack equivalent tooling despite being equally complex. The opportunity is building the 'Datadog for atoms': collecting data from physical sensors and systems, correlating events, detecting anomalies, and enabling teams to understand and optimize physical operations with the same rigor as software teams monitor applications.",
    category: "World of Atoms",
    industryTags: ["IoT", "Operations", "Infrastructure"],
    publishedDate: "2025-01-01",
    originalUrl: "https://pathlight.vc/rfs",
  },
  {
    id: "pathlight-healthcare-tech",
    title: "Modernize Healthcare Operations Technology",
    elevatorPitch: "Build software that helps healthcare organizations operate more efficiently, from scheduling to billing to patient communication.",
    fullDescription: "Healthcare remains one of the least digitized industries despite massive spending. Most healthcare organizations run on outdated software, manual processes, and paper workflows. The opportunity is building modern, vertical SaaS for healthcare operations: scheduling, billing, patient communication, credentialing, compliance. Success requires understanding healthcare's unique constraints—regulations, payer dynamics, workflow complexity—while bringing modern software practices to the industry.",
    category: "Longevity",
    industryTags: ["Healthcare", "B2B SaaS", "Operations"],
    publishedDate: "2025-01-01",
    originalUrl: "https://pathlight.vc/rfs",
  },
  {
    id: "pathlight-b2b-financial-transparency",
    title: "Create Financial Transparency Tools for B2B Transactions",
    elevatorPitch: "Build platforms that bring transparency and trust to B2B financial transactions—pricing, payments, credit.",
    fullDescription: "B2B financial transactions remain opaque. Pricing is often hidden behind 'contact us' walls. Payment terms are negotiated ad-hoc. Credit decisions lack transparency. The opportunity is building tools that bring consumer-style transparency to B2B commerce: public pricing, clear payment options, instant credit decisions, and transaction tracking. This reduces friction in B2B commerce and builds trust between buyers and sellers.",
    category: "Rebuild Money",
    industryTags: ["Fintech", "B2B", "Payments"],
    publishedDate: "2025-01-01",
    originalUrl: "https://pathlight.vc/rfs",
  },
  {
    id: "pathlight-enterprise-process-automation",
    title: "Automate Enterprise Back-Office Processes",
    elevatorPitch: "Build AI-powered automation for enterprise back-office processes—finance, HR, procurement—that still rely heavily on manual work.",
    fullDescription: "Enterprise back offices run on manual processes despite years of software investment. Finance teams still manually reconcile accounts, HR teams manually process requests, procurement teams manually manage vendor relationships. The opportunity is building AI-powered automation that can handle the judgment calls these processes require. Unlike RPA which automates simple, rule-based tasks, this requires AI that can handle exceptions and make decisions.",
    category: "AI & Infrastructure",
    industryTags: ["AI", "Enterprise", "Automation"],
    publishedDate: "2025-01-01",
    originalUrl: "https://pathlight.vc/rfs",
  },
]
