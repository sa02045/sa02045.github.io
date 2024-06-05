import React from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';

const About = () => {
  return (
    <Layout>
      <div className="flex-col">
        <section>
          <h2>Career</h2>
          <h3 className="mt-3 text-violet-700">에잇퍼센트</h3>
          <div className="text-neutral-500">프론트엔드 개발자</div>
          <div className="text-neutral-800">2022.05 ~</div>
          <h4 className="mt-5">요약</h4>

          <ul className="list-disc list-inside text-neutral-800" style={{ lineHeight: 1.8 }}>
            <Link to="/career#env" className="text-neutral-800 hover:text-violet-700 font-bold">
              <li>사내 프론트엔드 조직 탄생부터 환경세팅, 컨벤션등부터 기여, 레거시를 개선</li>
            </Link>
            <Link to="/career" className="text-neutral-800 hover:text-violet-700 font-bold">
              <li>서비스가 고도화되면서 투자/대출 한데 모여있던 모놀리식 서비스를 마이크로 서비스로 점진적으로 개선</li>
            </Link>
            <Link to="/career#aws" className="text-neutral-800 hover:text-violet-700 font-bold">
              <li>AWS 활용 능력 AWS 배포부터 Lambda를 활용한 서버리스 로직 기능 개발</li>
            </Link>
            <Link to="/career#web-performance" className="text-neutral-800 hover:text-violet-700 font-bold">
              <li>웹 성능 최적화</li>
            </Link>
            <Link to="/career#util-library" className="text-neutral-800 hover:text-violet-700 font-bold">
              <li>CJS, ESM 타입스크립트 모노레포 라이브러리를 주도적으로 개발/운영</li>
            </Link>
            <Link to="/career#design-system" className="text-neutral-800 hover:text-violet-700 font-bold">
              <li>웹 컴포넌트 UI 라이브러리를 개발하여 사내 디자인 시스템 구축</li>
            </Link>
            <Link to="/career#feature" className="text-neutral-800 hover:text-violet-700 font-bold">
              <li>도메인 지식을 꾸준히 학습하며 금융 서비스 기능 개발 깃허브</li>
            </Link>
            <Link to="/career#trouble" className="text-neutral-800 hover:text-violet-700 font-bold">
              <li>다양한 트러블 슈팅 경험 및 에러 이슈</li>
            </Link>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default About;
