import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'mawski-web3', title: 'Mawski Web3', projectId: 'a6owxxb5', dataset: 'production', basePath: '/studio',
  plugins: [structureTool(), visionTool()], schema: {types: schemaTypes}
})
