'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface ProductDescriptionProps {
  productDescription: string;
}

function ProductDescription({ productDescription }: ProductDescriptionProps) {
  const [sanitizedProduct, setSanitizedProduct] = useState<string>('');

  useEffect(() => {
    const sanitized = DOMPurify.sanitize(productDescription || '');
    setSanitizedProduct(sanitized);
  }, [productDescription]);

  return (
    <section className="py-11 flex flex-col text-center items-center w-full">
      <div dangerouslySetInnerHTML={{ __html: sanitizedProduct }} />
    </section>
  );
}

export default ProductDescription;
