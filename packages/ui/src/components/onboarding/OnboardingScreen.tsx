import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiFileCopyLine, RiCheckLine, RiExternalLinkLine } from '@remixicon/react';
import { isDesktopShell, isTauriShell } from '@/lib/desktop';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateDesktopSettings } from '@/lib/persistence';
import { copyTextToClipboard } from '@/lib/clipboard';

const INSTALL_COMMAND = 'curl -fsSL https://opencode.ai/install | bash';
const POLL_INTERVAL_MS = 3000;

type OnboardingScreenProps = {
  onCliAvailable?: () => void;
};

function BashCommand({ onCopy }: { onCopy: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center gap-3">
      <code>
        <span style={{ color: 'var(--syntax-keyword)' }}>curl</span>
        <span className="text-muted-foreground"> -fsSL </span>
        <span style={{ color: 'var(--syntax-string)' }}>https://opencode.ai/install</span>
        <span className="text-muted-foreground"> | </span>
        <span style={{ color: 'var(--syntax-keyword)' }}>bash</span>
      </code>
      <button
        onClick={onCopy}
        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        title={t('onboarding.copyToClipboard')}
      >
        <RiFileCopyLine className="h-4 w-4" />
      </button>
    </div>
  );
}

const HINT_DELAY_MS = 30000;

export function OnboardingScreen({ onCliAvailable }: OnboardingScreenProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);
  const [isDesktopApp, setIsDesktopApp] = React.useState(false);
  const [isRetrying, setIsRetrying] = React.useState(false);
  const [opencodeBinary, setOpencodeBinary] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), HINT_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    setIsDesktopApp(isDesktopShell());
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch('/api/config/settings', { method: 'GET', headers: { Accept: 'application/json' } });
        if (!response.ok) return;
        const data = (await response.json().catch(() => null)) as null | { opencodeBinary?: unknown };
        if (!data || cancelled) return;
        const value = typeof data.opencodeBinary === 'string' ? data.opencodeBinary.trim() : '';
        if (value) {
          setOpencodeBinary(value);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDragStart = React.useCallback(async (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a, input, select, textarea, code')) {
      return;
    }
    if (e.button !== 0) return;
    if (isDesktopApp && isTauriShell()) {
      try {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        const window = getCurrentWindow();
        await window.startDragging();
      } catch (error) {
        console.error('Failed to start window dragging:', error);
      }
    }
  }, [isDesktopApp]);

  const checkCliAvailability = React.useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/health');
      if (!response.ok) return false;
      const data = await response.json();
      return data.openCodeRunning === true || data.isOpenCodeReady === true;
    } catch {
      return false;
    }
  }, []);

  const handleRetry = React.useCallback(async () => {
    setIsRetrying(true);
    try {
      await fetch('/api/config/reload', { method: 'POST' });
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  }, []);

  const handleBrowse = React.useCallback(async () => {
    if (typeof window === 'undefined') {
      return;
    }
    if (!isDesktopApp || !isTauriShell()) {
      return;
    }

    const tauri = (window as unknown as { __TAURI__?: { dialog?: { open?: (opts: Record<string, unknown>) => Promise<unknown> } } }).__TAURI__;
    if (!tauri?.dialog?.open) {
      return;
    }

    try {
      const selected = await tauri.dialog.open({
        title: 'Select opencode binary',
        multiple: false,
        directory: false,
      });
      if (typeof selected === 'string' && selected.trim().length > 0) {
        setOpencodeBinary(selected.trim());
      }
    } catch {
      // ignore
    }
  }, [isDesktopApp]);

  const handleApplyPath = React.useCallback(async () => {
    setIsRetrying(true);
    try {
      await updateDesktopSettings({ opencodeBinary: opencodeBinary.trim() });
      await fetch('/api/config/reload', { method: 'POST' });
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  }, [opencodeBinary]);

  const handleCopy = React.useCallback(async () => {
    const result = await copyTextToClipboard(INSTALL_COMMAND);
    if (result.ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      console.error('Failed to copy:', result.error);
    }
  }, []);

  React.useEffect(() => {
    const poll = async () => {
      const available = await checkCliAvailability();
      if (available) {
        onCliAvailable?.();
      }
    };

    const interval = setInterval(poll, POLL_INTERVAL_MS);
    poll();

    return () => clearInterval(interval);
  }, [checkCliAvailability, onCliAvailable]);

  return (
    <div
      className="h-full flex items-center justify-center bg-transparent p-8 relative cursor-default select-none"
      onMouseDown={handleDragStart}
    >
      <div className="w-full space-y-4 text-center">
        <div className="space-y-4">
<h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {t('onboarding.welcome')}
          </h1>
          <p className="text-muted-foreground">
<a
              href="https://opencode.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              {t('onboarding.opencodeCli')}
              <RiExternalLinkLine className="h-4 w-4" />
            </a>
            {' '}{t('onboarding.isRequired')}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-background/60 backdrop-blur-sm border border-border rounded-lg px-5 py-3 font-mono text-sm w-fit">
            {copied ? (
<div className="flex items-center justify-center gap-2" style={{ color: 'var(--status-success)' }}>
                <RiCheckLine className="h-4 w-4" />
                {t('onboarding.copiedToClipboard')}
              </div>
            ) : (
              <BashCommand onCopy={handleCopy} />
            )}
          </div>
        </div>

<a
          href="https://opencode.ai/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 justify-center"
        >
          {t('onboarding.viewDocumentation')}
          <RiExternalLinkLine className="h-3 w-3" />
        </a>

<p className="text-sm text-muted-foreground animate-pulse">
          {t('onboarding.waitingForInstallation')}
        </p>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isRetrying ? t('onboarding.retrying') : t('onboarding.retry')}
          </button>
        </div>

        <div className="mx-auto w-full max-w-xl pt-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{t('onboarding.alreadyInstalledPath')}</div>
            <div className="flex gap-2">
              <Input
                value={opencodeBinary}
                onChange={(e) => setOpencodeBinary(e.target.value)}
                placeholder="/Users/you/.bun/bin/opencode"
                disabled={isRetrying}
                className="flex-1 font-mono text-xs"
              />
<Button
                type="button"
                variant="secondary"
                onClick={handleBrowse}
                disabled={isRetrying || !isDesktopApp || !isTauriShell()}
              >
                {t('onboarding.browse')}
              </Button>
              <Button
                type="button"
                onClick={handleApplyPath}
                disabled={isRetrying}
              >
                {t('onboarding.apply')}
              </Button>
            </div>
<div className="text-xs text-muted-foreground/70">
              {t('onboarding.saveAndReload')}
            </div>
          </div>
        </div>
      </div>

      {showHint && (
<div className="absolute bottom-8 left-0 right-0 text-center space-y-1">
          <p className="text-sm text-muted-foreground/70">
            {t('onboarding.installedInPath')} <code className="text-foreground/70">opencode</code> {t('onboarding.orSetEnvVar')}
          </p>
          <p className="text-sm text-muted-foreground/70">
            {t('onboarding.runtimeRequired')}
          </p>
        </div>
      )}
    </div>
  );
}
