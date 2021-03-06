import React, {Component} from 'react';

import Sidebar from './sidebar';
import TopNav from './topnav';
import Content from './content';
import Edit from './edit';
import Post from './post';
import EditPost from './editPost';
import Detail from './detail';

export default class MemberApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      login: true
    };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () =>{
      if(xhttp.readyState == 4 && xhttp.status == 200){
        var object = JSON.parse(xhttp.responseText);
        this.setState({
            idname: object.idname,
            id: object._id,
            imgURL: object.imgURL,
            login: object.login
        });
      }
    }
    xhttp.open("GET","/memberInfo");
    xhttp.send();
  }
  render(){
    return(
      <div>
        <link href="assets/css/styles_member.css" rel="stylesheet" />
        <div className="wrapper">
          <div className="box">
            <div className="row row-offcanvas row-offcanvas-left">
              <div className="column col-sm-12 col-xs-12" id="main">
                  <TopNav ref="topNav" memberApp={this}/>
                  <Content ref="content" userId={this.state.id} memberApp={this}/>
              </div>
            </div>
          </div>
        </div>
        <Edit ref="editModal" memberApp={this}/>
        <Post ref="postModal" memberApp={this}/>
        <EditPost ref="editPost" memberApp={this}/>
        <Detail ref="detailModal" memberApp={this}/>
      </div>
    );
  }
}
