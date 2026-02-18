import type { VCThesis } from './index'

export const generalCatalyst2025Thesis: VCThesis = {
  slug: 'general-catalyst-2025',
  vcName: 'General Catalyst',
  vcShortName: 'GC',

  year: 2025,
  publishedAt: '2025-06-01',

  title: 'Five Critical Industries',
  subtitle: 'AI transformation for global resilience',
  brandColor: '#DC2626',

  sourceUrl: 'https://www.generalcatalyst.com/',
  sourceName: 'General Catalyst',

  summary: `General Catalyst has architected its strategy to drive global resilience through AI transformation in five critical industries: healthcare, defense, industrials, energy, and financial services. The firm organizes around CEO Hemant Taneja's "unscaling" thesis—using data and AI to personalize core societal services rather than just make them bigger.

GC has built a $1.5B AI roll-up engine, investing $100-150M into incubating AI-native companies and acquiring fragmented services businesses they can transform.`,

  sections: [
    {
      title: 'Healthcare',
      content: `General Catalyst has been a leading investor in healthcare since 2020, with a $600 million Health Assurance Fund in 2021 and $670 million in 2022. In 2025, they collaborated with the UK's NHS to launch a £30 million medical technology venture fund.`,
      bulletPoints: [
        'Health Assurance Fund investments',
        'NHS partnership for medical technology',
        'Digital health transformation',
        'Health systems modernization',
      ],
    },
    {
      title: 'Defense & Intelligence',
      content: `Focus on next-gen, ethically responsible companies for modern deterrence and cybersecurity.`,
      bulletPoints: [
        'Ethically responsible defense tech',
        'Modern deterrence systems',
        'Cybersecurity infrastructure',
        'Intelligence platform modernization',
      ],
    },
    {
      title: 'Industrials & Manufacturing',
      content: `AI-driven transformation of manufacturing, logistics, and industrial operations.`,
      bulletPoints: [
        'Manufacturing automation',
        'Supply chain optimization',
        'Industrial AI applications',
      ],
    },
    {
      title: 'Energy',
      content: `Clean energy, grid modernization, and sustainable infrastructure investments.`,
      bulletPoints: [
        'Clean energy technology',
        'Grid modernization',
        'Sustainable infrastructure',
      ],
    },
    {
      title: 'Financial Services',
      content: `Investments in fintech platforms like Circle, Stripe, and CRED, as well as insurance companies such as Oscar Health, highlight commitment to modernizing financial services.`,
      bulletPoints: [
        'Fintech platform investments',
        'Insurance technology (Oscar Health)',
        'Payments infrastructure (Stripe)',
        'Crypto infrastructure (Circle)',
      ],
    },
    {
      title: 'AI Roll-Ups Strategy',
      content: `GC has built a $1.5B AI roll-up engine: investing to incubate AI-native companies and acquiring fragmented services businesses to transform with AI.`,
      bulletPoints: [
        '$1.5B AI transformation engine',
        'Acquire and transform traditional services',
        'AI-enabled operational improvement',
        'Full value capture vs. software licensing',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['Healthcare', 'Defense', 'Energy', 'Fintech', 'AI'],
  themeCount: 5,
}
