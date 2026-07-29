import { FunctionDefinition } from '../models';

export class TemplateGenerator {
  public static generate(func: FunctionDefinition, language: string): string {
    const { name, parameters, returnType } = func;
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    const langKey = language.toLowerCase().trim();

    switch (langKey) {
      case 'java': {
        const paramsStr = parameters
          .map((p) => `${this.toJavaType(p.type)} ${p.name}`)
          .join(', ');
        const javaReturn = this.toJavaType(returnType);
        return `class Solution {\n    public ${javaReturn} ${name}(${paramsStr}) {\n        // Write your Java solution here\n    }\n}`;
      }

      case 'cpp': {
        const paramsStr = parameters
          .map((p) => `${this.toCppType(p.type)} ${p.name}`)
          .join(', ');
        const cppReturn = this.toCppType(returnType);
        return `class Solution {\npublic:\n    ${cppReturn} ${name}(${paramsStr}) {\n        // Write your C++ solution here\n    }\n};`;
      }

      case 'python': {
        const paramsStr = parameters
          .map((p) => `${p.name}: ${this.toPythonType(p.type)}`)
          .join(', ');
        const pyReturn = this.toPythonType(returnType);
        return `class Solution:\n    def ${name}(self, ${paramsStr}) -> ${pyReturn}:\n        # Write your Python solution here\n        pass`;
      }

      case 'typescript': {
        const paramsStr = parameters
          .map((p) => `${p.name}: ${this.toTsType(p.type)}`)
          .join(', ');
        const tsReturn = this.toTsType(returnType);
        return `function ${name}(${paramsStr}): ${tsReturn} {\n    // Write your TypeScript solution here\n};`;
      }

      case 'javascript': {
        const paramsStr = parameters.map((p) => p.name).join(', ');
        return `/**\n * @param {${parameters.map((p) => p.type).join(', ')}} \n */\nvar ${name} = function(${paramsStr}) {\n    // Write your JavaScript solution here\n};`;
      }

      case 'csharp': {
        const paramsStr = parameters
          .map((p) => `${this.toJavaType(p.type)} ${p.name}`)
          .join(', ');
        const csReturn = this.toJavaType(returnType);
        return `public class Solution {\n    public ${csReturn} ${pascalName}(${paramsStr}) {\n        // Write your C# solution here\n    }\n}`;
      }

      case 'go': {
        const paramsStr = parameters
          .map((p) => `${p.name} ${this.toGoType(p.type)}`)
          .join(', ');
        const goReturn = this.toGoType(returnType);
        return `func ${name}(${paramsStr}) ${goReturn} {\n    // Write your Go solution here\n}`;
      }

      case 'rust': {
        const paramsStr = parameters
          .map((p) => `${p.name}: ${this.toRustType(p.type)}`)
          .join(', ');
        const rustReturn = this.toRustType(returnType);
        return `impl Solution {\n    pub fn ${name}(${paramsStr}) -> ${rustReturn} {\n        // Write your Rust solution here\n    }\n}`;
      }

      case 'kotlin': {
        const paramsStr = parameters
          .map((p) => `${p.name}: ${this.toKotlinType(p.type)}`)
          .join(', ');
        const ktReturn = this.toKotlinType(returnType);
        return `class Solution {\n    fun ${name}(${paramsStr}): ${ktReturn} {\n        // Write your Kotlin solution here\n    }\n}`;
      }

      default: {
        const paramsStr = parameters.map((p) => p.name).join(', ');
        return `function ${name}(${paramsStr}) {\n    // Write solution here\n}`;
      }
    }
  }

  private static toJavaType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'int[]';
    if (type === 'array<string>' || type === 'string[]') return 'String[]';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string' || type === 'String') return 'String';
    if (type === 'boolean' || type === 'bool') return 'boolean';
    return type;
  }

  private static toCppType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'vector<int>&';
    if (type === 'array<string>' || type === 'string[]') return 'vector<string>&';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string' || type === 'String') return 'string';
    if (type === 'boolean' || type === 'bool') return 'bool';
    return type;
  }

  private static toPythonType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'List[int]';
    if (type === 'array<string>' || type === 'string[]') return 'List[str]';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string' || type === 'String') return 'str';
    if (type === 'boolean' || type === 'bool') return 'bool';
    return type;
  }

  private static toTsType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'number[]';
    if (type === 'array<string>' || type === 'string[]') return 'string[]';
    if (type === 'number' || type === 'int') return 'number';
    if (type === 'string' || type === 'String') return 'string';
    if (type === 'boolean' || type === 'bool') return 'boolean';
    return type;
  }

  private static toGoType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return '[]int';
    if (type === 'array<string>' || type === 'string[]') return '[]string';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string' || type === 'String') return 'string';
    if (type === 'boolean' || type === 'bool') return 'bool';
    return type;
  }

  private static toRustType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'Vec<i32>';
    if (type === 'array<string>' || type === 'string[]') return 'Vec<String>';
    if (type === 'number' || type === 'int') return 'i32';
    if (type === 'string' || type === 'String') return 'String';
    if (type === 'boolean' || type === 'bool') return 'bool';
    return type;
  }

  private static toKotlinType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'IntArray';
    if (type === 'array<string>' || type === 'string[]') return 'Array<String>';
    if (type === 'number' || type === 'int') return 'Int';
    if (type === 'string' || type === 'String') return 'String';
    if (type === 'boolean' || type === 'bool') return 'Boolean';
    return type;
  }
}
