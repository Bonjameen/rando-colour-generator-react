import { MouseEventHandler } from 'react';
import colourous from '../colourous';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import LikeBox from './like-box';
import './likes.css';

interface LikesProps {
  contrastColour: string[];
}

const Likes: React.FC<LikesProps> = ({ contrastColour }) => {
  const btnColour = colourous.getRGBFromHueList(contrastColour);
  const likes = useTypedSelector((state) => state.likes.data);
  const likesOpen = useTypedSelector((state) => state.colours.data.likesOpen);
  const { toggleLikesOpen } = useActions();

  const controlButton = (btn: Element) => {
    btn.classList.toggle('likes__btn--active');
    const text = btn.querySelector('span');
    if (!text) throw new Error('No text element detected');
    if (likesOpen) text.classList.toggle('likes__btn-text--active');
    else
      setTimeout(() => text.classList.toggle('likes__btn-text--active'), 1000);
  };

  const onBtnClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    controlButton(e.currentTarget as Element);
    toggleLikesOpen();
  };

  const arrowDir = likesOpen ? 'up' : 'down';

  return (
    <div
      className={`likes ${likesOpen ? `likes--active` : ''}`}
      style={{
        color: btnColour,
        fill: btnColour,
        stroke: btnColour,
        height: likes.length >= 8 ? `calc((100vh /9) * 8)` : `auto`,
      }}
    >
      <div
        className='likes__boxes'
        style={{
          height: likes.length >= 8 ? `calc((100vh /9) * 8)` : `auto`,
        }}
      >
        {likes.map((like, i) => (
          <LikeBox key={i} colour={like} />
        ))}
      </div>

      <div
        onClick={onBtnClick}
        className={`likes__btn ${likesOpen ? `likes__btn--active` : ''}`}
      >
        <svg className='likes__btn-icon' viewBox='0 0 32 32'>
          <use href={`./icons.svg#icon-caret-${arrowDir}`}></use>
        </svg>
        <span className='likes__btn-text'>Likes</span>
      </div>
    </div>
  );
};

export default Likes;
