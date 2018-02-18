import React, { Component } from 'react';
import {db} from '../../components/firebase';

class DashboardComponent extends Component {

    constructor(props){
        super(props);
        this.state={
          content : [],
          loader:1,
          nextId: 0

        }
      }

    componentWillMount(){
        let movieRevies = db.collection("movies-reviews");
        let datas = [];
        let nextid=this.state.nextId;
        movieRevies.orderBy("id", "desc").limit(1).get().then((querySnapshot)=>{
            querySnapshot.forEach(function(doc) {

                console.log(doc.id, " => ", doc.data());
                    datas.push(doc.data());
                    nextid = doc.data().id;
                    console.log(nextid);
                })
                this.setState({content:datas,loader:0,nextId:nextid});
        }).catch(function(error) {
            console.log("Error getting document:", error); console.log("Error getting document:", error);
        })

      }

      componentDidMount(){
        let movieRevies = db.collection("movies-reviews");
        let datas = this.state.content;
        let nextid=this.state.nextId;

        document.querySelector('#button').addEventListener('click',()=>{
            console.log(this.state)
            console.log(datas);
            movieRevies.orderBy("id", "desc").startAfter(nextid).limit(1).get().then((querySnapshot)=> {
            
            console.log('get all data')
            
            querySnapshot.forEach(function(doc) {
                        console.log(doc.id, " => ", doc.data());
            
                           datas.push(doc.data());
            
                        nextid = doc.data().id;
            
                    })
            
                    console.log(datas);
                    this.setState({content:datas,loader:0,nextId:nextid});
                

            }).catch((error)=> {
            
                console.log("Error getting document:", error);
            
            })
        })

      }

      loadRemaining = () => {
        return this.state.content && this.state.content.length>0 && this.state.content.map((content,index)=>{
            return (
              <div className="col-lg-4 col-sm-6 portfolio-item">
                <div className="card h-100">
                  <a href={'/detail/'+content.id}>{content.title}><img className="card-img-top" src={content.image} alt="" height="200 px"/></a>
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

    render() {console.log('test Dashboard');
        return (
        <div className="container">
            <h1 className="mt-4 mb-3">Portfolio 3
            <small>Subheading</small>
            </h1>
  
            <ol className="breadcrumb">
            <li className="breadcrumb-item">
            <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active">All Reviews</li>
            </ol>
            {this.state.loader == 1 && <div className="loader"><div></div></div>}
            <div className="row">
            
            {this.loadRemaining()}
            </div>
  
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a id="button" className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
  
      </div>);
    }
    
}

export default DashboardComponent;