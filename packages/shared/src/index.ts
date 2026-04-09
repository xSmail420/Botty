import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  timestamp: z.string().optional(),
});

export type Message = z.infer<typeof MessageSchema>;

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  persona: z.string(),
  avatar: z.string().optional(),
  model: z.string(),
  knowledgeIds: z.array(z.string()).optional(),
});

export type Agent = z.infer<typeof AgentSchema>;

export const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  domain: z.string(),
  stripeId: z.string().optional(),
});


export * from './models';

export type PagePath = "analytics" | "knowledge-base" | "brain" | "integrations" | "widget" | "persona" | "performance";

export interface NavItem {
  icon: string;
  label: string;
  path: PagePath;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: "agents", label: "Agents", path: "analytics" },
  { icon: "library", label: "Library", path: "knowledge-base" },
  { icon: "history", label: "History", path: "brain" },
  { icon: "api-keys", label: "API Keys", path: "integrations" },
  { icon: "usage", label: "Usage", path: "widget" },
  { icon: "settings", label: "Settings", path: "persona" },
];

export const PAGE_TITLES: Record<PagePath, string> = {
  analytics: "Analytics & Observability",
  "knowledge-base": "Knowledge Base",
  brain: "Brain Configuration",
  integrations: "Tools & Integrations",
  widget: "Widget Customizer",
  persona: "Persona & Behavior",
  performance: "Performance Metrics",
};
