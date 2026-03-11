"use client";

import React from "react";

interface ProjectionErrorBoundaryProps {
  children: React.ReactNode;
  onClose?: () => void;
}

interface ProjectionErrorBoundaryState {
  hasError: boolean;
}

export class ProjectionErrorBoundary extends React.Component<
  ProjectionErrorBoundaryProps,
  ProjectionErrorBoundaryState
> {
  constructor(props: ProjectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ProjectionErrorBoundaryState {
    return { hasError: true };
  }

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#1A1A2E" }}
        >
          <p
            className="text-2xl font-semibold mb-4"
            style={{ color: "#F5F0EB" }}
          >
            Something went wrong with the projection.
          </p>
          <p className="text-lg mb-8" style={{ color: "#A0A0B0" }}>
            An unexpected error occurred while displaying content.
          </p>
          <div className="flex gap-4">
            <button
              onClick={this.handleRetry}
              className="px-6 py-3 rounded-lg text-lg font-medium transition-colors"
              style={{
                backgroundColor: "#2D5A8E",
                color: "#F5F0EB",
              }}
            >
              Try Again
            </button>
            <button
              onClick={this.handleClose}
              className="px-6 py-3 rounded-lg text-lg font-medium transition-colors"
              style={{
                backgroundColor: "transparent",
                color: "#F5F0EB",
                border: "1px solid #F5F0EB",
              }}
            >
              Close Projection
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
