import { z } from 'zod';
export declare const MessageSchema: z.ZodObject<{
    role: z.ZodEnum<{
        system: "system";
        user: "user";
        assistant: "assistant";
    }>;
    content: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Message = z.infer<typeof MessageSchema>;
export declare const AgentSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    persona: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    model: z.ZodString;
    knowledgeIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type Agent = z.infer<typeof AgentSchema>;
export declare const TenantSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    domain: z.ZodString;
    stripeId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Tenant = z.infer<typeof TenantSchema>;
