const fs = require('fs')
const path = require('path')
const prettier = require('prettier')

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function camel(str) {
  return str
    .split('-')
    .map(capitalize)
    .join('')
}

const TARGET_DIR = path.resolve('src/components/icon')

const ICON_NAMES = fs
  .readdirSync('./static/icons')
  .map(name => name.replace('.svg', ''))

const COMPONENT_NAMES = ICON_NAMES.map(camel)

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR)
}

const code = `
  import React from 'react'
  ${ICON_NAMES.map(
    (name, i) => `import ${COMPONENT_NAMES[i]} from 'icons/${name}.svg'`
  ).join('\n')}

  type IconName = ${ICON_NAMES.map(name => `'${name}'`).join('|')}

  const iconsDict: { [key in IconName]: React.FC } = {
    ${ICON_NAMES.map((name, i) => `'${name}': ${COMPONENT_NAMES[i]}`)}
  }

  interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName
  }

  export default function Icon({ name, ...props }: IconProps) {
    return React.createElement(iconsDict[name], props)
  }
`

prettier.resolveConfig(__filename).then(options => {
  fs.writeFileSync(
    path.resolve(TARGET_DIR, 'index.tsx'),
    prettier.format(code, { ...options, parser: 'typescript' })
  )
})
