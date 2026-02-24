import React from 'react';
import { useTranslation } from 'react-i18next';
import { RiRestartLine, RiInformationLine } from '@remixicon/react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useThemeSystem } from '@/contexts/useThemeSystem';
import type { ThemeMode } from '@/types/theme';
import { useUIStore } from '@/stores/useUIStore';
import { useMessageQueueStore } from '@/stores/messageQueueStore';
import { cn, getModifierLabel } from '@/lib/utils';
import { ButtonSmall } from '@/components/ui/button-small';
import { Checkbox } from '@/components/ui/checkbox';
import { NumberInput } from '@/components/ui/number-input';
import { Radio } from '@/components/ui/radio';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { isVSCodeRuntime } from '@/lib/desktop';
import { useDeviceInfo } from '@/lib/device';
import {
    setDirectoryShowHidden,
    useDirectoryShowHidden,
} from '@/lib/directoryShowHidden';

const THEME_MODE_OPTIONS: Array<{ value: ThemeMode; label: string }> = [
    {
        value: 'system',
        label: 'System',
    },
    {
        value: 'light',
        label: 'Light',
    },
    {
        value: 'dark',
        label: 'Dark',
    },
];

const TOOL_EXPANSION_OPTIONS: Array<{ value: 'collapsed' | 'activity' | 'detailed'; label: string; description: string }> = [
    { value: 'collapsed', label: 'Collapsed', description: 'Activity and tools start collapsed' },
    { value: 'activity', label: 'Summary', description: 'Activity expanded, tools collapsed' },
    { value: 'detailed', label: 'Detailed', description: 'Activity expanded, key tools expanded' },
];

const DIFF_LAYOUT_OPTIONS: Array<{ value: 'dynamic' | 'inline' | 'side-by-side'; labelKey: string }> = [
    { value: 'dynamic', labelKey: 'settings.chat.diffLayoutDynamic' },
    { value: 'inline', labelKey: 'settings.chat.diffLayoutInline' },
    { value: 'side-by-side', labelKey: 'settings.chat.diffLayoutSideBySide' },
];

const DIFF_VIEW_MODE_OPTIONS: Array<{ value: 'single' | 'stacked'; labelKey: string }> = [
    { value: 'single', labelKey: 'settings.chat.diffViewModeSingle' },
    { value: 'stacked', labelKey: 'settings.chat.diffViewModeAll' },
];

export type VisibleSetting = 'theme' | 'fontSize' | 'terminalFontSize' | 'spacing' | 'cornerRadius' | 'inputBarOffset' | 'toolOutput' | 'diffLayout' | 'mobileStatusBar' | 'dotfiles' | 'reasoning' | 'queueMode' | 'textJustificationActivity' | 'terminalQuickKeys' | 'persistDraft';

interface OpenChamberVisualSettingsProps {
    /** Which settings to show. If undefined, shows all. */
    visibleSettings?: VisibleSetting[];
}

export const OpenChamberVisualSettings: React.FC<OpenChamberVisualSettingsProps> = ({ visibleSettings }) => {
    const { t } = useTranslation();
    const { isMobile } = useDeviceInfo();
    const directoryShowHidden = useDirectoryShowHidden();
    const showReasoningTraces = useUIStore(state => state.showReasoningTraces);
    const setShowReasoningTraces = useUIStore(state => state.setShowReasoningTraces);
    const showTextJustificationActivity = useUIStore(state => state.showTextJustificationActivity);
    const setShowTextJustificationActivity = useUIStore(state => state.setShowTextJustificationActivity);
    const toolCallExpansion = useUIStore(state => state.toolCallExpansion);
    const setToolCallExpansion = useUIStore(state => state.setToolCallExpansion);
    const fontSize = useUIStore(state => state.fontSize);
    const setFontSize = useUIStore(state => state.setFontSize);
    const terminalFontSize = useUIStore(state => state.terminalFontSize);
    const setTerminalFontSize = useUIStore(state => state.setTerminalFontSize);
    const padding = useUIStore(state => state.padding);
    const setPadding = useUIStore(state => state.setPadding);
    const cornerRadius = useUIStore(state => state.cornerRadius);
    const setCornerRadius = useUIStore(state => state.setCornerRadius);
    const inputBarOffset = useUIStore(state => state.inputBarOffset);
    const setInputBarOffset = useUIStore(state => state.setInputBarOffset);
    const diffLayoutPreference = useUIStore(state => state.diffLayoutPreference);
    const setDiffLayoutPreference = useUIStore(state => state.setDiffLayoutPreference);
    const diffViewMode = useUIStore(state => state.diffViewMode);
    const setDiffViewMode = useUIStore(state => state.setDiffViewMode);
    const showTerminalQuickKeysOnDesktop = useUIStore(state => state.showTerminalQuickKeysOnDesktop);
    const setShowTerminalQuickKeysOnDesktop = useUIStore(state => state.setShowTerminalQuickKeysOnDesktop);
    const queueModeEnabled = useMessageQueueStore(state => state.queueModeEnabled);
    const setQueueMode = useMessageQueueStore(state => state.setQueueMode);
    const persistChatDraft = useUIStore(state => state.persistChatDraft);
    const setPersistChatDraft = useUIStore(state => state.setPersistChatDraft);
    const showMobileSessionStatusBar = useUIStore(state => state.showMobileSessionStatusBar);
    const setShowMobileSessionStatusBar = useUIStore(state => state.setShowMobileSessionStatusBar);
    const {
        themeMode,
        setThemeMode,
        availableThemes,
        customThemesLoading,
        reloadCustomThemes,
        lightThemeId,
        darkThemeId,
        setLightThemePreference,
        setDarkThemePreference,
    } = useThemeSystem();

    const [themesReloading, setThemesReloading] = React.useState(false);

    const lightThemes = React.useMemo(
        () => availableThemes
            .filter((theme) => theme.metadata.variant === 'light')
            .sort((a, b) => a.metadata.name.localeCompare(b.metadata.name)),
        [availableThemes],
    );

    const darkThemes = React.useMemo(
        () => availableThemes
            .filter((theme) => theme.metadata.variant === 'dark')
            .sort((a, b) => a.metadata.name.localeCompare(b.metadata.name)),
        [availableThemes],
    );

    const selectedLightTheme = React.useMemo(
        () => lightThemes.find((theme) => theme.metadata.id === lightThemeId) ?? lightThemes[0],
        [lightThemes, lightThemeId],
    );

    const selectedDarkTheme = React.useMemo(
        () => darkThemes.find((theme) => theme.metadata.id === darkThemeId) ?? darkThemes[0],
        [darkThemes, darkThemeId],
    );

    const formatThemeLabel = React.useCallback((themeName: string, variant: 'light' | 'dark') => {
        const suffix = variant === 'dark' ? ' Dark' : ' Light';
        return themeName.endsWith(suffix) ? themeName.slice(0, -suffix.length) : themeName;
    }, []);

    const shouldShow = (setting: VisibleSetting): boolean => {
        if (!visibleSettings) return true;
        return visibleSettings.includes(setting);
    };

    const hasAppearanceSettings = shouldShow('theme') && !isVSCodeRuntime();
    const hasLayoutSettings = shouldShow('fontSize') || shouldShow('terminalFontSize') || shouldShow('spacing') || shouldShow('cornerRadius') || shouldShow('inputBarOffset');
    const hasBehaviorSettings = shouldShow('toolOutput')
        || shouldShow('diffLayout')
        || shouldShow('mobileStatusBar')
        || shouldShow('dotfiles')
        || shouldShow('reasoning')
        || shouldShow('queueMode')
        || shouldShow('textJustificationActivity')
        || shouldShow('persistDraft')
        || (shouldShow('terminalQuickKeys') && !isMobile);
    return (
        <div className="space-y-8">

                {/* --- Appearance & Themes --- */}
                {hasAppearanceSettings && (
                    <div className="mb-8 space-y-3">
                        <section className="px-2 pb-2 pt-0 space-y-0.5">

                            <div className="pb-1.5">
                                <div className="flex min-w-0 flex-col gap-1.5">
                                    <span className="typography-ui-header font-medium text-foreground">{t('settings.appearance.colorMode')}</span>
                                    <div className="flex flex-wrap items-center gap-1">
                                        {THEME_MODE_OPTIONS.map((option) => (
                                            <ButtonSmall
                                                key={option.value}
                                                variant="outline"
                                                size="xs"
                                                className={cn(
                                                    '!font-normal',
                                                    themeMode === option.value
                                                        ? 'border-[var(--primary-base)] text-[var(--primary-base)] bg-[var(--primary-base)]/10 hover:text-[var(--primary-base)]'
                                                        : 'text-foreground'
                                                )}
                                                onClick={() => setThemeMode(option.value)}
                                            >
                                                {option.value === 'system' ? t('settings.appearance.systemTheme') : (option.value === 'light' ? t('settings.appearance.lightTheme') : t('settings.appearance.darkTheme'))}
                                            </ButtonSmall>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 grid grid-cols-1 gap-2 py-1.5 md:grid-cols-[14rem_auto] md:gap-x-8 md:gap-y-2">
                                <div className="flex min-w-0 items-center gap-2">
                                    <span className="typography-ui-label text-foreground shrink-0">{t('settings.appearance.lightTheme')}</span>
                                    <Select value={selectedLightTheme?.metadata.id ?? ''} onValueChange={setLightThemePreference}>
                                        <SelectTrigger aria-label={t('settings.appearance.selectTheme')} className="w-fit">
                                            <SelectValue placeholder={t('settings.appearance.selectTheme')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {lightThemes.map((theme) => (
                                                <SelectItem key={theme.metadata.id} value={theme.metadata.id}>
                                                    {formatThemeLabel(theme.metadata.name, 'light')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex min-w-0 items-center gap-2">
                                    <span className="typography-ui-label text-foreground shrink-0">{t('settings.appearance.darkTheme')}</span>
                                    <Select value={selectedDarkTheme?.metadata.id ?? ''} onValueChange={setDarkThemePreference}>
                                        <SelectTrigger aria-label={t('settings.appearance.selectTheme')} className="w-fit">
                                            <SelectValue placeholder={t('settings.appearance.selectTheme')} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {darkThemes.map((theme) => (
                                                <SelectItem key={theme.metadata.id} value={theme.metadata.id}>
                                                    {formatThemeLabel(theme.metadata.name, 'dark')}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 py-1.5">
                                <ButtonSmall
                                    type="button"
                                    variant="outline"
                                    size="xs"
                                    disabled={customThemesLoading || themesReloading}
                                    onClick={async () => {
                                        setThemesReloading(true);
                                        try {
                                            await reloadCustomThemes();
                                        } finally {
                                            setThemesReloading(false);
                                        }
                                    }}
                                    className="!font-normal"
                                >
                                    <RiRestartLine className={cn('h-3.5 w-3.5', themesReloading && 'animate-spin')} />
                                    {t('settings.appearance.reloadThemes')}
                                </ButtonSmall>
                                <Tooltip delayDuration={700}>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center rounded-md p-1 text-muted-foreground/70 hover:text-foreground"
                                            aria-label={t('settings.appearance.themeImportInfo')}
                                        >
                                            <RiInformationLine className="h-3.5 w-3.5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent sideOffset={8}>
                                        {t('settings.appearance.themeImportHint')}
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </section>
                    </div>
                )}

                {/* --- UI Scaling & Layout --- */}
                {hasLayoutSettings && (
                    <div className="mb-8 space-y-3">
                        <section className="p-2 space-y-0.5">

                            {shouldShow('fontSize') && !isMobile && (
                                <div className="flex items-center gap-8 py-1.5">
                                    <div className="flex min-w-0 flex-col w-56 shrink-0">
                                        <span className="typography-ui-label text-foreground">{t('settings.appearance.interfaceFontSize')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 w-fit">
                                        <NumberInput
                                            value={fontSize}
                                            onValueChange={setFontSize}
                                            min={50}
                                            max={200}
                                            step={5}
                                            aria-label={t('settings.appearance.fontSizePercentage')}
                                            className="w-16"
                                        />
                                        <ButtonSmall
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setFontSize(100)}
                                            disabled={fontSize === 100}
                                            className="h-7 w-7 px-0 text-muted-foreground hover:text-foreground"
                                            aria-label={t('settings.appearance.resetFontSize')}
                                            title={t('common.reset')}
                                        >
                                            <RiRestartLine className="h-3.5 w-3.5" />
                                        </ButtonSmall>
                                    </div>
                                </div>
                            )}

                            {shouldShow('terminalFontSize') && (
                                <div className={cn("py-1.5", isMobile ? "flex flex-col gap-3" : "flex items-center gap-8")}>
                                    <div className={cn("flex min-w-0 flex-col", isMobile ? "w-full" : "w-56 shrink-0")}>
                                        <span className="typography-ui-label text-foreground">{t('settings.appearance.terminalFontSize')}</span>
                                    </div>
                                    <div className={cn("flex items-center gap-2", isMobile ? "w-full" : "w-fit")}>
                                        <NumberInput
                                            value={terminalFontSize}
                                            onValueChange={setTerminalFontSize}
                                            min={9}
                                            max={52}
                                            step={1}
                                            className="w-16"
                                        />
                                        <ButtonSmall
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setTerminalFontSize(13)}
                                            disabled={terminalFontSize === 13}
                                            className="h-7 w-7 px-0 text-muted-foreground hover:text-foreground"
                                            aria-label={t('settings.appearance.resetTerminalFontSize')}
                                            title={t('common.reset')}
                                        >
                                            <RiRestartLine className="h-3.5 w-3.5" />
                                        </ButtonSmall>
                                    </div>
                                </div>
                            )}

                            {shouldShow('spacing') && (
                                <div className={cn("py-1.5", isMobile ? "flex flex-col gap-3" : "flex items-center gap-8")}>
                                    <div className={cn("flex min-w-0 flex-col", isMobile ? "w-full" : "w-56 shrink-0")}>
                                        <span className="typography-ui-label text-foreground">{t('settings.appearance.spacingDensity')}</span>
                                    </div>
                                    <div className={cn("flex items-center gap-2", isMobile ? "w-full" : "w-fit")}>
                                        <NumberInput
                                            value={padding}
                                            onValueChange={setPadding}
                                            min={50}
                                            max={200}
                                            step={5}
                                            className="w-16"
                                        />
                                        <ButtonSmall
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setPadding(100)}
                                            disabled={padding === 100}
                                            className="h-7 w-7 px-0 text-muted-foreground hover:text-foreground"
                                            aria-label={t('settings.appearance.resetSpacing')}
                                            title={t('common.reset')}
                                        >
                                            <RiRestartLine className="h-3.5 w-3.5" />
                                        </ButtonSmall>
                                    </div>
                                </div>
                            )}

                            {shouldShow('cornerRadius') && (
                                <div className={cn("py-1.5", isMobile ? "flex flex-col gap-3" : "flex items-center gap-8")}>
                                    <div className={cn("flex min-w-0 flex-col", isMobile ? "w-full" : "w-56 shrink-0")}>
                                        <span className="typography-ui-label text-foreground">{t('settings.appearance.cornerRadius')}</span>
                                    </div>
                                    <div className={cn("flex items-center gap-2", isMobile ? "w-full" : "w-fit")}>
                                        <NumberInput
                                            value={cornerRadius}
                                            onValueChange={setCornerRadius}
                                            min={0}
                                            max={32}
                                            step={1}
                                            className="w-16"
                                        />
                                        <ButtonSmall
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setCornerRadius(12)}
                                            disabled={cornerRadius === 12}
                                            className="h-7 w-7 px-0 text-muted-foreground hover:text-foreground"
                                            aria-label={t('settings.appearance.resetCornerRadius')}
                                            title={t('common.reset')}
                                        >
                                            <RiRestartLine className="h-3.5 w-3.5" />
                                        </ButtonSmall>
                                    </div>
                                </div>
                            )}

                            {shouldShow('inputBarOffset') && (
                                <div className={cn("py-1.5", isMobile ? "flex flex-col gap-3" : "flex items-center gap-8")}>
                                    <div className={cn("flex min-w-0 flex-col", isMobile ? "w-full" : "w-56 shrink-0")}>
                                        <div className="flex items-center gap-1.5">
                                            <span className="typography-ui-label text-foreground">{t('settings.appearance.inputBarOffset')}</span>
                                            <Tooltip delayDuration={1000}>
                                                <TooltipTrigger asChild>
                                                    <RiInformationLine className="h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent sideOffset={8} className="max-w-xs">
                                                    {t('settings.appearance.inputBarOffsetHint')}
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className={cn("flex items-center gap-2", isMobile ? "w-full" : "w-fit")}>
                                        <NumberInput
                                            value={inputBarOffset}
                                            onValueChange={setInputBarOffset}
                                            min={0}
                                            max={100}
                                            step={5}
                                            className="w-16"
                                        />
                                        <ButtonSmall
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setInputBarOffset(0)}
                                            disabled={inputBarOffset === 0}
                                            className="h-7 w-7 px-0 text-muted-foreground hover:text-foreground"
                                            aria-label={t('settings.appearance.resetInputBarOffset')}
                                            title={t('common.reset')}
                                        >
                                            <RiRestartLine className="h-3.5 w-3.5" />
                                        </ButtonSmall>
                                    </div>
                                </div>
                            )}

                        </section>
                    </div>
                )}

                {hasBehaviorSettings && (
                    <div className="space-y-3">

                            {shouldShow('toolOutput') && (
                                <section className="px-2 pb-2 pt-0">
                                    <h4 className="typography-ui-header font-medium text-foreground">{t('settings.chat.defaultToolOutput')}</h4>
                                    <div className="mt-1.5 flex flex-wrap items-center gap-1">
                                        {TOOL_EXPANSION_OPTIONS.map((option) => {
                                            return (
                                                <ButtonSmall
                                                    key={option.value}
                                                    variant="outline"
                                                    size="xs"
                                                    className={cn(
                                                        '!font-normal',
                                                        toolCallExpansion === option.value
                                                            ? 'border-[var(--primary-base)] text-[var(--primary-base)] bg-[var(--primary-base)]/10 hover:text-[var(--primary-base)]'
                                                            : 'text-foreground'
                                                    )}
                                                    onClick={() => setToolCallExpansion(option.value)}
                                                >
                                                    {option.value === 'collapsed' ? t('settings.chat.toolExpansion.collapsed') : (option.value === 'activity' ? t('settings.chat.toolExpansion.summary') : t('settings.chat.toolExpansion.detailed'))}
                                                </ButtonSmall>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {shouldShow('diffLayout') && !isVSCodeRuntime() && (
                                <section className="p-2">
                                    <h4 className="typography-ui-header font-medium text-foreground">{t('settings.chat.diffLayout')}</h4>
                                    <div role="radiogroup" aria-label={t('settings.appearance.diffLayoutAria')} className="mt-1 space-y-0">
                                        {DIFF_LAYOUT_OPTIONS.map((option) => {
                                            const selected = diffLayoutPreference === option.value;
                                            return (
                                                <div
                                                    key={option.value}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-pressed={selected}
                                                    onClick={() => setDiffLayoutPreference(option.value)}
                                                    onKeyDown={(event) => {
                                                        if (event.key === ' ' || event.key === 'Enter') {
                                                            event.preventDefault();
                                                            setDiffLayoutPreference(option.value);
                                                        }
                                                    }}
                                                    className="flex w-full items-center gap-2 py-0.5 text-left"
                                                >
                                                    <Radio
                                                        checked={selected}
                                                        onChange={() => setDiffLayoutPreference(option.value)}
                                                        ariaLabel={t('settings.appearance.diffLayoutLabel', { label: t(option.labelKey) })}
                                                    />
                                                    <span className={cn('typography-ui-label font-normal', selected ? 'text-foreground' : 'text-foreground/50')}>
                                                        {t(option.labelKey)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {shouldShow('diffLayout') && !isVSCodeRuntime() && (
                                <section className="p-2">
                                    <h4 className="typography-ui-header font-medium text-foreground">{t('settings.chat.diffViewMode')}</h4>
                                    <div role="radiogroup" aria-label={t('settings.appearance.diffViewModeAria')} className="mt-1 space-y-0">
                                        {DIFF_VIEW_MODE_OPTIONS.map((option) => {
                                            const selected = diffViewMode === option.value;
                                            return (
                                                <div
                                                    key={option.value}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-pressed={selected}
                                                    onClick={() => setDiffViewMode(option.value)}
                                                    onKeyDown={(event) => {
                                                        if (event.key === ' ' || event.key === 'Enter') {
                                                            event.preventDefault();
                                                            setDiffViewMode(option.value);
                                                        }
                                                    }}
                                                    className="flex w-full items-center gap-2 py-0.5 text-left"
                                                >
                                                    <Radio
                                                        checked={selected}
                                                        onChange={() => setDiffViewMode(option.value)}
                                                        ariaLabel={t('settings.appearance.diffViewModeLabel', { label: t(option.labelKey) })}
                                                    />
                                                    <span className={cn('typography-ui-label font-normal', selected ? 'text-foreground' : 'text-foreground/50')}>
                                                        {t(option.labelKey)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {(shouldShow('mobileStatusBar') || shouldShow('dotfiles') || shouldShow('queueMode') || shouldShow('persistDraft') || shouldShow('reasoning') || shouldShow('textJustificationActivity')) && (
                                <section className="p-2 space-y-0.5">
                                    {shouldShow('mobileStatusBar') && (
                                        <div
                                            className="group flex cursor-pointer items-center gap-2 py-1.5"
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={showMobileSessionStatusBar}
                                            onClick={() => setShowMobileSessionStatusBar(!showMobileSessionStatusBar)}
                                            onKeyDown={(event) => {
                                                if (event.key === ' ' || event.key === 'Enter') {
                                                    event.preventDefault();
                                                    setShowMobileSessionStatusBar(!showMobileSessionStatusBar);
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={showMobileSessionStatusBar}
                                                onChange={setShowMobileSessionStatusBar}
                                                ariaLabel={t('settings.chat.ariaMobileStatusBar')}
                                            />
                                            <span className="typography-ui-label text-foreground">{t('settings.chat.mobileStatusBar')}</span>
                                        </div>
                                    )}

                                    {shouldShow('dotfiles') && !isVSCodeRuntime() && (
                                        <div
                                            className="group flex cursor-pointer items-center gap-2 py-1.5"
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={directoryShowHidden}
                                            onClick={() => setDirectoryShowHidden(!directoryShowHidden)}
                                            onKeyDown={(event) => {
                                                if (event.key === ' ' || event.key === 'Enter') {
                                                    event.preventDefault();
                                                    setDirectoryShowHidden(!directoryShowHidden);
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={directoryShowHidden}
                                                onChange={setDirectoryShowHidden}
                                                ariaLabel={t('settings.chat.ariaShowDotfiles')}
                                            />
                                            <span className="typography-ui-label text-foreground">{t('settings.chat.showDotfiles')}</span>
                                        </div>
                                    )}

                                    {shouldShow('queueMode') && (
                                        <div
                                            className="group flex cursor-pointer items-center gap-2 py-1.5"
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={queueModeEnabled}
                                            onClick={() => setQueueMode(!queueModeEnabled)}
                                            onKeyDown={(event) => {
                                                if (event.key === ' ' || event.key === 'Enter') {
                                                    event.preventDefault();
                                                    setQueueMode(!queueModeEnabled);
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={queueModeEnabled}
                                                onChange={setQueueMode}
                                                ariaLabel={t('settings.chat.ariaQueueMessages')}
                                            />
                                            <div className="flex min-w-0 items-center gap-1.5">
                                                <span className="typography-ui-label text-foreground">{t('settings.chat.queueMessages')}</span>
                                                <Tooltip delayDuration={1000}>
                                                    <TooltipTrigger asChild>
                                                        <RiInformationLine className="h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent sideOffset={8} className="max-w-xs">
                                                        {t('settings.chat.queueMessagesHint', { mod: getModifierLabel() })}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    )}

                                    {shouldShow('persistDraft') && (
                                        <div
                                            className="group flex cursor-pointer items-center gap-2 py-1.5"
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={persistChatDraft}
                                            onClick={() => setPersistChatDraft(!persistChatDraft)}
                                            onKeyDown={(event) => {
                                                if (event.key === ' ' || event.key === 'Enter') {
                                                    event.preventDefault();
                                                    setPersistChatDraft(!persistChatDraft);
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={persistChatDraft}
                                                onChange={setPersistChatDraft}
                                                ariaLabel={t('settings.chat.ariaPersistDraft')}
                                            />
                                            <span className="typography-ui-label text-foreground">{t('settings.chat.persistDraft')}</span>
                                        </div>
                                    )}

                                    {shouldShow('reasoning') && (
                                        <div
                                            className="group flex cursor-pointer items-center gap-2 py-1.5"
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={showReasoningTraces}
                                            onClick={() => setShowReasoningTraces(!showReasoningTraces)}
                                            onKeyDown={(event) => {
                                                if (event.key === ' ' || event.key === 'Enter') {
                                                    event.preventDefault();
                                                    setShowReasoningTraces(!showReasoningTraces);
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={showReasoningTraces}
                                                onChange={setShowReasoningTraces}
                                                ariaLabel={t('settings.chat.ariaReasoningTraces')}
                                            />
                                            <span className="typography-ui-label text-foreground">{t('settings.chat.reasoningTraces')}</span>
                                        </div>
                                    )}

                                    {shouldShow('textJustificationActivity') && (
                                        <div
                                            className="group flex cursor-pointer items-center gap-2 py-1.5"
                                            role="button"
                                            tabIndex={0}
                                            aria-pressed={showTextJustificationActivity}
                                            onClick={() => setShowTextJustificationActivity(!showTextJustificationActivity)}
                                            onKeyDown={(event) => {
                                                if (event.key === ' ' || event.key === 'Enter') {
                                                    event.preventDefault();
                                                    setShowTextJustificationActivity(!showTextJustificationActivity);
                                                }
                                            }}
                                        >
                                            <Checkbox
                                                checked={showTextJustificationActivity}
                                                onChange={setShowTextJustificationActivity}
                                                ariaLabel={t('settings.chat.ariaJustificationActivity')}
                                            />
                                            <span className="typography-ui-label text-foreground">{t('settings.chat.justificationActivity')}</span>
                                        </div>
                                    )}
                                </section>
                            )}

                            {shouldShow('terminalQuickKeys') && !isMobile && (
                                <section className="p-2">
                                    <div
                                        className="group flex cursor-pointer items-center gap-2 rounded-md py-1.5 transition-colors hover:bg-[var(--interactive-hover)]/30"
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={showTerminalQuickKeysOnDesktop}
                                        onClick={() => setShowTerminalQuickKeysOnDesktop(!showTerminalQuickKeysOnDesktop)}
                                        onKeyDown={(event) => {
                                            if (event.key === ' ' || event.key === 'Enter') {
                                                event.preventDefault();
                                                setShowTerminalQuickKeysOnDesktop(!showTerminalQuickKeysOnDesktop);
                                            }
                                        }}
                                    >
                                        <Checkbox
                                            checked={showTerminalQuickKeysOnDesktop}
                                            onChange={setShowTerminalQuickKeysOnDesktop}
                                            ariaLabel={t('settings.chat.ariaTerminalQuickKeys')}
                                        />
                                        <div className="flex min-w-0 items-center gap-1.5">
                                            <span className="typography-ui-label text-foreground">{t('settings.chat.terminalQuickKeys')}</span>
                                            <Tooltip delayDuration={1000}>
                                                <TooltipTrigger asChild>
                                                    <RiInformationLine className="h-3.5 w-3.5 text-muted-foreground/60 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent sideOffset={8} className="max-w-xs">
                                                    {t('settings.chat.terminalQuickKeysHint')}
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </section>
                            )}
                    </div>
                )}

            </div>
    );
};
