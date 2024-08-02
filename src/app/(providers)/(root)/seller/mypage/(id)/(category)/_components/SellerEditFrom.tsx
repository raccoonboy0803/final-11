'use client';

import React, { useEffect, useRef, useState } from 'react';
import PhoneForm from '@/app/(providers)/(root)/buyer/mypage/_components/PhoneForm';
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

interface SellerEditFormProps {
  sellerData: {
    seller_id: string;
    user_name: string;
    address: string;
    address_detail: string;
    phone: string;
    avatar_url: string;
    address_code: string;
    business_name: string;
  };
}

const SellerEditForm = ({ sellerData }: SellerEditFormProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState<string>(sellerData.address);
  const [postcode, setPostcode] = useState<string>(sellerData.address_code);
  const [detailAddress, setDetailAddress] = useState<string>(sellerData.address_detail);
  const [extraAddress, setExtraAddress] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>(sellerData.business_name);
  const [phone, setPhone] = useState<string>(sellerData.phone);
  const supabase = createClient();

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
    const { error: cacheError } = await supabase.from('Seller').select('*');

    if (cacheError) {
      console.error('Error refreshing schema cache:', cacheError);
    }

    const fullAddress = `${newAddress}${extraAddress}`;
    const payload = {
      address: fullAddress,
      address_detail: newDetailAddress,
      address_code: newAddressCode,
      business_name: businessName,
      phone: phone
    };

    console.log('Updating Seller with payload:', payload);

    const { error } = await supabase
      .from('Seller')
      .update(payload)
      .eq('seller_id', sellerData.seller_id);

    if (error) {
      console.error('Error updating seller info:', error);
      alert('정보 업데이트 중 오류가 발생했습니다.');
    } else {
      alert('판매자 정보가 성공적으로 업데이트되었습니다.');
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

  const handleCancel = () => {
    setAddress(sellerData.address);
    setPostcode('');
    setDetailAddress(sellerData.address_detail);
    setExtraAddress('');
    setBusinessName(sellerData.business_name);
    setPhone(sellerData.phone);
    alert('변경 사항이 취소되었습니다.');
  };

  return (
    <div className="  ">
      {/* 이미지 컨테이너 */}
      <div className=" flex justify-center mb-8 ">
        <Image
          src={sellerData.avatar_url}
          width={300}
          height={300}
          alt="Profile Image"
          className="w-[86px] h-[86px] rounded-full"
        />
      </div>
      {/* 이름 입력 필드 */}
      <label className="text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main ">
        상호명
      </label>
      <input
        type="text"
        className="border border-Line/Regular  bg-white w-full p-4  mb-6 mt-3 text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main  "
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />
      {/* 우편번호 입력 필드 */}
      <label className="text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main ">
        사업장 소재지
      </label>
      <div className="  ">
        <input
          type="text"
          id="sample3_postcode"
          placeholder="우편번호"
          className=" border border-Line/Regular w-[160px] p-4 mt-3 mb-3 text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main  "
          value={postcode}
          readOnly
        />

        {/* 우편번호 찾기 버튼 */}
        <input
          type="button"
          onClick={() => window.sample3_execDaumPostcode()}
          value="주소검색"
          className="border border-primary-green-500 bg-white text-primary-green-500 ml-3 cursor-pointer rounded-lg text-center p-4 text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main"
        />
      </div>
      {/* 주소 검색 컨테이너 */}
      <div
        id="wrap"
        ref={wrapRef}
        className=" w-full max-w-lg h-96 relative hidden bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-between items-center bg-gray-100 p-4 border-b">
          <h1 className="text-black font-bold">주소 검색</h1>
          <Image
            src="https://t1.daumcdn.net/postcode/resource/images/close.png"
            className="cursor-pointer"
            onClick={() => window.foldDaumPostcode()}
            alt="접기 버튼"
            width={24}
            height={24}
          />
        </div>
      </div>
      {/* 주소 입력 필드 */}
      <input
        type="text"
        id="sample3_address"
        placeholder="주소"
        className="border border-Line/Regular p-4 mb-3 w-full max-w-2xl text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main "
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      {/* 상세주소 입력 필드 */}
      <input
        type="text"
        id="sample3_detailAddress"
        placeholder="상세주소"
        className="border border-Line/Regular p-4 mb-6 w-full text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main "
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
      />
      {/* Phone Form 추가 */}
      <label className="text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main mb-3 text-font/main ">
        휴대폰 번호
      </label>
      <PhoneForm initialPhone={phone} onChange={handlePhoneChange} />

      <div className="flex gap-4 ">
        <button
          onClick={handleCancel}
          className="flex-1 bg-primary-green-50 text-primary-green-400 font-bold p-4 cursor-pointer rounded-md "
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-primary-green-500 text-white p-4 font-bold cursor-pointer text-white rounded-md "
        >
          회원정보수정
        </button>
      </div>
    </div>
  );
};

export default SellerEditForm;
