'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createClient } from '@/supabase/supabaseClient';
import Image from 'next/image';

declare global {
  interface Window {
    daum: any;
    foldDaumPostcode: () => void;
    sample3_execDaumPostcode: () => void;
  }
}

interface AddressData {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: string;
  bname: string;
  buildingName: string;
  apartment: string;
}

interface AddressFormProps {
  initialAddress: string;
  initialDetailAddress: string;
  initialAddressCode: string;
  initialUserName: string;
  // avatarUrl?: string;
  initialPhone: string;
  userId: string;
}

export default function UserEditForm({
  initialAddress,
  initialDetailAddress,
  initialAddressCode,
  initialUserName,
  initialPhone,
  userId
}: AddressFormProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState<string>(initialAddress);
  const [postcode, setPostcode] = useState<string>(initialAddressCode);
  const [detailAddress, setDetailAddress] = useState<string>(initialDetailAddress);
  const [extraAddress, setExtraAddress] = useState<string>('');
  const [userName, setUserName] = useState<string>(initialUserName);
  const [phone, setPhone] = useState<string>(initialPhone);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(script);

    const handleScriptLoad = () => {
      if (wrapRef.current) {
        window.foldDaumPostcode = () => {
          if (wrapRef.current) {
            wrapRef.current.style.display = 'none';
          }
        };

        window.sample3_execDaumPostcode = () => {
          const currentScroll = Math.max(
            document.body.scrollTop,
            document.documentElement.scrollTop
          );

          new window.daum.Postcode({
            oncomplete: (data: AddressData) => {
              let addr = '';
              let extraAddr = '';

              addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

              if (data.userSelectedType === 'R') {
                if (data.bname && /[동|로|가]$/g.test(data.bname)) {
                  extraAddr += data.bname;
                }
                if (data.buildingName && data.apartment === 'Y') {
                  extraAddr += extraAddr ? ', ' + data.buildingName : data.buildingName;
                }
                if (extraAddr) {
                  extraAddr = ' (' + extraAddr + ')';
                }
                setExtraAddress(extraAddr);
              } else {
                setExtraAddress('');
              }

              setPostcode(data.zonecode);
              setAddress(addr);
              setDetailAddress('');
              if (wrapRef.current) {
                wrapRef.current.style.display = 'none';
              }
              document.body.scrollTop = currentScroll;

              handleAddressUpdate(addr, '', data.zonecode, extraAddr);
            },
            width: '100%',
            height: '100%'
          }).embed(wrapRef.current);

          if (wrapRef.current) {
            wrapRef.current.style.display = 'block';
          }
        };
      }
    };

    script.onload = handleScriptLoad;

    return () => {
      const existingScript = document.querySelector(
        'script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]'
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  const handleAddressUpdate = async (
    newAddress: string,
    newDetailAddress: string,
    newAddressCode: string,
    extraAddress: string
  ) => {
    const fullAddress = `${newAddress}${extraAddress}`;
    const supabase = createClient();
    const { error } = await supabase
      .from('User')
      .update({
        address: fullAddress,
        address_detail: newDetailAddress,
        address_code: newAddressCode,
        user_name: userName,
        phone: phone
      })
      .eq('user_id', userId);
    if (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleSave = () => {
    const fullAddress = `${address}${extraAddress}`;
    handleAddressUpdate(fullAddress, detailAddress, postcode, extraAddress);
    alert('회원정보가 저장되었습니다.');
  };

  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
  };

  // const handleCancel = () => {
  //   setAddress(initialAddress);
  //   setPostcode(initialAddressCode);
  //   setDetailAddress(initialDetailAddress);
  //   setExtraAddress('');
  //   setUserName(initialUserName);
  //   setPhone(initialPhone);
  //   alert('변경 사항이 취소되었습니다.');
  // };

  return (
    <div>
      {/* 이름 입력 필드 */}
      <div className="flex items-center">
        <label className="w-20 mr-12" htmlFor="receiver">
          받는 사람
        </label>
        <input
          id="receiver"
          type="text"
          className="border rounded w-full p-3 mb-3 mt-3"
          value={userName}
          placeholder="이름"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {/* 우편번호 입력 필드 */}

      <div className="flex justify-start items-start">
        <div className="w-20 mr-12">주소</div>
        <div className="w-full">
          <input
            type="text"
            id="sample3_postcode"
            placeholder="우편번호"
            className="border p-3 mb-3 rounded"
            value={postcode}
            readOnly
          />

          {/* 우편번호 찾기 버튼 */}
          <input
            type="button"
            onClick={() => window.sample3_execDaumPostcode()}
            value="주소검색"
            className="bg-white text-[#3BB873] border border-[#3BB873] cursor-pointer rounded w-[87px] h-[50px] ml-3"
          />

          {/* 주소 검색 컨테이너 */}
          <div
            id="wrap"
            ref={wrapRef}
            className="border w-full max-w-lg h-96 relative hidden bg-white rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-centerbg-gray-100 border-b border-gray-300">
              <h1 className="text-black font-bold">주소 검색</h1>
              <Image
                src="https://t1.daumcdn.net/postcode/resource/images/close.png"
                id="btnFoldWrap"
                className="cursor-pointer w-6 h-6"
                onClick={() => window.foldDaumPostcode()}
                alt="접기 버튼"
                width={10}
                height={10}
              />
            </div>
          </div>
          {/* 주소 입력 필드 */}
          <input
            type="text"
            // id="sample3_address"
            placeholder="기본주소"
            className="border p-3 mb-3 w-full rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* 상세주소 입력 필드 */}
          <input
            type="text"
            // id="sample3_detailAddress"
            placeholder="나머지 상세주소"
            className="border p-3 mb-3 rounded w-full"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>
      </div>
      {/* Phone Form 추가 */}
    </div>
  );
}
