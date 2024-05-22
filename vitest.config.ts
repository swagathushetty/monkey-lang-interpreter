import {defineConfig} from 'vitest/config'

export default defineConfig({
    test:{
        globals:true, //dont need to import vitest fucns in every file
        coverage:{
            reporter:["text","html"],
        }
    }
})