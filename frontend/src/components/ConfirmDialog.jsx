import { useEffect, useRef, useCallback } from 'react';
import './ConfirmDialog.css';

/**
 * Custom confirm/alert dialog with editorial styling.
 *
 * Props:
 * - isOpen: boolean - Whether dialog is visible
 * - title: string - Dialog title
 * - message: string - Dialog message
 * - confirmLabel: string - Confirm button text (default: "Confirm")
 * - cancelLabel: string - Cancel button text (default: "Cancel")
 * - onConfirm: function - Called when confirmed
 * - onCancel: function - Called when cancelled
 * - variant: "default" | "danger" | "alert" - Styling variant
 * - icon: "warning" | "info" | null - Icon to show in title
 */
export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  icon = null
}) {
  const dialogRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const cancelBtnRef = useRef(null);

  // Focus trap and keyboard handling
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel?.();
    } else if (e.key === 'Enter' && variant !== 'danger') {
      // Don't auto-confirm dangerous actions with Enter
      e.preventDefault();
      onConfirm?.();
    } else if (e.key === 'Tab') {
      // Focus trap within dialog
      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not([disabled])'
      );
      if (!focusableElements?.length) return;

      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }, [onCancel, onConfirm, variant]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus the appropriate button
      if (variant === 'alert') {
        confirmBtnRef.current?.focus();
      } else {
        cancelBtnRef.current?.focus();
      }

      // Add keyboard listener
      document.addEventListener('keydown', handleKeyDown);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, handleKeyDown, variant]);

  if (!isOpen) return null;

  const isAlert = variant === 'alert';
  const iconSymbol = icon === 'warning' ? '⚠' : icon === 'info' ? 'ℹ' : null;

  return (
    <div
      className="confirm-dialog-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel?.();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <div className="confirm-dialog" ref={dialogRef}>
        <div className="confirm-dialog-header">
          <h2 id="confirm-dialog-title" className="confirm-dialog-title">
            {iconSymbol && (
              <span className={`confirm-dialog-icon ${icon}`} aria-hidden="true">
                {iconSymbol}
              </span>
            )}
            {title}
          </h2>
        </div>

        <div className="confirm-dialog-body">
          <p id="confirm-dialog-message" className="confirm-dialog-message">
            {message}
          </p>
        </div>

        <div className={`confirm-dialog-footer ${isAlert ? 'alert-footer' : ''}`}>
          {!isAlert && (
            <button
              ref={cancelBtnRef}
              className="confirm-dialog-btn cancel"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          )}
          <button
            ref={confirmBtnRef}
            className={`confirm-dialog-btn confirm ${variant === 'danger' ? 'danger' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
