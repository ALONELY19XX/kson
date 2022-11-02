type SupportedCases = 'snake' | 'kebab' | 'pascal' | 'camel'

const fixedTransforms = new Map<string, string>()

function setFixedTransform(source: string, target: string): void {
  fixedTransforms.set(source, target)
}

function setFixedTransforms(transforms: [string, string][]): void {
  for (const [source, target] of transforms) {
    fixedTransforms.set(source, target)
  }
}

function getFixedTransforms(): Map<string, string> {
  return fixedTransforms
}

function generateKebabFromCamel(camelCaseStr: string): string {
  return camelCaseStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function generateSnakeFromCamel(camelCaseStr: string): string {
  return camelCaseStr.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

function generatePascalFromCamel(camelCaseStr: string): string {
  return camelCaseStr
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/\s/g)
    .filter(chunk => chunk.length > 0)
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('')
}

function generateKebabFromPascal(pascalCaseStr: string): string {
  return pascalCaseStr.replace(/([A-Z])([a-z])/g, '$1-$2').toLowerCase()
}

function generateSnakeFromPascal(pascalCaseStr: string): string {
  return pascalCaseStr.replace(/([A-Z])([a-z])/g, '$1_$2').toLowerCase()
}

function generateCamelFromPascal(pascalCaseStr: string): string {
  return pascalCaseStr
    .replace(/([A-Z])([a-z])/g, '$1 $2')
    .split(/\s/g)
    .filter(chunk => chunk.length > 0)
    .map((chunk, index) => {
      return index === 0
        ? chunk.charAt(0).toLowerCase() + chunk.slice(1)
        : chunk.charAt(0).toUpperCase() + chunk.slice(1)
    })
    .join('')
}

function generatePascalFromSnake(snakeCaseStr: string): string {
  return snakeCaseStr
    .split('_')
    .filter(chunk => chunk.length > 0)
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('')
}

function generateKebabFromSnake(snakeCaseStr: string): string {
  return snakeCaseStr.replace('_', '-')
}

function generateCamelFromSnake(snakeCaseStr: string): string {
  return snakeCaseStr
    .split('_')
    .filter(chunk => chunk.length > 0)
    .map((chunk, index) => {
      return index === 0
        ? chunk.charAt(0).toLowerCase() + chunk.slice(1)
        : chunk.charAt(0).toUpperCase() + chunk.slice(1)
    })
    .join('')
}

function generateCamelFromKebab(kebabCaseStr: string): string {
  return kebabCaseStr
    .split('-')
    .filter(chunk => chunk.length > 0)
    .map((chunk, index) => {
      return index === 0
        ? chunk.charAt(0).toLowerCase() + chunk.slice(1)
        : chunk.charAt(0).toUpperCase() + chunk.slice(1)
    })
    .join('')
}

function generatePascalFromKebab(kebabCaseStr: string): string {
  return kebabCaseStr
    .split('-')
    .filter(chunk => chunk.length > 0)
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('')
}

function generateSnakeFromKebab(kebabCaseStr: string): string {
  return kebabCaseStr.replace('-', '_')
}

function applyCaseTransformation(
  key: any,
  value: any,
  caseTransformer: Function
) {
  if (value && typeof value === 'object') {
    const transformations: any = {}
    for (const originalKey in value) {
      if (originalKey && Object.hasOwnProperty.call(value, originalKey)) {
        const newKey = caseTransformer(originalKey)
        transformations[newKey] = value[originalKey]
      }
    }
    return transformations
  }
  return value
}

// "myCamelCaseKey" --> "my-camel-case-key"
function fromCamelToKebab(key: any, value: any) {
  return applyCaseTransformation(key, value, generateKebabFromCamel)
}

// "myCamelCaseKey" --> "MyCamelCaseKey"
function fromCamelToPascal(key: any, value: any) {
  return applyCaseTransformation(key, value, generatePascalFromCamel)
}

// "myCamelCaseKey" --> "my_camel_case_key"
function fromCamelToSnake(key: any, value: any) {
  return applyCaseTransformation(key, value, generateSnakeFromCamel)
}

// "my_snake_case_key" --> "MySnakeCaseKey"
function fromSnakeToPascal(key: any, value: any) {
  return applyCaseTransformation(key, value, generatePascalFromSnake)
}

// "my_snake_case_key" --> "my-snake-case-key"
function fromSnakeToKebab(key: any, value: any) {
  return applyCaseTransformation(key, value, generateKebabFromSnake)
}

// "my_snake_case_key" --> "mySnakeCaseKey"
function fromSnakeToCamel(key: any, value: any) {
  return applyCaseTransformation(key, value, generateCamelFromSnake)
}

// "my-kebab-case-key" --> "MyKebabCaseKey"
function fromKebabToPascal(key: any, value: any) {
  return applyCaseTransformation(key, value, generatePascalFromKebab)
}

// "my-kebab-case-key" --> "my_kebab_case_key"
function fromKebabToSnake(key: any, value: any) {
  return applyCaseTransformation(key, value, generateSnakeFromKebab)
}

// "my-kebab-case-key"  --> "myKebabCaseKey"
function fromKebabToCamel(key: any, value: any) {
  return applyCaseTransformation(key, value, generateCamelFromKebab)
}

// "my-kebab-case-key" --> "MyKebabCaseKey"
function fromPascalToKebab(key: any, value: any) {
  return applyCaseTransformation(key, value, generateKebabFromPascal)
}

// "my-kebab-case-key" --> "my_kebab_case_key"
function fromPascalToSnake(key: any, value: any) {
  return applyCaseTransformation(key, value, generateSnakeFromPascal)
}

// "my-kebab-case-key"  --> "myKebabCaseKey"
function fromPascalToCamel(key: any, value: any) {
  return applyCaseTransformation(key, value, generateCamelFromPascal)
}

function stringifyToSnakeCase(key: any, value: any) {
  if (value && typeof value === 'object') {
    var replacement = {} as any
    for (var k in value) {
      if (Object.hasOwnProperty.call(value, k)) {
        replacement[k && k.charAt(0).toLowerCase() + k.substring(1)] = value[k]
      }
    }
    return replacement
  }
  return value
}

function stringify(
  obj: any,
  sourceCase: SupportedCases,
  targetCase: SupportedCases,
  options?: any
) {
  if (sourceCase === 'camel' && targetCase === 'kebab') {
    return JSON.stringify(obj, fromCamelToKebab)
  }
  if (sourceCase === 'camel' && targetCase === 'snake') {
    return JSON.stringify(obj, fromCamelToSnake)
  }
  if (sourceCase === 'camel' && targetCase === 'pascal') {
    return JSON.stringify(obj, fromCamelToPascal)
  }

  if (sourceCase === 'snake' && targetCase === 'camel') {
    return JSON.stringify(obj, fromSnakeToCamel)
  }
  if (sourceCase === 'snake' && targetCase === 'kebab') {
    return JSON.stringify(obj, fromSnakeToKebab)
  }
  if (sourceCase === 'snake' && targetCase === 'pascal') {
    return JSON.stringify(obj, fromSnakeToPascal)
  }

  if (sourceCase === 'kebab' && targetCase === 'camel') {
    return JSON.stringify(obj, fromKebabToCamel)
  }
  if (sourceCase === 'kebab' && targetCase === 'snake') {
    return JSON.stringify(obj, fromKebabToSnake)
  }
  if (sourceCase === 'kebab' && targetCase === 'pascal') {
    return JSON.stringify(obj, fromKebabToPascal)
  }

  if (sourceCase === 'pascal' && targetCase === 'camel') {
    return JSON.stringify(obj, fromPascalToCamel)
  }
  if (sourceCase === 'pascal' && targetCase === 'snake') {
    return JSON.stringify(obj, fromPascalToSnake)
  }
  if (sourceCase === 'pascal' && targetCase === 'kebab') {
    return JSON.stringify(obj, fromPascalToKebab)
  }

  return JSON.stringify(obj)
}

function parse() {
  console.log('parse')
}

export default { stringify, parse }
