import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import ErrorComponent from '../../components/Common/ErrorComponent';
import Loading from '../../components/Common/Loading';
import FriendsList from '../../components/Friends/FriendsList';
import { RootState } from '../../modules';
import { getRequestFriendListAsync } from '../../modules/requestFriend';

const socket = io('http://bringumb.tk', { transports: ['websocket'] });

const FriendsReqContainer: React.FC = () => {
  const { error, loading, requestFriendList } = useSelector(
    (state: RootState) => state.requestFriendList.myRequestFriendList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestFriendListAsync.request());

    //update이벤트 받으면 state update하게 dispatch
    socket.on('updateFriendList', () => {
      dispatch(getRequestFriendListAsync.request());
    });
  }, []);
  return (
    <>
      {loading && <Loading />}
      {error && <ErrorComponent />}
      {loading || error || (
        <>
          <FriendsList type="req" friendList={requestFriendList?.applicants} />
        </>
      )}
    </>
  );
};

export default FriendsReqContainer;
