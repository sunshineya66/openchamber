import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui';
import { useUIStore } from '@/stores/useUIStore';
import { copyTextToClipboard } from '@/lib/clipboard';

export const OpenCodeStatusDialog: React.FC = () => {
  const { t } = useTranslation();
  const {
    isOpenCodeStatusDialogOpen,
    setOpenCodeStatusDialogOpen,
    openCodeStatusText,
  } = useUIStore();

  const handleCopy = React.useCallback(async () => {
    if (!openCodeStatusText) {
      return;
    }

    const result = await copyTextToClipboard(openCodeStatusText);
    if (result.ok) {
      toast.success(t('ui.openCodeStatus.copied'), { description: t('ui.openCodeStatus.copiedDesc') });
      return;
    }
    toast.error(t('ui.openCodeStatus.copyFailed'));
  }, [openCodeStatusText, t]);

  return (
    <Dialog open={isOpenCodeStatusDialogOpen} onOpenChange={setOpenCodeStatusDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t('ui.openCodeStatus.title')}</DialogTitle>
          <DialogDescription>
            {t('ui.openCodeStatus.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="app-region-no-drag inline-flex h-9 items-center justify-center rounded-md px-3 typography-ui-label font-medium text-muted-foreground transition-colors hover:bg-interactive-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t('ui.openCodeStatus.copy')}
          </button>
        </div>

        <pre className="max-h-[60vh] overflow-auto rounded-lg bg-surface-muted p-4 typography-code text-foreground whitespace-pre-wrap">
          {openCodeStatusText || t('ui.openCodeStatus.noData')}
        </pre>
      </DialogContent>
    </Dialog>
  );
};
