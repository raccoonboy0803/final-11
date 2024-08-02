'use client';

import React from 'react';
import { deleteSelectCart } from '../actions';

export default function SelectDeleteButton(userId: { userId: string | undefined }) {
  return <button onClick={() => deleteSelectCart(userId.userId!)}>선택 상품 삭제</button>;
}
