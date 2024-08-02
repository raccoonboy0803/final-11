'use client';

import React, { useEffect, useState } from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  onCategoryChange: (category: string) => void;
}

export default function SelectDropdown({ onCategoryChange }: SelectDropdownProps) {
  const category: Option[] = [
    { value: 'null', label: '카테고리를 선택하세요' },
    { value: '씨앗', label: '씨앗' },
    { value: '모종', label: '모종' },
    { value: '재배키트', label: '재배키트' },
    { value: '흙,비료', label: '흙,비료' },
    { value: '원예용품', label: '원예용품' }
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
      height: '58px',
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
