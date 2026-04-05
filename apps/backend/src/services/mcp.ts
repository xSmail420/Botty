/**
 * Lightweight MCP Client for Backend Orchestration.
 * Supports tool discovery and execution via SSE.
 */
export class MCPClient {
  constructor(private serverUrl: string) {}

  /**
   * Fetches the list of available tools from a remote MCP server.
   */
  async listTools() {
    try {
      const response = await fetch(`${this.serverUrl}/tools`);
      if (!response.ok) throw new Error(`MCP: Failed to list tools: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('MCP Error:', error);
      return [];
    }
  }

  /**
   * Executes a tool on the remote MCP server.
   */
  async callTool(name: string, args: any) {
    try {
      const response = await fetch(`${this.serverUrl}/tools/${name}/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arguments: args }),
      });

      if (!response.ok) throw new Error(`MCP: Failed to call tool ${name}`);
      return await response.json();
    } catch (error) {
      console.error(`MCP Error calling ${name}:`, error);
      throw error;
    }
  }
}
