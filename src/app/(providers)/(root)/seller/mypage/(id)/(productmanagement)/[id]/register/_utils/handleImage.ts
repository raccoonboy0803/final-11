import { createClient } from '@/supabase/supabaseClient';
import ReactQuill from 'react-quill';
import { v4 as uuidv4 } from 'uuid';

export const handleImage = (quillRef: React.RefObject<ReactQuill>) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.addEventListener('change', async () => {
    if (!input.files) return;

    const file = input.files[0];
    const fileNewName = uuidv4();
    const supabase = createClient();

    const { data, error } = await supabase.storage
      .from('product-image')
      .upload(`product_imgs/${fileNewName}`, file);

    if (error) {
      console.error('Error uploading quill img file:', error);
      return;
    }

    const response = supabase.storage
      .from('product-image')
      .getPublicUrl(`product_imgs/${fileNewName}`);
    if (!response.data) {
      console.error('No public URL found in response data.');
      return;
    }

    const postImgUrl = response.data.publicUrl;
    const editor = quillRef.current?.getEditor();

    if (!editor) {
      console.error('Editor not found.');
      return;
    }

    const range = editor.getSelection();

    if (!range) {
      console.error('No selection range found.');
      return;
    }

    editor.insertEmbed(range.index, 'image', postImgUrl);
    editor.setSelection(range.index + 1, 0);
    editor.insertText(range.index + 1, '\n');
  });
};
