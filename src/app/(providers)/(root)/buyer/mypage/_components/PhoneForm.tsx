'use client';

import { useEffect, useState } from 'react';

interface PhoneFormProps {
  onChange?: (value: string) => void; // 전화번호가 변경될 때 호출되는 콜백
  initialPhone?: string; // 초기 전화번호
}

const PhoneForm = ({ onChange, initialPhone = '' }: PhoneFormProps) => {
  const [phoneParts, setPhoneParts] = useState({
    part1: initialPhone.slice(0, 3), // 전화번호의 첫 번째 부분
    part2: initialPhone.slice(3, 7), // 전화번호의 두 번째 부분
    part3: initialPhone.slice(7) // 전화번호의 세 번째 부분
  });

  const handleInput = (part: 'part1' | 'part2' | 'part3', value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, ''); // 숫자가 아닌 문자를 제거
    const maxLength = part === 'part1' ? 3 : 4; // 첫 번째 부분은 3자리, 나머지는 4자리로 제한
    const newValue = cleanValue.slice(0, maxLength);
    setPhoneParts((prev) => ({ ...prev, [part]: newValue })); // 전화번호 부분 업데이트
  };

  useEffect(() => {
    const fullPhone = `${phoneParts.part1}${phoneParts.part2}${phoneParts.part3}`; // 전체 전화번호 생성
    if (onChange) {
      onChange(fullPhone); // 전화번호 변경 시 콜백 호출
    }
  }, [phoneParts, onChange]);

  return (
    <section className="flex items-center gap-2 w-full max-w-screen-sm mb-20 mt-3">
      <input
        type="text"
        placeholder="010"
        className="border p-4 flex-grow min-w-[0] box-border text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main mb-3 text-font/main"
        maxLength={3}
        value={phoneParts.part1}
        onChange={(e) => handleInput('part1', e.target.value)} // 첫 번째 부분 입력 처리
      />
      <span className="text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main mb-3 text-font/main">
        -
      </span>
      <input
        type="text"
        placeholder="4444"
        className="border p-4  flex-grow min-w-[0] box-border text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main mb-3 text-font/main"
        maxLength={4}
        value={phoneParts.part2}
        onChange={(e) => handleInput('part2', e.target.value)} // 두 번째 부분 입력 처리
      />
      <span className="text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main mb-3 text-font/main">
        -
      </span>
      <input
        type="text"
        placeholder="4444"
        className="border p-4  flex-grow min-w-[0] box-border text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main mb-3 text-font/main"
        maxLength={4}
        value={phoneParts.part3}
        onChange={(e) => handleInput('part3', e.target.value)} // 세 번째 부분 입력 처리
      />
    </section>
  );
};

export default PhoneForm;
