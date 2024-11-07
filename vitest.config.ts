// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { config } from "dotenv";


export default defineConfig({
    test: {
        environment:'node',
        env:{
            ...config({ path: ".env" }).parsed               
        }
    },
});
