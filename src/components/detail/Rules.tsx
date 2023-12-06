import React from 'react';

const rules = [
  '[🚨 아래 사항을 지켜주세요!]',
  '[ 금연구역 ] 숙소의 전 구역이 절대금연 입니다.',
  '[ 화재 ] 건물 특성상 화재 위험이 있는 관계로 바베큐 시설이 없습니다.',
  '[ 파손 및 안전 ] 부주의로 인한 안전사고 및 파손에 대한 책임은 투숙객에',
  '[ 안전 ] 안전을 위해 입구방향으로 CCTV가 작동중입니다.',
  '[ 소음 ] 시골입니다. 밤 10시 이후 외부에서 소음은 자제 부탁드립니다.',
  '[ 인원 ] 예약 인원 외 추가 인원은 투숙 및 출입이 불가합니다.',
  '※ 원활한 체크인을 위해, 예약확정 후 여행확인증의 연락처로 꼭 연락주세요!',
  '※ 청소년 보호법에 따라 미성년자의 혼숙은 불가합니다.',
];

const Rules = () => (
  <>
    <h3 className='text-[18px] font-bold'>이용규칙</h3>
    {rules.map((rule, index) => (
      <p key={index}>{rule}</p>
    ))}
  </>
);

export default Rules;
