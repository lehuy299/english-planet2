import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './index.css';

const Tweet = (
  props
) => {
  const {tweet, ...others} = props;
  console.log(others.prop2);
  return(
    <div className='tweet'>
      <Avatar hash={tweet.gravatar}/>
      <div className="content">
        <NameWithHandle author={tweet.author}/><Time time={tweet.timestamp}/>
        <Message text={tweet.message}/>
        <div className="buttons">
          <ReplyButton/>
          <RetweetButton count={tweet.retweets}/>
          <LikeButton count={tweet.likes}/>
          <MoreOptionButton/>
        </div>
      </div>
    </div>
  );
};

const Avatar = ({hash}) => {
  const url = `https://www.gravatar.com/avatar/${hash}`;
  return (
    <img 
      src={url}
      className="avatar"
      alt="avatar"
    />
  );
}

function Message({text}){
  return (
    <div className="message">
      {text}
    </div>
  );
}

function NameWithHandle({author}){
  return (
    <span className="name-with-handle">
      <span className="name">{author.name}</span>
      <span className="handle">{author.handle}</span>
    </span>
  )
}

const Time = ({time}) => {
  return (
    <span className="time">
      {moment(time).fromNow()}
    </span>
  );
};

const ReplyButton = () => (
  <i className="fa fa-reply reply-button"/>
);

function Count({count}){
  if(count > 0){
    return(
      <span className="retweet-count">
        {count}
      </span>
    );
  } else {
    return null;
  }
}

const RetweetButton = ({count}) => (
  <span className="retweetbutton">
    <i className="fa fa-retweet"/>
    <Count count={count}/>
  </span>
);

const LikeButton = ({count}) => (
  <span className="likebutton">
    <i className="fa fa-heart"/>
    {count > 0 &&
      <span className="like-count">
        {count}
      </span>}
  </span>
);

const MoreOptionButton = () => (
  <i className="fa fa-ellipsis-h more-options-button"/>
);

const testTweet = {
  message: "Something about cats",
  gravatar: "xyz",
  author: {
    handle: "catperson",
    name: "IAMA Cat Person",
  },
  likes: 5,
  retweets: 2,
  timestamp: "2016-07-30 21:24:37"
};

ReactDOM.render(
  <Tweet 
    tweet={testTweet}
    prop1={"abc"}
    prop2={124}
  />,
  // Tweet({
  //   tweet: testTweet,
  //   prop1: "aaa",
  //   prop2: 123,
  // }),
  document.querySelector('#root')
);