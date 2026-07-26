'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  WrapText, 
  Map, 
  Code2, 
  Sparkles, 
  RefreshCw, 
  AlertCircle,
  FileCode,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/src/context/ToastContext';

// Dynamic import for Monaco Editor with loading fallback (ssr: false)
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '13px', background: '#0D0A19', gap: '12px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid rgba(168, 85, 247, 0.3)', borderTopColor: '#C084FC', animation: 'spin 1s linear infinite' }} />
      <span>Loading Monaco Code Editor...</span>
    </div>
  ),
});

interface CodeEditorPanelProps {
  code: string;
  onChangeCode: (newCode: string) => void;
  onResetCode: () => void;
  language: string;
  onChangeLanguage: (lang: string) => void;
}

export function CodeEditorPanel({
  code,
  onChangeCode,
  onResetCode,
  language,
  onChangeLanguage,
}: CodeEditorPanelProps) {
  const { toast } = useToast();
  
  // Customization States
  const [theme, setTheme] = useState<string>('vs-dark');
  const [fontSize, setFontSize] = useState<number>(14);
  const [fontFamily, setFontFamily] = useState<string>('Consolas');
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');
  const [showMinimap, setShowMinimap] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Autosave & Status Bar States
  const [autosaveState, setAutosaveState] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [editorError, setEditorError] = useState<boolean>(false);
  
  // Cursor Position Tracking
  const [cursorLine, setCursorLine] = useState<number>(1);
  const [cursorCol, setCursorCol] = useState<number>(1);

  // File Upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map 9 languages to Monaco language identifiers
  const monacoLanguageMap: Record<string, string> = {
    typescript: 'typescript',
    javascript: 'javascript',
    python: 'python',
    java: 'java',
    cpp: 'cpp',
    go: 'go',
    rust: 'rust',
    csharp: 'csharp',
    kotlin: 'kotlin',
  };

  const currentMonacoLang = monacoLanguageMap[language] || 'typescript';

  // Language File Extensions
  const fileExtensionMap: Record<string, string> = {
    typescript: 'ts',
    javascript: 'js',
    python: 'py',
    java: 'java',
    cpp: 'cpp',
    go: 'go',
    rust: 'rs',
    csharp: 'cs',
    kotlin: 'kt',
  };

  // Autosave 2s Timer Trigger
  useEffect(() => {
    setAutosaveState('unsaved');
    const timer = setTimeout(() => {
      setAutosaveState('saving');
      setTimeout(() => {
        setAutosaveState('saved');
      }, 400);
    }, 1500);

    return () => clearTimeout(timer);
  }, [code]);

  // Handle Copy Code
  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast('Code copied to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Handle Download Code File
  const handleDownloadCode = () => {
    const ext = fileExtensionMap[language] || 'txt';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast(`Downloaded solution.${ext}`, 'info');
  };

  // Handle Upload File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onChangeCode(content);
        toast(`Uploaded file ${file.name}`, 'success');
      }
    };
    reader.readAsText(file);
  };

  // Handle Format Code
  const handleFormatCode = () => {
    // Basic automatic code formatting (trim trailing spaces & normalize line endings)
    const formatted = code
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');
    onChangeCode(formatted);
    toast('Code formatted cleanly', 'info');
  };

  const lineCount = code.split('\n').length;
  const charCount = code.length;
  const fileSizeKb = (new Blob([code]).size / 1024).toFixed(2);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0D0A19', borderLeft: '1px solid rgba(168, 85, 247, 0.25)', overflow: 'hidden' }}>
      
      {/* TOP TOOLBAR */}
      <div style={{
        padding: '8px 16px',
        background: 'rgba(20, 16, 38, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
        flexShrink: 0,
      }}>
        {/* Left Controls: 9 Languages, Themes, Font Size, Font Family */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          
          {/* Programming Language Dropdown (9 Languages) */}
          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value)}
            style={{
              padding: '5px 10px',
              borderRadius: '8px',
              background: 'rgba(168, 85, 247, 0.25)',
              border: '1px solid #C084FC',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python 3</option>
            <option value="java">Java 17</option>
            <option value="cpp">C++ 20</option>
            <option value="go">Go 1.21</option>
            <option value="rust">Rust 2021</option>
            <option value="csharp">C# 11</option>
            <option value="kotlin">Kotlin 1.9</option>
          </select>

          {/* Theme Dropdown */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              padding: '5px 8px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#CBD5E1',
              fontSize: '11px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="vs-dark">DSA Dark Purple</option>
            <option value="vs-dark">VS Dark</option>
            <option value="light">VS Light</option>
          </select>

          {/* Font Size Dropdown */}
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{
              padding: '5px 8px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#CBD5E1',
              fontSize: '11px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value={12}>12px</option>
            <option value={14}>14px</option>
            <option value={16}>16px</option>
            <option value={18}>18px</option>
            <option value={20}>20px</option>
          </select>

          {/* Font Family Dropdown */}
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            style={{
              padding: '5px 8px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#CBD5E1',
              fontSize: '11px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="Consolas">Consolas</option>
            <option value="JetBrains Mono">JetBrains Mono</option>
            <option value="Fira Code">Fira Code</option>
            <option value="Cascadia Code">Cascadia Code</option>
          </select>
        </div>

        {/* Right Controls: Reset, Format, Copy, Download, Upload, WordWrap, Minimap, Fullscreen, Autosave Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          
          {/* Autosave Indicator Badge */}
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            color: autosaveState === 'saved' ? '#10B981' : autosaveState === 'saving' ? '#F59E0B' : '#94A3B8',
            background: 'rgba(255,255,255,0.04)',
            padding: '3px 8px',
            borderRadius: '6px',
            marginRight: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            {autosaveState === 'saved' ? <CheckCircle2 size={10} /> : <Sparkles size={10} />}
            {autosaveState === 'saved' ? 'Saved just now' : autosaveState === 'saving' ? 'Saving...' : 'Unsaved changes'}
          </span>

          {/* Format Code */}
          <button
            type="button"
            onClick={handleFormatCode}
            title="Format Code (Ctrl+Shift+F)"
            style={{ padding: '5px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Code2 size={12} /> Format
          </button>

          {/* Copy Code */}
          <button
            type="button"
            onClick={handleCopyCode}
            title="Copy Code"
            style={{ padding: '5px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {isCopied ? <Check size={12} style={{ color: '#10B981' }} /> : <Copy size={12} />}
          </button>

          {/* Download Code */}
          <button
            type="button"
            onClick={handleDownloadCode}
            title="Download Code File"
            style={{ padding: '5px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Download size={12} />
          </button>

          {/* Upload File */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Upload Local File"
            style={{ padding: '5px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#CBD5E1', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Upload size={12} />
          </button>
          <input ref={fileInputRef} type="file" onChange={handleFileUpload} style={{ display: 'none' }} />

          {/* Word Wrap Toggle */}
          <button
            type="button"
            onClick={() => setWordWrap(wordWrap === 'on' ? 'off' : 'on')}
            title="Word Wrap Toggle"
            style={{ padding: '5px 8px', borderRadius: '6px', background: wordWrap === 'on' ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: wordWrap === 'on' ? '#C084FC' : '#94A3B8', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <WrapText size={12} />
          </button>

          {/* Minimap Toggle */}
          <button
            type="button"
            onClick={() => setShowMinimap(!showMinimap)}
            title="Minimap Toggle"
            style={{ padding: '5px 8px', borderRadius: '6px', background: showMinimap ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: showMinimap ? '#C084FC' : '#94A3B8', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Map size={12} />
          </button>

          {/* Reset Code */}
          <button
            type="button"
            onClick={onResetCode}
            title="Reset Starter Code"
            style={{ padding: '5px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* MONACO EDITOR CANVAS / ERROR RECOVERY */}
      <div style={{ flex: 1, minHeight: 0, width: '100%', position: 'relative' }}>
        {editorError ? (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', color: '#EF4444', background: '#0D0A19' }}>
            <AlertCircle size={32} />
            <span>Failed to load Monaco Editor workspace.</span>
            <button
              type="button"
              onClick={() => setEditorError(false)}
              style={{ padding: '8px 16px', borderRadius: '8px', background: 'rgba(168,85,247,0.2)', border: '1px solid #C084FC', color: '#FFF', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
            >
              Reload Editor Workspace
            </button>
          </div>
        ) : (
          <Editor
            height="100%"
            language={currentMonacoLang}
            theme={theme}
            value={code}
            onChange={(val) => onChangeCode(val || '')}
            onMount={(editor) => {
              editor.onDidChangeCursorPosition((e) => {
                setCursorLine(e.position.lineNumber);
                setCursorCol(e.position.column);
              });
            }}
            options={{
              fontSize: fontSize,
              fontFamily: fontFamily,
              fontLigatures: true,
              minimap: { enabled: showMinimap },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              bracketPairColorization: { enabled: true },
              wordWrap: wordWrap,
              lineNumbers: 'on',
              folding: true,
              renderLineHighlight: 'all',
              stickyScroll: { enabled: true },
              padding: { top: 12, bottom: 12 },
            }}
          />
        )}
      </div>

      {/* EDITOR STATUS BAR (BOTTOM OF EDITOR) */}
      <div style={{
        height: '24px',
        padding: '0 14px',
        background: 'rgba(13, 10, 25, 0.98)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: '#64748B',
        fontFamily: 'monospace',
        flexShrink: 0,
        userSelect: 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ color: '#C084FC', fontWeight: 700 }}>{language.toUpperCase()}</span>
          <span>UTF-8</span>
          <span>Spaces: 4</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span>Ln {cursorLine}, Col {cursorCol}</span>
          <span>{lineCount} Lines</span>
          <span>{charCount} Chars ({fileSizeKb} KB)</span>
        </div>
      </div>

    </div>
  );
}
