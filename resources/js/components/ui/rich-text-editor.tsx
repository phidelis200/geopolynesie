import TiptapEditor, {BaseKit} from 'reactjs-tiptap-editor';
import { Blockquote } from 'reactjs-tiptap-editor/blockquote';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Image } from 'reactjs-tiptap-editor/image';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { Link } from 'reactjs-tiptap-editor/link';
import { ListItem } from 'reactjs-tiptap-editor/listitem';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
import 'reactjs-tiptap-editor/style.css';
import 'react-image-crop/dist/ReactCrop.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const extensions = [
    BaseKit.configure({
      placeholder: {
        placeholder: 'Ecrire ici description...',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
      },
      characterCount: false,
      trailingNode: false,
    }),
    Bold,
    Italic,
    Strike,
    TextUnderline,
    Heading,
    Blockquote,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Image,
  ];

  const dark = localStorage.getItem('appearance') === 'dark';

  return (
    <TiptapEditor
      output="html"
      content={value}
      onChangeContent={onChange}
      extensions={extensions}
      dark={dark}
    />
  );
}