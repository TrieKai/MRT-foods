import { NodePlopAPI } from 'plop'

const Generator = (plop: NodePlopAPI) => {
  plop.setGenerator('pages', {
    description: 'Create a page',
    prompts: [
      { type: 'input', name: 'name', message: 'What is your pages name?' }
    ],
    actions: [
      {
        type: 'add',
        path: 'pages/{{camelCase name}}/[{{camelCase name}}Id].tsx',
        templateFile: 'plop-templates/pages/pages.tsx.hbs'
      }
    ]
  })

  plop.setGenerator('components', {
    description: 'Create a component',
    prompts: [
      { type: 'input', name: 'name', message: 'What is your component name?' }
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{camelCase name}}-component.tsx',
        templateFile: 'plop-templates/components/component.tsx.hbs'
      }
    ]
  })
}

export default Generator
