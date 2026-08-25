'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught unhandled React error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="bg-red-950/40 border border-red-800 rounded-lg p-6 text-center space-y-3 m-4">
          <h2 className="text-base font-bold text-red-300">Something went wrong</h2>
          <p className="text-xs text-slate-300 font-mono">{this.state.error?.message || 'An unexpected rendering error occurred.'}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded text-xs font-semibold"
          >
            Retry Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
