import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNextPage} from '../store/actions/ModelActions';
import useWindowDimensions from '../utilities/WindowDimensions';

export function ScrollSpy() {
  const PAGING_THRESHOLD = 80;
  const dispatch = useDispatch();
  const hasNextPage = useSelector((state) => state.queryData.hasNextPage);
  const queryParams = useSelector((state) => state.queryData);

  // eslint-disable-next-line no-unused-vars
  const {height, width} = useWindowDimensions();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [needCheckPaging, setNeedCheckPaging] = useState(true);
  const [contentRemainder, setContentRemainder] = useState("");

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    const scrolledHeight = window.pageYOffset;
    const appHeight = document.getElementById('root').clientHeight;
    // show the button and remainder when the distance of 'height of the window' has scrolled
    setIsButtonVisible(scrolledHeight > height);

    if (appHeight > height) {
      const seemHeight = height + scrolledHeight;
      const seemPercentage = Math.floor(100 * (seemHeight / appHeight));
      const unseemPercentage = 100 - seemPercentage;
      // update the content remainder if necessary
      if (unseemPercentage < 3) {
        setContentRemainder(`END`);
      } else if (unseemPercentage % 10 === 0) {
        setContentRemainder(`${unseemPercentage}%`);
      }
      // check if need to do the some pagination
      if (needCheckPaging && hasNextPage && seemPercentage >= PAGING_THRESHOLD) {
        dispatch(fetchNextPage(queryParams));
        // prevent the exact same request from getting dispatched more than once
        // because scroll event will actually trigger multiple times PER scroll
        setNeedCheckPaging(false);
        setTimeout(() => setNeedCheckPaging(true), 3000);
      }
    }
  }

  return (
    <>
      {
        isButtonVisible &&
        <div className="fixed bottom-6 left-6 pl-px w-12 h-12 rounded-full
                        transition duration-500 ease-in-out
                        text-gray-900 hover:bg-gray-900 hover:text-gray-300
                        dark:text-pink-500 dark:hover:bg-pink-500 dark:hover:text-dark-900"
             onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <i className="fa fa-angle-up text-4xl mt-1.5 ml-3"/>
        </div>
      }
      {
        isButtonVisible &&
        <div className="fixed bottom-8 right-6 font-bold text-2xl text-gray-900 dark:text-pink-500">
          {contentRemainder}
        </div>
      }
    </>
  );
}
