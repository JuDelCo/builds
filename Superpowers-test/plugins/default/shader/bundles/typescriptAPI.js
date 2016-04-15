(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="../../typescript/typescriptAPI/TypeScriptAPIPlugin.d.ts" />
"use strict";

SupCore.system.registerPlugin("typescriptAPI", "Sup.Shader", {
    code: "namespace Sup {\r\n  export class Shader extends Asset {}\r\n  export class ShaderUniforms {\r\n    renderer: any;\r\n\r\n    constructor(renderer: any) {\r\n      if (renderer == null) throw new Error(\"ShaderUniforms can't be created at runtime. You can access them from a SpriteRenderer or a ModelRenderer\");\r\n      this.renderer = renderer;\r\n    }\r\n\r\n    checkUniform(name: string) {\r\n      if (this.renderer.__inner.material.uniforms == null) throw new Error(\"Material type must be Shader to access uniforms\");\r\n      if (this.renderer.__inner.material.uniforms[name] == null) throw new Error(`Uniform ${name} isn't defined`);\r\n    }\r\n\r\n    getFloat(name: string) {\r\n      this.checkUniform(name);\r\n      return this.renderer.__inner.material.uniforms[name];\r\n    }\r\n    setFloat(name: string, value: number) {\r\n      this.checkUniform(name);\r\n      this.renderer.__inner.material.uniforms[name].value = value;\r\n      return this;\r\n    }\r\n\r\n    getColor(name: string) {\r\n      this.checkUniform(name);\r\n      let uniform = this.renderer.__inner.material.uniforms[name].value;\r\n      return new Sup.Color(uniform.r, uniform.g, uniform.b);\r\n    }\r\n    setColor(name: string, value: Sup.Color) {\r\n      this.checkUniform(name);\r\n      let uniform = this.renderer.__inner.material.uniforms[name].value;\r\n      uniform.r = value.r;\r\n      uniform.g = value.g;\r\n      uniform.b = value.b;\r\n      return this;\r\n    }\r\n\r\n    getVector2(name: string) {\r\n      this.checkUniform(name);\r\n      let uniform = this.renderer.__inner.material.uniforms[name].value;\r\n      return new Sup.Math.Vector2(uniform.x, uniform.y);\r\n    }\r\n    setVector2(name: string, value: Sup.Math.Vector2) {\r\n      this.checkUniform(name);\r\n      let uniform = this.renderer.__inner.material.uniforms[name].value;\r\n      uniform.x = value.x;\r\n      uniform.y = value.y;\r\n      return this;\r\n    }\r\n    getVector3(name: string) {\r\n      this.checkUniform(name);\r\n      let uniform = this.renderer.__inner.material.uniforms[name].value;\r\n      return new Sup.Math.Vector3(uniform.x, uniform.y, uniform.z);\r\n    }\r\n    setVector3(name: string, value: Sup.Math.Vector3) {\r\n      this.checkUniform(name);\r\n      let uniform = this.renderer.__inner.material.uniforms[name].value;\r\n      uniform.x = value.x;\r\n      uniform.y = value.y;\r\n      uniform.z = value.z;\r\n      return this;\r\n    }\r\n    getVector4(name: string) {\r\n      this.checkUniform(name);\r\n      let uniform = this.renderer.__inner.material.uniforms[name].value;\r\n      return { x: uniform.x, y: uniform.y, z: uniform.z, w: uniform.w };\r\n    }\r\n    setVector4(name: string, value: { x: number; y: number; z: number; w: number; }) {\r\n      this.checkUniform(name);\r\n      let uniform = this.renderer.__inner.material.uniforms[name].value;\r\n      uniform.x = value.x;\r\n      uniform.y = value.y;\r\n      uniform.z = value.z;\r\n      uniform.w = value.w;\r\n      return this;\r\n    }\r\n  }\r\n}\r\n",
    defs: "declare namespace Sup {\r\n  class Shader extends Asset {\r\n    dummyShaderMember;\r\n  }\r\n  class ShaderUniforms {\r\n    getFloat(name: string): number;\r\n    setFloat(name: string, value: number): ShaderUniforms;\r\n\r\n    getColor(name: string): Sup.Color;\r\n    setColor(name: string, value: Sup.Color): ShaderUniforms;\r\n\r\n    getVector2(name: string): Sup.Math.Vector2;\r\n    setVector2(name: string, value: Sup.Math.Vector2): ShaderUniforms;\r\n    getVector3(name: string): Sup.Math.Vector3;\r\n    setVector3(name: string, value: Sup.Math.Vector3): ShaderUniforms;\r\n    getVector4(name: string): { x: number; y: number; z: number; w: number; };\r\n    setVector4(name: string, value: { x: number; y: number; z: number; w: number; }): ShaderUniforms;\r\n  }\r\n}\r\n",
});

},{}]},{},[1]);
