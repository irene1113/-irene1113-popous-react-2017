import React, {Component} from 'react';
import PerPost from './perPost';
var Masonry = require('react-masonry-component');

var masonryOptions = {
    transitionDuration: 1000
};
export default class Content extends Component{
  constructor(props){
    super(props);
    this.state = {
      posts:null
    };
    this.callMasonry = this.callMasonry.bind(this);
    var xhttp = new XMLHttpRequest();
    var fromPost = 0;
    var count = 1;
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var resObject = JSON.parse(xhttp.responseText);
        var keyArray = [];
        var object = resObject.map((value) => {
          keyArray.push(value._id);
          return (<PerPost post={value} key={value._id} memberApp={this.props.memberApp} isProcessing={false}/>);
        });
        this.setState({posts:object, postsKey: keyArray});
        fromPost += count;
        document.getElementById('loading').style.display = "none";
      }
    }
    xhttp.open("GET","/post?find=all&from=" + fromPost + "&count=" + count);
    xhttp.send();
  }
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }
  refresfNewPost(userid, updateTime){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var resObject = JSON.parse(xhttp.responseText);
        this.state.posts.splice(0,1,<PerPost post={resObject} key={resObject._id} memberApp={this.props.memberApp} isProcessing={false}/>);
        this.state.postsKey.splice(0,1,resObject._id);
        this.setState({
          posts:this.state.posts,
          postsKey: this.state.postsKey
        });
      }
    }
    xhttp.open("GET","/post?find=newest&userid=" + userid + "&updateTime=" + updateTime);
    xhttp.send();
  }
  addNewPost(post, index){
    this.state.posts.unshift(<PerPost post={post} key={index} memberApp={this.props.memberApp} isProcessing={true}/>);
    this.state.postsKey.unshift(index);
    this.setState({
      posts: this.state.posts,
      postsKey: this.state.postsKey
    });
  }
  refreshPostsState(index){
    this.state.posts.splice(index,1,null);
    this.setState({posts:this.state.posts});
  }
  callMasonry(){
    this.refs.masonry.masonry.layout();
  }
  render(){
    return(
      <div className="padding height-100">
          <div className="full col-sm-9 height-100">
            <div id="loading" className="loading"></div>

            <Masonry
              ref="masonry"
              className={'my-gallery-class'} // default ''
              elementType={'div'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
          >
                   {this.state.posts}
            </Masonry>
          </div>
      </div>

    );
  }
}
