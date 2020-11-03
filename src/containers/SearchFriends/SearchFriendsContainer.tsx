import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../components/Common/ErrorComponent';
import Loading from '../../components/Common/Loading';
import SearchViewer from '../../components/SearchFriends/SearchViewer';
import { RootState } from '../../modules';
import { getFriendListAsync } from '../../modules/friend';

type Props = {
  scheduleId?: number;
  type?: string;
};

const SearchFriendsContainer: React.FC<Props> = ({
  scheduleId,
  type,
}: Props) => {
  const [keyword, setKeyword] = useState('');

  const { error, loading, friendList } = useSelector(
    (state: RootState) => state.friendList.myFriendList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendListAsync.request());
  }, []);
  const onChangeText = (text: string) => {
    setKeyword(text);
  };
  const clearKeyword = () => {
    setKeyword('');
  };

  return (
    <>
      {loading && <Loading />}
      {error && <ErrorComponent />}
      {loading || error || (
        <>
          <SearchViewer
            type={type || 'search'}
            scheduleId={scheduleId}
            friendList={friendList?.followers.filter(follower =>
              follower.username.includes(keyword)
            )}
            keyword={keyword}
            onChangeText={onChangeText}
            clearKeyword={clearKeyword}
            sendPushAlarm={async () => {
              console.log('');
            }}
          />
        </>
      )}
    </>
  );
};

export default SearchFriendsContainer;
