(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="../../typescript/typescriptAPI/TypeScriptAPIPlugin.d.ts" />
"use strict";

SupCore.system.registerPlugin("typescriptAPI", "Sup.Sound", {
    code: "namespace Sup { export class Sound extends Asset {} }",
    defs: "declare namespace Sup { class Sound extends Asset { dummySoundMember; } }"
});
SupCore.system.registerPlugin("typescriptAPI", "Sup.Audio", {
    code: "namespace Sup {\r\n  export namespace Audio {\r\n    export function getMasterVolume(volume) {\r\n      if (player.gameInstance.audio.getContext() == null) return 0;\r\n      return player.gameInstance.audio.masterGain.gain.value;\r\n    }\r\n    export function setMasterVolume(volume) {\r\n      if (player.gameInstance.audio.getContext() == null) return;\r\n      player.gameInstance.audio.masterGain.gain.value = volume;\r\n    }\r\n  }\r\n}\r\n",
    defs: "declare namespace Sup {\r\n  namespace Audio {\r\n    function getMasterVolume(): number;\r\n    function setMasterVolume(volume: number): void;\r\n  }\r\n}\r\n"
});
SupCore.system.registerPlugin("typescriptAPI", "Sup.Audio.SoundPlayer", {
    code: "namespace Sup {\r\n  export namespace Audio {\r\n    export function playSound(pathOrAsset: string|Sound, volume=1.0, options?: { loop?: boolean; pitch?: number; pan?: number; }) {\r\n      return new SoundPlayer(pathOrAsset, volume, options).play();\r\n    }\r\n  \r\n    export class SoundPlayer {\r\n      __inner: any;\r\n      constructor(pathOrAsset: string|Sound, volume=1.0, options?: { loop?: boolean; pitch?: number; pan?: number; }) {\r\n        let audioCtx = player.gameInstance.audio.getContext();\r\n        let audioMasterGain = player.gameInstance.audio.masterGain;\r\n        let soundAsset = (typeof pathOrAsset === \"string\") ? get(pathOrAsset, Sound) : <Sound>pathOrAsset;\r\n        this.__inner = new SupEngine.SoundPlayer(audioCtx, audioMasterGain, soundAsset.__inner.buffer);\r\n        this.__inner.setVolume(volume);\r\n        \r\n        if (options != null) {\r\n          if (options.loop != null) this.__inner.setLoop(options.loop);\r\n          if (options.pan != null) this.__inner.setPan(options.pan);\r\n          if (options.pitch != null) this.__inner.setPitch(options.pitch);\r\n        }\r\n      }\r\n      play() { this.__inner.play(); return this; }\r\n      stop() { this.__inner.stop(); return this; }\r\n      pause() { this.__inner.pause(); return this; }\r\n      isPlaying() { return this.__inner.getState() === SoundPlayer.State.Playing; }\r\n      getState() { return this.__inner.getState(); }\r\n\r\n      getLoop() { return this.__inner.isLooping; }\r\n      setLoop(looping) { this.__inner.setLoop(looping); return this; }\r\n      getVolume() { return this.__inner.volume; }\r\n      setVolume(volume) { this.__inner.setVolume(volume); return this; }\r\n      getPan() { return this.__inner.pan; }\r\n      setPan(pan) { this.__inner.setPan(pan); return this; }\r\n      getPitch() { return this.__inner.pitch; }\r\n      setPitch(pitch) { this.__inner.setPitch(pitch); return this; }\r\n    }\r\n    \r\n    export namespace SoundPlayer {\r\n      export enum State { Playing, Paused, Stopped }\r\n    }\r\n  }\r\n}\r\n",
    defs: "declare namespace Sup {\r\n  namespace Audio {\r\n    function playSound(pathOrAsset: string|Sound, volume?: number /* 1.0 */, options?: { loop?: boolean; pitch?: number; pan?: number; }): SoundPlayer;\r\n  \r\n    class SoundPlayer {\r\n      constructor(pathOrAsset: string|Sound, volume?: number /* 1.0 */, options?: { loop?: boolean; pitch?: number; pan?: number; });\r\n      play(): SoundPlayer;\r\n      stop(): SoundPlayer;\r\n      pause(): SoundPlayer;\r\n      isPlaying(): boolean;\r\n      getState(): SoundPlayer.State;\r\n\r\n      getLoop(): boolean;\r\n      setLoop(looping: boolean): SoundPlayer;\r\n      getVolume(): number;\r\n      setVolume(volume: number): SoundPlayer;\r\n      getPan(): number;\r\n      setPan(pan: number): SoundPlayer;\r\n      getPitch(): number;\r\n      setPitch(pitch: number): SoundPlayer;\r\n    }\r\n\r\n    namespace SoundPlayer {\r\n      enum State { Playing, Paused, Stopped }\r\n    }\r\n  }\r\n}\r\n"
});

},{}]},{},[1]);
