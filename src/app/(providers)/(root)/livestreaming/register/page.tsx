import React from 'react';
import LiveRegisterForm from '../_components/LiveRegisterForm';

function LiveRegisterPage() {
  return (
    <div className="pt-[80px] pb-[180px]">
      <h1 className="mb-[80px] font-semibold text-[32px] text-center">라이브 설정</h1>
      <section className="w-full">
        <LiveRegisterForm />
      </section>
    </div>
  );
}

export default LiveRegisterPage;
