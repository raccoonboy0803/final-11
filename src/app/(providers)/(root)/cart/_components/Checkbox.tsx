'use client';

import React, { useState } from 'react';
import { getCartIsChecked, toggleCheckbox } from '../actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function Checkbox({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const {
    data: isChecked,
    error,
    isFetched
  } = useQuery({
    queryKey: ['getCartIschecked', productId],
    queryFn: () => getCartIsChecked(productId)
  });

  const handleToggle = async () => {
    const newCheckedStatus = !isChecked?.is_checked;
    await toggleCheckbox(productId, newCheckedStatus);
    queryClient.invalidateQueries({ queryKey: ['getCartIschecked', productId] });
  };

  if (isFetched && isChecked) {
    return (
      <input
        type="checkbox"
        className="absolute -top-0 left-0 w-[18px] h-[18px]"
        checked={isChecked?.is_checked}
        onChange={handleToggle}
      />
    );
  }
}
