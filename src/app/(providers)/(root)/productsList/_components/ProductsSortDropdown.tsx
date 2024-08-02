'use client';

import React, { useEffect, useState } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface ProductsSortDropdownProps {
  onCategoryChange: (category: string) => void;
}

const [categoryFilter, setCategoryFilter] = useState<string>('all');

const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setCategoryFilter(event.target.value);
};

// 필터링된 제품 리스트
// const filteredProducts =
//   categoryFilter === 'all'
//     ? products
//     : products.filter((product) => product.category === categoryFilter);

export default function ProductsSortDropdown({ onCategoryChange }: ProductsSortDropdownProps) {
  const category: Option[] = [
    { value: '신상품', label: '신상품' },
    { value: '상품명', label: '상품명' },
    { value: '낮은가격', label: '낮은 가격' },
    { value: '높은 가격', label: '높은 가격' },
    { value: '인기상품', label: '인기상품' }
  ];
  const [categoryState, setCategoryState] = useState<Option | null>(category[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
    setCategoryState(newValue);
    if (newValue) {
      onCategoryChange(newValue.value);
    }
  };

  if (!isMounted) {
    return null;
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: '20px',
      borderRadius: 0
      // minHeight: '40px'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#767676'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? '#111' : '#111', // 선택된 옵션 색상
      backgroundColor: state.isSelected ? '#3BB873' : '#fff', // 선택된 옵션 배경색
      '&:hover': {
        backgroundColor: '#F7F7FB' // 옵션에 마우스를 올렸을 때 배경색
      }
    })
  };

  return (
    <Select
      styles={customStyles}
      options={category}
      onChange={handleChange}
      defaultValue={category[0]}
      className="w-full"
    />
  );
}
