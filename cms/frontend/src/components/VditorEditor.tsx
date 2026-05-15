import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

export interface VditorEditorHandle {
  getValue: () => string;
  setValue: (value: string) => void;
  getVditor: () => Vditor | null;
}

interface VditorEditorProps {
  value: string;
  onChange?: (markdown: string) => void;
  onSave?: () => void;
  onFullscreenChange?: (fullscreen: boolean) => void;
  dark?: boolean;
  placeholder?: string;
  minHeight?: number;
}

export const VditorEditor = forwardRef<VditorEditorHandle, VditorEditorProps>(
  ({ value, onChange, onSave, onFullscreenChange, dark = false, placeholder = '开始写作...', minHeight = 500 }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const vditorRef = useRef<Vditor | null>(null);
    const readyRef = useRef(false);
    const onChangeRef = useRef(onChange);
    const onSaveRef = useRef(onSave);
    const onFullscreenRef = useRef(onFullscreenChange);

    // Keep callbacks up to date without re-creating vditor
    onChangeRef.current = onChange;
    onSaveRef.current = onSave;
    onFullscreenRef.current = onFullscreenChange;

    useImperativeHandle(ref, () => ({
      getValue: () => vditorRef.current?.getValue() || '',
      setValue: (v: string) => vditorRef.current?.setValue(v),
      getVditor: () => vditorRef.current,
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      const vditor = new Vditor(container, {
        mode: 'wysiwyg',
        value,
        theme: dark ? 'dark' : 'classic',
        lang: 'zh_CN',
        placeholder,
        minHeight,
        toolbar: [
          'headings',
          'bold',
          'italic',
          'strike',
          '|',
          'list',
          'ordered-list',
          'quote',
          '|',
          'code',
          'inline-code',
          'link',
          'table',
          '|',
          'undo',
          'redo',
          '|',
          'outline',
          'fullscreen',
          {
            name: 'save',
            tip: '保存 (⌘S)',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
            click: () => {
              onSaveRef.current?.();
            },
          },
        ],
        toolbarConfig: {
          pin: true,
        },
        counter: {
          enable: true,
        },
        cache: {
          enable: false,
        },
        preview: {
          delay: 200,
          math: {
            engine: 'KaTeX',
          },
        },
        input: (val) => {
          onChangeRef.current?.(val);
        },
        keydown: (event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === 's') {
            event.preventDefault();
            onSaveRef.current?.();
          }
        },
        after: () => {
          readyRef.current = true;
          vditorRef.current = vditor;
          const vditorEl = container.querySelector('.vditor') as HTMLElement;
          const reset = container.querySelector('.vditor-wysiwyg pre.vditor-reset') as HTMLElement;

          // Fullscreen detection: notify parent when vditor enters/exits fullscreen
          if (vditorEl) {
            new MutationObserver(() => {
              const isFs = vditorEl.classList.contains('vditor--fullscreen');
              onFullscreenRef.current?.(isFs);
            }).observe(vditorEl, { attributes: true, attributeFilter: ['class'] });
          }
        },
      });

      return () => {
        if (readyRef.current) {
          try {
            vditor.destroy();
          } catch {
            // Ignore cleanup errors in StrictMode
          }
        }
        readyRef.current = false;
        vditorRef.current = null;
        container.innerHTML = '';
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update theme when dark mode changes
    useEffect(() => {
      if (vditorRef.current) {
        vditorRef.current.setTheme(dark ? 'dark' : 'classic');
      }
    }, [dark]);

    return (
      <div ref={containerRef} className="vditor-wrapper" />
    );
  },
);

VditorEditor.displayName = 'VditorEditor';
