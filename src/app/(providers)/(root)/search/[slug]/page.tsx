import Image from 'next/image';
import { getProductDatas } from './actions';
import Link from 'next/link';

export default async function SearchPage({ params }: { params: { slug: string } }) {
  const keyword = decodeURIComponent(params.slug);
  const searchDatas = await getProductDatas(`${keyword}`);

  return (
    <div className="pt-[80px] pb-[180px]">
      <div className="grid grid-cols-4">
        {searchDatas.length === 0 ? (
          <p>검색 결과가 없습니다</p>
        ) : (
          searchDatas?.map((data) => {
            return (
              <div key={data.product_id}>
                <Link href={`/products/${data.product_id}`}>
                  <Image src={data.thumbnail_url} alt="상품이미지" width={200} height={200} />
                  <p>{data.title}</p>
                  <p>{data.price}원</p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
