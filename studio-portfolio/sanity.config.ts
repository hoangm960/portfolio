import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'portfolio',

    projectId: process.env.SANITY_PROJECT_ID || 'z1k5z0p3',
    dataset: process.env.SANITY_DATASET || 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})
