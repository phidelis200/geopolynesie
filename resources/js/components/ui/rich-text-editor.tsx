import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const { quill, quillRef } = useQuill();
  const prevValueRef = useRef<string>(value);

  useEffect(() => {
    if (quill && value && prevValueRef.current !== value) {
      quill.clipboard.dangerouslyPasteHTML(value);
      prevValueRef.current = value;
    }
  }, [quill, value]);

  useEffect(() => {
    if (quill) {
      const handler = () => {
        const html = quill.root.innerHTML;
        if (html !== prevValueRef.current) {
          prevValueRef.current = html;
          onChange(html);
        }
      };

      quill.on('text-change', handler);

      return () => {
        quill.off('text-change', handler);
      };
    }
  }, [quill, onChange]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
}