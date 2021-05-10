import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNextPage} from '../store/actions/ModelActions';
import useWindowDimensions from '../utilities/WindowDimensions';
import '../static/styles/ScrollSpy.css';

export function ScrollSpy() {
  const PAGING_THRESHOLD = 75;
  const dispatch = useDispatch();
  const hasNextPage = useSelector((state) => state.queryData.hasNextPage);
  const queryParams = useSelector((state) => state.queryData);

  // eslint-disable-next-line no-unused-vars
  const {height, width} = useWindowDimensions();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [needCheckPaging, setNeedCheckPaging] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    const scrolledHeight = window.pageYOffset;
    const appHeight = document.getElementById('root').clientHeight;

    // show the button when the distance of 'height of the window' has scrolled
    setIsButtonVisible(scrolledHeight > height);

    // check if need to do the some pagination
    if (needCheckPaging && hasNextPage && appHeight > height) {
      const seemHeight = height + scrolledHeight;
      const seemPercentage = 100 * (seemHeight / appHeight);
      if (seemPercentage >= PAGING_THRESHOLD) {
        dispatch(fetchNextPage(queryParams));
        // prevent the exact same request from getting dispatched more than once
        // because scroll event will actually trigger multiple times PER scroll
        setNeedCheckPaging(false);
        setTimeout(() => setNeedCheckPaging(true), 3000);
      }
    }
  }

  // Set the page Y offset to 0 and make transition smooth
  const scrollToTop = () =>
    window.scrollTo({top: 0, behavior: 'smooth'})

  return <>
    {
      isButtonVisible &&
      <div className="helper-wrapper hvr-icon-bob hvr-wobble-skew"
           onClick={scrollToTop}
      >
        <i className="icon-up fa fa-angle-up"/>
      </div>
    }
  </>
}
