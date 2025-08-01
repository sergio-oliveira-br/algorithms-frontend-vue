// src/env.d.ts

// This block tells TypeScript how to handle .vue files
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}