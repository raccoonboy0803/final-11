'use client';

import React, { useState } from 'react';
import SelectDropdown from './SelectDropdown';
import { useFormState } from 'react-dom';
import { startLiveStreaming } from '../actions';
import Image from 'next/image';

function LiveRegisterForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [preview, setPreview] = useState('');
  const [state, formAction] = useFormState(startLiveStreaming, null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files }
    } = event;

    if (!files) return;
    const file = files[0];

    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file) {
      if (!validImageTypes.includes(file.type)) {
        alert('jpeg,jpg,png,gif 이미지 파일만 업로드 가능합니다');
        event.target.value = '';
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        alert('파일 크기는 2MB 이하이어야 합니다');
        event.target.value = '';
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview('');
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <form action={formAction} className="flex flex-col gap-[12px]">
      <div className="flex gap-[16px] items-center">
        <label htmlFor="liveTitle" className="w-[120px] text-[14px]">
          라이브 타이틀
        </label>
        <input
          type="text"
          id="liveTitle"
          name="liveTitle"
          placeholder="라이브 타이틀을 입력하세요 (최대 30글자)"
          className="w-full h-[58px] border placeholder:text-[16px] p-[16px] placeholder:text-font/sub2"
          maxLength={20}
          required
        />
      </div>
      <div className="flex gap-[16px]">
        <div className="flex items-center gap-[4px]">
          <p className="w-[120px] text-[14px]">대표 이미지 등록</p>
          <div className="">
            <label
              htmlFor="thumbnail"
              className="flex items-center justify-center rounded-2xl cursor-pointer bg-center bg-contain bg-no-repeat bg-[#F1F1F5] w-[295px] h-[165px]"
              style={{
                backgroundImage: `url(${preview})`
              }}
            >
              {preview === '' && (
                <>
                  <div className="text-neutral-400 text-sm">
                    <Image src="/icons/plus.png" alt="plusIcon" width={36} height={36} />
                  </div>
                </>
              )}
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              className="hidden"
              required
              onChange={handleImageChange}
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center text-[14px]">
          <p>- 최대 용량: 2MB</p>
          <p>- 권장 비율 : 16:9</p>
          <p>썸네일을 등록해주세요.</p>
          <p>jpg, jpeg, png 파일형식만 등록가능합니다.</p>
          <p>글자가 포함되지 않은 이미지를 사용해주세요.</p>
        </div>
      </div>
      <div className="flex items-center w-full gap-[16px]">
        <label htmlFor="product" className="w-[120px] text-[14px]">
          소개할 상품
        </label>
        <input
          type="text"
          id="product"
          name="product"
          placeholder="상품 URL을 입력해서 상품을 등록하세요."
          className="w-full h-[58px] border placeholder:text-[16px] p-[16px] placeholder:text-font/sub2"
          required
        />
      </div>
      <div className="flex items-center w-full gap-[16px]">
        <label htmlFor="category" className="w-[120px] text-[14px]">
          카테고리
        </label>
        <SelectDropdown onCategoryChange={handleCategoryChange} />
      </div>
      <div className="w-full flex gap-[16px]">
        <label htmlFor="description" className="w-[120px] text-[14px]">
          라이브 한줄 설명
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="라이브에 대한 간단한 설명을 입력하세요."
          className="w-full h-[58px] border placeholder:text-[16px] p-[16px] placeholder:text-font/sub2"
          required
        />
      </div>
      <input type="hidden" name="category" value={selectedCategory || ''} />
      <button className="w-full bg-primary-green-500 h-[56px] rounded-[6px] text-white mt-16 text-[16px] hover:bg-primary-green-700 transition-colors">
        라이브 시작하기
      </button>
    </form>
  );
}

export default LiveRegisterForm;
