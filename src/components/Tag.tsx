import React from 'react';
import REACT_ICON from '../images/react-icon.webp';
import { type Post } from '../schema';

type TagType = Post['frontmatter']['tags'][0];

interface Props {
  tagType: TagType;
  isClicked: boolean;
}

export function Tag({ tagType, isClicked }: Props) {
  const tag = getTag(tagType);
  return (
    <div
      className={`flex rounded-md bg-blue w-fit p-1 px-2 h-8 hover:cursor-pointer ${
        isClicked ? 'bg-slate-300' : 'bg-slate-300'
      }`}
    >
      {tag?.Img()}
      {tag?.Text()}
    </div>
  );
}

function getTag(tagType: TagType) {
  switch (tagType) {
    case 'react':
      return new ReactTag();
    case 'ux':
      return new UxTag();
    default:
      return null;
  }
}

abstract class TagClass {
  abstract Img(): JSX.Element;
  abstract Text(): JSX.Element;
}

class ReactTag extends TagClass {
  Img() {
    return <img src={REACT_ICON} alt="react icon" className="rounded-md" />;
  }
  Text() {
    return <div className="ml-2 font-bold text-md text-black">React</div>;
  }
}

class UxTag extends TagClass {
  Img() {
    return <div>&#128172;</div>;
  }
  Text() {
    return <div className="ml-2 font-bold text-md text-black">UX</div>;
  }
}
