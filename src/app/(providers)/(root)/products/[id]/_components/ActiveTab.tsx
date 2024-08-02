'use client';

interface ActiveTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleScrollToReview: () => void;
}

function ActiveTab({ activeTab, setActiveTab, handleScrollToReview }: ActiveTabProps) {
  return (
    <nav className="flex justify-center gap-7 mt-[120px] mb-10 font-bold text-[22px]">
      <button
        onClick={() => {
          setActiveTab('description');
        }}
        className={`w-full border-b-2 py-3 ${
          activeTab === 'description' ? 'border-black' : 'border-gray-200'
        }`}
      >
        제품상세
      </button>
      <button
        onClick={() => {
          setActiveTab('reviews');
          handleScrollToReview();
        }}
        className={`w-full border-b-2 py-3 ${
          activeTab === 'reviews' ? 'border-black' : 'border-gray-200'
        }`}
      >
        리뷰
      </button>
    </nav>
  );
}

export default ActiveTab;
