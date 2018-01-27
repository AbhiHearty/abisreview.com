import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import $ from 'jquery';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {db} from '../../components/firebase';

class DashboardComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }
    submitForm = (e) =>{
        e.preventDefault();
        console.log($(e.target).serializeArray());
        debugger;
    }
    addToFirebase = (e) =>{
        e.preventDefault();
        var movieRevies = db.collection("movies-reviews");
        var dateNow = Date.now();
        var crew = [{
                title : 'Background score',
                value: 'Mervin Solomon, Vivek Siva'
            },{
                title : 'Direction',
                value: "Kalyaan S"
            },{
                title : 'Dialogues',
                value: "Kalyaan S"
            },{
                title : 'Background score',
                value: 'Mervin Solomon, Vivek Siva'
            },{
                title : 'Cinematography',
                value: "R.S. Ananda Kumar"
            },{
                title : 'Cast',
                value: "Hansika Motwani, Munish Kanth, Prabhu Deva, Revathi"
            },{
                title : 'Production',
                value: "KJR Studios"
            },{
                title : 'S Music',
                value: "Mervin Solomon, Vivek Siva"
            },{
                title : 'Screenplay',
                value: "Kalyaan S"
            },{
                title : 'Story',
                value: "Kalyaan S"
            }];
        let shortcontent = `S.kalyan kumar , his previous movie is kadha sola porom which is an average decent movie and Gulaebaghavali being his second one is also an average decent movie for the cast they had ..
        
        Its starts really slow as they took some time to settle revathy mam and prabhu deva`
        let content = `S.kalyan kumar , his previous movie is kadha sola porom which is an average decent movie and Gulaebaghavali being his second one is also an average decent movie for the cast they had ..
        
        Its starts really slow as they took some time to settle revathy mam and prabhu deva ..
        But the thing is before interval its like a okay movie but from there on it took its peak from 0 to 80 with its unstoppable comedy and un imaginable interval block !!
        
        Revathy mam : Seriously speaking i dint like the intro portion as the idea was good but its not naturally performed .. but , from second half she gelled with the story and proved the strength of her character .. !!
        
        Hanshika : Expected role with not that much good or bad
        
        Sathyan : Helped everyones character with his innocence like a pinch of salt to a lime juice 🙂
        
        Now lemme come to the real positives for the story
        
        Yogibabu : Hes the hero of the movie 🎥 . His timings and counters are vera level . Since santhanam is busy in acting as a hero , this guy has alredy replaced him for a full script traveling comedian.. None of his scenes ll fail to make you laugh .. Full paisa vasul for only this guy !!
        
        Prabhu Deva : Watta man ?? 😳😳😳 Watta dance ?? 😳😳😳 pichu eduthutaar !! 
        Free style at his peak and the way he performed is totally natural !! He brought us back the old prabhu deva just awsome screen presence . Nothing to comment on him .. A valuable pick for the story ..
        
        Mansoor Ali Khan : A role equal to yogibabu . hes done a sensible acting and in combination with yogi babu killed us with humor bomb !!
        
        Motta Rajendran : Vera level .. One man show .. Sethuten sirichea !! I had said mansoor ali khan - yogibabu combination but adding rajendran with them will make you die laughing 😂😂😂😂 and there is a non stop climax sequence with all of them in a kalakal combination which made a vera level fun eventually made to forget all the drawbacks of the movie !!
        
        Ramdoss : Very talented actor !! Has his own style .. Brought us back the maragadha nanayam fun in the movie !! Soon he s gonna reach a different milestone in his own style if this kinda performance is gonna continue ..
        
        No strong screenplay or No strong story line which stood as a major drawback for the movie 🎥
        
        Two things which saved this movie from danger is the cast’s individual performances and a strong comedy base
        
        Movie went like normal - peaked comedy - normal - peaked comedy (Like an ECG)
        
        Its a fun filled movie just go and watch with friends and am sure u ll not complain about the movie but ll feel satisfied for the fun u get from this deadly comedy combo ..`
        movieRevies.doc('review'+dateNow).set({
            cast_crew: crew,
            title: "Gulaebaghavali1",
            content: content,
            shortcontent: shortcontent,
            reviewby: "Abhilash",
            publish: true,
            id: dateNow,
            youtube_trailer:'Z8_ZaObCL5Y',
            created_at:Date(),
            updated_at:Date(),
            release_date:'Jan 12,2018',
            movie_run_time:'2 Hour 09 Minutes',
            censor_rating:'U',
            image:'https://vignette.wikia.nocookie.net/aonoexorcist/images/d/dc/Rin_Okumura_Transparent.png/revision/latest?cb=20140604034322'
            });
    }
    render() {
        const { editorState } = this.state;
        return (
        <div className="container">
            <h1 className="mt-4 mb-3">Add post</h1>
            <button onClick={this.addToFirebase}>Add new</button>
            <form onSubmit={this.submitForm}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" required={true} className="form-control" id="title" name="title"/>
                </div>
                <div className="form-group">
                    <label htmlFor="cast_crew">Cast and Crew</label>
                    <div class="col-sm-12">
                        <div class="row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" placeholder="Enter key"/>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" placeholder="Enter value"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="reviewby">Review By </label>
                    <input type="text" required={true} className="form-control" id="reviewby" name="reviewby"/>
                </div>
                <div className="form-group">
                    <label htmlFor="publish">Publish </label>
                    <div className="form-group" style={{marginBottom:0}}>
                        <input type="radio" id="publish1" name="publish" value={true}/>
                        <label htmlFor="publish1">&nbsp; Yes</label>
                    </div>
                    <div className="form-group">
                        <input type="radio" id="publish0" name="publish" value={false} checked={true}/>
                        <label htmlFor="publish0">&nbsp; No</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content </label>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <textarea style={{display:'none'}} disabled required value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>  
      </div>);
    }
}

export default DashboardComponent;