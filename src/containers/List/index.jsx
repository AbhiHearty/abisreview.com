import React, { Component } from 'react';
import {db} from '../../components/firebase';
import $ from 'jquery';

class DashboardComponent extends Component {
  constructor(props){
    super(props);
    this.state={
      content : [],
      loader:1,
      nextId: 0,
      limit : 12
    }
  }

  componentWillMount(){
    let movieRevies = db.collection("movies-reviews");
    let datas = [];
    let nextid=this.state.nextId;
    movieRevies.orderBy("id", "desc").limit(this.state.limit).get().then((querySnapshot)=>{
      querySnapshot.forEach(function(doc) {
        datas.push(doc.data());
        nextid = doc.data().id;
      })
      $(window).off("scroll", this.windowContentLoad);
      $(window).scroll(this.windowContentLoad);
      this.setState({content:datas,loader:0,nextId:nextid});
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })
  }
  componentWillUnmount() {
    $(window).off("scroll", this.windowContentLoad);
  }
  windowContentLoad = () => {
    var topPart = $(document.querySelector('#button'));
    if (topPart.length) {
      var hTp = topPart.offset().top;
      var hHp = topPart.outerHeight();
      var wHp = $(window).height();
      var wSp = $(window).scrollTop();
      if (wSp > (hTp + hHp - wHp)) {
        $(window).off("scroll", this.windowContentLoad);
        this.loadMoreDatas()
      }
    }
  }
  loadMoreDatas = () => {
    let movieRevies = db.collection("movies-reviews");
    let datas = this.state.content;
    let nextid = this.state.nextId;
    if (nextid) {
      movieRevies.orderBy("id", "desc").startAfter(nextid).limit(this.state.limit).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          nextid = 0;
          $(window).off("scroll", this.windowContentLoad);
        } else {
          querySnapshot.forEach(function (doc) {
            datas.push(doc.data());
            nextid = doc.data().id;
          })
          $(window).off("scroll", this.windowContentLoad);
          $(window).scroll(this.windowContentLoad);
        }
        this.setState({ content: datas, loader: 0, nextId: nextid });
      }).catch((error) => {
        console.log("Error getting document:", error);
      })
    }
  }

      loadRemaining = () => {
        return this.state.content && this.state.content.length>0 && this.state.content.map((content,index)=>{
            return (
              <div className="col-lg-4 col-sm-6 portfolio-item">
                <div className="card h-100">
                  <a href={'/detail/' + content.id} className="card-a-top" ><img className="card-img-top" src={content.image} alt={content.title} /></a>
                  <div className="card-body">
                    <h4 className="card-title">
                    <a href={'/detail/'+content.id}>{content.title}</a>
                    </h4>
                    <p className="card-text">{content.shortcontent}..</p>
                  </div>
                </div>
              </div>
              );
        })
        
      }

  render() {
    return (
      <div className="container">
          <h1 className="mt-4 mb-3">Movie
          <small>Reviews</small>
          </h1>

          <ol className="breadcrumb">
          <li className="breadcrumb-item">
          <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active">list</li>
          </ol>
          {this.state.loader == 1 && <div className="loader"><div></div></div>}
          <div className="row">
          
          {this.loadRemaining()}
          </div>
    <ul className="pagination justify-content-center" id="button" ></ul>
    </div>);
  }
    
}

export default DashboardComponent;