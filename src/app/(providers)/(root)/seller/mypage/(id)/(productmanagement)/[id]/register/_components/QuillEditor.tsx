'use client';

import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FORMATS } from '../_utils/constants';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { handleImage } from '../_utils/handleImage';

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const DynamicReactQuill = dynamic(
  async () => {
    const { default: ReactQuill } = await import('react-quill');
    ReactQuill.Quill.register('modules/imageActions', ImageActions);
    ReactQuill.Quill.register('modules/imageFormats', ImageFormats);
    const ForwardedComponent = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <ReactQuill ref={forwardedRef} {...props} />
    );
    ForwardedComponent.displayName = 'ForwardedComponent';
    return ForwardedComponent;
  },
  { ssr: false, loading: () => <p>Loading ...</p> }
);

function QuillEditor({ value, onChange }: QuillEditorProps) {
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = React.useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'underline', 'blockquote', 'link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }, { color: [] }, { background: [] }]
        ],
        handlers: {
          image: () => handleImage(quillRef)
        }
      }
    }),
    []
  );
  return (
    <>
      <DynamicReactQuill
        forwardedRef={quillRef}
        value={value}
        onChange={onChange}
        theme="snow"
        modules={modules}
        formats={FORMATS}
        placeholder="등록할 상품의 상세내용을 작성해주세요."
        className="h-[500px] border-[#f0f0f0]"
      />
    </>
  );
}

export default QuillEditor;
