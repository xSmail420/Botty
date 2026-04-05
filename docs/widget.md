# AI Chat Widget

The Botty Widget is a high-performance, embeddable React application designed to live on any webpage with zero styling conflicts.

## Key Innovation: Shadow DOM
To ensure the widget doesn't break the parent page's layout (or vice versa), we mount the entire application inside a **Shadow DOM**.
- **Isolation**: CSS styles defined in the widget do not leak out.
- **Custom Elements**: The widget is registered as a custom HTML element `<my-ai-agent>`.

## Integration

### Script Tag
Host sites can embed the widget using a single script tag:
```html
<script src="https://cdn.botty.ai/widget.js" data-agent-id="AGENT_ID"></script>
```

### Manual Placement
Alternatively, once the script is loaded, you can place the widget anywhere:
```html
<my-ai-agent agent-id="default-agent"></my-ai-agent>
```

## Technical Architecture

- **React + Vite**: Built using Vite's "library mode" to bundle React and all dependencies into a single, optimized JS file.
- **Theme Injection**: The widget's CSS is injected directly into the Shadow Root at runtime.
- **Direct API Link**: Communicates directly with the Botty Backend `/api/chat` endpoint using the `agent-id` provided in the tag.

## Local Development
The widget has a dedicated test environment in `apps/widget/index.html`. 
1. Run `pnpm --filter @botty/widget dev`.
2. Visit `http://localhost:5173`.
3. The widget will appear in the bottom-right corner, interacting with your local backend.
