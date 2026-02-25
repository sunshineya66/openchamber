import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui';
import { RiAlertLine, RiLoader4Line } from '@remixicon/react';
import { useTranslation } from 'react-i18next';

interface StashDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operation: 'merge' | 'rebase';
  targetBranch: string;
  onConfirm: (restoreAfter: boolean) => Promise<void>;
}

export const StashDialog: React.FC<StashDialogProps> = ({
  open,
  onOpenChange,
  operation,
  targetBranch,
  onConfirm,
}) => {
  const [restoreAfter, setRestoreAfter] = React.useState(true);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const { t } = useTranslation();

  const operationLabel = operation === 'merge' ? t('features.git.merge') : t('features.git.rebase');

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm(restoreAfter);
      onOpenChange(false);
    } catch (err) {
      // Show error to user - parent may also handle it but user should see feedback
      const message = err instanceof Error ? err.message : t('features.git.failedToStash', { operation: operation });
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    if (!isProcessing) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={isProcessing ? undefined : onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <RiAlertLine className="size-5 text-[var(--status-warning)]" />
            <DialogTitle>{t('features.git.uncommittedChanges')}</DialogTitle>
          </div>
          <DialogDescription>
            {t('features.git.uncommittedChangesDescription', { operation: operation })}
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <p className="typography-meta text-muted-foreground mb-3">
            {t('features.git.thisWill')}
          </p>
          <ol className="list-decimal list-inside space-y-1 typography-meta text-foreground">
            <li>{t('features.git.stashChanges')}</li>
            <li>
              {operation === 'merge' ? t('features.git.mergeWith', { branch: targetBranch }) : t('features.git.rebaseOntoBranch', { branch: targetBranch })}
            </li>
            {restoreAfter && <li>{t('features.git.restoreStashedChanges')}</li>}
          </ol>
        </div>

        <div className="flex items-center gap-2 py-2">
          <Checkbox
            checked={restoreAfter}
            onChange={setRestoreAfter}
            disabled={isProcessing}
            ariaLabel={t('features.git.restoreChangesAfterOperation')}
          />
          <span
            className="typography-ui-label text-foreground cursor-pointer select-none"
            onClick={() => !isProcessing && setRestoreAfter(!restoreAfter)}
          >
            {t('features.git.restoreChangesAfter', { operation: operation })}
          </span>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            disabled={isProcessing}
          >
            {t('features.git.cancel')}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleConfirm}
            disabled={isProcessing}
            className="gap-1.5"
          >
            {isProcessing ? (
              <>
                <RiLoader4Line className="size-4 animate-spin" />
                {t('features.git.processing')}
              </>
            ) : (
              operation === 'merge' ? t('features.git.stashAndMerge') : t('features.git.stashAndRebase')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
